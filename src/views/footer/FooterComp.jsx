import React from "react";
import { FiFacebook, FiInstagram, FiTwitter } from "react-icons/fi";

const FooterComp = () => {
  return (
    <>
      <footer className="w-full bg-primary border-t border-gray-200 py-14">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">XStore</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Premium products. Trusted service. Your favorite shopping
              destination.
            </p>
            <div className="mt-5 flex gap-4 text-gray-500">
              <FiFacebook size={22} className="hover:text-accent transition" />
              <FiInstagram size={22} className="hover:text-accent transition" />
              <FiTwitter size={22} className="hover:text-accent transition" />
            </div>
          </div>

          {/* Column 2 */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Shop</h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              {["Men", "Wishlist", "Electronics", "Accessories"].map((item) => (
                <li
                  key={item}
                  className="relative w-fit cursor-pointer text-gray-600 hover:text-accent transition
                  before:content-[''] before:absolute before:-bottom-1 before:left-0 
                  before:w-0 before:h-[2px] before:bg-accent 
                  before:transition-all before:duration-300 
                  hover:before:w-full"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Customer Support
            </h4>
            <ul className="space-y-2 text-gray-600 text-sm">
              {[
                "Help Center",
                "Track Order",
                "Returns & Refund",
                "Shipping Info",
              ].map((item) => (
                <li
                  key={item}
                  className="relative w-fit cursor-pointer text-gray-600 hover:text-accent transition
                  before:content-[''] before:absolute before:-bottom-1 before:left-0 
                  before:w-0 before:h-[2px] before:bg-accent 
                  before:transition-all before:duration-300 
                  hover:before:w-full"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Download App</h4>
            <p className="text-gray-600 text-sm mb-4">
              Shop easier with our mobile app.
            </p>
            <div className="flex w-full gap-3">
              <div className="w-[50%]">
                <img
                  src="/src/assets/qrCode.png"
                  className="h-24 w-24 hover:opacity-80 transition"
                />
              </div>
              <div className="flex flex-col items-center justify-between w-[50%]">
                <div>
                  <img
                    src="/src/assets/playstore.png"
                    className="h-10 w-30 hover:opacity-80 transition"
                  />
                </div>
                <div>
                  <img
                    src="/src/assets/appstore.png"
                    className="h-10 w-30 hover:opacity-80 transition"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="w-full bottom-0  bg-bbackground py-4 shadow-inner">
        <p className="text-center text-gray-700 text-[12px] md:text-sm">
          Copyright 2025 © XStore All Right Reserved.
        </p>
      </div>
    </>
  );
};

export default FooterComp;
