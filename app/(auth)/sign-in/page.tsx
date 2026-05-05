import { LoginForm } from "@/components/login-form";
import AuthForm from "@/components/ui/AuthForm";
import { signInSchema } from "@/lib/validation";
import React from "react";

const signIn = () => {
  return (
    <AuthForm
      type="login"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={() => {}}
    />
  );
};

export default signIn;
