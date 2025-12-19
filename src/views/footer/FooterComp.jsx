import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";
import { NavLink, useNavigate } from "react-router-dom";
import qrcode from "@/assets/qrCode.png";
import appstore from "@/assets/appstore.png";
import playstore from "@/assets/playstore.png";
const FooterComp = () => {
  return (
    <>
      <footer className="w-full bg-primary border-t-2 border-foreground pt-16 relative overflow-hidden">
        {/* BACKGROUND DECOR: Large Serial Number */}
        <div className="absolute bottom-0 right-0 text-[15vw] opacity-[0.02] select-none leading-none pointer-events-none">
          XS_2025
        </div>

        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
          {/* Column 1: Core Identification */}
          <div className="space-y-6 ">
            <NavLink
              to="/"
              className="flex-shrink-0 group relative px-6 py-1 border-x border-foreground/10"
            >
              <div className="absolute top-0 left-0 w-1 h-1 bg-primary" />
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-primary" />

              <span className="text-2xl py-4 font-black uppercase tracking-tighter italic text-foreground transition-all group-hover:text-background group-hover:skew-x-[-10deg] inline-block">
                XStore
              </span>
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[7px] font-mono opacity-30 tracking-[0.5em] uppercase">
                Ver_2.0.25
              </span>
            </NavLink>
            <p className="font-semibold text-[11px] uppercase tracking-widest leading-relaxed text-foreground/50 max-w-[240px]">
              Premium assets.{" "}
              <span className="text-foreground/80 font-bold">
                Validated logistics.
              </span>{" "}
              Your primary source for industrial-grade consumer units.
            </p>
            <div className="flex text-bold gap-6">
              <FiFacebook
                size={18}
                className="hover:text-background transition-colors cursor-pointer"
              />
              <FiInstagram
                size={18}
                className="hover:text-background transition-colors cursor-pointer"
              />
              <FiTwitter
                size={18}
                className="hover:text-background transition-colors cursor-pointer"
              />
            </div>
          </div>

          {/* Column 2: Index / Shop */}
          <div>
            {/* SECTION HEADER BOLDED */}
            <h4 className="font-semibold text-[11px] font-black uppercase tracking-[0.4em] mb-8 text-foreground pb-2 border-b-2 border-foreground/10">
              Directory_01
            </h4>
            <ul className="space-y-4 font-semibold text-[11px] uppercase tracking-widest text-foreground/70">
              {[
                { name: "cart", path: "/cart" },
                { name: "Wishlist", path: "/wishlist" },
                { name: "Order", path: "/order" },
                { name: "My_Profile", path: "/profile" },
              ].map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={item.path}
                    className="group flex items-center gap-2 cursor-pointer hover:text-background hover:font-bold transition-all"
                  >
                    <span className="w-0 group-hover:w-3 h-[2px] bg-background transition-all" />
                    {item.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Support Protocols */}
          <div>
            {/* SECTION HEADER BOLDED */}
            <h4 className="font-semibold text-[11px] uppercase tracking-[0.4em] mb-8 text-foreground pb-2 border-b-2 border-foreground/10">
              Service_Log
            </h4>
            <ul className="space-y-4 font-semibold text-[11px] uppercase tracking-widest text-foreground/70">
              {[
                "Help Center",
                "Track Order",
                "Returns & Refund",
                "Shipping Info",
              ].map((item) => (
                <li
                  key={item}
                  className="group flex items-center gap-2 cursor-pointer hover:text-background hover:font-bold transition-all"
                >
                  <span className="w-0 group-hover:w-3 h-[2px] bg-background transition-all" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Interface Expansion (App) */}
          <div className="relative group">
            {/* SECTION HEADER BOLDED */}
            <h4 className="font-semibold text-[11px] uppercase tracking-[0.4em] mb-8 text-foreground pb-2 border-b-2 border-foreground/10">
              Mobile_Uplink
            </h4>
            <div className="bg-foreground/[0.03] border-2 border-foreground/10 p-5">
              <p className="font-semibold text-[9px] font-bold uppercase tracking-widest mb-6 text-foreground/40">
                Scan QR to synchronize mobile interface:
              </p>
              <div className="flex gap-4">
                <div className="relative p-1 border-2 border-foreground/20 bg-white">
                  <img
                    src={qrcode}
                    className="h-20 w-20 grayscale brightness-90"
                    alt="QR"
                  />
                  <div className="absolute inset-0 border-2 border-accent transition-opacity pointer-events-none" />
                </div>
                <div className="flex flex-col justify-between">
                  <img
                    src={playstore}
                    className="h-8 w-auto "
                  />
                  <img
                    src={appstore}
                    className="h-8 w-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* COPYRIGHT STRIP */}
        <div className="mt-20 border-t-2 bg-secondary border-foreground/10 py-10 px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-semibold text-[10px] uppercase tracking-[0.3em] text-foreground/40">
            © 2025 XStore //{" "}
            <span className="text-accent">All Rights Reserved</span> //
            System_v4.0.1
          </p>
          <div className="flex gap-6 font-semibold text-[8px] uppercase tracking-widest">
            <span className="opacity-20">Latency: 14ms</span>
            <span className="text-accent">Encrypted: Yes</span>
            <span className="opacity-20">Status: Terminal_Stable</span>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FooterComp;
