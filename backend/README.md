# Bookstore Backend API

REST API built with Fastify, TypeScript, and Prisma.

## Tech Stack

- **Framework**: Fastify
- **Language**: TypeScript
- **ORM**: Prisma
- **Database**: PostgreSQL
- **Validation**: Zod

## Project Structure

```
backend/
├── prisma/
│   └── schema.prisma       # Database schema
├── src/
│   ├── config/
│   │   ├── database.ts     # Prisma client & connection
│   │   └── env.ts          # Environment configuration
│   ├── repositories/       # Data access layer
│   │   ├── author.repository.ts
│   │   └── book.repository.ts
│   ├── services/          # Business logic layer
│   │   ├── author.service.ts
│   │   └── book.service.ts
│   ├── routes/            # API routes
│   │   ├── author.routes.ts
│   │   └── book.routes.ts
│   ├── types/             # TypeScript types & validation schemas
│   │   └── index.ts
│   ├── utils/             # Utility functions
│   │   └── errors.ts
│   ├── index.ts           # Application entry point
│   └── seed.ts            # Database seeding script
├── .env.example
├── package.json
└── tsconfig.json
```

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment file:
```bash
cp .env.example .env
```

3. Start PostgreSQL (via Docker):
```bash
cd .. && docker-compose up -d
```

4. Generate Prisma client:
```bash
npm run prisma:generate
```

5. Run migrations:
```bash
npm run migrate
```

6. Seed database:
```bash
npm run seed
```

7. Start development server:
```bash
npm run dev
```

## API Endpoints

### Authors
- `GET /api/authors` - List all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books
- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Architecture

### Layered Architecture

1. **Routes Layer**: HTTP request handling and response formatting
2. **Service Layer**: Business logic and validation
3. **Repository Layer**: Database operations via Prisma

### Error Handling

- Custom error classes (`AppError`, `NotFoundError`, `ValidationError`)
- Global error handler in main application
- Proper HTTP status codes (400, 404, 500)

### Validation

- Request validation using Zod schemas
- Type-safe input/output contracts
- Inline error messages

## Development

```bash
npm run dev        # Start with hot reload
npm run build      # Compile TypeScript
npm run start      # Run production build
npm run migrate    # Run database migrations
npm run seed       # Seed database
```
