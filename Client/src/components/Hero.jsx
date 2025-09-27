import React from 'react';
import { Link } from 'react-router-dom';

function Hero() {
  return (
    <div className="bg-white h-[calc(100vh-5rem)">
      <div className="w-[90%] mx-auto flex items-center h-[calc(100vh-5rem)]">
        {/* Left Side: Text Content */}
        <div className="flex-1 pr-16">
          <h1 className="text-[70px] font-bold text-gray-700 leading-tight">
            Education is the <br />  way to
            <span className="text-orange-500"> "Success"</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl text-md">
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
          <img src='https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw' alt="A student learning with a smile" className="h-[85vh] w-auto object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Hero;