import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function useAppHooks() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBackspace = (e) => {
      // Only trigger if not focused on input, textarea, or contenteditable
      const tag = document.activeElement.tagName;
      const isEditable = document.activeElement.isContentEditable;
      if (
        e.key === "Backspace" &&
        tag !== "INPUT" &&
        tag !== "TEXTAREA" &&
        !isEditable
      ) {
        e.preventDefault();
        navigate(-1);
      }
    };
    window.addEventListener("keydown", handleBackspace);
    return () => window.removeEventListener("keydown", handleBackspace);
  }, [navigate]);
}