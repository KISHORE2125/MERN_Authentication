import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Floating + subtle scale animation
const float = keyframes`
  0% { transform: translateY(0px) scale(1); }
  25% { transform: translateY(-6px) scale(1.02); }
  50% { transform: translateY(0px) scale(1); }
  75% { transform: translateY(-6px) scale(1.02); }
  100% { transform: translateY(0px) scale(1); }
`;

// Aura glow pulse
const pulse = keyframes`
  0% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
  50% { box-shadow: 0 0 35px rgba(255,255,255,0.5); }
  100% { box-shadow: 0 0 20px rgba(255,255,255,0.3); }
`;

const MascotWrapper = styled(motion.div)`
  position: relative;
  font-size: 6rem;
  display: inline-block;
  animation: ${float} 4s ease-in-out infinite;

  &:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 8rem;
    height: 8rem;
    background: radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${pulse} 2s ease-in-out infinite;
    z-index: -1;
  }
`;

export default function AnimatedMascot({ focusedField }) {
  let emoji = "🦊"; // default
  if (focusedField === "password") emoji = "🙈";
  else if (focusedField === "username") emoji = "👀";
  else if (focusedField === "email") emoji = "📧";

  return <MascotWrapper>{emoji}</MascotWrapper>;
}
