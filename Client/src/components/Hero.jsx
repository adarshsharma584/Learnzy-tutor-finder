import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-white font-[tahoma]">
      <div className="w-[90%] mx-auto flex items-center h-[calc(100vh-5rem)]">
        {/* Left Side: Text Content */}
        <div className="flex-1 pr-16">
          <h1 className="text-7xl font-bold text-gray-800 leading-tight">
            Education is the <br /> way to{' '}
            <span className="text-orange-500">Success</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl">
            Unlock your potential with personalized one-on-one tutoring. Find expert tutors in any subject and start your journey to academic excellence today.
          </p>
          <div className="mt-10">
            <Link to="/signup" className="px-8 py-4 bg-indigo-600 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Get Started
            </Link>
          </div>
        </div>
        {/* Right Side: Image */}
        <div className="flex-1 h-full flex items-end justify-center">
          <img src='/hero-girl.png' alt="A student learning with a smile" className="h-full w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Hero;