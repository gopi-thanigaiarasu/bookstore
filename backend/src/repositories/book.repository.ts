import { prisma } from '../config/database';
import { CreateBookInput, UpdateBookInput } from '../types';

export class BookRepository {
  async findAll() {
    return prisma.book.findMany({
      include: {
        author: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.book.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
  }

  async create(data: CreateBookInput) {
    return prisma.book.create({
      data,
      include: {
        author: true,
      },
    });
  }

  async update(id: number, data: UpdateBookInput) {
    return prisma.book.update({
      where: { id },
      data,
      include: {
        author: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.book.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    const count = await prisma.book.count({
      where: { id },
    });
    return count > 0;
  }
}
