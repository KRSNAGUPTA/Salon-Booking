import React from "react";
import { useNavigate } from "react-router-dom";

function Header() {
  return (
    <nav className="rounded-full shadow-md">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white font-bold text-xl">
          <a href="/" className="hover:text-gray-300 transition duration-300">
            Salon
          </a>
        </div>
        <div className="hidden md:flex gap-6 text-white">
          <a
            href="/"
            className="hover:text-gray-300 transition duration-300"
          >
            Home
          </a>
          <a
            href="/salons"
            className="hover:text-gray-300 transition duration-300"
          >
            Salons
          </a>
          <a
            href="/about"
            className="hover:text-gray-300 transition duration-300"
          >
            About
          </a>
          <a
            href="/contact"
            className="hover:text-gray-300 transition duration-300"
          >
            Contact
          </a>
        </div>

        <div className="text-white hover:text-gray-300 transition duration-300 cursor-pointer">
          Login
        </div>
      </div>
    </nav>
  );
}

export default Header;
