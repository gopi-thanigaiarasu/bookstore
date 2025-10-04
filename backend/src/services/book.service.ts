import { BookRepository } from '../repositories/book.repository';
import { AuthorRepository } from '../repositories/author.repository';
import { CreateBookInput, UpdateBookInput } from '../types';
import { NotFoundError, ValidationError } from '../utils/errors';

export class BookService {
  private repository: BookRepository;
  private authorRepository: AuthorRepository;

  constructor() {
    this.repository = new BookRepository();
    this.authorRepository = new AuthorRepository();
  }

  async getAllBooks() {
    return this.repository.findAll();
  }

  async getBookById(id: number) {
    const book = await this.repository.findById(id);
    if (!book) {
      throw new NotFoundError(`Book with ID ${id} not found`);
    }
    return book;
  }

  async createBook(data: CreateBookInput) {
    // Validate author exists
    const authorExists = await this.authorRepository.exists(data.authorId);
    if (!authorExists) {
      throw new ValidationError(`Author with ID ${data.authorId} does not exist`);
    }
    return this.repository.create(data);
  }

  async updateBook(id: number, data: UpdateBookInput) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Book with ID ${id} not found`);
    }

    // Validate author exists if authorId is being updated
    if (data.authorId) {
      const authorExists = await this.authorRepository.exists(data.authorId);
      if (!authorExists) {
        throw new ValidationError(`Author with ID ${data.authorId} does not exist`);
      }
    }

    return this.repository.update(id, data);
  }

  async deleteBook(id: number) {
    const exists = await this.repository.exists(id);
    if (!exists) {
      throw new NotFoundError(`Book with ID ${id} not found`);
    }
    return this.repository.delete(id);
  }
}
