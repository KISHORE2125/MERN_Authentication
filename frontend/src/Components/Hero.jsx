// src/Components/Hero.jsx
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import AnimatedMascot from "./AnimatedMascot";
import API from "../api";

// Background gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Wrapper
const HeroWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 40px;
  background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #ee0979);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 8s ease infinite;
`;

// Text container
const TextWrapper = styled.div`
  max-width: 500px;
  color: white;
`;

// Title
const Title = styled(motion.h1)`
  font-size: 3rem;
  margin-bottom: 20px;
  text-shadow: 0 4px 12px rgba(0,0,0,0.3);
`;

// Subtitle
const Subtitle = styled(motion.p)`
  font-size: 1.3rem;
  margin-bottom: 30px;
  color: rgba(255,255,255,0.9);
`;

// Button group
const ButtonGroup = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
`;

// Hero Button
const HeroButton = styled(motion.button)`
  padding: 14px 28px;
  border-radius: 25px;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
  backdrop-filter: blur(8px);
  box-shadow: 0 6px 20px rgba(0,0,0,0.25);
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 30px rgba(0,0,0,0.35);
    background: linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.15));
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 6px 20px rgba(0,0,0,0.3);
  }
`;

export default function Hero() {
  const [heroData, setHeroData] = useState({
    title: "Welcome to Authentication",
    subtitle: "Sign in or sign up to get started with your personalized experience!",
  });

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await API.get("/hero"); // fetch dynamic hero content if available
        if (res.data) setHeroData(res.data);
      } catch (err) {
        console.log("Failed to fetch hero data, using default", err);
      }
    };
    fetchHero();
  }, []);

  return (
    <HeroWrapper>
      <TextWrapper>
        <Title
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {heroData.title}
        </Title>

        <Subtitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {heroData.subtitle}
        </Subtitle>

        <ButtonGroup>
          <HeroButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signin")}
          >
            Sign In
          </HeroButton>

          <HeroButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </HeroButton>
        </ButtonGroup>
      </TextWrapper>

      <AnimatedMascot focusedField="" />
    </HeroWrapper>
  );
}
