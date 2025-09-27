import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-[90%] mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className=" mb-16 flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-5 text-sky-400">
            What is <span className="text-sky-800">Learnzy</span>
          </h1>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Learnzy is a smart and secure platform that connects students and parents with trusted tutors in their area or online. Whether you’re looking for academic guidance, extra classes, or specialized training, Learnzy makes finding the right tutor simple, transparent, and reliable.
          </p>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
          Learnzy is a web-based platform designed to help middle-class families find reliable, affordable tuition centers and tutors in their nearby area. We aim to bridge the gap between parents/students and teachers/coaching institutes by providing an easy-to-use platform for search, progress tracking, reviews, and digital communication.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 mb-12 boder border-1 border-gray-300">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
          Our mission is to make quality education accessible to every student by bridging the gap between learners and tutors. We aim to empower parents with the right tools to make informed decisions while helping teachers reach students who need them most
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-16 mb-16">
          {/* The Problem Section */}
          <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-red-800 mb-4">The Problem We Solve</h2>
            <p className="text-red-700 mb-6">
              Parents and students often face significant difficulties in their search for quality education support.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">Finding **affordable and trusted tutors** without a reliable verification system.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">Lacking the tools to **monitor a child's academic progress digitally** and effectively.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">Struggling with **inefficient communication** for attendance, marks, and other updates.</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 font-bold mr-3">✓_</span>
                <span className="text-gray-700">Wasting time and money on **unauthenticated or fake tuition listings**.</span>
              </li>
            </ul>
          </div>

          {/* Our Solution Section */}
          <div className="bg-green-50 border-l-4 border-green-500 p-8 rounded-lg">
            <h2 className="text-3xl font-bold text-green-800 mb-4">Our Solution</h2>
            <p className="text-green-700 mb-6">
              Learnzy provides a comprehensive platform to address these challenges head-on.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">A curated list of **verified tutors and centers** with transparent fees, locations, and ratings.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">Dedicated **dashboards for parents and teachers** to manage learning and track student performance.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">**Digital progress reports** with visual charts for attendance, test scores, and overall performance.</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 font-bold mr-3">✓</span>
                <span className="text-gray-700">**Seamless digital communication** through in-app chat, real-time notifications, and online PTMs.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Why Choose Us Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-4xl font-bold text-sky-800 mb-16">Why Choose Us?</h2>  
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: '🔒', title: 'Verified Tutors', description: 'Teachers validated through certificates, degrees, and AI-based subject tests.' },
              { icon: '📊', title: 'Progress Tracking', description: 'Attendance logs, test scores, and performance charts for parents.' },
              { icon: '🤝', title: 'Seamless Communication', description: 'In-app chat and video meetings between parents and tutors.' },
              { icon: '🌍', title: 'Location & Online Options', description: 'Choose tuition near your home or attend from anywhere.' },
              { icon: '⚡', title: 'AI-Powered Recommendations', description: 'Get smart tutor suggestions based on subject, grade, and budget.' },
            ].map((item, index) => (
              <div key={index} className="bg-white border-1 border-gray-300 rounded-xl shadow-md p-8 text-center hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Our Vision Section */}
        <div className="bg-white text-gray-600 rounded-xl border-1 border-gray-300 shadow-lg p-8 md:p-12 my-16">
          <div className="text-center">
            <h2 className="text-3xl text-sky-800 font-bold mb-4">Our Vision</h2>
            <blockquote className="text-xl italic leading-relaxed max-w-4xl mx-auto">
              “We believe that learning should be personalized, transparent, and accessible. By combining technology with education, Learnzy envisions a world where every student finds the right mentor to unlock their potential.”
            </blockquote>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-sky-800">Founders of Learn-zy</h2>
            
          </div>
          <div className="flex justify-center gap-4 group">
            <div className="bg-white rounded-xl shadow-lg p-8 text-center w-full max-w-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                src="https://avatars.githubusercontent.com/u/102425332?v=4" 
                alt="Adarsh Sharma"
              />
              <h3 className="text-xl font-semibold text-gray-900">Adarsh Sharma</h3>
              <p className="text-indigo-600 font-medium">Project Lead</p>
              <p className="text-gray-600 mt-2 text-sm">
                Passionate about bridging education with technology.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center w-full max-w-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                src="https://avatars.githubusercontent.com/u/102425332?v=4" 
                alt="Adarsh Sharma"
              />
              <h3 className="text-xl font-semibold text-gray-900">Chanchal Sharma</h3>
              <p className="text-indigo-600 font-medium">Project Lead</p>
              <p className="text-gray-600 mt-2 text-sm">
                Passionate about bridging education with technology.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-lg p-8 text-center w-full max-w-sm border border-gray-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <img
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                src="https://avatars.githubusercontent.com/u/102425332?v=4" 
                alt="Adarsh Sharma"
              />
              <h3 className="text-xl font-semibold text-gray-900">Aditya Parihar</h3>
              <p className="text-indigo-600 font-medium">Project Lead</p>
              <p className="text-gray-600 mt-2 text-sm">
                Passionate about bridging education with technology.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="bg-gradient-to-r  from-sky-800 to-sky-700 rounded-xl p-8 md:p-16 mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Start your journey today.
          </h2>
          <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
            Find the perfect tutor with Learnzy and unlock your full potential.
          </p>
          <div className="mt-8">
            <Link
              to="/tutions"
              className="inline-flex items-center justify-center px-8 py-3 bg-white text-gray-800 rounded-lg font-semibold text-lg hover:bg-gray-200 transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Find a Tutor
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="w-5 h-5 ml-2"
              >
                <path
                  fillRule="evenodd"
                  d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;