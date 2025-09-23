  import React, { useEffect, useState } from "react";
  import styled, { keyframes } from "styled-components";
  import { motion } from "framer-motion";

  // --- Animations ---
  const float = keyframes`
    0%,100% { transform: translateY(0px) rotate(0deg) scale(1); }
    25% { transform: translateY(-10px) rotate(-2deg) scale(1.03); }
    50% { transform: translateY(0px) rotate(2deg) scale(1); }
    75% { transform: translateY(-10px) rotate(-1deg) scale(1.03); }
  `;

  const pulse = keyframes`
    0% { box-shadow: 0 0 20px rgba(255,255,255,0.2), 0 0 50px rgba(255,150,255,0.1); }
    50% { box-shadow: 0 0 40px rgba(255,255,255,0.5), 0 0 80px rgba(255,150,255,0.25); }
    100% { box-shadow: 0 0 20px rgba(255,255,255,0.2), 0 0 50px rgba(255,150,255,0.1); }
  `;

  const halo = keyframes`
    0% { transform: translate(-50%, -50%) scale(1); opacity: 0.25; }
    50% { transform: translate(-50%, -50%) scale(1.2); opacity: 0.4; }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 0.25; }
  `;

  const particleFloat = keyframes`
    0% { transform: translate(0,0); opacity: 0.4; }
    50% { transform: translate(12px,-12px); opacity: 0.2; }
    100% { transform: translate(0,0); opacity: 0.4; }
  `;

  const sparkle = keyframes`
    0%, 100% { opacity: 0.2; transform: translateY(0) scale(1); }
    50% { opacity: 0.6; transform: translateY(-15px) scale(1.2); }
  `;

  // --- Styled Components ---
  const MascotWrapper = styled(motion.div)`
    position: relative;
    font-size: 6rem;
    display: inline-block;
    animation: ${float} 5s ease-in-out infinite;
    cursor: default;
    perspective: 1000px;

    &:before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12rem;
      height: 12rem;
      background: radial-gradient(circle, rgba(255,255,255,0.25), rgba(255,200,255,0) 80%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ${pulse} 3s ease-in-out infinite;
      z-index: -2;
    }

    &:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 14rem;
      height: 14rem;
      background: radial-gradient(circle, rgba(255,150,255,0.15), rgba(255,255,255,0) 90%);
      border-radius: 50%;
      transform: translate(-50%, -50%);
      animation: ${halo} 6s ease-in-out infinite;
      z-index: -3;
    }
  `;

  const Particle = styled.div`
    position: absolute;
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
    background: rgba(255,255,255,0.6);
    border-radius: 50%;
    top: ${(props) => props.$top}%;
    left: ${(props) => props.$left}%;
    animation: ${particleFloat} ${(props) => props.$duration}s ease-in-out infinite;
    filter: blur(${(props) => props.$blur}px);
    pointer-events: none;
    z-index: -1;
  `;

  const Spark = styled.div`
    position: absolute;
    width: ${(props) => props.$size}px;
    height: ${(props) => props.$size}px;
    background: rgba(255,255,255,0.8);
    border-radius: 50%;
    top: ${(props) => props.$top}%;
    left: ${(props) => props.$left}%;
    filter: blur(1.5px);
    animation: ${sparkle} ${(props) => props.$duration}s ease-in-out infinite;
    z-index: -1;
  `;

  export default function AnimatedMascot({ focusedField }) {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);

    // Track mouse for interactive tilt
    useEffect(() => {
      const handleMouseMove = (e) => {
        setMouseX((e.clientX - window.innerWidth / 2) / 20);
        setMouseY((e.clientY - window.innerHeight / 2) / 20);
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    let emoji = "🧑🏻‍💻";
    if (focusedField === "password") emoji = "🙈";
    else if (focusedField === "username") emoji = "🧑🏻‍💻";
    else if (focusedField === "email") emoji = "📧";

    // Floating particles
    const particles = Array.from({ length: 8 }, (_, i) => ({
      size: Math.random() * 10 + 3,
      top: Math.random() * 80 + 10,
      left: Math.random() * 80 + 10,
      duration: Math.random() * 5 + 4,
      blur: Math.random() * 3 + 0.5,
    }));

    // Sparkles
    const sparks = Array.from({ length: 4 }, (_, i) => ({
      size: Math.random() * 4 + 2,
      top: Math.random() * 90 + 5,
      left: Math.random() * 90 + 5,
      duration: Math.random() * 4 + 3,
    }));

    return (
      <MascotWrapper style={{ rotateX: mouseY, rotateY: -mouseX }}>
        {particles.map((p, i) => (
          <Particle key={i} $size={p.size} $top={p.top} $left={p.left} $duration={p.duration} $blur={p.blur} />
        ))}
        {sparks.map((s, i) => (
          <Spark key={i} $size={s.size} $top={s.top} $left={s.left} $duration={s.duration} />
        ))}
        {emoji}
      </MascotWrapper>
    );
  } 