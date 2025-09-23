import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useHomePage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("Friend");

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (!savedUser) return navigate("/signin", { replace: true });
    setUsername(savedUser);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    setTimeout(() => { window.location.reload(); }, 100);
  };

  const handleGoToProducts = () => {
    navigate("/products");
  };

  return {
    username,
    handleLogout,
    handleGoToProducts,
  };
}