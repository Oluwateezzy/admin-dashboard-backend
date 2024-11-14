# Admin Dashboard - User and Role Management Backend

This project is the backend for an admin dashboard that includes user management and role management with assigned permissions. It is built with **NestJS**, **Prisma ORM**, and **MongoDB**. The application provides APIs for user CRUD operations and role assignment with role-based access control (RBAC).

## Table of Contents

- [Overview](#overview)
- [Installation](#installation)
- [Core Features](#core-features)
- [Technologies](#technologies)
- [API Endpoints](#api-endpoints)
- [Authorization](#authorization)

## Overview

This backend provides essential functionality for managing users and roles:

- **User Management**: Admin can perform CRUD operations on users (add, view, update, delete).
- **Role-Based Authorization**: Admin and User roles are restricted to different actions.
- **MongoDB**: The user and role data are stored in MongoDB using Prisma ORM for easy data manipulation.

## Installation

To set up the project, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/Oluwateezzy/admin-dashboard-backend.git
cd admin-dashboard-backend
```

2. Install dependencies:

```bash
npm install
```

3. Set up MongoDB and configure Prisma:
   - Ensure you have a MongoDB instance running locally or use a cloud service.
   - Update the `DATABASE_URL` in `.env` to point to your MongoDB connection string.

4. Run Prisma migrations to set up your database:

```bash
npx prisma db push
```

5. Start the development server:

```bash
npm run start:dev
```

The app will be available at `http://localhost:3000`.
The Swagger will be available at `http://localhost:3000/api`.



## Core Features

### User Management
- **Admin can**:
  - Add new users with unique username and email.
  - View a list of users with pagination.
  - Update user details, including role and status.
  - Delete users.

- **User Fields**:
  - `username` (unique)
  - `email` (unique)
  - `role` (Admin or User)
  - `status` (Active, Inactive)

### Role Management
- **Admin can**:
  - View a list of roles (Admin, User).
  - Assign roles to users.

- **Roles**:
  - `Admin`: Can perform all CRUD operations.
  - `User`: Can only view data (no modifications).

### Authorization
- Role-based access control (RBAC) using **NestJS Guards** to restrict access to API endpoints based on user roles.
  - Admin users can access all endpoints for creating, updating, and deleting users.
  - Users can only access the endpoint for viewing users.

## Technologies

- **NestJS**: A framework for building efficient and scalable Node.js applications.
- **Prisma ORM**: A modern database toolkit for TypeScript and Node.js to interact with MongoDB.
- **MongoDB**: NoSQL database for storing user and role data.
- **JWT**: JSON Web Token for user authentication.
- **Guards**: Role-based access control to secure endpoints in NestJS.

## API Endpoints

### User Management

- **GET api/users**: Retrieve a list of users with pagination.
- **POST api/users**: Add a new user.
- **GET api/users/:id**: Get details of a specific user.
- **PUT api/users/:id**: Update user details.
- **DELETE api/users/:id**: Delete a user.

## Authorization

### Role-Based Access Control (RBAC)

- **Admin** role can:
  - Access all user management endpoints.
  - Assign roles to users.
  
- **User** role can:
  - Only access the `GET /users` endpoint to view users, but cannot modify any user data.