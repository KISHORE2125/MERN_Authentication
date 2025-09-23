import React from "react";
import useProductsPage from "../Hooks/ProductsPageHooks";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { Power } from "lucide-react"; // logout icon

// --- Import images ---
import WatchImage from "../assets/png/Watch.png";
import HeadphonesImage from "../assets/png/Headphones.png";
import iPhoneImage from "../assets/png/iPhone.png";
import SamsungImage from "../assets/png/Samsung.png";

// --- Background gradient animation ---
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

const Title = styled.h1`
  font-size: 4rem;
  margin-bottom: 70px;
  font-weight: 900;
  text-align: center;
  letter-spacing: 2px;
  background: linear-gradient(135deg, #ffd700, #ffcc00, #e6b800, #fff8e1);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 10px 30px rgba(0,0,0,0.85);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 60px;
  width: 100%;
  max-width: 1350px;
`;

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
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1), border 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, box-shadow, border;

  &:hover {
    transform: translateY(-20px) scale(1.06);
    border: 1px solid rgba(255, 215, 0, 0.5);
    box-shadow: 0 40px 120px rgba(0, 0, 0, 0.9),
                0 0 100px rgba(255, 215, 0, 0.3),
                inset 0 0 40px rgba(255, 215, 0, 0.1);
  }
`;

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
  transition: transform 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform;

  ${ProductCard}:hover & {
    transform: scale(1.12);
  }
`;

const ProductName = styled.h2`
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 14px;
  background: linear-gradient(135deg, #ffffff, #ffeeba, #ffd700);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 6px 16px rgba(0,0,0,0.7);
`;

const ProductPrice = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  background: linear-gradient(135deg, #ffd700, #f0e68c);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 4px 12px rgba(0,0,0,0.6);
`;

const LogoutButton = styled(motion.button)`
  position: fixed;
  top: 30px;
  right: 30px;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  background: rgba(255,255,255,0.08);
  backdrop-filter: blur(15px);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 1.6rem;
  box-shadow: 0 15px 50px rgba(0,0,0,0.7),
              0 0 40px rgba(255,215,0,0.3);
  transition: transform 0.3s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s cubic-bezier(0.22, 1, 0.36, 1);
  will-change: transform, box-shadow;

  &:hover {
    transform: scale(1.18);
    box-shadow: 0 25px 80px rgba(0,0,0,0.9),
                0 0 60px rgba(255,215,0,0.5);
  }
`;

export default function Products() {
  const { products, handleLogout } = useProductsPage();

  return (
    <Container>
      <LogoutButton whileTap={{ scale: 0.9 }} onClick={handleLogout}>
        <Power size={30} />
      </LogoutButton>

      <Title>Our Premium Collection</Title>
      <Grid>
        {products.map((product) => (
          <ProductCard key={product.id} whileTap={{ scale: 0.95 }}>
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