"use client";

import AuthForm from "@/components/ui/AuthForm";
import { registerUser } from "@/app/actions";
import { SignUpSchema } from "@/lib/validation";
import React from "react";

const signUp = () => {
  return (
    <AuthForm
      type="signup"
      schema={SignUpSchema}
      defaultValues={{
        fullName: "",
        email: "",
        facebookUrl: "",
        phone: "",
        password: "",
      }}
      onSubmit={registerUser}
    />
  );
};

export default signUp;
