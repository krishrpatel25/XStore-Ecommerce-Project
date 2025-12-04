import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiShoppingCart, FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // CLOSE ON OUTSIDE CLICK
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="w-full fixed top-0 left-0 z-40 bg-white/60 backdrop-blur-xl shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          {/* LEFT MENU */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink
              to="/home"
              className="font-medium text-gray-700 hover:text-accent transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/category"
              className="font-medium text-gray-700 hover:text-accent transition"
            >
              Categories
            </NavLink>
            <NavLink
              to="/allproducts"
              className="font-medium text-gray-700 hover:text-accent transition"
            >
              Products
            </NavLink>
            
          </div>

          {/* LOGO */}
          <NavLink
            to="/home"
            className="text-2xl font-extrabold text-gray-900 tracking-wide"
          >
            XStore
          </NavLink>

          {/* RIGHT SECTION */}
          <div className="hidden md:flex items-center gap-6 relative">
            {/* SEARCH */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-52 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition"
              />
              <FiSearch
                className="absolute right-3 top-2.5 text-gray-500"
                size={18}
              />
            </div>

            {/* CART */}
            <button className="relative hover:text-accent transition">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] px-2 py-[1px] rounded-full">
                3
              </span>
            </button>

            {/* PROFILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="relative hover:text-accent transition"
            >
              <FiUser size={22} />
            </button>

            {/* DROPDOWN */}
            {open && (
              <div
                ref={dropdownRef}
                className="absolute right-0 top-14 w-60 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200 animate-dropdown"
              >
                <div className="flex flex-col font-medium">
                  <button className="py-2 px-4 rounded-lg hover:bg-gray-100 transition text-gray-800 flex justify-between">
                    My Profile <span>👤</span>
                  </button>

                  <button className="py-2 px-4 rounded-lg hover:bg-gray-100 transition text-gray-800 flex justify-between">
                    My Cart <span>🛒</span>
                  </button>

                  <button className="py-2 px-4 rounded-lg hover:bg-gray-100 transition text-gray-800 flex justify-between">
                    Orders <span>📦</span>
                  </button>

                  <button className="py-2 px-4 rounded-lg hover:bg-gray-100 transition text-gray-800 flex justify-between">
                    Wishlist <span>❤️</span>
                  </button>

                  {/* Currency Selector */}
                  <div className="px-2 mt-3">
                    <p className="text-sm text-gray-600 mb-1">Currency</p>
                    <select className="w-full border border-gray-300 rounded-lg px-2 py-2 text-sm font-medium bg-white hover:border-gray-400 transition">
                      <option>USD</option>
                      <option>INR</option>
                      <option>EUR</option>
                    </select>
                  </div>

                  <hr className="my-3" />

                  <button className="py-2 px-4 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
