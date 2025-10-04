import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { authorService } from '../../services/author.service';
import { CreateAuthorInput } from '../../types';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { TextArea } from '../../components/TextArea';

export function AuthorForm() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const isEditing = !!id;

  const [loading, setLoading] = useState(isEditing);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<CreateAuthorInput>({
    name: '',
    bio: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CreateAuthorInput, string>>>({});

  useEffect(() => {
    if (isEditing && id) {
      loadAuthor(parseInt(id, 10));
    }
  }, [id, isEditing]);

  const loadAuthor = async (authorId: number) => {
    try {
      setLoading(true);
      const author = await authorService.getById(authorId);
      setFormData({
        name: author.name,
        bio: author.bio,
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to load author');
      navigate('/authors');
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CreateAuthorInput, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.length > 255) {
      newErrors.name = 'Name must be less than 255 characters';
    }

    if (!formData.bio.trim()) {
      newErrors.bio = 'Bio is required';
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
        await authorService.update(parseInt(id, 10), formData);
        toast.success('Author updated successfully');
      } else {
        await authorService.create(formData);
        toast.success('Author created successfully');
      }
      navigate('/authors');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to save author');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (field: keyof CreateAuthorInput, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading author..." />;
  }

  return (
    <div>
      <div className="mb-6">
        <Button variant="secondary" onClick={() => navigate('/authors')}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Authors
        </Button>
      </div>

      <div className="bg-white shadow sm:rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">
            {isEditing ? 'Edit Author' : 'Create New Author'}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Name"
              type="text"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              error={errors.name}
              placeholder="Enter author name"
              required
            />

            <TextArea
              label="Biography"
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              error={errors.bio}
              placeholder="Enter author biography"
              rows={6}
              required
            />

            <div className="flex justify-end space-x-3">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/authors')}
              >
                Cancel
              </Button>
              <Button type="submit" isLoading={submitting}>
                {isEditing ? 'Update Author' : 'Create Author'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
