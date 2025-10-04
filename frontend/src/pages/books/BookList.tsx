import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookService } from '../../services/book.service';
import { Book } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';

export function BookList() {
  const navigate = useNavigate();
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await bookService.getAll();
      setBooks(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      setDeletingId(id);
      await bookService.delete(id);
      toast.success('Book deleted successfully');
      loadBooks();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete book');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading books..." />;
  }

  if (books.length === 0) {
    return (
      <EmptyState
        icon={BookOpen}
        title="No books yet"
        description="Get started by adding your first book."
        action={{
          label: 'Add Book',
          onClick: () => navigate('/books/new'),
        }}
      />
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Books</h1>
          <p className="mt-1 text-sm text-gray-500">Browse and manage your book collection</p>
        </div>
        <Button onClick={() => navigate('/books/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Book
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {books.map((book) => (
          <div
            key={book.id}
            className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="p-5">
              <button
                onClick={() => navigate(`/books/${book.id}`)}
                className="text-left w-full"
              >
                <h3 className="text-lg font-medium text-blue-600 hover:text-blue-800 line-clamp-2">
                  {book.title}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  by {book.author?.name || 'Unknown Author'}
                </p>
                <p className="mt-2 text-sm text-gray-500 line-clamp-3">
                  {book.description}
                </p>
                <p className="mt-2 text-xs text-gray-400">
                  Published: {book.publishedYear}
                </p>
              </button>
              <div className="mt-4 flex space-x-2">
                <Button
                  variant="secondary"
                  onClick={() => navigate(`/books/${book.id}/edit`)}
                  className="flex-1"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleDelete(book.id)}
                  isLoading={deletingId === book.id}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
