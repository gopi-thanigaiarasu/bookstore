# Bookstore Frontend

Modern React application for managing books and authors.

## Tech Stack

- **Framework**: React 18
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: TailwindCSS
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Notifications**: React Hot Toast
- **Icons**: Lucide React

## Project Structure

```
frontend/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Layout.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── EmptyState.tsx
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   └── TextArea.tsx
│   ├── config/
│   │   └── api.ts         # Axios configuration
│   ├── pages/
│   │   ├── authors/       # Author-related pages
│   │   │   ├── AuthorList.tsx
│   │   │   ├── AuthorDetail.tsx
│   │   │   └── AuthorForm.tsx
│   │   ├── books/         # Book-related pages
│   │   │   ├── BookList.tsx
│   │   │   ├── BookDetail.tsx
│   │   │   └── BookForm.tsx
│   │   └── Home.tsx
│   ├── services/          # API service layer
│   │   ├── author.service.ts
│   │   └── book.service.ts
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.ts
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

3. Start development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Features

### Authors Management
- ✅ View list of all authors
- ✅ View author details with their books
- ✅ Create new authors
- ✅ Edit existing authors
- ✅ Delete authors (cascades to books)

### Books Management
- ✅ View book collection in card layout
- ✅ View detailed book information
- ✅ Create new books
- ✅ Edit existing books
- ✅ Delete books

### UX Features
- ✅ Loading states during API calls
- ✅ Empty states with helpful CTAs
- ✅ Toast notifications for success/error
- ✅ Form validation with inline errors
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Modern, clean UI with TailwindCSS

## Development

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

## Components

### UI Components
- **Layout**: Navigation and page wrapper
- **Button**: Styled button with loading state
- **Input**: Form input with label and error display
- **TextArea**: Multi-line input with validation
- **LoadingSpinner**: Loading indicator
- **EmptyState**: Empty state with icon and CTA

### Pages
All pages follow consistent patterns:
- List pages with create action
- Detail pages with edit/delete actions
- Form pages with validation
- Proper error handling and loading states

## Configuration

### Environment Variables
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000)

### API Integration
All API calls are centralized in service files (`author.service.ts`, `book.service.ts`) for easy maintenance and testing.
