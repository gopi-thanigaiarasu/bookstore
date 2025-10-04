import { FastifyInstance } from 'fastify';
import { AuthorService } from '../services/author.service';
import { createAuthorSchema, updateAuthorSchema } from '../types';
import { AppError } from '../utils/errors';
import { ZodError } from 'zod';

export async function authorRoutes(fastify: FastifyInstance) {
  const authorService = new AuthorService();

  // Get all authors
  fastify.get('/authors', async (request, reply) => {
    try {
      const authors = await authorService.getAllAuthors();
      return reply.send(authors);
    } catch (error) {
      throw error;
    }
  });

  // Get author by ID
  fastify.get('/authors/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const author = await authorService.getAuthorById(parseInt(id, 10));
      return reply.send(author);
    } catch (error) {
      throw error;
    }
  });

  // Create author
  fastify.post('/authors', async (request, reply) => {
    try {
      const validatedData = createAuthorSchema.parse(request.body);
      const author = await authorService.createAuthor(validatedData);
      return reply.status(201).send(author);
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

  // Update author
  fastify.put('/authors/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      const validatedData = updateAuthorSchema.parse(request.body);
      const author = await authorService.updateAuthor(parseInt(id, 10), validatedData);
      return reply.send(author);
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

  // Delete author
  fastify.delete('/authors/:id', async (request, reply) => {
    try {
      const { id } = request.params as { id: string };
      await authorService.deleteAuthor(parseInt(id, 10));
      return reply.status(204).send();
    } catch (error) {
      throw error;
    }
  });
}
