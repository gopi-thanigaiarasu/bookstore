import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { bookService } from '../../services/book.service';
import { authorService } from '../../services/author.service';
import { CreateBookInput, Author } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';

export function BookForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [formData, setFormData] = useState<CreateBookInput>({
    title: '',
    authorId: 0,
    description: '',
    publishedYear: new Date().getFullYear(),
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateBookInput, string>>>({});

  useEffect(() => {
    loadAuthors();
    if (isEditing && id) {
      loadBook(parseInt(id, 10));
    } else {
      setLoading(false);
    }
  }, [id, isEditing]);

  const loadAuthors = async () => {
    try {
      const data = await authorService.getAll();
      setAuthors(data);
    } catch (error) {
      toast.error('Failed to load authors');
    }
  };

  const loadBook = async (bookId: number) => {
    try {
      setLoading(true);
      const book = await bookService.getById(bookId);
      setFormData({
        title: book.title,
        authorId: book.authorId,
        description: book.description,
        publishedYear: book.publishedYear,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load book');
      navigate('/books');
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateBookInput, string>> = {};
    const currentYear = new Date().getFullYear();

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Title must be less than 255 characters';
    }

    if (!formData.authorId || formData.authorId <= 0) {
      newErrors.authorId = 'Please select an author';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.publishedYear) {
      newErrors.publishedYear = 'Published year is required';
    } else if (formData.publishedYear < 1000 || formData.publishedYear > currentYear + 10) {
      newErrors.publishedYear = `Year must be between 1000 and ${currentYear + 10}`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setSubmitting(true);
      if (isEditing && id) {
        await bookService.update(parseInt(id, 10), formData);
        toast.success('Book updated successfully');
      } else {
        await bookService.create(formData);
        toast.success('Book created successfully');
      }
      navigate('/books');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save book');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof CreateBookInput, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading..." />;
  }

  if (authors.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Authors Available</h2>
        <p className="text-gray-600 mb-4">You need to create at least one author before adding books.</p>
        <Button onClick={() => navigate('/authors/new')}>
          Create Author
        </Button>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/books')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Books
        </Button>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditing ? 'Edit Book' : 'Add New Book'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Title"
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              error={errors.title}
              placeholder="Enter book title"
              required
            />

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Author
              </label>
              <select
                value={formData.authorId}
                onChange={(e) => handleChange('authorId', parseInt(e.target.value, 10))}
                className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
                  errors.authorId ? 'border-red-300' : 'border-gray-300'
                }`}
                required
              >
                <option value={0}>Select an author</option>
                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name}
                  </option>
                ))}
              </select>
              {errors.authorId && (
                <p className="mt-1 text-sm text-red-600">{errors.authorId}</p>
              )}
            </div>

            <Input
              label="Published Year"
              type="number"
              value={formData.publishedYear}
              onChange={(e) => handleChange('publishedYear', parseInt(e.target.value, 10))}
              error={errors.publishedYear}
              placeholder="Enter published year"
              min={1000}
              max={new Date().getFullYear() + 10}
              required
            />

            <TextArea
              label="Description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              error={errors.description}
              placeholder="Enter book description"
              rows={6}
              required
            />

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/books')}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={submitting}>
                {isEditing ? 'Update Book' : 'Create Book'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
