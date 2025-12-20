import React from "react";

const QuantityControl = ({ qty, onIncrease, onDecrease, disabled = false }) => {
  if (qty <= 0) return null;

  return (
    <div className="flex items-center border border-foreground/20 p-1 bg-background relative overflow-hidden transition-all duration-300">
      {/* MINUS / PURGE BUTTON */}
      <button
        disabled={disabled}
        className={`w-8 h-8 flex items-center justify-center hover:bg-accent font-mono text-lg transition-all relative z-10
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onDecrease();
        }}
      >
        <span className="relative flex items-center justify-center">-</span>
      </button>

      {/* READOUT */}
      <div className="relative w-10 h-8 flex items-center justify-center">
        <span className="font-mono text-sm font-black tracking-tighter">
          {qty.toString().padStart(2)}
        </span>
      </div>

      {/* PLUS BUTTON */}
      <button
        disabled={disabled}
        className={`w-8 h-8 flex items-center justify-center font-mono text-lg transition-all relative z-10 
          hover:bg-primary hover:text-background
          ${disabled ? "opacity-20 cursor-not-allowed" : ""}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onIncrease();
        }}
      >
        <span className="relative">+</span>
      </button>

      {/* SCANLINE ACCENT */}
      <div className="absolute bottom-0 left-0 h-[1px] bg-primary w-0 group-hover/qty:w-full transition-all duration-500" />
    </div>
  );
};

export default QuantityControl;
