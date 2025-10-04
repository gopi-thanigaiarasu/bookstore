export interface Author {
  id: number;
  name: string;
  bio: string;
  createdAt: string;
  updatedAt: string;
  books?: Book[];
}

export interface Book {
  id: number;
  title: string;
  authorId: number;
  description: string;
  publishedYear: number;
  createdAt: string;
  updatedAt: string;
  author?: Author;
}

export interface CreateAuthorInput {
  name: string;
  bio: string;
}

export interface UpdateAuthorInput {
  name?: string;
  bio?: string;
}

export interface CreateBookInput {
  title: string;
  authorId: number;
  description: string;
  publishedYear: number;
}

export interface UpdateBookInput {
  title?: string;
  authorId?: number;
  description?: string;
  publishedYear?: number;
}
