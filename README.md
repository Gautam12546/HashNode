# HashNode - Developer-First Blogging Platform

HashNode is a full-stack blogging platform built for developers to write, format, and share technical content using Markdown.

It features JWT authentication, post CRUD operations, tag management, a public feed, user profiles, image uploads via Cloudinary, and a modern responsive UI built with Tailwind CSS v4.

This project was built as a solo capstone using the MERN stack (MongoDB, Express, React, Node.js) and follows the PRD provided by the Full Stack Development program.

---

## ✨ Features

### 🔐 User Authentication
- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Persistent authentication sessions

### 📝 Post Management
- Create, read, update, and delete posts
- Markdown-based content editor
- Draft and published post status
- Automatic post slug generation
- Cover image support
- Tags associated with posts
- Automatically generated post excerpts

### 🏷️ Tags System
- Create and reuse existing tags
- Unique tag slugs
- Tag-based post filtering
- Tag pages
- Display post counts for each tag

### 📰 Public Feed
- View all published posts
- Newest posts displayed first
- Search posts by title
- Pagination support

### 👤 User Profiles
- Public user profiles
- Display published posts
- User dashboard
- Edit profile information
- Update name and bio
- Upload profile avatar

### 🖼️ Image Upload
- Upload images using multipart/form-data
- Cloudinary integration
- Cover image uploads
- Avatar uploads
- Multer memory storage
- Maximum upload size of 5 MB

### 🔔 Notifications
- Success and error toast notifications
- Powered by `sonner`

### 🌙 Dark Mode
- Dark mode support
- Persistent theme preference using `localStorage`

### 📱 Responsive Design
- Mobile-first UI
- Responsive layouts
- Responsive navigation
- Optimized for desktop, tablet, and mobile screens

### ❌ Error Handling
- Custom 404 page
- API error handling
- Loading states
- User-friendly error messages

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4, React Router v6, Axios, React Markdown, React Syntax Highlighter, Sonner |
| **Backend** | Node.js, Express, MongoDB, Mongoose, JWT, bcryptjs, Cloudinary, Multer |
| **Database** | MongoDB Atlas / Local MongoDB |
| **Development Tools** | Nodemon, ESLint |

---

## 📁 Project Structure

```text
HashNode/
│
├── server/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── server.js
│   │
│   ├── config/
│   │   ├── db.js
│   │   └── cloudinary.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   ├── Post.js
│   │   └── Tag.js
│   │
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── postController.js
│   │   ├── tagController.js
│   │   ├── userController.js
│   │   └── uploadController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── postRoutes.js
│   │   ├── tagRoutes.js
│   │   ├── userRoutes.js
│   │   └── uploadRoutes.js
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── errorMiddleware.js
│   │   └── upload.js
│   │
│   └── utils/
│       ├── generateToken.js
│       └── slugify.js
│
├── client/
│   ├── .env.example
│   ├── package.json
│   ├── package-lock.json
│   ├── index.html
│   ├── vite.config.js
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   │
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ProtectedRoute.jsx
│   │   │   │
│   │   │   ├── post/
│   │   │   │   ├── PostCard.jsx
│   │   │   │   ├── PostList.jsx
│   │   │   │   └── TagPill.jsx
│   │   │   │
│   │   │   ├── editor/
│   │   │   │   ├── MarkdownEditor.jsx
│   │   │   │   └── MarkdownPreview.jsx
│   │   │   │
│   │   │   └── common/
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorMessage.jsx
│   │   │       ├── AuthForm.jsx
│   │   │       └── ImageUploader.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Feed.jsx
│   │   │   ├── PostDetail.jsx
│   │   │   ├── TagPage.jsx
│   │   │   ├── TagsPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── PostEditor.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── ProfileSettings.jsx
│   │   │   └── NotFound.jsx
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.js
│   │   │   └── useImageUpload.js
│   │   │
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   │
│   └── public/
│       └── icons.svg
│
├── .gitignore
└── README.md
```
