import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { AuthorList } from './pages/authors/AuthorList';
import { AuthorDetail } from './pages/authors/AuthorDetail';
import { AuthorForm } from './pages/authors/AuthorForm';
import { BookList } from './pages/books/BookList';
import { BookDetail } from './pages/books/BookDetail';
import { BookForm } from './pages/books/BookForm';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Author routes */}
          <Route path="/authors" element={<AuthorList />} />
          <Route path="/authors/new" element={<AuthorForm />} />
          <Route path="/authors/:id" element={<AuthorDetail />} />
          <Route path="/authors/:id/edit" element={<AuthorForm />} />
          
          {/* Book routes */}
          <Route path="/books" element={<BookList />} />
          <Route path="/books/new" element={<BookForm />} />
          <Route path="/books/:id" element={<BookDetail />} />
          <Route path="/books/:id/edit" element={<BookForm />} />
          
          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
