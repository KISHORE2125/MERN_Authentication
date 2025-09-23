import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function useSignInPage() {
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
      const res = await axios.post("http://localhost:3001/api/users/signin", { email, password });
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

  // Mascot logic for PremiumMascot
  function mascot(focusedField) {
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

    return { emoji, sparks };
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    focusedField,
    setFocusedField,
    celebrate,
    isLoading,
    error,
    handleSignin,
    particles,
    mascot,
  };
}