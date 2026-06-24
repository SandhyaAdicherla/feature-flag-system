# 🚀 Multi-Tenant Feature Flag Management System

A full-stack SaaS-style Feature Flag Management System built using Node.js, Express, MongoDB, and React.

This project demonstrates multi-tenant architecture, role-based access control, JWT authentication, and a real-world feature flag system design.

---

# 📌 Overview

This system allows multiple organizations to manage feature flags independently.

System has three roles:

- Super Admin → Creates and manages organizations
- Organization Admin → Manages feature flags for their organization
- End User → Checks whether a feature is enabled for their organization

---

# 🏗 Architecture

backend/ → Node.js + Express API  
super-admin-frontend/ → Super Admin UI  
admin-frontend/ → Organization Admin UI  
user-frontend/ → End User UI  

---

# ⚙️ Tech Stack

Frontend:
- React.js
- Axios
- React Router

Backend:
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs

---

# 🔐 Authentication & Security

- JWT based authentication
- Axios interceptor for automatic token handling
- Middleware based route protection
- Role-based access control
- Multi-tenant isolation using organizationId

---

# 📂 Project Structure

backend/
models/
routes/
middleware/
db.js
server.js

super-admin-frontend/
admin-frontend/
user-frontend/

---

# 🚀 Features

Super Admin:
- Login using predefined static credentials (configured in backend for demo purposes)
- Create organizations
- View organizations

Organization Admin:
- Signup and Login
- Create feature flags
- Enable and disable feature flags

End User:
- Select organization
- Enter feature key
- Check feature status

---

# 📡 API Endpoints

Auth:
POST /api/auth/signup  
POST /api/auth/login  

Super Admin:
POST /api/super-admin/login  

Organizations:
GET /api/organizations  
POST /api/organizations  
PUT /api/organizations/:id  
DELETE /api/organizations/:id  

Features:
POST /api/features  
GET /api/features/:organizationId  
PUT /api/features/:id  
DELETE /api/features/:id  
POST /api/features/check  

---

# 🔄 System Flow

1. Super Admin creates organizations
2. Organization Admin signs up and logs in
3. Organization Admin creates feature flags
4. End user selects organization and checks feature
5. Backend enforces organization level isolation

---

# 🔐 Key Concepts

- Multi-tenant SaaS architecture
- JWT authentication system
- Role based access control
- Express middleware security
- Axios interceptor for API calls
- Clean separation of frontend and backend

---

# 🚀 How to Run

Backend:
cd backend  
npm install  
npm start  

Super Admin Frontend:
cd super-admin-frontend  
npm install  
npm start  

Admin Frontend:
cd admin-frontend  
npm install  
npm start  

User Frontend:
cd user-frontend  
npm install  
npm start  

---

# 📌 Environment Variables

PORT=5000  
MONGO_URI=your_mongodb_connection  
JWT_SECRET=your_secret_key  

---

# ✨ Highlights

- Multi-tenant architecture
- Secure authentication system
- Scalable SaaS design
- Real-world feature flag system
- Clean and modular code structure

---

# 👨‍💻 Author

Full-stack project built to demonstrate SaaS architecture, backend design, and frontend integration.