import { University } from "lucide-react";
import z from "zod";

export const SignUpSchema = z.object({
    fullName: z.string().min(3, "Full name is required"),
    email: z.email("Invalid email address"),
    universityId: z.coerce.number("Invalid university ID"),

    universityCardId: z.string().nonempty("University card ID is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const signInSchema = z.object(
    {
        email: z.email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters long"),
    }
)