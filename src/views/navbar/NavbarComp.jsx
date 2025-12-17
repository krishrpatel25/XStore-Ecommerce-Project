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
      <nav className="fixed top-3 left-1/2 -translate-x-1/2 z-40 w-[94%] rounded-full bg-white/70 backdrop-blur-xl shadow-sm border border-background">
        <div className="max-w-7xl mx-auto flex items-center px-4 md:px-6 py-2 md:py-4">
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
          <div className="hidden lg:flex items-center gap-6 flex-1 justify-end">
            <button
              onClick={() => navigate("/cart")}
              className="relative hover:text-accent transition"
            >
              <FiShoppingCart size={22} />
              <span className="absolute -top-2 -right-2 bg-accent text-white text-[10px] px-2 py-[1px] rounded-full">
                {cart.length}
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              className="hover:text-accent transition"
            >
              <FiUser size={24} />
            </button>
          </div>

          {/* MOBILE + TABLET RIGHT */}
          <div className="flex items-center gap-2 md:gap-5 lg:hidden flex-1 justify-end">
            <button
              onClick={() => setOpen(!open)}
              className="hover:text-accent transition"
            >
              <FiUser size={18} className="text-gray-800 md:hidden" />
              <FiUser size={20} className="hidden md:block text-gray-800" />
            </button>

            <button
              onClick={() => setRightMenuOpen(true)}
              className="p-1.5 md:p-2 rounded-lg border border-gray-300 active:scale-95 transition"
            >
              <FiMenu size={20} className="text-gray-800 md:hidden" />
              <FiMenu size={22} className="hidden md:block text-gray-800" />
            </button>
          </div>
        </div>
      </nav>

      {/* GLOBAL PROFILE DROPDOWN — WORKS ON ALL SCREENS */}
      {open && (
        <div
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="
          fixed right-3 top-16
          w-56 sm:w-64
          p-3 sm:p-4
          bg-white
          rounded-xl sm:rounded-2xl
          shadow-xl
          border border-gray-200
          z-50
        "
        >
          <div className="flex flex-col text-sm sm:text-base font-medium">
            <button className="py-2 px-3 hover:bg-gray-100 rounded-lg transition flex justify-between">
              My Profile <span>👤</span>
            </button>

            <button
              onClick={() => navigate("/order")}
              className="py-2 px-3 hover:bg-gray-100 rounded-lg transition flex justify-between"
            >
              Orders <span>📦</span>
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="py-2 px-3 hover:bg-gray-100 rounded-lg transition flex justify-between"
            >
              Wishlist <span>❤️</span>
            </button>

            <hr className="my-2 sm:my-3" />

            <button className="py-2 px-3 bg-accent text-white rounded-lg font-semibold hover:opacity-90 transition">
              Logout
            </button>
          </div>
        </div>
      )}

      {/* OVERLAY */}
      {rightMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setRightMenuOpen(false)}
        />
      )}

      {/* RIGHT SIDE MENU */}
      <div
        className={`
    fixed top-0 right-0 h-full
    w-48 sm:w-72
    bg-white
    z-50
    shadow-md
    border-l border-gray-200
    transform transition-transform duration-300
    ${rightMenuOpen ? "translate-x-0" : "translate-x-full"}
    lg:hidden
  `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-3 py-2 border-b">
          <h2 className="text-xs sm:text-lg font-semibold">Menu</h2>
          <button onClick={() => setRightMenuOpen(false)}>
            <FiX size={18} className="text-gray-700 sm:hidden" />
            <FiX size={24} className="hidden sm:block text-gray-700" />
          </button>
        </div>

        {/* LINKS */}
        <div className="flex flex-col mt-1 text-xs sm:text-base font-medium">
          <NavLink
            to="/"
            onClick={() => setRightMenuOpen(false)}
            className="px-3 py-2 hover:bg-gray-100"
          >
            Home
          </NavLink>
          <NavLink
            to="/category"
            onClick={() => setRightMenuOpen(false)}
            className="px-3 py-2 hover:bg-gray-100"
          >
            Categories
          </NavLink>
          <NavLink
            to="/allproducts"
            onClick={() => setRightMenuOpen(false)}
            className="px-3 py-2 hover:bg-gray-100"
          >
            Products
          </NavLink>
        </div>

        <hr className="my-1" />

        {/* CART */}
        <div className="px-3">
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center justify-between w-full px-2 py-1.5 rounded-md hover:bg-gray-100 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <FiShoppingCart size={14} /> My Cart
            </span>
            <span className="text-[9px] bg-accent text-white px-1.5 py-[1px] rounded-full">
              {cart.length}
            </span>
          </button>
        </div>

        <hr className="my-1" />

        {/* LOGOUT */}
        <div className="px-3 pb-3">
          <button className="w-full py-1.5 rounded-md bg-accent text-white text-xs font-semibold hover:opacity-90 transition">
            Logout
          </button>
        </div>
      </div>

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
