import { useAuth } from "@/contexts/authContext";
import { Link } from "react-router-dom";
import React, { useState } from "react";

function Header() {
  const { logout, user } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="rounded-full shadow-md bg-opacity-25 bg-black mx-4">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="text-white font-bold text-xl">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Salon
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-6 text-white">
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Home
          </Link>
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Salons
          </Link>
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            About
          </Link>
          <Link to="/" className="hover:text-gray-300 transition duration-300">
            Contact
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Auth Button */}
        <div className="hidden md:block">
          {user ? (
            <button 
              onClick={logout}
              className="text-white transition duration-300 px-4 py-2 rounded-full border border-white hover:bg-white hover:text-gray-800"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="text-white transition duration-300 px-4 py-2 rounded-full border border-white hover:bg-white hover:text-gray-800"
            >
              Login
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-800 px-4 py-2">
          <Link to="/" className="block text-white py-2">Home</Link>
          <Link to="/salons" className="block text-white py-2">Salons</Link>
          <Link to="/about" className="block text-white py-2">About</Link>
          <Link to="/contact" className="block text-white py-2">Contact</Link>
          {user ? (
            <button 
              onClick={logout}
              className="w-full text-left text-white py-2"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="block text-white py-2">Login</Link>
          )}
        </div>
      )}
    </nav>
  );
}

export default Header;