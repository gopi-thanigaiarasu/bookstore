import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Edit, Trash2, BookOpen } from 'lucide-react';
import toast from 'react-hot-toast';
import { authorService } from '../../services/author.service';
import { Author } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button } from '../../components/Button';

export function AuthorDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      loadAuthor(parseInt(id, 10));
    }
  }, [id]);

  const loadAuthor = async (authorId: number) => {
    try {
      setLoading(true);
      const data = await authorService.getById(authorId);
      setAuthor(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load author');
      navigate('/authors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!author || !confirm('Are you sure you want to delete this author? All their books will also be deleted.')) {
      return;
    }

    try {
      setDeleting(true);
      await authorService.delete(author.id);
      toast.success('Author deleted successfully');
      navigate('/authors');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete author');
      setDeleting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading author..." />;
  }

  if (!author) {
    return null;
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/authors')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Authors
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{author.name}</h1>
            <p className="mt-1 text-sm text-gray-500">
              Created {new Date(author.createdAt).toLocaleDateString()}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="secondary"
              onClick={() => navigate(`/authors/${author.id}/edit`)}
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
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">Biography</dt>
              <dd className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">{author.bio}</dd>
            </div>
          </dl>
        </div>
      </div>

      {author.books && author.books.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Books by {author.name}
          </h2>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {author.books.map((book) => (
                <li key={book.id}>
                  <button
                    onClick={() => navigate(`/books/${book.id}`)}
                    className="block w-full text-left hover:bg-gray-50 px-4 py-4 sm:px-6"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-medium text-blue-600 truncate">
                        {book.title}
                      </p>
                      <p className="ml-2 flex-shrink-0 text-sm text-gray-500">
                        {book.publishedYear}
                      </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                      {book.description}
                    </p>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
