import React from "react";

const Navbar = () => {
  return (
    <div className="bg-slate-800 text-white">
      <nav className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Logo */}
          <div className="font-bold text-2xl text-center md:text-left">
            <span className="text-green-700">&lt;</span>
            Pass
            <span className="text-green-700">OP/&gt;</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <li className="cursor-pointer hover:font-bold">Home</li>
            <li className="cursor-pointer hover:font-bold">About Us</li>
            <li className="cursor-pointer hover:font-bold">Contact Us</li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
