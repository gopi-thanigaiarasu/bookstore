import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, User } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookService } from '../../services/book.service';
import { Book } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button } from '../../components/Button';

export function BookDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      loadBook(parseInt(id, 10));
    }
  }, [id]);

  const loadBook = async (bookId: number) => {
    try {
      setLoading(true);
      const data = await bookService.getById(bookId);
      setBook(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load book');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!book || !confirm('Are you sure you want to delete this book?')) {
      return;
    }

    try {
      setDeleting(true);
      await bookService.delete(book.id);
      toast.success('Book deleted successfully');
      navigate('/books');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete book');
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading book..." />;
  }

  if (!book) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/books')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{book.title}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Published in {book.publishedYear}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/books/${book.id}/edit`)}
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
            <Button
              variant="danger"
              onClick={handleDelete}
              isLoading={deleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500 flex items-center">
                <User className="w-4 h-4 mr-1" />
                Author
              </dt>
              <dd className="mt-1">
                <button
                  onClick={() => book.author && navigate(`/authors/${book.author.id}`)}
                  className="text-sm text-blue-600 hover:text-blue-800"
                >
                  {book.author?.name || 'Unknown'}
                </button>
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Published Year</dt>
              <dd className="mt-1 text-sm text-gray-900">{book.publishedYear}</dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Description</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                {book.description}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Metadata</dt>
              <dd className="mt-1 text-xs text-gray-500">
                <p>Created: {new Date(book.createdAt).toLocaleString()}</p>
                <p>Last Updated: {new Date(book.updatedAt).toLocaleString()}</p>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
