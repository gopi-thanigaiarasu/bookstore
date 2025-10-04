import { AuthorRepository } from '../repositories/author.repository';
import { CreateAuthorInput, UpdateAuthorInput } from '../types';
import { NotFoundError } from '../utils/errors';

export class AuthorService {
  private repository: AuthorRepository;

  constructor() {
    this.repository = new AuthorRepository();
  }

  async getAllAuthors() {
    return this.repository.findAll();
  }

  async getAuthorById(id: number) {
    const author = await this.repository.findById(id);
    if (!author) {
      throw new NotFoundError(`Author with ID ${id} not found`);
    }
    return author;
  }

  async createAuthor(data: CreateAuthorInput) {
    return this.repository.create(data);
  }

  async updateAuthor(id: number, data: UpdateAuthorInput) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Author with ID ${id} not found`);
    }
    return this.repository.update(id, data);
  }

  async deleteAuthor(id: number) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Author with ID ${id} not found`);
    }
    return this.repository.delete(id);
  }
}
