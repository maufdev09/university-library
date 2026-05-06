"use client";

import AuthForm from "@/components/ui/AuthForm";
import { loginUser } from "@/app/actions";
import { signInSchema } from "@/lib/validation";
import React from "react";

const signIn = () => {
  return (
    <AuthForm
      type="login"
      schema={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={loginUser}
    />
  );
};

export default signIn;
