# HashNode - Developer-First Blogging Platform

HashNode is a full-stack developer-focused blogging platform built for developers to write, format, publish, and share technical content using Markdown.

The platform provides JWT-based authentication, complete post CRUD operations, tag management, a public feed, user profiles, image uploads through Cloudinary, Markdown rendering with syntax highlighting, notifications, dark mode, and a responsive UI built with Tailwind CSS v4.

This project was built as a **solo capstone project** using the **MERN stack (MongoDB, Express.js, React.js, Node.js)** and follows the requirements defined in the Full Stack Development program PRD.

---

## ✨ Features

### 🔐 User Authentication

- User registration and login
- JWT-based authentication
- Protected routes
- Password hashing using bcrypt
- Persistent authentication sessions
- Authentication context for managing user state

### 📝 Post Management

- Create, read, update, and delete posts
- Markdown-based content editor
- Markdown preview
- Syntax highlighting for code blocks
- Draft and published post status
- Automatic post slug generation
- Cover image support
- Tags associated with posts
- Automatically generated post excerpts
- Author information
- Published posts displayed in the public feed

### 🏷️ Tags System

- Create and reuse existing tags
- Unique tag slugs
- Tag-based post filtering
- Dedicated tag pages
- Display post counts for each tag
- Associate multiple tags with posts

### 📰 Public Feed

- View all published posts
- Newest posts displayed first
- Search posts by title
- Pagination support
- Post cards with title, excerpt, author, tags, and cover image

### 👤 User Profiles

- Public user profiles
- Display published posts
- User dashboard
- Edit profile information
- Update name and bio
- Upload profile avatar

### 🖼️ Image Upload

- Multipart/form-data image uploads
- Cloudinary integration
- Cover image uploads
- Profile avatar uploads
- Multer memory storage
- Maximum upload size of 5 MB

### 🔔 Notifications

- Success notifications
- Error notifications
- User-friendly feedback messages
- Powered by `sonner`

### 🌙 Dark Mode

- Dark mode support
- Persistent theme preference
- Theme preference stored using `localStorage`

### 📱 Responsive Design

- Mobile-first UI
- Responsive layouts
- Responsive navigation
- Desktop, tablet, and mobile support

### ❌ Error Handling

- Custom 404 page
- API error handling
- Loading states
- User-friendly error messages
- Centralized backend error middleware

---

## 🛠️ Tech Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS v4, React Router v6, Axios, React Markdown, React Syntax Highlighter, Sonner |
| **Backend** | Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Cloudinary, Multer |
| **Database** | MongoDB Atlas / Local MongoDB |
| **Authentication** | JSON Web Tokens (JWT), bcryptjs |
| **Image Storage** | Cloudinary |
| **Development Tools** | Nodemon, ESLint |
| **Version Control** | Git, GitHub |

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
