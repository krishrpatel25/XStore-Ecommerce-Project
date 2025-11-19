import React from "react";
import { NavLink } from "react-router-dom";

const NavbarComp = () => {
  return (
    <>
      <nav className="w-full flex items-center justify-between bg-[#F2E8D5]">
        {/* LEFT MENU */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center gap-3 bg-[#0A1A2F] p-2 px-4 rounded-br-full">
          <NavLink
            to="/category"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition-all ${
                isActive
                  ? " bg-[#C49B3E] text-[#F2E8D5] shadow-md"
                  : " text-[#F2E8D5] "
              }`
            }
          >
            Category
          </NavLink>

          <NavLink
            to="/allproducts"
            className={({ isActive }) =>
              `px-4 py-2 rounded-full font-medium transition-all ${
                isActive
                  ? " bg-[#C49B3E] text-[#F2E8D5] shadow-md"
                  : " text-[#F2E8D5] "
              }`
            }
          >
            Products
          </NavLink>
        </div>

        {/* CENTER LOGO */}
        <div className="hidden md:flex w-[20%] h-[60px] items-center justify-center bg-[#0F2A24] p-2 px-4 rounded-bl-full rounded-br-full">
          <h1 className="text-white text-xl font-bold">XStore</h1>
        </div>

        {/* RIGHT ICONS */}
        <div className="hidden md:flex w-[32%] h-[60px] items-center justify-end gap-4 bg-[#0F2A24] p-2 px-4 rounded-bl-full">
          <h1 className="text-white">Profile</h1>
          <h1 className="text-white">Cart</h1>
        </div>
      </nav>
    </>
  );
};

export default NavbarComp;
