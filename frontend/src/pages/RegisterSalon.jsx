import Header from "@/components/Header";
import { Toaster } from "@/components/ui/toaster";
import React from "react";

function RegisterSalon() {
  return (
    <div>
      <div className="fixed top-4  w-full z-5">
        <Header />
      </div>
      <Toaster />
      <section className="bg-black"></section>
    </div>
  );
}

export default RegisterSalon;
