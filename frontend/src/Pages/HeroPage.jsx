import React from "react";
import useHeroPage from "../Hooks/HeroPageHooks";
import styled, { keyframes, css } from "styled-components";
import { motion } from "framer-motion";
import AnimatedMascot from "../Components/AnimatedMascot";

// --- Animations ---
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;
const float = keyframes`
  0%,100% { transform: translateY(0px) scale(1); }
  50% { transform: translateY(-18px) scale(1.03); }
`;
const particleFloat = keyframes`
  0% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
  50% { transform: translateY(-15px) translateX(10px); opacity: 0.3; }
  100% { transform: translateY(0px) translateX(0px); opacity: 0.7; }
`;
const streakFloat = keyframes`
  0% { transform: translateY(0px); opacity: 0.15; }
  50% { transform: translateY(-40px); opacity: 0.05; }
  100% { transform: translateY(0px); opacity: 0.15; }
`;

// --- Styled Components ---
const HeroWrapper = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 60px;
  background: linear-gradient(135deg, #1e3c72, #2a5298, #ff6a00, #ff9a00);
  background-size: 500% 500%;
  animation: ${gradientAnimation} 80s ease infinite;
  overflow: hidden;
  perspective: 1600px;
  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(255,255,255,0.03), transparent 70%);
    pointer-events: none;
  }
`;
const TextWrapper = styled(motion.div)`
  max-width: 550px;
  color: white;
  z-index: 3;
  transform-style: preserve-3d;
`;
const Title = styled(motion.h1)`
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: 2px;
  line-height: 1.2;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #ffffff, #fff8e1, #ffe3b3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 18px 70px rgba(0,0,0,0.7);
`;
const Subtitle = styled(motion.p)`
  font-size: 1.5rem;
  margin-bottom: 50px;
  line-height: 1.6;
  color: rgba(255,255,255,0.95);
  text-shadow: 0 10px 40px rgba(0,0,0,0.5);
`;
const ButtonGroup = styled.div`
  display: flex;
  gap: 28px;
  flex-wrap: wrap;
`;
const HeroButton = styled(motion.button)`
  padding: 16px 48px;
  border-radius: 50px;
  border: none;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  background: linear-gradient(145deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
  backdrop-filter: blur(20px);
  box-shadow: 0 22px 90px rgba(0,0,0,0.65), inset 0 -2px 18px rgba(255,255,255,0.25);
  position: relative;
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), background 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, box-shadow, background;

  &:hover {
    transform: scale(1.18);
    box-shadow: 0 32px 130px rgba(0,0,0,0.85), inset 0 -2px 24px rgba(255,255,255,0.35);
    background: linear-gradient(145deg, rgba(255,255,255,0.55), rgba(255,255,255,0.25));
  }
  &:active { transform: scale(0.97); box-shadow: 0 18px 65px rgba(0,0,0,0.55); }
  &::after {
    content: "";
    position: absolute;
    top: -16px;
    left: -16px;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    border-radius: 50px;
    background: radial-gradient(circle, rgba(255,255,255,0.15), transparent);
    filter: blur(28px);
    opacity: 0;
    transition: opacity 0.4s cubic-bezier(0.22, 1, 0.36, 1);
    will-change: opacity;
  }
  &:hover::after { opacity: 1; }
`;
const MascotWrapper = styled(motion.div)`
  animation: ${float} 6s ease-in-out infinite;
  z-index: 2;
  filter: drop-shadow(0 14px 35px rgba(0,0,0,0.55));
`;
const Particle = styled.div.attrs(props => ({
  style: {
    width: `${props.$size}px`,
    height: `${props.$size}px`,
    top: `${props.$top}%`,
    left: `${props.$left}%`,
    filter: `blur(${props.$blur}px)`
  }
}))`
  position: absolute;
  background: rgba(255,255,255,0.6);
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(255,255,255,0.35);
  pointer-events: none;
  animation: ${(props) => css`${particleFloat} ${props.$duration}s ease-in-out infinite`};
`;
const Streak = styled.div.attrs(props => ({
  style: {
    width: `${props.$width}px`,
    top: `${props.$top}%`,
    left: `${props.$left}%`,
  }
}))`
  position: absolute;
  height: 2px;
  background: rgba(255,255,255,0.2);
  filter: blur(3.5px);
  pointer-events: none;
  animation: ${(props) => css`${streakFloat} ${props.$duration}s linear infinite`};
`;

export default function Hero() {
  const {
    heroData,
    fadeOut,
    yParallax,
    particles,
    streaks,
    handleRoute,
  } = useHeroPage();

  return (
    <HeroWrapper>
      {particles.map((p, i) => (
        <Particle key={i} $size={p.size} $top={p.top} $left={p.left} $duration={p.duration} $blur={p.blur} />
      ))}
      {streaks.map((s, i) => (
        <Streak key={i} $width={s.width} $top={s.top} $left={s.left} $duration={s.duration} />
      ))}

      <TextWrapper
        style={{ y: yParallax }}
        as={motion.div}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <Title initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.5, delay: 0.3 }}>
          {heroData.title}
        </Title>
        <Subtitle initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 1.5 }}>
          {heroData.subtitle}
        </Subtitle>

        <ButtonGroup>
          <HeroButton
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRoute("/signin")}
            disabled={fadeOut}
          >
            Sign In
          </HeroButton>
          <HeroButton
            whileHover={{ scale: 1.18 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleRoute("/signup")}
            disabled={fadeOut}
          >
            Sign Up
          </HeroButton>
        </ButtonGroup>
      </TextWrapper>

      <MascotWrapper
        style={{ y: yParallax }}
        as={motion.div}
        animate={{ opacity: fadeOut ? 0 : 1 }}
        transition={{ duration: 0.22, ease: "easeInOut" }}
      >
        <AnimatedMascot focusedField="" />
      </MascotWrapper>
    </HeroWrapper>
  );
}