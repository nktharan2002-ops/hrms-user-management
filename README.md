# HRMS - Human Resource Management System

A full-stack Human Resource Management System for managing users, authentication, roles, and user profiles.

## Tech Stack

* Frontend: Next.js, React, TypeScript, Tailwind CSS
* Backend: NestJS, Node.js
* Database: MongoDB
* Authentication: JWT
* Deployment: Vercel + Render

## Features

* User registration
* User login and logout
* JWT authentication
* Role-based access control
* User dashboard
* View users
* Edit user profiles
* Delete users
* Responsive UI

## Project Structure

```text
hrms-user-management/
├── backend/
├── frontend/
├── postman/
└── README.md
```

## Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd hrms-user-management
```

### 2. Backend

```bash
cd backend
npm install
```

Create a `.env` file based on `.env.example` and add your MongoDB connection string and JWT secret.

Run the backend:

```bash
npm run start:dev
```

Backend runs on:

```text
http://localhost:3000
```

### 3. Frontend

Open another terminal:

```bash
cd frontend
npm install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

Run the frontend:

```bash
npm run dev
```

Frontend runs on:

```text
http://localhost:3001
```

## API Endpoints

* `POST /auth/register`
* `POST /auth/login`
* `POST /auth/logout`
* `GET /auth/me`
* `GET /users`
* `GET /users/:id`
* `PUT /users/:id`
* `DELETE /users/:id`

## Deployment

Frontend: Vercel

Backend: Render

Database: MongoDB Atlas

## Environment Variables

Never commit real secrets to GitHub.

Use the provided `.env.example` files as templates.
