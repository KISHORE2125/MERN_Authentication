// src/Pages/Products.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

// Import product images
import Watch from "../assets/png/Watch.png";
import Headphones from "../assets/png/Headphones.png";
import iPhone from "../assets/png/iPhone.png";
import Samsung from "../assets/png/Samsung.png";

// Gradient background animation
const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Container
const Container = styled.div`
  min-height: 100vh;
  padding: 60px 40px;
  background: linear-gradient(135deg, #6a11cb, #2575fc, #ff6a00, #ee0979);
  background-size: 400% 400%;
  animation: ${gradientAnimation} 8s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// Title
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 40px;
  font-weight: 700;
  text-align: center;
  background: linear-gradient(135deg, #f8f1e4, #c7b198);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 15px rgba(0,0,0,0.25);
`;

// Product grid
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 30px;
  width: 100%;
  max-width: 1200px;
`;

// Glassmorphic product card
const ProductCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.08);
  border-radius: 25px;
  padding: 25px;
  text-align: center;
  backdrop-filter: blur(14px);
  box-shadow: 0 15px 50px rgba(0,0,0,0.5);
  border: 1px solid rgba(255,255,255,0.12);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;

  &:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 60px rgba(0,0,0,0.6);
    filter: brightness(1.1);
  }
`;

// Product image
const ProductImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 20px;
  margin-bottom: 15px;
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.05);
  }
`;

// Product name
const ProductName = styled.h2`
  font-size: 1.3rem;
  font-weight: 700;
  color: #f8f1e4;
  margin-bottom: 10px;
  text-shadow: 0 2px 6px rgba(0,0,0,0.3);
`;

// Product price
const ProductPrice = styled.p`
  font-size: 1.1rem;
  color: #c7b198;
  font-weight: 600;
  text-shadow: 0 1px 3px rgba(0,0,0,0.3);
`;

// Logout floating button
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
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.1);
    box-shadow: 0 12px 40px rgba(0,0,0,0.55);
  }
`;

export default function Products() {
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Luxury Watch", price: "$199", image: Watch },
    { id: 2, name: "Premium Headphones", price: "$299", image: Headphones },
    { id: 3, name: "iPhone", price: "$999", image: iPhone },
    { id: 4, name: "Samsung", price: "$899", image: Samsung },
  ];

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
  };

  return (
    <Container>
      <LogoutButton
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleLogout}
      >
        ⏻
      </LogoutButton>

      <Title>Our Premium Products</Title>
      <Grid>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <ProductImage src={product.image} alt={product.name} />
            <ProductName>{product.name}</ProductName>
            <ProductPrice>{product.price}</ProductPrice>
          </ProductCard>
        ))}
      </Grid>
    </Container>
  );
}
