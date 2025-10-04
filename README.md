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
