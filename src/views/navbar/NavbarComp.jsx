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
import { NavLink, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartsContext";
const NavbarComp = () => {
  const [open, setOpen] = useState(false); // Profile dropdown
  const [rightMenuOpen, setRightMenuOpen] = useState(false); // Right-side drawer
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      // If dropdown is open AND click is outside → close dropdown
      if (
        open &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <>
      {/* NAVBAR */}
      <nav className="w-full h-auto fixed top-0 left-0 z-40 bg-white/60 backdrop-blur-xl shadow-sm border-b border-background">
        <div className="max-w-7xl mx-auto flex items-center px-6 py-4">
          {/* LEFT MENU (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-6 flex-1">
            <NavLink
              to="/"
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
            to="/"
            className="
              text-3xl font-extrabold tracking-widest text-gray-900
              relative inline-block
              transition-all duration-300

              /* 3D base */
              drop-shadow-[2px_2px_0px_rgba(0,0,0,0.25)]

              /* hover animation */
              hover:scale-110 hover:tracking-[0.25em] hover:text-accent
              hover:drop-shadow-[6px_6px_0px_rgba(0,0,0,0.25)]
            "
          >
            <span className="relative inline-block">
              XStore
              {/* 3D Shine Layer */}
              <span
                className="
                text-sm
                  absolute inset-0 text-white opacity-0
                  translate-y-1 translate-x-1
                  transition-all duration-300
                  blur-sm
                  hover:opacity-30
                "
              >
                XStore
              </span>
            </span>
          </NavLink>

          {/* RIGHT SECTION — DESKTOP */}
          <div className="hidden lg:flex items-center gap-6 relative flex-1 justify-end">
            {/* CART ICON */}
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:text-accent transition"
            >
              <FiShoppingCart size={22} />
              <span
                className="absolute -top-2 -right-2 bg-accent text-white text-[10px] 
              px-2 py-[1px] rounded-full"
              >
                {cart.length}
              </span>
            </button>

            {/* PROFILE ICON (Desktop) */}

            <button
              onClick={(e) => {
                e.stopPropagation(); // prevents outside click handler from firing
                setOpen((prev) => !prev); // toggle open/close
              }}
              className="hover:text-accent transition"
            >
              <FiUser size={24} />
            </button>
          </div>

          {/* MOBILE + TABLET RIGHT SIDE AREA */}
          <div className="flex items-center gap-4 md:gap-5 lg:hidden flex-1 justify-end">
            {/* PROFILE BUTTON */}
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-accent transition"
            >
              <FiUser size={22} className="text-gray-800" />
            </button>

            {/* SEARCH (tablet only) */}
            <button className="hidden md:block">
              <FiSearch size={22} className="text-gray-700" />
            </button>

            {/* MENU BUTTON */}
            <button
              onClick={() => setRightMenuOpen(true)}
              className="p-2 rounded-xl border border-gray-300 hover:border-accent hover:bg-gray-50 active:scale-95 transition"
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
          onClick={(e) => e.stopPropagation()} // Keep open when clicking inside
          className="fixed right-4 top-20 w-64 p-4 bg-white rounded-2xl shadow-2xl 
               border border-gray-200 animate-dropdown z-50"
        >
          <div className="flex flex-col font-medium">
            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              My Profile <span>👤</span>
            </button>

            <button className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between">
              Orders <span>📦</span>
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="py-2 px-4 hover:bg-gray-100 rounded-lg transition flex justify-between"
            >
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

        {/* NAV LINKS */}
        <div className="flex flex-col mt-2 font-medium">
          <NavLink
            to="/"
            onClick={() => setRightMenuOpen(false)}
            className="px-5 py-3 hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/category"
            onClick={() => setRightMenuOpen(false)}
            className="px-5 py-3 hover:bg-gray-100"
          >
            Categories
          </NavLink>
          <NavLink
            to="/allproducts"
            onClick={() => setRightMenuOpen(false)}
            className="px-5 py-3 hover:bg-gray-100"
          >
            Products
          </NavLink>
        </div>

        <hr className="my-3" />

        {/* CART, WISHLIST & ORDERS */}
        <div className="flex flex-col gap-2 px-5">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-100"
          >
            <span className="flex items-center gap-2">
              <FiShoppingCart /> My Cart
            </span>
            <span className="text-xs bg-accent text-white px-2 py-[2px] rounded-full">
              {cart.length}
            </span>
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
