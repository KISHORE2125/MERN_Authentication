// src/Pages/HomePage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import AnimatedMascot from "../Components/AnimatedMascot";
import bgAnimation from "../assets/Animation/Background looping animation.json";

const floatCard = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`;

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
`;

const GlassCard = styled(motion.div)`
  position: relative;
  z-index: 10;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 25px;
  padding: 60px 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.12);
  animation: ${floatCard} 6s ease-in-out infinite;
  backdrop-filter: blur(14px);
`;

const Title = styled(motion.h1)`
  font-size: 3rem;
  margin: 15px 0;
  text-align: center;
  font-weight: 700;
  background: linear-gradient(135deg, #f8f1e4, #c7b198);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 15px rgba(0,0,0,0.25);
`;

const ProductButton = styled(motion.button)`
  padding: 12px 30px;
  border-radius: 30px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, rgba(106,17,203,0.6), rgba(255,106,0,0.6));
  backdrop-filter: blur(6px);
  box-shadow: 0 8px 25px rgba(0,0,0,0.45);
  margin-top: 20px;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 40px rgba(0,0,0,0.55);
    filter: brightness(1.15);
  }
`;

const LogoutButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(6px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  font-size: 1rem;
  box-shadow: 0 8px 25px rgba(0,0,0,0.45);
`;

const MascotWrapper = styled.div`
  position: absolute;
  right: 8%;
  bottom: 8%;
  width: 160px;
  height: 160px;
  z-index: 9;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.5));
`;

export default function HomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Friend");

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (!savedUser) return navigate("/signin", { replace: true });

    setUsername(savedUser); // ✅ Use localStorage directly
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  return (
    <Container>
      <BackgroundWrapper>
        <Lottie animationData={bgAnimation} loop={true} />
      </BackgroundWrapper>

      <LogoutButton onClick={handleLogout}>⏻</LogoutButton>

      <GlassCard
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Title>Welcome, {username}!</Title>
        <ProductButton onClick={() => navigate("/products")}>
          Go to Products
        </ProductButton>
      </GlassCard>

      <MascotWrapper>
        <AnimatedMascot focusedField="" />
      </MascotWrapper>
    </Container>
  );
}
