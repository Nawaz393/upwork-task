# 📚 Backend API

This is the backend API for a full-stack project built with **Node.js**, **Express.js**, and **Prisma ORM**, using **PostgreSQL** as the database.

---

## 🚀 Features

✅ User Authentication (JWT)  
✅ CRUD Operations for Books  
✅ Prisma ORM for Database Management  
✅ PostgreSQL as Database  
✅ Swagger API Documentation  

---


---

## ⚙️ Setup & Installation

### 1️⃣ Clone the Repository

```git clone https://github.com/your-username/your-repo.git
cd your-repo/backend
npm install

PORT=5000
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
JWT_SECRET="your_jwt_secret"

npx prisma migrate dev --name init
npx prisma db seed
```

## DOCS
`http://localhost:5000/api-docs`




