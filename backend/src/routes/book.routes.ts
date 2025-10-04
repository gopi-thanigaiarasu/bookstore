import { FastifyInstance } from 'fastify';
import { BookService } from '../services/book.service';
import { createBookSchema, updateBookSchema } from '../types';
import { ZodError } from 'zod';

export async function bookRoutes(fastify: FastifyInstance) {
  const bookService = new BookService();

  // Get all books
  fastify.get('/books', async (request, reply) => {
    try {
      const books = await bookService.getAllBooks();
      return reply.send(books);
    } catch (error) {
      throw error;
    }
  });

  // Get book by ID
  fastify.get('/books/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const book = await bookService.getBookById(parseInt(id, 10));
      return reply.send(book);
    } catch (error) {
      throw error;
    }
  });

  // Create book
  fastify.post('/books', async (request, reply) => {
    try {
      const validatedData = createBookSchema.parse(request.body);
      const book = await bookService.createBook(validatedData);
      return reply.status(201).send(book);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Validation Error',
          message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
      }
      throw error;
    }
  });

  // Update book
  fastify.put('/books/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const validatedData = updateBookSchema.parse(request.body);
      const book = await bookService.updateBook(parseInt(id, 10), validatedData);
      return reply.send(book);
    } catch (error) {
      if (error instanceof ZodError) {
        return reply.status(400).send({
          statusCode: 400,
          error: 'Validation Error',
          message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', '),
        });
      }
      throw error;
    }
  });

  // Delete book
  fastify.delete('/books/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      await bookService.deleteBook(parseInt(id, 10));
      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  });
}
