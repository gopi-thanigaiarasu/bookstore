import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Edit, Trash2, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import { authorService } from '../../services/author.service';
import { Author } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { EmptyState } from '../../components/EmptyState';
import { Button } from '../../components/Button';

export function AuthorList() {
  const navigate = useNavigate();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    try {
      setLoading(true);
      const data = await authorService.getAll();
      setAuthors(data);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load authors');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this author? All their books will also be deleted.')) {
      return;
    }

    try {
      setDeletingId(id);
      await authorService.delete(id);
      toast.success('Author deleted successfully');
      loadAuthors();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to delete author');
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading authors..." />;
  }

  if (authors.length === 0) {
    return (
      <EmptyState
        icon={Users}
        title="No authors yet"
        description="Get started by creating your first author."
        action={{
          label: 'Add Author',
          onClick: () => navigate('/authors/new'),
        }}
      />
    );
  }

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Authors</h1>
          <p className="mt-1 text-sm text-gray-500">Manage your book authors</p>
        </div>
        <Button onClick={() => navigate('/authors/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Add Author
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <ul className="divide-y divide-gray-200">
          {authors.map((author) => (
            <li key={author.id}>
              <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <button
                      onClick={() => navigate(`/authors/${author.id}`)}
                      className="text-left w-full"
                    >
                      <p className="text-lg font-medium text-blue-600 truncate hover:text-blue-800">
                        {author.name}
                      </p>
                      <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                        {author.bio}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {author.books?.length || 0} {author.books?.length === 1 ? 'book' : 'books'}
                      </p>
                    </button>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex space-x-2">
                    <Button
                      variant="secondary"
                      onClick={() => navigate(`/authors/${author.id}/edit`)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(author.id)}
                      isLoading={deletingId === author.id}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
