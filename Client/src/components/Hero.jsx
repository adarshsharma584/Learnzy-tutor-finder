import React from "react";
import { Link } from "react-router-dom";
import SlidingCrousal from "./SlidingCrousal.jsx";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";


const Feature = ({ icon, title, description }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 h-12 w-12 flex items-center justify-center bg-sky-100 text-sky-800 rounded-full">
      {icon}
    </div>
    <div>
      <h3 className="font-semibold text-gray-800">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);

const tutors = [
  {
    id:1,
    name: 'Aditya Parihar',
    subjects: ['Physics', 'Mathematics'],
    image: 'https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw',
    rating: 5,
  },
  {id:2,
    name: 'Chanchal Sharma',
    subjects: ['Chemistry', 'Biology'],
    image: 'https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw',
    rating: 4,
  },
  {id:3,
    name: 'Adarsh Sharma',
    subjects: ['History', 'English'],
    image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
    rating: 5,
  },
  {id:4,
    name: 'Neha Sharma',
    subjects: ['Chemistry', 'Biology'],
    image: 'https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw',
    rating: 4,
  },
  {id:5,
    name: 'Sarthak Sharma',
    subjects: ['History', 'English'],
    image: 'https://img.daisyui.com/images/stock/photo-1635805737707-575885ab0820.webp',
    rating: 5,
  },
];




function Hero() {
  return (
    <div className="bg-white">
      <div className="w-[90%] mx-auto flex items-center min-h-[calc(100vh-5rem)] py-10">
        {/* Left Side: Text Content */}
        <div className="flex-1 pr-16">
          <h1 className="text-[70px] font-bold text-black/90 leading-tight">
            Education is the <br /> way to
            <span className="text-orange-500"> "Success"</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-xl text-md">
            Unlock your potential with personalized one-on-one tutoring. Find
            expert tutors in any subject and start your journey to academic
            excellence today.
          </p>
          <div className="mt-10">
            <Link
              to="/signup"
              className="px-8 py-4 bg-sky-800 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Feature
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                    />
                  </svg>
                }
                title="Verified Tutors"
                description="Connect with trusted and qualified educators."
              />
              <Feature
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                    />
                  </svg>
                }
                title="Personalized Learning"
                description="Tailored sessions to meet your specific needs."
              />
            </div>
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="flex-1 flex items-center justify-center pl-8 ">
          <div className="bg-sky-900 rounded-full h-[90vh] w-[90vh] p-4 relative overflow-hidden">
            <img
              src="https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw"
              alt="A student learning with a smile"
              className="h-[80vh] w-auto object-contain absolute left-10 right-10 top-16"
            />
          </div>
        </div>
      </div>

      {/* Best Tutors Section */}
      <div className="py-16 bg-gray-50">
        <div className="w-[90%] mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
            Meet Our Top Tutors
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Get to know the highly-rated educators making a difference in our
            community.
          </p>
        </div>
      <div className="w-[90%] mx-auto bg-amber-400">  <Swiper
          spaceBetween={5}
          slidesPerView={3}
          loop={true} // 👈 makes it cyclic
          autoplay={{ delay: 2000 }}
        >
          {tutors.map((tutor) => (
            <SwiperSlide key={tutor.id}>
              <SlidingCrousal
                key={tutor.id}
                name={tutor.name}
                subjects={tutor.subjects}
                rating={tutor.rating}
                image={tutor.image}
              />
            </SwiperSlide>
          ))}
        </Swiper></div>
      </div>
    </div>
  );
}

export default Hero;
