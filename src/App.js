import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import AboutMePage from './components/AboutMePage';
import ProjectsPage from './components/ProjectsPage';
import BlogPage from './components/BlogPage';
import FutureScopePage from './components/FutureScopePage';
import ContactPage from './components/ContactPage';

import AdminLogin from './admin/AdminLogin';
import AdminDashboard from './admin/AdminDashboard';
import AddBlogPage from './admin/AddBlogPage';
import AddProjectPage from './admin/AddProjectPage';

import useAuth from './hooks/useAuth';

const App = () => {
  const isAuthenticated = useAuth();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-inter">
      <Routes>
        {/* 🌐 Public Website Routes */}
        <Route path="/" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <HomePage />
            </main>
            <Footer />
          </>
        } />

        <Route path="/about" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <AboutMePage />
            </main>
            <Footer />
          </>
        } />

        <Route path="/projects" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <ProjectsPage />
            </main>
            <Footer />
          </>
        } />

        {/* ✅ Corrected Blog Route */}
        <Route path="/blog" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <BlogPage />
            </main>
            <Footer />
          </>
        } />

        {/* ✅ Optional: Future Dynamic Blog Route */}
        {/* <Route path="/blog/:slug" element={<SingleBlogPost />} /> */}

        <Route path="/future-scope" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <FutureScopePage />
            </main>
            <Footer />
          </>
        } />

        <Route path="/contact" element={
          <>
            <NavBar />
            <main className="container mx-auto p-4 md:p-8">
              <ContactPage />
            </main>
            <Footer />
          </>
        } />

        {/* 🔐 Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* 🔐 Protected Admin Routes */}
        {isAuthenticated && (
          <>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/add-blog" element={<AddBlogPage />} />
            <Route path="/admin/add-project" element={<AddProjectPage />} />
          </>
        )}
      </Routes>
    </div>
  );
};

export default App;
