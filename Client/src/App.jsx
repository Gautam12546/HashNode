import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ProtectedRoute from './components/layout/ProtectedRoute';

import Feed from './pages/Feed';
import PostDetail from './pages/PostDetail';
import TagPage from './pages/TagPage';
import TagsPage from './pages/TagsPage';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PostEditor from './pages/PostEditor';
import Profile from './pages/Profile';
import ProfileSettings from './pages/ProfileSettings';
import NotFound from './pages/NotFound';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/post/:slug" element={<PostDetail />} />
              <Route path="/tag/:slug" element={<TagPage />} />
              <Route path="/tags" element={<TagsPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editor/new"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/editor/:id"
                element={
                  <ProtectedRoute>
                    <PostEditor />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <ProfileSettings />
                  </ProtectedRoute>
                }
              />

              {/* Catch‑all 404 route – must be last */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
          <Toaster position="top-right" richColors />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;