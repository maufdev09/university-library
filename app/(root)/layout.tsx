import Header from "@/components/ui/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className=" flex min-h-screen flex-col  bg-pattern bg-cover bg-top  flex-1 xs:px-10 md:px-16 ">
      <div className="mx-auto max-w-7xl ">
        <Header />
        <div className="mt-10 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
