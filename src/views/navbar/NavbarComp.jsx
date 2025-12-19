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
      <nav className="fixed top-0 left-0 z-40 w-full bg-background/80 backdrop-blur-md border-b border-foreground/10">
        <div className="max-w-7xl mx-auto flex items-center px-4 md:px-10 h-16 md:h-20">
          {/* LEFT MENU (Desktop Only) */}
          <div className="hidden lg:flex items-center gap-8 flex-1">
            {["Home", "Category", "AllProducts"].map((item) => (
              <NavLink
                key={item}
                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-foreground/60 hover:text-primary transition-colors relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-primary transition-all group-hover:w-full" />
              </NavLink>
            ))}
          </div>

          {/* LOGO - Brutalist Center (Responsive width) */}
          <div className="flex-1 lg:flex-none flex justify-start lg:justify-center">
            <NavLink
              to="/"
              className="flex-shrink-0 group relative px-4 md:px-6 py-1 border-x border-foreground/10"
            >
              <div className="absolute top-0 left-0 w-1 h-1 bg-primary" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-primary" />

              <span className="text-xl md:text-2xl font-black uppercase tracking-tighter italic text-foreground transition-all group-hover:text-primary group-hover:skew-x-[-10deg] inline-block">
                XStore
              </span>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[6px] md:text-[7px] font-mono opacity-30 tracking-[0.5em] uppercase whitespace-nowrap">
                Ver_2.0.25
              </span>
            </NavLink>
          </div>

          {/* RIGHT SECTION — DESKTOP */}
          <div className="hidden lg:flex items-center gap-8 flex-1 justify-end">
            <button
              onClick={() => navigate("/cart")}
              className="relative group p-2"
            >
              <FiShoppingCart
                size={18}
                className="group-hover:text-primary transition-colors"
              />
              <span className="absolute top-0 right-0 bg-primary text-background text-[8px] font-bold w-4 h-4 flex items-center justify-center">
                {cart.length}
              </span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setOpen((prev) => !prev);
              }}
              className={`p-2 transition-all ${
                open ? "bg-primary text-background" : "hover:text-primary"
              }`}
            >
              <FiUser size={20} />
            </button>
          </div>

          {/* MOBILE + TABLET RIGHT (Optimized Layout) */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-4 flex-1 justify-end">

            {/* Mobile User Toggle */}
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 ${open ? "text-primary" : ""}`}
            >
              <FiUser size={18} />
            </button>

            {/* Hamburger Menu */}
            <button
              onClick={() => setRightMenuOpen(true)}
              className="h-10 w-10 flex flex-col items-center justify-center gap-1 border border-foreground/10"
            >
              <div className="w-5 h-[1px] bg-foreground" />
              <div className="w-3 h-[1px] bg-foreground self-end mr-2.5" />
              <div className="w-5 h-[1px] bg-foreground" />
            </button>
          </div>
        </div>
      </nav>

      {/* GLOBAL PROFILE DROPDOWN */}
      {open && (
        <div
          ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}
          className="fixed right-4 top-20 w-56 bg-background border border-foreground/20 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] z-50 p-1"
        >
          <div className="flex flex-col">
            {[
              { label: "My Profile", path: "/profile" },
              { label: "Orders", path: "/order" },
              { label: "Wishlist", path: "/wishlist" },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => item.path && navigate(item.path)}
                className="group flex items-center justify-between px-4 py-3 text-[10px] font-mono uppercase tracking-widest hover:bg-primary hover:text-background transition-all"
              >
                {item.label}
                <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                  →
                </span>
              </button>
            ))}
            <div className="h-[1px] bg-foreground/10 my-1" />
            <button className="py-4 px-4 bg-accent text-background text-[10px] font-black uppercase tracking-[0.3em] hover:bg-primary transition-colors">
              Logout_System
            </button>
          </div>
        </div>
      )}

      {/* MOBILE DRAWER (Right Side Menu) */}
      <div
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-background z-50 border-l border-foreground/10 transform transition-transform duration-500 ease-in-out ${
          rightMenuOpen ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
          <span className="font-mono text-[10px] uppercase tracking-[0.5em] opacity-40">
            Menu_Directory
          </span>
          <button
            onClick={() => setRightMenuOpen(false)}
            className="p-2 border border-foreground/10"
          >
            <FiX size={20} />
          </button>
        </div>

        <div className="flex flex-col p-6 gap-6">
          {["Home", "Category", "AllProducts"].map((item) => (
            <NavLink
              key={item}
              to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
              onClick={() => setRightMenuOpen(false)}
              className="text-4xl font-black uppercase italic tracking-tighter hover:text-primary transition-all"
            >
              {item}
            </NavLink>
          ))}

          <div className="h-[1px] bg-foreground/10 my-4" />

          <button
            onClick={() => {
              navigate("/cart");
              setRightMenuOpen(false);
            }}
            className="flex items-center justify-between w-full p-4 border border-foreground/10 font-mono text-xs uppercase"
          >
            <span>[ My_Cart ]</span>
            <span className="bg-primary text-background px-2 py-0.5 font-bold">
              {cart.length}
            </span>
          </button>

          <button className="w-full py-5 bg-accent text-background font-black uppercase tracking-widest text-xs mt-auto">
            Logout_System
          </button>
        </div>
      </div>

      {/* OVERLAY */}
      {rightMenuOpen && (
        <div
          className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setRightMenuOpen(false)}
        />
      )}
    </>
  );
};

export default NavbarComp;
