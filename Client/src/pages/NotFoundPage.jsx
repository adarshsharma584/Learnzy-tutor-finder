import React from "react";
import { Link } from "react-router-dom";
import { TbFaceIdError } from "react-icons/tb";


const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-white px-4">
     
          <div className="flex flex-col items-center    px-10 py-16 ">
        <TbFaceIdError className="h-20 w-auto text-gray-700 mb-2" />
        <h1 className="text-7xl font-extrabold text-gray-700 mb-4">Oops !</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-500 mb-8 text-center max-w-md">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/"
          className="px-8 py-3 bg-sky-800 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Go to Home Page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
