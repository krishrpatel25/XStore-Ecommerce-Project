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
    toast.success("Order placed successfully");
    navigate("/order");
  };

  const isDevTool = false;

  return (
    <div className="pt-28 px-4 md:px-10 lg:px-24">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-gray-900">Checkout</h1>
        <p className="text-sm text-gray-500 mt-1">
          Shipping & contact information
        </p>
      </div>

      <div className="min-h-screen px-4 sm:px-6 py-2">
        <div className="max-w-5xl mx-auto">
          <Card className="rounded-xl border bg-background shadow-sm">
            <CardContent className="p-0">
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="p-6 sm:p-8 space-y-10">
                  {/* PERSONAL */}
                  <section>
                    <h2 className="text-2xl text-primary font-semibold mb-2">
                      Personal details
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label>First name</Label>
                        <Input
                          placeholder="your firstname"
                          {...register("firstName")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.firstName?.message}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Last name</Label>
                        <Input
                          placeholder="your lastname"
                          {...register("lastName")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.lastName?.message}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* CONTACT */}
                  <section>
                    <h2 className="text-2xl text-primary font-semibold mb-2">
                      Contact
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="space-y-1.5">
                        <Label>Mobile</Label>
                        <Input
                          placeholder="9876543210"
                          {...register("mobile")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.mobile?.message}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Email</Label>
                        <Input
                          placeholder="you@email.com"
                          {...register("email")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.email?.message}
                        </p>
                      </div>
                    </div>
                  </section>

                  {/* ADDRESS */}
                  <section>
                    <h2 className="text-2xl text-primary font-semibold mb-2">
                      Shipping address
                    </h2>

                    <div className="space-y-5">
                      <div className="space-y-1.5">
                        <Label>Address line 1</Label>
                        <Textarea
                          placeholder="House no, street name"
                          {...register("addressLine1")}
                        />
                        <p className="text-xs text-red-500">
                          {errors.addressLine1?.message}
                        </p>
                      </div>

                      <div className="space-y-1.5">
                        <Label>Address line 2</Label>
                        <Textarea
                          placeholder="Area, landmark (optional)"
                          {...register("addressLine2")}
                        />
                      </div>

                      {/* LOCATION */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                        <div className="space-y-1.5">
                          <Label>Country</Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="w-full border px-3 py-2 rounded-md text-left">
                              {selectedCountry || "Select country"}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
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

                        <div className="space-y-1.5">
                          <Label>State</Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              disabled={!selectedCountry}
                              className="w-full border px-3 py-2 rounded-md text-left"
                            >
                              {selectedState || "Select state"}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
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

                        <div className="space-y-1.5">
                          <Label>City</Label>
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              disabled={!selectedState}
                              className="w-full border px-3 py-2 rounded-md text-left"
                            >
                              {watch("city") || "Select city"}
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {selectedCountry &&
                                selectedState &&
                                locationData[selectedCountry][
                                  selectedState
                                ].map((city) => (
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
                                ))}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </form>
            </CardContent>

            <CardFooter className="border-t bg-muted/40 p-6">
              <Button
                type="submit"
                form="checkout-form"
                className="w-full h-12 text-base font-medium"
                disabled={!isDirty || !isValid}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>

          {isDevTool && <DevTool control={control} />}
        </div>
      </div>
    </div>
  );
};

export default CheckoutFormComp;
