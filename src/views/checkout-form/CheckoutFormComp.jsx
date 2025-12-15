import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IZodSchema } from "./IZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DevTool } from "@hookform/devtools";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const form = useForm({
    resolver: zodResolver(IZodSchema),
    defaultValues: defaultFormValues,
    mode: "onChange",
  });

  const { register, control, watch, setValue,handleSubmit, formState } = form;
  const { errors, isValid, isDirty } = formState;
  
  const selectedCountry = watch("country");
  const selectedState = watch("state");

  const onSubmit = async (data) => {
    try {
      const res = await axios.post("https://dummyjson.com/users/add", data, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("User added:", res.data);
      toast.success("Added user successfully");
      form.reset({ ...defaultFormValues });
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
//for devtool on and off
  const isDevTool = false;

  return (
    <div className="pt-20 p-6 flex items-center justify-center">
      <Card className="w-full max-w-lg">
        <CardContent>
          <form>
            <div className="flex flex-col gap-2 p-4">
              <div className="flex justify-between">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">Firstname</Label>
                  <Input
                    id="firstName"
                    type="firstName"
                    {...register("firstName")}
                    placeholder="your firstname"
                    required
                  />
                  <p className="text-red-600 text-[12px]">
                    {errors.firstName?.message}
                  </p>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">lastName</Label>
                  <Input
                    id="lastName"
                    type="lastName"
                    {...register("lastName")}
                    placeholder="your lastname"
                    required
                  />
                  <p className="text-red-600 text-[12px]">
                    {errors.lastName?.message}
                  </p>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    placeholder="abc@example.com"
                    required
                  />
                  <p className="text-red-600 text-[12px]">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine1">addressLine1</Label>
                <Textarea
                  id="addressLine1"
                  type="addressLine1"
                  {...register("addressLine1")}
                  placeholder="House No., Apartment, Street Name"
                  required
                />
                <p className="text-red-600 text-[12px]">
                  {errors.addressLine1?.message}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="addressLine2">addressLine2</Label>
                <Textarea
                  id="addressLine2"
                  type="addressLine2"
                  {...register("addressLine2")}
                  placeholder="Area, Landmark (Optional)"
                  required
                />
                <p className="text-red-600 text-[12px]">
                  {errors.addressLine2?.message}
                </p>
              </div>

              <div className="space-y-6">
                {/* COUNTRY */}
                <div>
                  <Label className="mb-2 block font-medium">Country</Label>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="
          w-full
          border px-3 py-2 rounded-md
          text-left
          flex justify-between items-center
          hover:bg-muted
          transition
        "
                    >
                      <span
                        className={
                          selectedCountry ? "" : "text-muted-foreground"
                        }
                      >
                        {selectedCountry || "Select country"}
                      </span>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                      <DropdownMenuLabel>Country</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      {Object.keys(locationData).map((country) => (
                        <DropdownMenuItem
                          key={country}
                          onClick={() => {
                            setValue("country", country);
                            setValue("state", "");
                            setValue("city", "");
                          }}
                        >
                          {country}
                        </DropdownMenuItem>
                      ))}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {errors.country && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                {/* STATE & CITY */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* STATE */}
                  <div>
                    <Label className="mb-2 block font-medium">State</Label>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        disabled={!selectedCountry}
                        className={`
            w-full
            border px-3 py-2 rounded-md
            text-left
            flex justify-between items-center
            transition
            ${
              !selectedCountry
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "hover:bg-muted"
            }
          `}
                      >
                        <span
                          className={
                            selectedState ? "" : "text-muted-foreground"
                          }
                        >
                          {selectedState || "Select State"}
                        </span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        <DropdownMenuLabel>State</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {selectedCountry &&
                          Object.keys(locationData[selectedCountry]).map(
                            (state) => (
                              <DropdownMenuItem
                                key={state}
                                onClick={() => {
                                  setValue("state", state);
                                  setValue("city", "");
                                }}
                              >
                                {state}
                              </DropdownMenuItem>
                            )
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {errors.state && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.state.message}
                      </p>
                    )}
                  </div>

                  {/* CITY */}
                  <div>
                    <Label className="mb-2 block font-medium">City</Label>

                    <DropdownMenu>
                      <DropdownMenuTrigger
                        disabled={!selectedState}
                        className={`
            w-full
            border px-3 py-2 rounded-md
            text-left
            flex justify-between items-center
            transition
            ${
              !selectedState
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "hover:bg-muted"
            }
          `}
                      >
                        <span
                          className={
                            watch("city") ? "" : "text-muted-foreground"
                          }
                        >
                          {watch("city") || "Select City"}
                        </span>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        <DropdownMenuLabel>City</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        {selectedCountry &&
                          selectedState &&
                          locationData[selectedCountry][selectedState].map(
                            (city) => (
                              <DropdownMenuItem
                                key={city}
                                onClick={() => setValue("city", city)}
                              >
                                {city}
                              </DropdownMenuItem>
                            )
                          )}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {errors.city && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.city.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={!isDirty || !isValid}
          >
            continue checkout
          </Button>
        </CardFooter>
      </Card>
      {isDevTool && <DevTool control={control} />}
    </div>
  );
};

export default CheckoutFormComp;
