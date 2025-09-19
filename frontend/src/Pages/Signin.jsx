// src/Pages/Signin.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Confetti from "react-confetti";
import AnimatedMascot from "../Components/AnimatedMascot";
import API from "../api"; // Axios instance

// Gradient background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Page container
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #ee0979);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 8s ease infinite;
  padding: 20px;
`;

// Glass card container
const Card = styled(motion.div)`
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(15px);
  padding: 50px 35px;
  border-radius: 25px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  align-items: center;
  box-shadow: 0 8px 30px rgba(0,0,0,0.2);
`;

// Input field
const Input = styled.input`
  width: 100%;
  padding: 16px 22px;
  margin-bottom: 18px;
  border-radius: 25px;
  border: none;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  ::placeholder {
    color: rgba(255, 255, 255, 0.7);
  }
  &:focus {
    background: rgba(255, 255, 255, 0.35);
  }
`;

// Button
const Button = styled(motion.button)`
  width: 100%;
  padding: 16px 0;
  border-radius: 25px;
  border: none;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, #ff6a00, #ee0979);
  box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
  }
`;

// Link wrapper
const LinkWrapper = styled.div`
  margin-top: 18px;
  font-size: 14px;
  text-align: center;
  a {
    color: white;
    text-decoration: underline;
    opacity: 0.9;
    &:hover {
      opacity: 1;
    }
  }
`;

// Error text
const ErrorText = styled.p`
  color: #ffcccc;
  margin-bottom: 10px;
`;

export default function Signin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [celebrate, setCelebrate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignin = async () => {
    if (!email || !password) {
      setError("All fields are required!");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const res = await API.post("/users/signin", { email, password });

      // Save token and username
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);

      // Celebration animation
      setCelebrate(true);
      setTimeout(() => {
        setCelebrate(false);
        navigate("/home");
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.error || "Invalid credentials. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      {celebrate && <Confetti numberOfPieces={250} recycle={false} />}
      <Card
        initial={{ opacity: 0, y: -60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <AnimatedMascot focusedField={focusedField} />

        {error && <ErrorText>{error}</ErrorText>}

        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField("")}
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onFocus={() => setFocusedField("password")}
          onBlur={() => setFocusedField("")}
        />

        <Button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSignin}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Sign In"}
        </Button>

        <LinkWrapper>
          <Link to="/signup">Don't have an account? Sign up</Link>
        </LinkWrapper>
      </Card>
    </Container>
  );
}
