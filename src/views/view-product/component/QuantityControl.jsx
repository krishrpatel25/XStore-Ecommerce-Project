const QuantityControl = ({ qty, onIncrease, onDecrease, disabled = false }) => {
  return (
    <div className="flex items-center bg-secondary px-2 py-1 rounded-2xl">
      <button
        disabled={disabled}
        className={`text-md font-medium px-2 
          ${disabled ? "opacity-40 cursor-not-allowed" : "hover:text-accent"}
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onDecrease();
        }}
      >
        -
      </button>

      <span className="text-md font-semibold w-4 text-center">{qty}</span>

      <button
        disabled={disabled}
        className={`text-md font-medium px-2 
          ${disabled ? "opacity-40 cursor-not-allowed" : "hover:text-accent"}
        `}
        onClick={(e) => {
          e.stopPropagation();
          if (!disabled) onIncrease();
        }}
      >
        +
      </button>
    </div>
  );
};

export default QuantityControl;
