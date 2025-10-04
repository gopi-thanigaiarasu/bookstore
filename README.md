# Full-Stack Bookstore Application

A modern full-stack application with Node.js/Fastify backend, React/Vite frontend, and PostgreSQL database.

## Tech Stack

### Backend
- **Runtime**: Node.js + TypeScript
- **Framework**: Fastify
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod

### Frontend
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast

## Project Structure

```
/
├── backend/          # Fastify API server
├── frontend/         # React application
├── docker-compose.yml
└── README.md
```

## Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## Setup Instructions

### 1. Start the Database

```bash
docker-compose up -d
```

This will start a PostgreSQL database with:
- **Database**: `bookstore`
- **User**: `dbuser`
- **Password**: `dbpassword`
- **Port**: `5432`

### 2. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

Backend will run on `http://localhost:3000`

### 3. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Frontend will run on `http://localhost:5173`

## Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://dbuser:dbpassword@localhost:5432/bookstore"
PORT=3000
HOST=0.0.0.0
NODE_ENV=development
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:3000
```

## Available Scripts

### Backend

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Compile TypeScript to JavaScript
- **`npm run start`** - Run production build
- **`npm run migrate`** - Run database migrations
- **`npm run seed`** - Seed database with sample data
- **`npm run test`** - Run tests
- **`npm run prisma:studio`** - Open Prisma Studio (database GUI)

### Frontend

- **`npm run dev`** - Start development server
- **`npm run build`** - Build for production
- **`npm run preview`** - Preview production build
- **`npm run test`** - Run tests

## API Endpoints

### Authors

- `GET /api/authors` - List all authors
- `GET /api/authors/:id` - Get author by ID
- `POST /api/authors` - Create new author
- `PUT /api/authors/:id` - Update author
- `DELETE /api/authors/:id` - Delete author

### Books

- `GET /api/books` - List all books
- `GET /api/books/:id` - Get book by ID
- `POST /api/books` - Create new book
- `PUT /api/books/:id` - Update book
- `DELETE /api/books/:id` - Delete book

## Data Models

### Author
```typescript
{
  id: number
  name: string
  bio: string
  createdAt: Date
  updatedAt: Date
}
```

### Book
```typescript
{
  id: number
  title: string
  authorId: number
  description: string
  publishedYear: number
  createdAt: Date
  updatedAt: Date
}
```

## Features

### Backend
- ✅ RESTful API with Fastify
- ✅ Request validation with Zod
- ✅ Error handling (400, 404, 500)
- ✅ Modular architecture (routes, services, repositories)
- ✅ Type-safe database access with Prisma
- ✅ Database migrations and seeding

### Frontend
- ✅ CRUD operations for Authors and Books
- ✅ Loading states
- ✅ Empty states
- ✅ Error handling with toast notifications
- ✅ Form validation with inline errors
- ✅ Responsive design with TailwindCSS
- ✅ Modern UI components

## Development Workflow

1. Make sure Docker is running and database is up
2. Run backend in one terminal: `cd backend && npm run dev`
3. Run frontend in another terminal: `cd frontend && npm run dev`
4. Access the app at `http://localhost:5173`

## Troubleshooting

### Database Connection Issues
- Ensure Docker is running: `docker ps`
- Check database logs: `docker-compose logs postgres`
- Verify connection string in `backend/.env`

### Port Already in Use
- Backend (3000): Change `PORT` in `backend/.env`
- Frontend (5173): Vite will automatically try the next available port
- Database (5432): Change port mapping in `docker-compose.yml`

### Migration Issues
```bash
cd backend
npx prisma migrate reset  # Reset database and rerun migrations
npm run seed              # Reseed data
```

## License

MIT
