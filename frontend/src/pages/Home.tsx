import { useNavigate } from 'react-router-dom';
import { BookOpen, Users, ArrowRight } from 'lucide-react';
import { Button } from '../components/Button';

export function Home() {
  const navigate = useNavigate();

  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Welcome to Bookstore
      </h1>
      <p className="text-xl text-gray-600 mb-12">
        Manage your book collection and authors in one place
      </p>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-4xl mx-auto">
        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mx-auto mb-4">
              <Users className="w-8 h-8 text-blue-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authors</h2>
            <p className="text-gray-600 mb-6">
              Browse and manage your favorite authors
            </p>
            <Button onClick={() => navigate('/authors')} className="w-full">
              View Authors
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow">
          <div className="p-8">
            <div className="flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Books</h2>
            <p className="text-gray-600 mb-6">
              Explore and organize your book collection
            </p>
            <Button onClick={() => navigate('/books')} className="w-full">
              View Books
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <div className="mt-16 max-w-3xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">📝 Easy Management</h4>
            <p className="text-sm text-gray-600">
              Create, read, update, and delete authors and books with ease
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">🔍 Quick Search</h4>
            <p className="text-sm text-gray-600">
              Find books and authors quickly with our intuitive interface
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h4 className="font-medium text-gray-900 mb-2">🎨 Modern UI</h4>
            <p className="text-sm text-gray-600">
              Beautiful, responsive design that works on all devices
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
