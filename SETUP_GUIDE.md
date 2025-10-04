# Quick Setup Guide

## Prerequisites
- Node.js 18+ and npm
- Docker and Docker Compose
- Git

## Complete Setup (5 minutes)

### 1. Start Database
```bash
# From project root
docker-compose up -d

# Verify database is running
docker ps
```

### 2. Setup Backend
```bash
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run migrate

# Seed sample data
npm run seed

# Start backend server
npm run dev
```

Backend will be running at `http://localhost:3000`

### 3. Setup Frontend (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Start frontend
npm run dev
```

Frontend will be running at `http://localhost:5173`

## Verify Setup

1. Open browser to `http://localhost:5173`
2. You should see the homepage
3. Click "View Authors" - should show 3 seeded authors
4. Click "View Books" - should show 6 seeded books

## Troubleshooting

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker ps

# Restart database
docker-compose restart

# Check logs
docker-compose logs postgres
```

### Backend Won't Start
```bash
# Ensure database is ready
docker-compose ps

# Check .env file exists
ls backend/.env

# Regenerate Prisma client
cd backend
npm run prisma:generate
```

### Frontend Can't Connect to API
```bash
# Check backend is running on port 3000
curl http://localhost:3000/health

# Verify .env file
cat frontend/.env
# Should contain: VITE_API_URL=http://localhost:3000
```

### Port Already in Use
```bash
# Backend (port 3000)
# Change PORT in backend/.env

# Frontend (port 5173)
# Vite will auto-select next available port

# Database (port 5432)
# Change port mapping in docker-compose.yml
```

## Clean Start

To completely reset and start fresh:

```bash
# Stop and remove database
docker-compose down -v

# Start database
docker-compose up -d

# Backend - reset
cd backend
rm -rf node_modules dist
npm install
npm run prisma:generate
npm run migrate
npm run seed

# Frontend - reset
cd ../frontend
rm -rf node_modules dist
npm install
```

## Production Build

### Backend
```bash
cd backend
npm run build
npm run start
```

### Frontend
```bash
cd frontend
npm run build
npm run preview
```

## Next Steps

1. Explore the API at `http://localhost:3000/api`
2. Try creating, editing, and deleting authors and books
3. Review the code structure in both backend and frontend
4. Customize the application for your needs

## Useful Commands

```bash
# View database with Prisma Studio
cd backend
npm run prisma:studio

# Reset database
cd backend
npx prisma migrate reset
npm run seed

# View logs
docker-compose logs -f postgres

# Stop everything
docker-compose down
# Kill backend: Ctrl+C in backend terminal
# Kill frontend: Ctrl+C in frontend terminal
```
