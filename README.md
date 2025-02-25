# MERN Portfolio Backend API

This is a backend API built using **Express.js** for managing portfolios. Users can register, log in, and perform CRUD operations (Create, Read, Update, Delete) on their portfolios. Only authorized users can manage their portfolios using JWT token-based authentication.

## 🚀 Features

- User Registration
- User Login with JWT Authentication
- Create, Read, Update, Delete (CRUD) for Portfolios
- Secure Routes for Authorized Users Only

## 🛠️ Technologies Used

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT for Authentication
- bcrypt for Password Hashing

## 🔑 API Endpoints

### 🔐 User Authentication
- `POST /api/register` - Register a new user
- `POST /api/login` - Login user and receive JWT token

### 📁 Portfolio Management (Authorization Required)
- `POST /api/portfolio` - Create a new portfolio
- `GET /api/portfolio` - Get all portfolios of the logged-in user
- `PUT /api/portfolio/:id` - Update an existing portfolio
- `DELETE /api/portfolio/:id` - Delete a portfolio by ID

## 📦 Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/MdFawjulAzim/MERN-assignment-M20-B08.git
   cd MERN-assignment-M20-B08
