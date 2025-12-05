import React, { useEffect, useRef, useState } from "react";
import {
  FiUser,
  FiShoppingCart,
  FiSearch,
  FiMenu,
  FiHeart,
  FiX,
  FiPackage,
} from "react-icons/fi";
import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  const [open, setOpen] = useState(false); // Profile dropdown
  const [rightMenuOpen, setRightMenuOpen] = useState(false); // Right-side drawer
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
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
      {/* NAVBAR */}
      <nav className="w-full fixed top-0 left-0 z-40 bg-white/60 backdrop-blur-xl shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          
          {/* LEFT MENU (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-6">
            <NavLink to="/home" className="font-medium text-gray-700 hover:text-accent transition">
              Home
            </NavLink>
            <NavLink to="/category" className="font-medium text-gray-700 hover:text-accent transition">
              Categories
            </NavLink>
            <NavLink to="/allproducts" className="font-medium text-gray-700 hover:text-accent transition">
              Products
            </NavLink>
          </div>

          {/* LOGO */}
          <NavLink to="/home" className="text-2xl font-extrabold text-gray-900 tracking-wide">
            XStore
          </NavLink>

          {/* RIGHT SECTION — DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 relative">

            {/* SEARCH BAR */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
                className="w-52 px-4 py-2 rounded-full border border-gray-300 focus:ring-2 
                focus:ring-accent outline-none transition"
              />
              <FiSearch size={18} className="absolute right-3 top-2.5 text-gray-500" />
            </div>

            {/* CART ICON */}
            <button className="relative hover:text-accent transition">
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] 
              px-2 py-[1px] rounded-full">3</span>
            </button>

            {/* PROFILE ICON (Desktop) */}
            <button onClick={() => setOpen(!open)} className="hover:text-accent transition">
              <FiUser size={22} />
            </button>
          </div>

          {/* MOBILE + TABLET RIGHT SIDE AREA */}
          <div className="flex lg:hidden items-center gap-4">

            {/* PROFILE ICON (Mobile/Tablet) */}
            <button onClick={() => setOpen(!open)} className="hover:text-accent transition">
              <FiUser size={22} className="text-gray-800" />
            </button>

            {/* SEARCH ICON */}
            <button className="md:block hidden">
              <FiSearch size={22} className="text-gray-700" />
            </button>

            {/* MENU ICON */}
            <button
              onClick={() => setRightMenuOpen(true)}
              className="p-2 rounded-full border border-gray-300 hover:border-accent 
              hover:bg-gray-50 transition"
            >
              <FiMenu size={24} className="text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* GLOBAL PROFILE DROPDOWN — WORKS ON ALL SCREENS */}
      {open && (
        <div
          ref={dropdownRef}
          className="absolute right-4 top-20 w-64 p-4 bg-white rounded-2xl shadow-2xl 
          border border-gray-200 animate-dropdown z-50"
        >
          <div className="flex flex-col font-medium">

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              My Profile <span>👤</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              My Cart <span>🛒</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              Orders <span>📦</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              Wishlist <span>❤️</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              Settings <span>⚙️</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              Help <span>❓</span>
            </button>

            <hr className="my-3" />

            <button className="py-2 px-4 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition">
              Logout
            </button>

          </div>
        </div>
      )}

      {/* BACKDROP FOR SIDE MENU */}
      {rightMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={() => setRightMenuOpen(false)}
        />
      )}

      {/* RIGHT SIDE SLIDER MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl border-l border-gray-200 
        transform transition-transform duration-300 ${
          rightMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={() => setRightMenuOpen(false)}>
            <FiX size={24} className="text-gray-700" />
          </button>
        </div>

        {/* USER SECTION */}
        <div className="px-5 py-4 border-b flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
            <FiUser className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Welcome</p>
            <p className="font-medium text-gray-800">Guest User</p>
          </div>
        </div>

        {/* NAV LINKS */}
        <div className="flex flex-col mt-2 font-medium">
          <NavLink to="/" onClick={() => setRightMenuOpen(false)} className="px-5 py-3 hover:bg-gray-100">Home</NavLink>
          <NavLink to="/category" onClick={() => setRightMenuOpen(false)} className="px-5 py-3 hover:bg-gray-100">Categories</NavLink>
          <NavLink to="/allproducts" onClick={() => setRightMenuOpen(false)} className="px-5 py-3 hover:bg-gray-100">Products</NavLink>
          <NavLink to="/offers" onClick={() => setRightMenuOpen(false)} className="px-5 py-3 hover:bg-gray-100">Offers</NavLink>
        </div>

        <hr className="my-3" />

        {/* CART, WISHLIST & ORDERS */}
        <div className="flex flex-col gap-2 px-5">
          <button className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100">
            <span className="flex items-center gap-2">
              <FiShoppingCart /> My Cart
            </span>
            <span className="text-xs bg-accent text-white px-2 py-[2px] rounded-full">3</span>
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <FiHeart /> Wishlist
          </button>

          <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <FiPackage /> Orders
          </button>
        </div>

        <hr className="my-3" />

        {/* LOGOUT */}
        <div className="px-5 pb-5">
          <button className="w-full py-2.5 rounded-lg bg-accent text-white font-semibold hover:opacity-90 transition">
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default NavbarComp;
