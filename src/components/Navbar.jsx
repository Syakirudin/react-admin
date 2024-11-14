import React, { useState } from "react";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-white text-2xl font-bold">
          <a href="/">Logo</a>
        </div>

        <div className="hidden md:flex space-x-4">
          <a href="/" className="text-white hover:text-blue-200">
            Home
          </a>
          <a href="/location" className="text-white hover:text-blue-200">
            Location
          </a>
          <a href="/routing" className="text-white hover:text-blue-200">
            Route
          </a>
          <a href="/" className="text-white hover:text-blue-200">
            Schedule
          </a>
          <a href="/" className="text-white hover:text-blue-200">
            Fare
          </a>
          <a href="/setting" className="text-white hover:text-blue-200">
            Setting
          </a>
          <a href="/login" className="text-white hover:text-blue-200">
            Login
          </a>
        </div>

        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 space-y-4 ${
          isMobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <a href="/" className="block text-white hover:text-blue-200">
          Home
        </a>        
        <a href="/location" className="block text-white hover:text-blue-200">
          Location
        </a>
        <a href="/" className="block text-white hover:text-blue-200">
          Route{" "}
        </a>
        <a href="/" className="block text-white hover:text-blue-200">
          Schedule
        </a>
        <a href="/" className="block text-white hover:text-blue-200">
          Fare
        </a>
        <a href="/setting" className="block text-white hover:text-blue-200">
          Settings
        </a>
        <a href="/login" className="block text-white hover:text-blue-200">
          Login
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
