// src/App.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import useAppHooks from "./Hooks/AppHooks";

// Pages & Components
import Hero from "./Pages/HeroPage.jsx";
import SignInPage from "./Pages/SignInPage.jsx";
import SignUpPage from "./Pages/SignUpPage.jsx";
import HomePage from "./Pages/HomePage.jsx";
import ProductsPage from "./Pages/ProductsPage.jsx";

// ✅ Protected route wrapper
function ProtectedRoute({ children }) {
  const username = localStorage.getItem("username");
  return username ? children : <Navigate to="/signin" replace />;
}

function App() {
  useAppHooks();
  return (
    <Routes>
      {/* Landing page */}
      <Route path="/" element={<Hero />} />

      {/* Auth pages */}
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />

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
            <ProductsPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect unknown routes */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
