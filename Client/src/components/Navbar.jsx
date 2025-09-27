import React from "react";
import { NavLink, Link } from "react-router-dom";

function Navbar() {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-md ">
      {/* sticky top-0 z-50 */}
      <nav className="h-20 w-[90%] mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-indigo-600">
          Learnzy
        </Link>
        <ul className="flex items-center gap-8 text-lg rounded-2xl shadow-lg  bg-white px-6  py-4">
          {[
            { to: "/", text: "Home" },
            { to: "/tutions", text: "Find a Tutor" },
            { to: "/become-tutor", text: "Become a Tutor" },
            { to: "/about", text: "About Us" },
            { to: "/contact", text: "Contact Us" },
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
            className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
          >
            Sign Up
          </Link>
          <Link
            to="/signin"
            className="px-5 py-2 bg-white text-indigo-600 border-2 border-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
