import React from "react";
import { useNavigate } from "react-router-dom";

const GoBackButton = ({ to = "/order", label = "Back", className = "" }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className={`group relative flex items-center py-4 gap-3 text-primary font-mono font-black uppercase tracking-[0.2em] cursor-pointer transition-all bg-transparent border-none ${className}`}
    >
      {/* 1. ICON MODULE: Slides left + Ghost Effect */}
      <div className="relative flex items-center justify-center transition-transform duration-300 group-hover:-translate-x-2">
        <i className="bi bi-arrow-left text-xl"></i>
        {/* Ghost Icon: Fades and pings on hover */}
        <i className="bi bi-arrow-left text-xl absolute top-0 left-0 text-white opacity-0 group-hover:opacity-20 group-hover:animate-ping"></i>
      </div>

      {/* 2. TEXT & UNDERLINE CONTAINER */}
      <div className="relative flex flex-col items-start">
        {/* The Label: Shifts color to white for "HD" contrast */}
        <span className="text-[12px] transition-colors duration-300 ">
          {label}
        </span>

        {/* 3. HD SEGMENTED UNDERLINE */}
        <div className="absolute -bottom-1 left-0 w-full h-[2px] overflow-hidden pointer-events-none">
          <div
            className="w-full h-full bg-primary transition-all duration-500 translate-x-[-100%] group-hover:translate-x-0"
            style={{
              maskImage:
                "linear-gradient(to right, black 3px, transparent 1px)",
              WebkitMaskImage:
                "linear-gradient(to right, black 3px, transparent 1px)",
              maskSize: "4px 100%",
            }}
          />
        </div>
      </div>

      {/* 4. TECHNICAL METADATA: Appears only on hover */}
      <div className="flex items-center ml-2 overflow-hidden w-0 group-hover:w-24 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-40">
        <span className="text-[8px] font-bold tracking-tighter whitespace-nowrap italic">
          [ SYS_RTN_01 ]
        </span>
      </div>

      {/* 5. ACTIVE STATE OVERLAY (Subtle flash on click) */}
      <div className="absolute inset-0 bg-white opacity-0 active:opacity-10 transition-opacity"></div>
    </button>
  );
};

export default GoBackButton;
