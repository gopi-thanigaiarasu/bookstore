import { prisma } from '../config/database';
import { CreateAuthorInput, UpdateAuthorInput } from '../types';

export class AuthorRepository {
  async findAll() {
    return prisma.author.findMany({
      include: {
        books: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findById(id: number) {
    return prisma.author.findUnique({
      where: { id },
      include: {
        books: true,
      },
    });
  }

  async create(data: CreateAuthorInput) {
    return prisma.author.create({
      data,
      include: {
        books: true,
      },
    });
  }

  async update(id: number, data: UpdateAuthorInput) {
    return prisma.author.update({
      where: { id },
      data,
      include: {
        books: true,
      },
    });
  }

  async delete(id: number) {
    return prisma.author.delete({
      where: { id },
    });
  }

  async exists(id: number) {
    const count = await prisma.author.count({
      where: { id },
    });
    return count > 0;
  }
}
