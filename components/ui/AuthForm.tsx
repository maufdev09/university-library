"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpSchema, signInSchema } from "@/lib/validation";
import { useForm, DefaultValues, SubmitHandler, FieldValues, Resolver, UseFormReturn } from "react-hook-form";
import { ZodType } from "zod";


interface AuthFormProps<T extends FieldValues> {
    schema: ZodType<T>;
    defaultValues: T;
    onSubmit: (data: T) => Promise<{success: boolean; error?: string}>;
    type: "signup" | "login";
}


const AuthForm = <T extends FieldValues> ({ type, schema, defaultValues, onSubmit }: AuthFormProps<T>) => {
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schema as any),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit : SubmitHandler<T> = async(data) => {}

  return <div>AuthForm</div>;
};

export default AuthForm;
