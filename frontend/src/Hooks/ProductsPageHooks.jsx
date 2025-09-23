import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WatchImage from "../assets/png/Watch.png";
import HeadphonesImage from "../assets/png/Headphones.png";
import iPhoneImage from "../assets/png/iPhone.png";
import SamsungImage from "../assets/png/Samsung.png";

export default function useProductsPage() {
  const navigate = useNavigate();
  const [products] = useState([
    { id: 1, name: "Luxury Watch", price: "$199", image: WatchImage },
    { id: 2, name: "Premium Headphones", price: "$299", image: HeadphonesImage },
    { id: 3, name: "iPhone", price: "$999", image: iPhoneImage },
    { id: 4, name: "Samsung Galaxy", price: "$899", image: SamsungImage },
  ]);

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    setTimeout(() => { window.location.reload(); }, 100);
  };

  return {
    products,
    handleLogout,
  };
}