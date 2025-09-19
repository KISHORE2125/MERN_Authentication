// src/Pages/Products.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Power } from "lucide-react"; // gold logout icon

// Product images
import Watch from "../assets/png/Watch.png";
import Headphones from "../assets/png/Headphones.png";
import iPhone from "../assets/png/iPhone.png";
import Samsung from "../assets/png/Samsung.png";

// Background gradient animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// --- Styled Components ---
const Container = styled.div`
  min-height: 100vh;
  padding: 60px 40px;
  background: linear-gradient(135deg, #0a0a0a, #1c1c1c, #2a2a2a, #111);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 18s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Page Title
const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 70px;
  font-weight: 900;
  text-align: center;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ffd700, #ffcc00, #e6b800, #fff8e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.85);
`;

// Product grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 60px;
  width: 100%;
  max-width: 1350px;
`;

// Premium product card
const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 36px;
  padding: 40px 32px;
  text-align: center;
  backdrop-filter: blur(25px) saturate(180%);
  border: 1px solid rgba(255, 215, 0, 0.25);
  box-shadow: 0 25px 90px rgba(0, 0, 0, 0.8),
              inset 0 0 30px rgba(255, 215, 0, 0.08);
  cursor: pointer;
  transition: all 0.5s ease;

  &:hover {
    transform: translateY(-20px) scale(1.06);
    border: 1px solid rgba(255, 215, 0, 0.5);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9),
                0 0 100px rgba(255, 215, 0, 0.3),
                inset 0 0 40px rgba(255, 215, 0, 0.1);
  }
`;

// Product image wrapper
const ProductImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 24px;
  overflow: hidden;
  margin-bottom: 25px;
`;

const ProductImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  transition: transform 0.6s ease;

  ${ProductCard}:hover & {
    transform: scale(1.12);
  }
`;

// Product name
const ProductName = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 14px;
  background: linear-gradient(135deg, #ffffff, #ffeeba, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 6px 16px rgba(0, 0, 0, 0.7);
`;

// Product price
const ProductPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffd700, #f0e68c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 12px rgba(0, 0, 0, 0.6);
`;

// Logout button
const LogoutButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 1.6rem;
  box-shadow: 0 15px 50px rgba(0, 0, 0, 0.7),
              0 0 40px rgba(255, 215, 0, 0.3);
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.18);
    box-shadow: 0 25px 80px rgba(0, 0, 0, 0.9),
                0 0 60px rgba(255, 215, 0, 0.5);
  }
`;

export default function Products() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Luxury Watch", price: "$199", image: Watch },
    { id: 2, name: "Premium Headphones", price: "$299", image: Headphones },
    { id: 3, name: "iPhone", price: "$999", image: iPhone },
    { id: 4, name: "Samsung Galaxy", price: "$899", image: Samsung },
  ];

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  return (
    <Container>
      <LogoutButton whileTap={{ scale: 0.9 }} onClick={handleLogout}>
        <Power size={30} />
      </LogoutButton>

      <Title>Our Premium Collection</Title>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileTap={{ scale: 0.95 }}
          >
            <ProductImageWrapper>
              <ProductImage src={product.image} alt={product.name} />
            </ProductImageWrapper>
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
}
