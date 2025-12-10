import React from "react";
import { z } from "zod";

export const IZodSchema = z.object({
  firstName: z.string().min(2, "Firstname is required"),
  lastName: z.string().min(2, "lastname is required"),

  email: z.string().email("Invalid email"),
  mobile: z
    .number()
    .min(10, "mobile number must me 10 number")
    .max(10, "mobile number must be 10 number"),
  
  addressLine1: z
    .string()
    .min(5, "Address Line 1 is required and should be at least 5 characters.")
    .max(100, "Address Line 1 should not be more than 100 characters."),

  addressLine2: z
    .string()
    .max(100, "Address Line 2 should not be more than 100 characters.")
    .optional()
    .or(z.literal("")),

  city: z
    .string()
    .min(2, "City is required.")
    .max(50, "City should not be more than 50 characters."),

  state: z
    .string()
    .min(2, "State is required.")
    .max(50, "State should not be more than 50 characters."),

  country: z.string().min(2, "Country is required.").default("India"),
});
