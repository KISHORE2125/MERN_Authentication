import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMotionValue, useTransform } from "framer-motion";
import axios from "axios";

export default function useHeroPage() {
  const [heroData, setHeroData] = useState({
    title: "Welcome to Authentication",
    subtitle: "Sign in or sign up to get started with your personalized experience!",
  });
  const [fadeOut, setFadeOut] = useState(false);
  const navigate = useNavigate();

  const yMotion = useMotionValue(0);
  const yParallax = useTransform(yMotion, [0, 500], [0, 45]);

  useEffect(() => {
    const fetchHero = async () => {
      try {
        const res = await axios.get("http://localhost:3001/api/hero", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token") || ""}` },
        });
        if (res.data) setHeroData(res.data);
      } catch (err) {
        console.log("Failed to fetch hero data, using default", err);
      }
    };
    fetchHero();

    const handleScroll = () => yMotion.set(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const particles = Array.from({ length: 70 }, (_, i) => ({
    size: Math.random() * 16 + 3,
    top: Math.random() * 95,
    left: Math.random() * 95,
    duration: Math.random() * 20 + 6,
    blur: Math.random() * 5 + 0.5,
  }));

  const streaks = Array.from({ length: 25 }, (_, i) => ({
    width: Math.random() * 240 + 80,
    top: Math.random() * 100,
    left: Math.random() * 100,
    duration: Math.random() * 18 + 8,
  }));

  // Fade out and navigate helper
  const handleRoute = (route) => {
    setFadeOut(true);
    setTimeout(() => {
      navigate(route);
    }, 220); // match fade duration (0.22s)
  };

  return {
    heroData,
    fadeOut,
    yParallax,
    particles,
    streaks,
    handleRoute,
  };
}