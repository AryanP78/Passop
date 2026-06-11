import React from "react";

const Navbar = () => {
  return (
    <div className="h-13 bg-slate-800">
      <nav>
        <ul className=" flex flex-1 gap-10 ml-10 p-3 text-white">
          <div className="logo  font-bold text-2xl">
            <span className="text-green-700"> &lt; </span>
            Pass
            <span className="text-green-700">OP/&gt; </span>
          </div>
          <div className="flex flex-1 gap-7  ml-260 ">
            <li className="hover:font-bold">Home</li>
            <li className="hover:font-bold">About us</li>
            <li className="hover:font-bold">Contact us</li>
          </div>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
