import { api } from '../config/api';
import { Book, CreateBookInput, UpdateBookInput } from '../types';

export const bookService = {
  async getAll(): Promise<Book[]> {
    const response = await api.get<Book[]>('/books');
    return response.data;
  },

  async getById(id: number): Promise<Book> {
    const response = await api.get<Book>(`/books/${id}`);
    return response.data;
  },

  async create(data: CreateBookInput): Promise<Book> {
    const response = await api.post<Book>('/books', data);
    return response.data;
  },

  async update(id: number, data: UpdateBookInput): Promise<Book> {
    const response = await api.put<Book>(`/books/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/books/${id}`);
  },
};
