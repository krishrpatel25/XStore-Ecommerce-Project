import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartsContext";
import { useNavigate } from "react-router-dom";
import QuantityControl from "../view-product/component/QuantityControl";

const CartComp = () => {
  const { cart, updateCart, removeProduct } = useCart();
  const navigate = useNavigate();

  const subTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const shippingCost = 150;
  const discount = 50;
  const finalTotal = subTotal + shippingCost - discount;

  const handleViewProduct = (item) => {
    navigate(`/product/${item.id}`);
  };

  const format = (num) =>
    num.toLocaleString("en-US", { minimumFractionDigits: 2 });

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 justify-center h-[80vh] md:h-[85vh]">
        <div>
          <p className="text-center text-gray-500 text-2xl md:text-3xl font-medium">
            Your cart is empty 🛒
          </p>
        </div>
        <div
          onClick={() => navigate("/allproducts")}
          className="relative w-fit cursor-pointer text-accent hover:text-primary transition
                  before:content-[''] before:absolute before:-bottom-1 before:left-0 
                  before:w-0 before:h-[2px] before:bg-primary 
                  before:transition-all before:duration-500 
                  hover:before:w-full"
        >
          <p>Shop Now ❯</p>
        </div>
      </div>
    );
  }

  // Subtotal = sum of products

  return (
    <section className="px-4 md:px-6 lg:px-20">
      <div className="pt-24 px-2">
        <h1 className="text-2xl font-semibold">My Cart</h1>
        <div className="flex gap-3">
          <div className="text-sm font-medium">
            <p>items in your cart</p>
          </div>
          <div
            onClick={() => navigate("/allproducts")}
            className="text-sm text-primary font-medium cursor-pointer"
          >
            <p> View more →</p>
          </div>
        </div>
      </div>

      <div className="pt-10 py-12 min-h-[100vh] max-h-max flex flex-col lg:flex-row gap-10">
        {/* LEFT: CART ITEMS */}
        <div className="w-full lg:w-3/4">
          {/* Table Header — Hidden on Mobile */}
          <div className="hidden sm:grid grid-cols-12 font-semibold text-gray-600 mb-4 px-2">
            <p className="col-span-6">Product</p>
            <p className="col-span-3 text-center">Quantity</p>
            <p className="col-span-2 text-center">Total Price</p>
            <p className="col-span-1 text-right">Remove</p>
          </div>

          {/* MOBILE SLIDER WRAPPER */}
          <div className="sm:hidden overflow-x-auto pb-2">
            <div className="flex flex-nowrap gap-4">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="min-w-[280px] bg-secondary p-4 rounded-2xl shadow-md "
                >
                  {/* PRODUCT */}
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-secondary">
                      <img
                        src={item.image}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    </div>

                    <div>
                      <h2 className="font-medium text-[13px] text-gray-800">
                        {item.title}
                      </h2>
                      <p className="text-[11px] text-gray-500">
                        {item.category}
                      </p>
                      <p className="text-accent font-semibold text-[13px]">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* QTY */}
                  <div className="mt-3">
                    <div className="flex items-center bg-secondary px-2 py-1 rounded-xl w-max">
                      <button
                        className="text-sm font-medium px-2 hover:text-accent"
                        onClick={() => updateCart(item.id, item.qty - 1)}
                      >
                        -
                      </button>

                      <span className="text-sm font-semibold w-5 text-center">
                        {item.qty}
                      </span>

                      <button
                        className="text-sm font-medium px-2 hover:text-accent"
                        onClick={() => updateCart(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* TOTAL + REMOVE */}
                  <div className="flex justify-between items-center mt-3">
                    <p className="font-bold text-primary text-[15px]">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>

                    <button
                      onClick={() => removeProduct(item.id)}
                      className="text-red-500 hover:text-red-700 text-lg"
                    >
                      <FiTrash2 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* DESKTOP + TABLET LAYOUT */}
          <div className="hidden sm:block">
            {cart.map((item) => (
              <div
                key={item.id}
                onClick={() => handleViewProduct(item)}
                className="grid grid-cols-12 items-center py-6 mb-4"
              >
                <div className="col-span-6 flex items-center gap-6">
                  <div className="p-2 rounded-2xl bg-secondary">
                    <img
                      src={item.image}
                      className="w-14 h-14 rounded-xl object-cover"
                    />
                  </div>

                  <div>
                    <h2 className="font-medium text-[14px] text-gray-800">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <p className="text-accent font-semibold text-sm">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="col-span-3 flex items-center justify-center">
                  <div className="flex gap-4 w-full">
                    <div className="col-span-3 flex items-center justify-center">
                      <QuantityControl
                        qty={item.qty}
                        stopClick={true}
                        onIncrease={() => updateCart(item.id, item.qty + 1)}
                        onDecrease={() => updateCart(item.id, item.qty - 1)}
                      />
                    </div>
                  </div>
                </div>

                <p className="col-span-2 text-center font-bold text-primary text-lg">
                  ${(item.price * item.qty).toFixed(2)}
                </p>

                <div className="col-span-1 text-right pr-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeProduct(item.id);
                    }}
                    className="text-red-500 hover:text-red-700 text-xl"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block w-[2px] min-h-[80vh] bg-primary py-10"></div>
        <div className="lg:hidden h-[2px] min-w-[10vh] bg-primary"></div>

        {/* RIGHT: PRICE SUMMARY */}
        <div className="w-full lg:w-1/3">
          <div className="p-4 sm:p-6 top-28 rounded-2xl bg-secondary/80 backdrop-blur-lg border border-background shadow-lg">
            {/* Heading */}
            <h2 className="text-lg sm:text-2xl font-bold text-center text-gray-800 mb-3 sm:mb-4">
              Price Details
            </h2>

            <hr className="border-primary" />

            {/* Subtotal */}
            <div className="flex justify-between text-gray-700 mt-3 sm:mt-4 text-sm sm:text-base">
              <p>Sub Total</p>
              <p className="font-medium">${format(subTotal)}</p>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-gray-700 mt-2 text-sm sm:text-base">
              <p>Shipping Cost</p>
              <p className="font-medium">${format(shippingCost)}</p>
            </div>

            {/* Discount */}
            <div className="flex justify-between text-gray-700 mt-2 text-sm sm:text-base">
              <p>Discount</p>
              <p className="font-medium text-green-600">-${format(discount)}</p>
            </div>

            <hr className="my-4 border-primary" />

            {/* TOTAL */}
            <div className="flex justify-between text-gray-900 text-lg sm:text-xl font-bold">
              <p>Total</p>
              <p className="text-accent">${format(finalTotal)}</p>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigate("/checkoutform")}
              className="w-full mt-5 sm:mt-6 py-2.5 sm:py-3 bg-primary text-background hover:bg-accent rounded-lg font-semibold shadow hover:opacity-90 transition text-sm sm:text-base"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartComp;
