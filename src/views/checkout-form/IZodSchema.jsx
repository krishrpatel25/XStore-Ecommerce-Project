import React from "react";
import { z } from "zod";

export const IZodSchema = z.object({
  firstName: z.string().min(2, "Firstname is required"),
  lastName: z.string().min(2, "lastname is required"),

  email: z.string().email("Invalid email"),
  mobile: z
    .string()
    .regex(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits"),

  addressLine1: z
    .string()
    .trim()
    .min(5, "Address Line 1 must be at least 5 characters.")
    .max(100, "Address Line 1 must not exceed 100 characters."),

  addressLine2: z
    .string()
    .trim()
    .min(5, "Address Line 1 must be at least 5 characters.")
    .max(100, "Address Line 1 must not exceed 100 characters."),

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
