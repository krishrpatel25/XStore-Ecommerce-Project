import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IZodSchema } from "./IZodSchema";
import { zodResolver } from "@hookform/resolvers/zod";


import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
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
              <div>
                {/* country */}
                <div className="pb-4">
                  <div className="pb-2">
                    <Label htmlFor="country">country</Label>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger
                      id="country"
                      className="border px-3 py-2 rounded-md"
                    >
                      {watch("country") || "Select country"}
                    </DropdownMenuTrigger>

                    <DropdownMenuContent>
                      <DropdownMenuLabel>country</DropdownMenuLabel>
                      <DropdownMenuSeparator />

                      <DropdownMenuItem
                        onClick={() => setValue("country", "Gujarat")}
                      >
                        India
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setValue("country", "Rajasthan")}
                      >
                        USA
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setValue("country", "Goa")}
                      >
                        France
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        onClick={() => setValue("country", "Karnataka")}
                      >
                        UAE
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {errors.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>
                <div className="flex justify-between">
                  {/* STATE */}
                  <div>
                    <div className="pb-2">
                      <Label htmlFor="state">State</Label>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="border px-3 py-2 rounded-md">
                        {watch("state") || "Select State"}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuLabel>State</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => setValue("state", "Gujarat")}
                        >
                          Gujarat
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("state", "Rajasthan")}
                        >
                          Rajasthan
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("state", "Goa")}
                        >
                          Goa
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("state", "Karnataka")}
                        >
                          Karnataka
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {errors.state && (
                      <p className="text-red-500 text-sm">
                        {errors.state.message}
                      </p>
                    )}
                  </div>
                  {/* CITY */}
                  <div>
                    <div className="pb-2">
                      <Label htmlFor="city">City</Label>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger className="border px-3 py-2 rounded-md">
                        {watch("city") || "Select City"}
                      </DropdownMenuTrigger>

                      <DropdownMenuContent>
                        <DropdownMenuLabel>City</DropdownMenuLabel>
                        <DropdownMenuSeparator />

                        <DropdownMenuItem
                          onClick={() => setValue("city", "Ahmedabad")}
                        >
                          Ahmedabad
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("city", "Surat")}
                        >
                          Surat
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("city", "Amreli")}
                        >
                          Amreli
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => setValue("city", "Gandhinagar")}
                        >
                          Gandhinagar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {errors.city && (
                      <p className="text-red-500 text-sm">
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
