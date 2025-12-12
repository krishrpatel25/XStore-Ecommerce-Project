import React from 'react'

const ProductLoader = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <svg
        className="w-20 h-20 text-accent animate-pulse"
        fill="currentColor"
        viewBox="0 0 24 24"
      >
        <path d="M6 7V6a6 6 0 1112 0v1h3v15H3V7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
      </svg>
    </div>
  );
}

export default ProductLoader