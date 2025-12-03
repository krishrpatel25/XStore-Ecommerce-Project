import React from "react";
import { FiUser, FiShoppingCart } from "react-icons/fi";

import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between bg-white">
        {/* LEFT MENU */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center gap-3 bg-primary p-2 px-4 rounded-br-full">
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
              `px-4 py-2 rounded-full font-medium transition-all ${
                isActive ? "  text-gray-500" : " text-black "
              }`
            }
          >
            Products
          </NavLink>
        </div>

        {/* CENTER LOGO */}
        <div className="hidden md:flex w-[20%] h-[60px] items-center justify-center bg-primary  p-2 px-4 rounded-bl-full rounded-br-full">
          <h1 className="text-primary-foreground text-xl font-bold">XStore</h1>
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center justify-end gap-4 bg-primary text-primary-foreground p-2 px-4 rounded-bl-full">
          <button className="flex items-center gap-2 hover:opacity-80 transition">
            <FiUser size={20} />
            <span className="text-primary-foreground"></span>
          </button>

          {/* Cart */}
          <button className="flex items-center gap-2 hover:opacity-80 transition">
            <FiShoppingCart size={20} />
            <span className="text-primary-foreground"></span>
          </button>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
