// src/Pages/Signin.jsx
import React, { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import Confetti from "react-confetti";
import API from "../api";

// --- Mascot Animations ---
const float = keyframes`
  0%,100% { transform: translateY(0px) rotate(0deg) scale(1); }
  25% { transform: translateY(-6px) rotate(-2deg) scale(1.06); }
  50% { transform: translateY(0px) rotate(2deg) scale(1); }
  75% { transform: translateY(-6px) rotate(-2deg) scale(1.06); }
`;

const halo = keyframes`
  0% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
  50% { transform: translate(-50%, -50%) scale(1.6); opacity: 0.35; }
  100% { transform: translate(-50%, -50%) scale(1); opacity: 0.15; }
`;

const sparkle = keyframes`
  0%,100% { transform: scale(1); opacity: 0.2; }
  50% { transform: scale(1.8); opacity: 0.7; }
`;

const MascotWrapper = styled(motion.div)`
  font-size: 6.2rem;
  position: relative;
  display: inline-block;
  animation: ${float} 3.5s ease-in-out infinite;
  cursor: default;

  &:after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 14rem;
    height: 14rem;
    background: radial-gradient(circle, rgba(255,255,255,0.2), rgba(255,255,255,0) 90%);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    animation: ${halo} 4.5s ease-in-out infinite;
    z-index: -1;
  }
`;

const Spark = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255,255,255,0.95);
  border-radius: 50%;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${sparkle} ${(props) => props.duration}s ease-in-out infinite;
  z-index: -1;
`;

function PremiumMascot({ focusedField }) {
  let emoji = "🧑🏻‍💻";
  if (focusedField === "password") emoji = "🙈";
  else if (focusedField === "email") emoji = "📧";

  const sparks = useMemo(() => {
    return Array.from({ length: 8 }, () => ({
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 2.5 + 1.5,
    }));
  }, []);

  return (
    <MascotWrapper
      key={focusedField}
      initial={{ scale: 0.85, y: -15, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 20 }}
    >
      {emoji}
      {sparks.map((s, i) => <Spark key={i} {...s} />)}
    </MascotWrapper>
  );
}

// --- Page Animations ---
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const particleFloat = keyframes`
  0% { transform: translate(0,0); opacity: 0.25; }
  50% { transform: translate(14px,-14px); opacity: 0.1; }
  100% { transform: translate(0,0); opacity: 0.25; }
`;

// --- Styled Components ---
const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(-45deg, #6a11cb, #2575fc, #ff6a00, #ee0979);
  background-size: 800% 800%;
  animation: ${gradientAnimation} 20s ease infinite;
  overflow: hidden;
  padding: 20px;
`;

const Particle = styled.div`
  position: absolute;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background: rgba(255,255,255,0.2);
  border-radius: 50%;
  top: ${(props) => props.top}%;
  left: ${(props) => props.left}%;
  animation: ${particleFloat} ${(props) => props.duration}s ease-in-out infinite;
  filter: blur(${(props) => props.blur}px);
  pointer-events: none;
`;

const Card = styled(motion.div)`
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(36px) saturate(200%);
  border-radius: 32px;
  padding: 55px 45px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 480px;
  align-items: center;
  box-shadow: 0 30px 90px rgba(0,0,0,0.32), 0 0 50px rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.18);
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), 
              box-shadow 0.35s ease;

  &:hover {
    transform: rotateY(12deg) rotateX(8deg) translateZ(10px);
    box-shadow: 0 50px 140px rgba(0,0,0,0.6),
                0 0 90px rgba(255,255,255,0.2),
                0 0 120px rgba(255,255,255,0.15);
  }
`;

// --- Input with edge I-beam ---
const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 18px;
`;

const Input = styled.input`
  width: 100%;
  padding: 18px 24px;
  border-radius: 32px;
  border: none;
  outline: none;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: default; /* center default */
  transition: all 0.2s ease;

  &:focus {
    background: rgba(255,255,255,0.25);
    box-shadow: 0 0 12px rgba(255,255,255,0.35);
  }

  ::placeholder { 
    color: rgba(255, 255, 255, 0.75); 
  }
`;

const CursorEdge = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 24px;
  cursor: text; /* I-beam only at edges */
`;

const LeftEdge = styled(CursorEdge)` left: 0; `;
const RightEdge = styled(CursorEdge)` right: 0; `;

const Button = styled(motion.button)`
  width: 100%;
  padding: 18px 0;
  border-radius: 32px;
  border: none;
  font-size: 18px;
  font-weight: 700;
  cursor: pointer;
  color: white;
  background: linear-gradient(135deg, #ff6a00, #ee0979);
  box-shadow: 0 14px 50px rgba(0,0,0,0.42), 0 0 20px rgba(255,255,255,0.25);
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 25px 70px rgba(0,0,0,0.6),
                0 0 60px #ff6a00,
                0 0 80px #ee0979,
                0 0 120px #6a11cb;
  }

  &:active {
    transform: scale(0.97);
    box-shadow: 0 10px 40px rgba(0,0,0,0.35),
                0 0 25px #ff6a00,
                0 0 40px #ee0979;
  }
`;

const LinkWrapper = styled.div`
  margin-top: 18px;
  font-size: 14px;
  text-align: center;
  a { color: white; text-decoration: underline; opacity: 0.85; &:hover { opacity: 1; } }
`;

const ErrorText = styled.p`
  color: #ffb3b3;
  margin-bottom: 10px;
  text-align: center;
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
    if (!email || !password) { setError("All fields are required!"); return; }
    setIsLoading(true); setError("");
    try {
      const res = await API.post("/users/signin", { email, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.user.name);
      setCelebrate(true);
      setTimeout(() => { setCelebrate(false); navigate("/home"); }, 1800);
    } catch (err) {
      setError(err.response?.data?.error || "Invalid credentials. Please try again.");
    } finally { setIsLoading(false); }
  };

  const particles = useMemo(() => {
    return Array.from({ length: 25 }, () => ({
      size: Math.random() * 16 + 6,
      top: Math.random() * 100,
      left: Math.random() * 100,
      duration: Math.random() * 8 + 5,
      blur: Math.random() * 6 + 1,
    }));
  }, []);

  return (
    <Container>
      {celebrate && <Confetti numberOfPieces={400} recycle={false} />}
      {particles.map((p, i) => <Particle key={i} {...p} />)}
      <Card
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <PremiumMascot focusedField={focusedField} />
        {error && <ErrorText>{error}</ErrorText>}

        <InputWrapper>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setFocusedField("email")}
            onBlur={() => setFocusedField("")}
          />
          <LeftEdge />
          <RightEdge />
        </InputWrapper>

        <InputWrapper>
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onFocus={() => setFocusedField("password")}
            onBlur={() => setFocusedField("")}
          />
          <LeftEdge />
          <RightEdge />
        </InputWrapper>

        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.97 }}
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
