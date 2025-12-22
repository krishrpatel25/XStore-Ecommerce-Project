import { FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartsContext";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import EmptyCart from "./component/EmptyCart.jsx";
import { customToast } from "@/components/ui/CustomToast.jsx";

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

  const handleRemoveProduct = (id) => {
    removeProduct(id);
    customToast({
      text: "Product removed from your Cart",
      icon: <i className="bi bi-cart-x-fill text-accent text-xl"></i>,
      color: "var(--accent)",
    });
  };

  if (cart.length === 0) {
    return <EmptyCart />;
  }

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
                className="group grid grid-cols-1 sm:grid-cols-12 items-center py-8 gap-6 sm:gap-0 relative hover:bg-secondary/5 transition-colors px-2 cursor-pointer"
                onClick={() => handleViewProduct(item)}
              >
                {/* PRODUCT INFO */}
                <div className="sm:col-span-5 flex items-center gap-6">
                  <div className="relative flex-shrink-0">
                    <img
                      src={item.image}
                      className="w-20 h-20 md:w-20 md:h-20 p-2 object-cover border border-foreground/10 "
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
                      <p className="text-[10px] font-mono text-foreground/60 uppercase tracking-widest">
                        Unit_Val:{" "}
                        <span className="text-foreground font-bold">
                          ${format(item.price)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* INTERACTIVE ROW WRAPPER */}
                <div
                  className="flex items-center justify-between sm:contents"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* QTY CONTROL */}
                  <div className="sm:col-span-3 flex justify-start sm:justify-center">
                    <div className="flex items-center border border-foreground/20 p-1 bg-background">
                      <button
                        className="w-8 h-8 flex items-center justify-center hover:bg-accent hover:text-background transition-all font-mono"
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
                      ${format(item.price * item.qty)}
                    </p>
                  </div>

                  {/* REMOVE ACTION */}
                  <div className="sm:col-span-1 flex justify-end">
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <button className="p-3 border border-red-500/20 text-red-500 hover:bg-red-500 hover:text-background transition-all relative z-10">
                          <FiTrash2 size={18} />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-background border-2 border-primary rounded-none font-mono">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="uppercase tracking-widest font-black italic">
                            Confirm_Delete
                          </AlertDialogTitle>
                          <AlertDialogDescription className="text-[11px] uppercase font-medium text-foreground tracking-tighter">
                            Are you sure you want to remove{" "}
                            <span className="text-primary">[{item.title}]</span>{" "}
                            from the inventory buffer?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel className="rounded-none border-foreground/20 uppercase text-[10px]">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            className="rounded-none bg-red-600 text-white uppercase text-[10px] font-black"
                            onClick={() => handleRemoveProduct(item.id)}
                          >
                            Confirm_Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PRICE SUMMARY */}
        <div className="w-full lg:w-[35%] xl:w-1/4">
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
