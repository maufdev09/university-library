import z from "zod";

import { bookCategories } from "@/lib/categories";

export const SignUpSchema = z.object({
  fullName: z.string().min(3, "Full name is required"),
  email: z.email("Invalid email address"),
  facebookUrl: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || value.includes("facebook.com"),
      "Use a valid Facebook profile link",
    ),
  phone: z.string().trim().optional().or(z.literal("")),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signInSchema = z.object(
    {
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    }
)

export const giveawaySchema = z.object({
  title: z.string().min(2, "Book title is required"),
  author: z.string().min(2, "Author is required"),
  category: z.enum(bookCategories, "Choose a category"),
  classLevel: z.string().trim().optional(),
  subject: z.string().trim().optional(),
  condition: z.string().min(2, "Condition is required"),
  description: z.string().min(12, "Tell readers a little more about the book"),
  imageUrl: z.string().url("Upload a photo or add an image URL"),
  contactNote: z.string().trim().optional(),
}).refine(
  (data) => data.category !== "Academic" || Boolean(data.classLevel),
  {
    message: "Class or level is required for academic books",
    path: ["classLevel"],
  },
).refine(
  (data) => data.category !== "Academic" || Boolean(data.subject),
  {
    message: "Subject is required for academic books",
    path: ["subject"],
  },
);
