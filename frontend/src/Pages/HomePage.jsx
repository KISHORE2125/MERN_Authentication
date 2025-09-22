// src/Pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import bgAnimation from "../assets/Animation/Background looping animation.json";

// --- Animations ---
const gradientText = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const glowPulse = keyframes`
  0%, 100% { box-shadow: 0 0 15px rgba(255,255,255,0.2); }
  50% { box-shadow: 0 0 35px rgba(255,255,255,0.35); }
`;

// --- Styled Components ---
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #111111;
  overflow: hidden;
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 0;
  filter: brightness(1.1);
`;

const GlassCard = styled(motion.div)`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 40px;
  padding: 80px 70px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 540px;
  width: 90%;
  box-shadow: 0 35px 120px rgba(0,0,0,0.6), 0 0 80px rgba(255,255,255,0.15);
  border: 1px solid rgba(255,255,255,0.18);
  backdrop-filter: blur(28px) saturate(200%);
  transform-style: preserve-3d;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), 
              box-shadow 0.4s ease, border 0.4s ease;

  &:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 50px 140px rgba(0,0,0,0.7),
                0 0 120px rgba(255,255,255,0.25),
                0 0 150px rgba(255,255,255,0.18);
    border: 1px solid rgba(255,255,255,0.3);
  }
`;

const Title = styled(motion.h1)`
  font-size: 3.6rem;
  margin: 15px 0;
  text-align: center;
  font-weight: 900;
  background: linear-gradient(270deg, #f8f1e4, #c7b198, #ffcc70, #ffeaa0);
  background-size: 400% 400%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${gradientText} 8s ease infinite;
  text-shadow: 0 6px 25px rgba(0,0,0,0.4);
`;

const ProductButton = styled(motion.button)`
  padding: 16px 40px;
  border-radius: 40px;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, rgba(106,17,203,0.85), rgba(255,106,0,0.85));
  backdrop-filter: blur(10px);
  box-shadow: 0 12px 40px rgba(0,0,0,0.6), 0 0 30px rgba(255,255,255,0.2);
  margin-top: 30px;
  transition: all 0.3s ease;
  animation: ${glowPulse} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 18px 55px rgba(0,0,0,0.75), 0 0 50px rgba(255,255,255,0.25);
    filter: brightness(1.25);
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 10px 35px rgba(0,0,0,0.55);
  }
`;

const LogoutButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 65px;
  height: 65px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 1.3rem;
  box-shadow: 0 15px 40px rgba(0,0,0,0.55);
  transition: all 0.3s ease;
  animation: ${glowPulse} 3s ease-in-out infinite;

  &:hover {
    transform: scale(1.15);
    box-shadow: 0 22px 60px rgba(0,0,0,0.75);
    filter: brightness(1.2);
  }
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Friend");

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (!savedUser) return navigate("/signin", { replace: true });
    setUsername(savedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    setTimeout(() => { window.location.reload(); }, 100);
  };

  return (
    <Container>
      <BackgroundWrapper>
        <Lottie animationData={bgAnimation} loop={true} />
      </BackgroundWrapper>

      <LogoutButton onClick={handleLogout}>⏻</LogoutButton>

      <GlassCard
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title>Welcome, {username}!</Title>
        <ProductButton onClick={() => navigate("/products")}>
          Go to Products
        </ProductButton>
      </GlassCard>
    </Container>
  );
}