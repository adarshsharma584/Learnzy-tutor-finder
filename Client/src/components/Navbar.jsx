import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <>
    <header className="bg-white/50 backdrop-blur-md sticky">
      {/* sticky top-0 z-50 */}
      <nav className="h-[70px] w-[90%] pt-3 mx-auto flex justify-between items-center">
        <Link to="/" className="text-4xl font-bold text-sky-800">
          Learn-zy
        </Link>
          <ul className="flex items-end font-medium h-10 gap-8 text-[18.7px] ">
         {/* border-1 border-gray-200 rounded-xl shadow-lg  bg-white px-6  
        py-4
        "> */}
          {[
            { to: "/", text: "Home" },
            { to: "/tutions", text: "Find a Tutor" },
            { to: "/become-tutor", text: "Become a Tutor" },
            { to: "/about", text: "About Us" },
            // { to: "/contact", text: "Contact Us" },
            { to: "/me", text: "Profile" },
          ].map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `pb-1 transition-colors duration-300 ${
                    isActive
                      ? "text-indigo-600 border-b-2 border-indigo-600 font-semibold"
                      : "text-gray-600 hover:text-indigo-600"
                  }`
                }
              >
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="flex items-center gap-4">
          <Link
            to="/signup"
            className="px-5 py-2 bg-gray-700 text-white rounded-lg font-medium font-[helvetica] hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="px-5 py-2 bg-gray-700 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>
      
    </header>
    <div className="w-[90vw] h-[2px] bg-gray-400 mx-auto mt-2 rounded-4xl"></div>
    </>
  );
}

export default Navbar;
