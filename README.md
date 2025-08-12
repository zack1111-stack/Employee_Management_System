Employee Management System
Ask DeepWiki

This is a full-stack Employee Management System built with a React frontend and a Node.js/Express backend. The application provides separate portals for administrators and employees, allowing for efficient management of employee data, categories, and user profiles.

Features
Admin Portal
Secure Login: Admins can log in through a dedicated portal.
Dashboard: An overview dashboard displaying key metrics like the total number of admins, employees, and the combined salary of all employees.
Employee Management: Full CRUD (Create, Read, Update, Delete) functionality for employee records.
Category Management: Admins can add and view employee categories (e.g., IT, HR, Marketing).
Profile Management: Admins can view and update their profile information.
Admin List: View a list of all registered administrators.
Employee Portal
Secure Login: Employees have their own login page.
View Details: After logging in, employees can view their personal details, including name, email, salary, and profile image.
Logout: Securely end the session.
Technology Stack
Frontend:

React.js (v19)
Vite
React Router
Axios
Bootstrap & Bootstrap Icons
Backend:

Node.js
Express.js
MySQL
JSON Web Tokens (JWT) for authentication
bcrypt for password hashing
Multer for handling file uploads
CORS
Project Structure
The repository is organized into two main directories:

EmployeeMS/: Contains the React frontend application.
Server/: Contains the Node.js/Express backend server and API routes.
Setup and Installation
Follow these steps to get the project running on your local machine.

Prerequisites
Node.js and npm
A running MySQL server instance
1. Database Setup
Connect to your MySQL server and create a new database named employeems.
CREATE DATABASE employeems;
Use the employeems database.
USE employeems;
Create the necessary tables. You will need admin, category, employee, and profile tables. Refer to the models implied in the Server/Routes/ directory to create the schema.
2. Backend Setup
Navigate to the backend directory:
cd Server
Install the required npm packages:
npm install
Update the database connection details in Server/utils/db.js if they are different from the default (host: "localhost", user: "root", password: "").
Seed the database with initial admin users. The addAdmin.js script will add two default admins (admin@example.com and admin2@example.com).
node addAdmin.js
Start the backend server:
npm start
The server will be running on http://localhost:3000.
3. Frontend Setup
Open a new terminal and navigate to the frontend directory:
cd EmployeeMS
Install the required npm packages:
npm install
Start the frontend development server:
npm run dev
The application will be accessible at http://localhost:5173 (or another port if 5173 is in use).
How to Use
Open your web browser and navigate to http://localhost:5173.
You will see a start page asking you to log in as either an "Employee" or an "Admin".
For Admin:
Click the "Admin" button.
Use the credentials created by the addAdmin.js script (e.g., Email: admin@example.com, Password: 12345).
You will be redirected to the admin dashboard, where you can manage employees and categories.
For Employee:
First, create an employee using the admin dashboard.
Click the "Employee" button on the start page.
Log in with the credentials you just created.
You will be redirected to your employee detail page.
