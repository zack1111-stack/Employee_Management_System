# Employee Management System


This is a full-stack Employee Management System built with a React frontend and a Node.js/Express backend. The application provides separate portals for administrators and employees, allowing for efficient management of employee data, categories, and user profiles.

## Features

### Admin Portal
- **Secure Login:** Admins can log in through a dedicated portal.
- **Dashboard:** An overview dashboard displaying key metrics like the total number of admins, employees, and the combined salary of all employees.
- **Employee Management:** Full CRUD (Create, Read, Update, Delete) functionality for employee records.
- **Category Management:** Admins can add and view employee categories (e.g., IT, HR, Marketing).
- **Profile Management:** Admins can view and update their profile information.
- **Admin List:** View a list of all registered administrators.

### Employee Portal
- **Secure Login:** Employees have their own login page.
- **View Details:** After logging in, employees can view their personal details, including name, email, salary, and profile image.
- **Logout:** Securely end the session.

## Technology Stack

- **Frontend:**
  - React.js (v19)
  - Vite
  - React Router
  - Axios
  - Bootstrap & Bootstrap Icons

- **Backend:**
  - Node.js
  - Express.js
  - MySQL
  - JSON Web Tokens (JWT) for authentication
  - bcrypt for password hashing
  - Multer for handling file uploads
  - CORS

## Project Structure

The repository is organized into two main directories:

-   `EmployeeMS/`: Contains the React frontend application.
-   `Server/`: Contains the Node.js/Express backend server and API routes.

## Setup and Installation

Follow these steps to get the project running on your local machine.

### Prerequisites

-   Node.js and npm
-   A running MySQL server instance

### 1. Database Setup

1.  Connect to your MySQL server and create a new database named `employeems`.
    ```sql
    CREATE DATABASE employeems;
    ```
2.  Use the `employeems` database.
    ```sql
    USE employeems;
    ```
3.  Create the necessary tables. You will need `admin`, `category`, `employee`, and `profile` tables. Refer to the models implied in the `Server/Routes/` directory to create the schema.

### 2. Backend Setup

1.  Navigate to the backend directory:
    ```sh
    cd Server
    ```
2.  Install the required npm packages:
    ```sh
    npm install
    ```
3.  Update the database connection details in `Server/utils/db.js` if they are different from the default (host: "localhost", user: "root", password: "").
4.  Seed the database with initial admin users. The `addAdmin.js` script will add two default admins (`admin@example.com` and `admin2@example.com`).
    ```sh
    node addAdmin.js
    ```
5.  Start the backend server:
    ```sh
    npm start
    ```
    The server will be running on `http://localhost:3000`.

### 3. Frontend Setup

1.  Open a new terminal and navigate to the frontend directory:
    ```sh
    cd EmployeeMS
    ```
2.  Install the required npm packages:
    ```sh
    npm install
    ```
3.  Start the frontend development server:
    ```sh
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).

## How to Use

1.  Open your web browser and navigate to `http://localhost:5173`.
2.  You will see a start page asking you to log in as either an "Employee" or an "Admin".
3.  **For Admin:**
    -   Click the "Admin" button.
    -   Use the credentials created by the `addAdmin.js` script (e.g., Email: `admin@example.com`, Password: `12345`).
    -   You will be redirected to the admin dashboard, where you can manage employees and categories.
4.  **For Employee:**
    -   First, create an employee using the admin dashboard.
    -   Click the "Employee" button on the start page.
    -   Log in with the credentials you just created.
    -   You will be redirected to your employee detail page.
