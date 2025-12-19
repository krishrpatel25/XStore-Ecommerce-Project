import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartsContext";
import { useNavigate } from "react-router-dom";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { toast } from "sonner";

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

  const handleRemoveProduct = (e, item) => {
    e.stopPropagation();
    removeProduct(item.id);

    toast("Product removed from your Cart", {
      icon: <i className="bi bi-cart-x-fill text-accent text-xl"></i>,
      style: {
        color: "var(--accent)",
      },
    });
  };

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] w-full min-h-screen px-6 py-10 bg-background relative overflow-hidden">
        {/* BACKGROUND ACCENT */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] select-none pointer-events-none">
          <h2 className="text-[40vw] font-black leading-none">00</h2>
        </div>

        <div className="relative z-10 flex flex-col items-center w-full max-w-[320px] md:max-w-none">
          {/* MICRO-LABELS (Perfect for Mobile) */}
          <div className="flex flex-col items-center mb-8">
            <div className="flex items-center gap-1.5 px-2 py-0.5 border border-red-600/40 bg-red-600/5 mb-2">
              <span className="w-1 h-1 bg-red-600 animate-pulse" />
              <p className="text-[8px] md:text-[10px] font-mono font-bold text-red-600 uppercase tracking-tighter">
                System.Alert_Empty_cart
              </p>
            </div>
            <p className="text-[7px] font-mono opacity-30 uppercase tracking-[0.3em]">
              Code_Ref: 0x00021
            </p>
          </div>

          {/* MAIN TEXT: Scaled for narrow screens */}
          <div className="text-center mb-10">
            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-foreground">
              Empty_
              <br />
              Inventory
            </h1>
            <p className="mt-4 font-mono text-[9px] md:text-[11px] uppercase tracking-widest leading-loose text-foreground/60 px-4">
              Manifest index is currently{" "}
              <span className="text-primary font-bold">Empty</span>.
              Re-synchronize with primary asset database to continue.
            </p>
          </div>

          {/* COMPACT TECHNICAL BUTTON */}
          <button
            onClick={() => navigate("/allproducts")}
            className="group relative w-[60%] md:w-auto bg-primary text-background px-6 py-4 transition-all active:scale-95"
          >
            <div className="flex items-center justify-between md:justify-center md:gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                BROWSE_Product
              </span>
              <span className="text-sm font-bold">❯❯</span>
            </div>

            {/* Brutalist Shadow Accent */}
            <div className="absolute -bottom-1 -right-1 w-full h-full border border-foreground -z-10 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
          </button>

          {/* SYSTEM LOGS (Tiny side-notes) */}
          <div className="mt-12 w-full border-t border-foreground/5 pt-4 flex flex-col gap-1 items-center opacity-40">
            <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
              <span>Log_Path</span>
              <span>/root/cart/null</span>
            </div>
            <div className="flex justify-between w-full max-w-[200px] text-[7px] font-mono uppercase tracking-tighter">
              <span>Thread_Status</span>
              <span className="text-green-600">Active</span>
            </div>
          </div>
        </div>

        {/* SCAN LINE EFFECT */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%]" />
      </div>
    );
  }

  // Subtotal = sum of products

  return (
    <section className="px-4 md:px-10 lg:px-24 pt-24 md:pt-32 min-h-screen">
      {/* HEADER SECTION */}
      <div className="border-b border-foreground/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none">
            Inventory_<span className="text-primary">Cart</span>
          </h1>
          <div className="flex items-center gap-3 mt-4">
            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-[0.3em]">
              [{cart.length}] Items_Stored
            </span>
            <button
              onClick={() => navigate("/allproducts")}
              className="text-[10px] font-mono opacity-50 hover:text-primary hover:opacity-100 transition-all uppercase underline underline-offset-4"
            >
              Add_More_Assets →
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-12 py-12">
        {/* LEFT: CART ITEMS */}
        <div className="w-full lg:w-[65%] xl:w-3/4">
          {/* DESKTOP HEADER */}
          <div className="hidden sm:grid grid-cols-12 font-mono text-[10px] uppercase tracking-widest opacity-40 border-b border-foreground/10 pb-4 mb-4">
            <p className="col-span-5">Asset_Description</p>
            <p className="col-span-3 text-center">Unit_Control</p>
            <p className="col-span-3 text-center">Subtotal</p>
            <p className="col-span-1 text-right">Delete</p>
          </div>

          <div className="flex flex-col divide-y divide-foreground/10 border-t border-foreground/5 md:border-t-0">
            {cart.map((item) => (
              <div
                key={item.id}
                className="group grid grid-cols-1 sm:grid-cols-12 items-center py-8 gap-6 sm:gap-0 relative hover:bg-secondary/5 transition-colors px-2"
              >
                {/* PRODUCT INFO */}
                <div
                  className="sm:col-span-5 flex items-center gap-6 cursor-pointer"
                  onClick={() => handleViewProduct(item)}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-20 h-20 md:w-20 md:h-20 p-2 object-cover border border-foreground/10 grayscale group-hover:grayscale-0 transition-all"
                      alt={item.title}
                    />
                    <div className="absolute -top-2 -left-2 w-2 h-2 border-t border-l border-primary" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-black uppercase italic tracking-tighter text-lg leading-tight group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h2>
                    <div className="mt-1 space-y-0.5">
                      <p className="text-[10px] font-mono opacity-50 uppercase tracking-widest">
                        Cat: {item.category}
                      </p>
                      {/* ORIGINAL UNIT PRICE ADDED HERE */}
                      <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest">
                        Unit_Val:{" "}
                        <span className="text-foreground font-bold">
                          ${item.price.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE ROW */}
                <div className="flex items-center justify-between sm:contents">
                  {/* QTY CONTROL */}
                  <div className="sm:col-span-3 flex justify-start sm:justify-center">
                    <div
                      className="flex items-center border border-foreground/20 p-1 bg-background"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-background transition-all font-mono"
                        onClick={() => updateCart(item.id, item.qty - 1)}
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-mono text-sm font-bold">
                        {item.qty}
                      </span>
                      <button
                        className="w-8 h-8 flex items-center justify-center hover:bg-primary hover:text-background transition-all font-mono"
                        onClick={() => updateCart(item.id, item.qty + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* SUBTOTAL */}
                  <div className="sm:col-span-3 text-center">
                    <p className="font-black italic text-xl tracking-tighter text-primary">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>

                  {/* REMOVE ACTION */}
                  <div className="sm:col-span-1 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className="p-3 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-background transition-all relative z-10"
                        >
                          <FiTrash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      {/* ... AlertDialogContent ... */}
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRICE SUMMARY */}
        <div className="w-full lg:w-[35%] xl:w-1/4">
          {/* ... Summary Logic Remains Exactly The Same ... */}
          <div className="sticky top-28 border-2 border-primary p-6 bg-background shadow-[8px_8px_0px_0px_rgba(var(--primary),0.1)]">
            <h2 className="text-xs font-mono font-black uppercase tracking-[0.5em] mb-8 border-b border-foreground/10 pb-2">
              Final_Assessment
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between text-[11px] font-mono uppercase opacity-60">
                <p>Subtotal_Accumulated</p>
                <p className="font-bold">${format(subTotal)}</p>
              </div>
              <div className="flex justify-between text-[11px] font-mono uppercase opacity-60">
                <p>Logistics_Fee</p>
                <p className="font-bold">${format(shippingCost)}</p>
              </div>
              <div className="flex justify-between text-[11px] font-mono uppercase">
                <p>System_Discount</p>
                <p className="font-bold text-green-600">-${format(discount)}</p>
              </div>
              <div className="h-[1px] bg-foreground/10 my-6" />
              <div className="flex justify-between items-baseline">
                <p className="text-[10px] font-mono font-black uppercase tracking-widest">
                  Grand_Total
                </p>
                <p className="text-4xl font-black italic tracking-tighter text-accent">
                  ${format(finalTotal)}
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate("/checkoutform")}
              className="w-full mt-10 py-5 bg-foreground text-background hover:bg-primary transition-all font-black uppercase tracking-[0.3em] text-xs"
            >
              Proceed_to_Execution
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CartComp;
