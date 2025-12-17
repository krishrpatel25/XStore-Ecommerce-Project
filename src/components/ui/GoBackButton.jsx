import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ to = "/order", label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`flex items-center py-4 gap-2 text-primary font-semibold cursor-pointer hover:underline underline-offset-4 transition ${className}`}
    >
      <i className="bi bi-arrow-left"></i>
      <span>{label}</span>
    </button>
  );
};

export default GoBackButton;
