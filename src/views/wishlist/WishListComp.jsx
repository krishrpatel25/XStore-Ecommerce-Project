import { useWishList } from "@/context/WishListContext";
import { useNavigate } from "react-router-dom";
import { FiTrash2 } from "react-icons/fi";

const Wishlist = () => {
  const { wishlist, removeWishlist } = useWishList();
  const navigate = useNavigate();

  if (wishlist.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[80vh] gap-4 min-h-screen">
        <i className="bi bi-heart text-5xl text-accent animate-pulse"></i>
        <h2 className="text-lg text-gray-500 font-medium">
          Your wishlist is empty ❤️
        </h2>

        <button
          onClick={() => navigate("/allproducts")}
          className="px-6 py-2 bg-primary text-white rounded-full hover:bg-accent transition"
        >
          Browse Products →
        </button>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-6 lg:px-20 ">
      <div className="pt-24 px-2">
        <h1 className="text-2xl font-semibold">My Wishlists</h1>
        <div className="flex gap-3">
          <div className="text-sm font-medium">
            <p>items in your wishlist</p>
          </div>
          <div
            onClick={() => navigate("/allproducts")}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            <p> View more →</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-10 mt-6 px-14 py-20">
        {wishlist.map((product) => (
          <div
            key={product.id}
            onClick={() => navigate(`/product/${product.id}`)}
            className="cursor-pointer relative group"
          >
            {/* REMOVE BUTTON */}
            <button
              className="absolute top-3 right-3 z-10 text-red-500 bg-white/70 backdrop-blur-sm rounded-full p-2 text-lg shadow hover:text-red-700"
              onClick={(e) => {
                e.stopPropagation();
                removeWishlist(product.id);
              }}
            >
              <FiTrash2 />
            </button>

            {/* IMAGE BOX */}
            <div className="w-full h-64 bg-white rounded-2xl shadow-sm flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:-translate-y-3 group-hover:shadow-xl group-hover:scale-[1.01]">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* TITLE + PRICE */}
            <div className="mt-3 flex justify-between items-center">
              <h2 className="text-base text-[12px] font-medium text-gray-900">
                {product.title}
              </h2>
              <p className="text-base text-[16px] text-accent font-semibold">
                ${product.price}
              </p>
            </div>

            {/* RATING */}
            <div className="flex items-center gap-1 mt-1">
              {Array.from({ length: 5 }, (_, i) => {
                const rating = product.rating || 4.5; // fallback if missing

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
    </div>
  );
};

export default Wishlist;
