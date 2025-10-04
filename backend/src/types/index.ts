import { z } from 'zod';

// Author schemas
export const createAuthorSchema = z.object({
  name: z.string().min(1, 'Name is required').max(255),
  bio: z.string().min(1, 'Bio is required'),
});

export const updateAuthorSchema = z.object({
  name: z.string().min(1).max(255).optional(),
  bio: z.string().min(1).optional(),
});

// Book schemas
export const createBookSchema = z.object({
  title: z.string().min(1, 'Title is required').max(255),
  authorId: z.number().int().positive('Author ID must be a positive integer'),
  description: z.string().min(1, 'Description is required'),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear() + 10),
});

export const updateBookSchema = z.object({
  title: z.string().min(1).max(255).optional(),
  authorId: z.number().int().positive().optional(),
  description: z.string().min(1).optional(),
  publishedYear: z.number().int().min(1000).max(new Date().getFullYear() + 10).optional(),
});

// Type exports
export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;
export type CreateBookInput = z.infer<typeof createBookSchema>;
export type UpdateBookInput = z.infer<typeof updateBookSchema>;
