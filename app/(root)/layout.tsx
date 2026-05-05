import Header from "@/components/ui/Header";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="flex min-h-screen flex-col px-4 xs:px-10 md:px-16">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        <div className="mt-10 pb-20">{children}</div>
      </div>
    </main>
  );
};

export default layout;
