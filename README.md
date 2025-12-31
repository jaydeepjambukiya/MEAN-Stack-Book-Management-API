# 📚 MERN Book Management Application

A full-stack **MERN (MongoDB, Express, React, Node.js)** Book Management Application.
This project includes a RESTful backend API and a modern frontend built using **React + Vite**.

---

## 🌍 Live URLs
👉https://mean-stack-book-management.onrender.com/

---

## 🛠️ Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- dotenv
- CORS

### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Lucide React Icons

---

## 📂 Project Structure

MERN-BOOK-API/
│
├── Backend/
│ ├── Controllers/
│ │ └── BookController.js
│ ├── models/
│ │ └── BookModel.js
│ ├── Router/
│ │ └── BookRoutes.js
│ ├── .env
│ ├── Server.js
│ └── package.json
│
├── Frontend/
│ └── vite-project/
│ ├── public/
│ ├── src/
│ │ ├── assets/
│ │ ├── Component/
│ │ │ ├── BookCard.jsx
│ │ │ ├── BookDetailModal.jsx
│ │ │ ├── BookFormModal.jsx
│ │ │ ├── Header.jsx
│ │ │ └── Footer.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json

---

## 📌 Book Schema (MongoDB)

```js
{  
id: String, 
name: String, 
description: String, 
price: Number, 
image: String, 
category: String, 
author: String, 
ratings: Number, 
publishDate: Date 
}

---

🔥 Backend API Endpoints
➕ Create Book

POST /api/books/add

📖 Get All Books

GET /api/books

📘 Get Book by ID

GET /api/books/:id

✏️ Update Book

PUT /api/books/:id

🗑️ Delete Book

DELETE /api/books/:id
