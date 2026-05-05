import AuthForm from "@/components/ui/AuthForm";
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
        universityId: undefined,
        universityCardId: "",
        password: "",
      }}
      onSubmit={() => {}}
    />
  );
};

export default signUp;
