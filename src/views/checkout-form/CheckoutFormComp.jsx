import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IZodSchema } from "./IZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DevTool } from "@hookform/devtools";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartsContext";
import { useOrders } from "@/context/OrdersContext";
import { customToast } from "@/components/ui/CustomToast";

const locationData = {
  India: {
    Gujarat: ["Ahmedabad", "Surat", "Amreli", "Gandhinagar"],
    Rajasthan: ["Jaipur", "Udaipur"],
    Goa: ["Panaji"],
    Karnataka: ["Bengaluru", "Mysuru"],
  },
  USA: {
    California: ["Los Angeles", "San Diego"],
    Texas: ["Houston", "Dallas"],
  },
  France: {
    Paris: ["Paris"],
  },
  UAE: {
    Dubai: ["Dubai"],
  },
};

const defaultFormValues = {
  firstName: "",
  lastName: "",
  email: "",
  mobile: "",
  addressLine1: "",
  addressLine2: "",
  city: "",
  state: "",
  country: "",
};

const CheckoutFormComp = () => {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const { createOrder } = useOrders();

  const form = useForm({
    resolver: zodResolver(IZodSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { register, watch, setValue, handleSubmit, formState, control } = form;

  const { errors, isValid, isDirty } = formState;

  const selectedCountry = watch("country");
  const selectedState = watch("state");

  /* ✅ REGISTER DROPDOWN FIELDS */
  useEffect(() => {
    register("country");
    register("state");
    register("city");
  }, [register]);

  const onSubmit = (data) => {
    if (cart.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    createOrder(cart, {
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        mobile: data.mobile,
      },
      address: {
        address: `${data.addressLine1}, ${data.addressLine2}`,
        city: data.city,
        state: data.state,
        country: data.country,
      },
    });

    clearCart();
    customToast({
      text: "Order placed successfully",
      icon: <i class="bi bi-check-circle-fill text-xl"></i>,
      color: "var(--primary)",
    });
    navigate("/order");
  };

  const isDevTool = false;

  return (
    <div className="min-h-screen bg-background text-foreground pt-28 pb-12 px-6 md:px-10 lg:px-24 relative overflow-hidden font-sans">
      {/* --- BACKGROUND DECOR --- */}
      <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px] -z-10" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-repeat" />

      {/* --- HEADER --- */}
      <div className="mb-12 border-b-2 border-foreground pb-8">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-2 h-2 bg-primary animate-pulse" />
          <p className="text-[10px] font-mono font-black uppercase tracking-[0.4em] text-primary">
            Secure_Transaction_v2.0
          </p>
        </div>
        <h1 className="text-4xl font-[1000] italic uppercase tracking-tighter text-foreground leading-none">
          Checkout_<span className="text-primary">Form</span>
        </h1>
        <p className="text-[10px] font-mono opacity-40 mt-2 uppercase tracking-[0.2em]">
          Shipping & contact information protocol
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <form
          id="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-16"
        >
          {/* SECTION: PERSONAL */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-mono font-black text-primary uppercase tracking-[0.3em] mb-2">
                [01] Personal_Details
              </h2>
              <div className="h-px bg-foreground/10 w-12" />
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  First_Name
                </label>
                <input
                  placeholder="your firstname"
                  {...register("firstName")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary focus:bg-primary/5 outline-none transition-all "
                />
                {errors.firstName && (
                  <p className="text-[10px] font-mono text-accent uppercase tracking-tighter">
                    ! {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  Last_Name
                </label>
                <input
                  placeholder="your lastname"
                  {...register("lastName")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary focus:bg-primary/5 outline-none transition-all "
                />
                {errors.lastName && (
                  <p className="text-[10px] font-mono text-accent uppercase tracking-tighter">
                    ! {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* SECTION: CONTACT */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-mono font-black text-primary uppercase tracking-[0.3em] mb-2">
                [02] Contact_Uplink
              </h2>
              <div className="h-px bg-foreground/10 w-12" />
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="group space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  Mobile_Line
                </label>
                <input
                  placeholder="9876543210"
                  {...register("mobile")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary focus:bg-primary/5 outline-none transition-all "
                />
                {errors.mobile && (
                  <p className="text-[10px] font-mono text-accent uppercase tracking-tighter">
                    ! {errors.mobile.message}
                  </p>
                )}
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  Email_Address
                </label>
                <input
                  placeholder="you@email.com"
                  {...register("email")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary focus:bg-primary/5 outline-none transition-all "
                />
                {errors.email && (
                  <p className="text-[10px] font-mono text-accent uppercase tracking-tighter">
                    ! {errors.email.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* SECTION: SHIPPING */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <h2 className="text-sm font-mono font-black text-primary uppercase tracking-[0.3em] mb-2">
                [03] Shipping_Coords
              </h2>
              <div className="h-px bg-foreground/10 w-12" />
            </div>

            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  Address_Line_01
                </label>
                <textarea
                  placeholder="House no, street name"
                  {...register("addressLine1")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary outline-none transition-all  h-24"
                />
                {errors.addressLine1 && (
                  <p className="text-[10px] font-mono text-accent uppercase tracking-tighter">
                    ! {errors.addressLine1.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                  Address_Line_02 (Optional)
                </label>
                <textarea
                  placeholder="Area, landmark"
                  {...register("addressLine2")}
                  className="w-full bg-secondary/50 border-b-2 border-foreground/10 p-3 text-sm font-mono focus:border-primary outline-none transition-all h-24"
                />
              </div>

              {/* DROPDOWNS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Country Dropdown */}
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                    Country_Node
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="w-full bg-secondary border-b-2 border-foreground/10 px-3 py-3 text-left font-mono text-xs uppercase hover:border-primary transition-all">
                      {selectedCountry || "Select Country"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border-foreground/10 font-mono uppercase text-[10px]">
                      {Object.keys(locationData).map((country) => (
                        <DropdownMenuItem
                          key={country}
                          onClick={() => {
                            setValue("country", country, {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setValue("state", "", {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                            setValue("city", "", {
                              shouldDirty: true,
                              shouldValidate: true,
                            });
                          }}
                        >
                          {country}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* State Dropdown */}
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                    State_Region
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={!selectedCountry}
                      className="w-full bg-secondary border-b-2 border-foreground/10 px-3 py-3 text-left font-mono text-xs uppercase hover:border-primary transition-all disabled:opacity-30"
                    >
                      {selectedState || "Select State"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border-foreground/10 font-mono uppercase text-[10px]">
                      {selectedCountry &&
                        Object.keys(locationData[selectedCountry]).map(
                          (state) => (
                            <DropdownMenuItem
                              key={state}
                              onClick={() =>
                                setValue("state", state, {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                })
                              }
                            >
                              {state}
                            </DropdownMenuItem>
                          )
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                {/* City Dropdown */}
                <div className="space-y-2">
                  <label className="text-[9px] font-mono font-bold text-accent/40 uppercase tracking-widest">
                    City_Terminal
                  </label>
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      disabled={!selectedState}
                      className="w-full bg-secondary border-b-2 border-foreground/10 px-3 py-3 text-left font-mono text-xs uppercase hover:border-primary transition-all disabled:opacity-30"
                    >
                      {watch("city") || "Select City"}
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-background border-foreground/10 font-mono uppercase text-[10px]">
                      {selectedCountry &&
                        selectedState &&
                        locationData[selectedCountry][selectedState].map(
                          (city) => (
                            <DropdownMenuItem
                              key={city}
                              onClick={() =>
                                setValue("city", city, {
                                  shouldDirty: true,
                                  shouldValidate: true,
                                })
                              }
                            >
                              {city}
                            </DropdownMenuItem>
                          )
                        )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER ACTION */}
          <div className="pt-10 border-t border-foreground/10 flex flex-col items-center">
            <button
              type="submit"
              form="checkout-form"
              disabled={!isDirty || !isValid}
              className="w-full max-w-lg bg-foreground text-background py-6 text-sm font-black uppercase tracking-[0.4em] flex items-center justify-center gap-4 transition-all hover:bg-primary disabled:opacity-10 grayscale-[1] disabled:cursor-not-allowed group"
            >
              Place_Order
              <span className="group-hover:translate-x-2 transition-transform">
                ❯❯
              </span>
            </button>
            <div className="mt-4 flex gap-6 text-[8px] font-mono opacity-20 uppercase tracking-[0.3em]">
              <span>Auth_Token: Verified</span>
              <span>System_State: Active</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutFormComp;
