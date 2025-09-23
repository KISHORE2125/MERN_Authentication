// src/App.jsx
import React, { useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

// Pages & Components
import Hero from "./Components/Hero";
import Signin from "./Pages/Signin";
import Signup from "./Pages/Signup";
import HomePage from "./Pages/HomePage";
import Products from "./Pages/Products";

// ✅ Protected route wrapper
function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  return username ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackspace = (e) => {
      // Only trigger if not focused on input, textarea, or contenteditable
      const tag = document.activeElement.tagName;
      const isEditable = document.activeElement.isContentEditable;
      if (
        e.key === "Backspace" &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA" &&
        !isEditable
      ) {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [navigate]);

  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Hero />} />

      {/* Auth pages */}
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* Protected pages */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <Products />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
