import React, { useEffect, useRef, useState } from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";

import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false); // close dropdown when clicking outside
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav className="w-full flex items-center justify-between ">
        {/* LEFT MENU */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center gap-2 bg-primary p-2 px-10 rounded-br-full">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition-all ${
                isActive ? "  text-gray-500" : " text-black "
              }`
            }
          >
            Category
          </NavLink>

          <NavLink
            to="/allproducts"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition-all  ${
                isActive ? "  text-gray-500" : " text-black "
              }`
            }
          >
            Products
          </NavLink>
        </div>

        {/* CENTER LOGO */}
        <div className="hidden md:flex w-[20%] h-[60px] items-center justify-center bg-primary p-2 px-4 rounded-bl-full rounded-br-full">
          <NavLink
            to="/home"
            className="text-primary-foreground text-xl font-bold"
          >
            <span className="text-foreground hover:text-accent">XStore</span>
          </NavLink>
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center justify-end gap-4 bg-primary text-primary-foreground p-2 px-6 rounded-bl-full relative">
          <div className="flex gap-8 px-10">
            {/* Profile */}
            <button onClick={() => setOpen(!open)}>
              <FiUser size={23} className="stroke-[2.5] hover:text-secondary" />
            </button>

            {/* Cart */}
            <button className="relative group hover:text-secondary transition">
              <FiShoppingCart size={23} className="stroke-[2.5]" />

              {/* Cart count badge */}
              <span className="absolute -top-2 -right-2 bg-background text- text-[11px] px-[6px] py-[1px] rounded-full shadow">
                3
              </span>
            </button>
          </div>

          {/* Dropdown */}
          {open && (
            <div
              ref={dropdownRef}
              className="absolute z-10 right-12 top-12 w-56 bg-white shadow-xl border border-gray-200 rounded-xl p-3 animate-in fade-in slide-in-from-top-2"
            >
              <div className="flex flex-col text-gray-700 font-medium">
                <button className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                  My Profile
                </button>
                <button className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                  My Cart
                </button>
                <button className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                  My Orders
                </button>
                <button className="text-left py-2 px-3 rounded-lg hover:bg-gray-100 transition">
                  My Wishlist
                </button>

                <div className="px-3 mt-2">
                  <p className="text-sm  mb-1">
                    Currency
                  </p>
                  <select className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm">
                    <option>USD</option>
                    <option>INR</option>
                    <option>EUR</option>
                  </select>
                </div>

                <button className="mt-3 bg-accent text-background py-2 rounded-lg font-semibold hover:opacity-90 transition shadow">
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
