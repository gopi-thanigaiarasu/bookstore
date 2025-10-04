import { api } from '../config/api';
import { Author, CreateAuthorInput, UpdateAuthorInput } from '../types';

export const authorService = {
  async getAll(): Promise<Author[]> {
    const response = await api.get<Author[]>('/authors');
    return response.data;
  },

  async getById(id: number): Promise<Author> {
    const response = await api.get<Author>(`/authors/${id}`);
    return response.data;
  },

  async create(data: CreateAuthorInput): Promise<Author> {
    const response = await api.post<Author>('/authors', data);
    return response.data;
  },

  async update(id: number, data: UpdateAuthorInput): Promise<Author> {
    const response = await api.put<Author>(`/authors/${id}`, data);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/authors/${id}`);
  },
};
