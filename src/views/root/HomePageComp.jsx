import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  FiFacebook,
  FiInstagram,
  FiMail,
  FiStar,
  FiTwitter,
} from "react-icons/fi";
import "bootstrap-icons/font/bootstrap-icons.css"; // IMPORTANT
const HomePageComp = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Fetch products
  const getProductData = async () => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/products?limit=8&skip=0`
      );
      setProducts(res.data.products);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, []);

  const handleViewProduct = (id) => navigate(`/product/${id}`);
  const reviews = [
    {
      name: "Aarav Sharma",
      avatar: "https://i.pravatar.cc/100?img=12",
      rating: 5,
      review:
        "Amazing shopping experience! The delivery was fast and the packaging was premium.",
    },
    {
      name: "Sophia Patel",
      avatar: "https://i.pravatar.cc/100?img=32",
      rating: 4,
      review:
        "Great product quality. Customer support helped me choose the perfect headphones!",
    },
    {
      name: "Rohan Verma",
      avatar: "https://i.pravatar.cc/100?img=51",
      rating: 5,
      review:
        "Super easy returns and exchange. Definitely my favorite store to shop from!",
    },
  ];
  return (
    <>
      <main className="px-4 md:px-10 lg:px-30 pt-20">
        {/* ---------------------------------------- */}
        {/* HERO SLIDER */}
        {/* ---------------------------------------- */}
        <div className="flex flex-col md:flex-row gap-6 lg:px-0 mt-16">
          {/* ================================
          LEFT BIG BOX — CAROUSEL
      ================================= */}
          <div className=" w-full sm:w-full  col-span-2 w-[75%] bg-primary rounded-3xl p-0 overflow-hidden relative">
            <Carousel
              className="w-full"
              opts={{ loop: true, align: "start" }}
              plugins={[
                Autoplay({
                  delay: 3000,
                  stopOnInteraction: false,
                }),
              ]}
            >
              <CarouselContent className="flex w-full h-[450px] p-0 m-0">
                {/* ---- SLIDE 1 ---- */}
                <CarouselItem className="min-w-full flex-none h-[450px] p-0">
                  <div className="w-full h-full flex items-center relative">
                    {/* TEXT */}
                    <div className="w-1/2 h-full flex flex-col justify-center text-center items-center sm:text-start sm:items-start pl-12 lg:pl-16 z-20">
                      <p className="text-gray-700 mb-3">
                        Amazing Products From Store
                      </p>
                      <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
                        Explore Our New Designs...
                      </h1>
                      <button
                        onClick={() => navigate("/allproducts")}
                        className="px-6 py-3 bg-[#FF6A45] text-white hover:bg-secondary hover:text-foreground rounded-lg w-fit"
                      >
                        Shop Now
                      </button>
                    </div>

                    {/* IMAGE */}
                    <div>
                      <img
                        src="/src/assets/hero-1.png"
                        className="h-[75%] absolute right-8 lg:right-0 bottom-0 object-contain z-10"
                      />
                    </div>
                  </div>
                </CarouselItem>

                {/* ---- SLIDE 2 ---- */}
                <CarouselItem className="min-w-full flex-none h-[450px] p-0">
                  <div className="w-full h-full flex items-center relative">
                    <div className="w-1/2 h-full flex flex-col justify-center text-center items-center sm:text-start sm:items-start pl-12 lg:pl-16 z-20">
                      <p className="text-gray-700 mb-3">
                        Amazing Products From Store
                      </p>
                      <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
                        Explore Our New Designs...
                      </h1>
                      <button
                        onClick={() => navigate("/allproducts")}
                        className="px-6 py-3 bg-[#FF6A45] text-white hover:bg-secondary hover:text-foreground rounded-lg w-fit"
                      >
                        Shop Now
                      </button>
                    </div>

                    <div>
                      <img
                        src="/src/assets/hero-2.png"
                        className="h-[70%] absolute right-0 bottom-0 object-contain z-10"
                      />
                    </div>
                  </div>
                </CarouselItem>

                {/* ---- SLIDE 3 ---- */}
                <CarouselItem className="min-w-full flex-none h-[450px] p-0">
                  <div className="w-full h-full flex items-center relative">
                    <div className="w-1/2 h-full flex flex-col justify-center text-center items-center sm:text-start sm:items-start pl-12 lg:pl-16 z-20">
                      <p className="text-gray-700 mb-3">Trending Now</p>
                      <h1 className="text-4xl font-bold leading-tight text-gray-900 mb-6">
                        Upgrade Your Lifestyle...
                      </h1>
                      <button
                        onClick={() => navigate("/allproducts")}
                        className="px-6 py-3 bg-[#FF6A45] text-white hover:bg-secondary hover:text-foreground rounded-lg w-fit"
                      >
                        Shop Now
                      </button>
                    </div>
                    <div>
                      <img
                        src="/src/assets/hero-3.png"
                        className="h-[75%] absolute right-0 bottom-0 object-contain z-10"
                      />
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
            </Carousel>
          </div>

          {/* RIGHT COLUMN */}
          <div className="flex flex-col w-full md:w-[50%] h-[450px] justify-between">
            {/* RIGHT TOP BOX */}
            <div className="bg-accent rounded-3xl p-8 flex items-center justify-between h-[48%]">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">
                  Best Sale
                </h3>
                <p
                  onClick={() => navigate("/allproducts")}
                  className="text-gray-700 hover:text-background mt-2"
                >
                  View more →
                </p>
              </div>
              <div>
                <img
                  src="/src/assets/earbuds.png"
                  alt="Earbuds"
                  className="w-32 drop-shadow"
                />
              </div>
            </div>

            {/* RIGHT BOTTOM BOX */}
            <div className="bg-secondary rounded-3xl p-8 flex items-center justify-between h-[48%]">
              <div>
                <h3 className="text-3xl font-bold text-gray-900">30% OFF</h3>
                <p className="text-sm text-gray-700">Exclusive Discounts</p>
                <p
                  onClick={() => navigate("/allproducts")}
                  className="text-gray-700 hover:text-accent mt-2"
                >
                  View more →
                </p>
              </div>
              <div>
                <img
                  src="/src/assets/mobile.png"
                  alt="Watch"
                  className="w-32 drop-shadow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* ---------------------------------------- */}
        {/* HERO SUPPORT FEATURES */}
        {/* ---------------------------------------- */}
        <section className="w-full bg-secondary mt-6 rounded-xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 p-2">
          {/* 1 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-send-check-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Fast & Secure Delivery</h1>
              <p className="text-[14px]">Tell about your service</p>
            </div>
          </div>

          {/* 2 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-patch-check-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Money Back Guarantee</h1>
              <p className="text-[14px]">Within 10 days</p>
            </div>
          </div>

          {/* 3 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-arrow-left-square-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">24 Hour Return Policy</h1>
              <p className="text-[14px]">No questions asked</p>
            </div>
          </div>

          {/* 4 */}
          <div className="flex p-2 items-center gap-4 bg-secondary rounded-lg">
            <div className="p-4 text-4xl text-accent">
              <i className="bi bi-question-octagon-fill"></i>
            </div>
            <div>
              <h1 className="font-semibold">Pro Quality Support</h1>
              <p className="text-[14px]">24/7 Live support</p>
            </div>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* divider FEATURES */}
        {/* ---------------------------------------- */}
        <section className="flex flex-col text-center">
          <div className="flex pt-30 items-center justify-center gap-3">
            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            <h2 className="mx-4 text-primary text-xl md:text-2xl  font-semibold tracking-wide">
              Best Selling
            </h2>

            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </div>
          <div>
            <p className="text-foreground font-medium mt-3 text-[12px] md:text-sm px-2 md:px-40">
              Our most-loved products are here. From everyday essentials to
              premium picks, explore the items that consistently top the charts
              and win customer trust day after day.
            </p>
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* PRODUCT LISTING */}
        {/* ---------------------------------------- */}

        {loading ? (
          // LOADING UI
          <div className="h-screen flex items-center justify-center">
            <svg
              className="w-20 h-20 text-accent animate-pulse"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6 7V6a6 6 0 1112 0v1h3v15H3V7h3zm2 0h8V6a4 4 0 10-8 0v1z" />
            </svg>
          </div>
        ) : products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 mt-10 px-4 sm:px-12 lg:px-14">
            {products.map((product) => (
              <div
                key={product.id}
                onClick={() => handleViewProduct(product.id)}
                className="cursor-pointer"
              >
                {/* Image Box */}
                <div className=" w-full h-64 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden transition-all duration-300 group hover:-translate-y-3 hover:shadow-xl hover:scale-[1.01] ">
                  {" "}
                  <img
                    src={product.images[0]}
                    alt={product.title}
                    className=" h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 "
                  />{" "}
                </div>

                {/* Title + Price */}
                <div className="mt-3 flex justify-between items-center">
                  <h2 className="text-base text-[12px] font-medium text-gray-900">
                    {product.title}
                  </h2>

                  <p className="text-base text-[16px] text-accent font-semibold">
                    ${product.price}
                  </p>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: 5 }, (_, i) => {
                    const rating = product.rating;

                    if (i < Math.floor(rating)) {
                      return (
                        <i
                          key={i}
                          className="bi bi-star-fill text-green-500 text-[12px]"
                        ></i>
                      );
                    } else if (i < rating) {
                      return (
                        <i
                          key={i}
                          className="bi bi-star-half text-green-500 text-[12px]"
                        ></i>
                      );
                    } else {
                      return (
                        <i
                          key={i}
                          className="bi bi-star text-gray-300 text-[12px]"
                        ></i>
                      );
                    }
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          // NO PRODUCTS
          <div className="w-full h-[392px] flex items-center justify-center">
            <h1>No product found!! Try another page!</h1>
          </div>
        )}

        {/* ---------------------------------------- */}
        {/* PRODUCT Review */}
        {/* ---------------------------------------- */}
        <section className="w-full py-20">
          <section className="flex  flex-col text-center">
            <div className="flex pt-30 items-center justify-center gap-3">
              <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
              <h2 className="mx-4 text-primary text-xl md:text-2xl font-semibold tracking-wide">
                What Our Customers Say
              </h2>

              <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent"></div>
            </div>
            <div>
              <p className="text-foreground font-medium mt-3 text-[12px] md:text-sm px-2 md:px-40">
                Every purchase tells a story — and our customers choose XStore
                not just for the products, but for the experience. Their words
                reflect the quality and trust we work tirelessly to deliver.
              </p>
            </div>
          </section>

          {/* Heading */}

          {/* REVIEW GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 pt-16 gap-10">
            {reviews.map((r, i) => (
              <div
                key={i}
                className="group relative p-8 rounded-4xl rounded-t-[10px] bg-primary "
              >
                {/* Accent Gradient Line */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-accent to-white rounded-t-3xl" />

                {/* Avatar + Name + Stars */}
                <div className="flex items-center gap-4 mb-5 ">
                  <img
                    src={r.avatar}
                    alt={r.name}
                    className="w-10 h-10 rounded-full object-cover shadow-md border"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-white">
                      {r.name}
                    </h3>

                    <div className="flex">
                      {Array.from({ length: r.rating }).map((_, idx) => (
                        <FiStar
                          key={idx}
                          size={12}
                          className="text-accent fill-accent"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quote Icon */}
                <div className="text-accent text-4xl opacity-30 absolute right-6 top-6">
                  “
                </div>

                {/* Review Text */}
                <p className="text-white text-[12px] leading-relaxed mt-2">
                  {r.review}
                </p>

                {/* Footnote */}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------------------------------- */}
        {/* feedback section */}
        {/* ---------------------------------------- */}
        <section className="py-20">
          <div
            className="w-full rounded-3xl bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('/src/assets/feedback.png')",
            }}
          >
            <div className="rounded-3xl w-full sm:w-fit mx-auto sm:ml-10 p-6 sm:p-8 lg:p-12">
              {/* Newsletter Label */}
              <div className="flex items-center gap-2 text-gray-700 mb-3">
                <FiMail className="text-background" size={22} />
                <span className="font-medium text-background">Newsletter</span>
              </div>

              {/* Heading */}
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 leading-snug mb-6">
                Get Weekly Updated about Products
              </h2>

              {/* Input + Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-3">
                <input
                  type="email"
                  placeholder="xyz@abc.com"
                  className="px-3 py-2 rounded-xl bg-white border border-gray-300 focus:ring-2 focus:ring-accent outline-none transition  w-full sm:w-72"
                />

                <button className=" px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-primary hover:text-foreground transition font-medium w-full sm:w-auto">
                  Subscribe
                </button>
              </div>

              {/* Subtext */}
              <p className="text-background text-sm max-w-sm">
                Get weekly updates, discounts & product news. No spam.
              </p>
            </div>
          </div>
        </section>
      </main>
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
    </>
  );
};

export default HomePageComp;
