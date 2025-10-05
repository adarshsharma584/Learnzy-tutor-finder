
import { Link } from "react-router-dom";
import {useState,useEffect} from 'react'


const Feature = ({ icon, title, description }) => (
  <div className="flex items-start gap-4 border-1 border-[blue]/10 rounded-md shadow-xl pt-8 pl-6 h-[115px] w-[420px]">
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
    id: 3,
    name: "Adarsh Sharma",
    subjects: ["History", "English"],
    image:
      "https://imgs.search.brave.com/lxECuWfwmxkV8XmnIjpYZj8RyX8AHEk21WAFDCklHtE/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/c2h1dHRlcnN0b2Nr/LmNvbS9pbWFnZS1w/aG90by9zY2hvb2wt/YXNpYW4tbWFsZS10/ZWFjaGVyLXN0YW5k/cy0yNjBudy0yNDcy/NTAzMTY5LmpwZw",
    rating: 5,
  },
  {
    id: 2,
    name: "Chanchal Sharma",
    subjects: ["Chemistry", "Biology"],
    image:
      "https://imgs.search.brave.com/5dpjiwN6Pgt4GXtC0Yzk4MYRHxKcUQIVcCXi7KTRyUo/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvNTIx/MjMxNy9wZXhlbHMt/cGhvdG8tNTIxMjMx/Ny5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA",
    rating: 4,
  },
  {
    id: 1,
    name: "Aditya Parihar",
    subjects: ["Physics", "Mathematics"],
    image:
      "https://imgs.search.brave.com/EJnN7Kogu-UYvgncaX0etJ_Hy83ovnUaPe7UBpzLtk0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi90ZWFj/aGVyLWNsYXNzcm9v/bS0yOTY3NzM3NS5q/cGc",
    rating: 5,
  },

  {
    id: 4,
    name: "Neha Sharma",
    subjects: ["Chemistry", "Biology"],
    image:
      "https://imgs.search.brave.com/MR4Mn8eZJvA8k8bTlgop3sg75v76GAWBPCUEEIIuyB8/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/cHJlbWl1bS1waG90/by9waG90by1wb3J0/cmFpdC1zY2hvb2wt/dGVhY2hlci13aXRo/LWFybXMtY3Jvc3Nl/ZC1zbWlsaW5nLWNs/YXNzLXNjaG9vbF8x/MDI1NzUzLTExMzk5/Ni5qcGc_c2VtdD1h/aXNfaHlicmlkJnc9/NzQwJnE9ODA",
    rating: 4,
  },
  {
    id: 5,
    name: "Akash Prajapati",
    subjects: ["History", "English"],
    image:
      "https://imgs.search.brave.com/E2RbHLVsP-D_1GftENPGhs804skHLkktIckXG6KrVIQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQ0/MzQ5OTIyMy9waG90/by9oYXBweS1lbGVt/ZW50YXJ5LXRlYWNo/ZXItaW4tZnJvbnQt/b2YtaGlzLXN0dWRl/bnRzLWluLXRoZS1j/bGFzc3Jvb20uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXhh/aEtnbnRYak5Vbk05/eTVXQ0pfQ21hdWdN/UzNFRjB5ZV9RSmZB/MThYT3c9",
    rating: 5,
  },
];




function Hero() {

  const [currentIndex, setCurrentIndex] = useState(0);
            const slideCount = tutors.length;
            useEffect(() => {
              const interval = setInterval(() => {
                setCurrentIndex((prev) => (prev + 1) % slideCount);
              }, 1200);
              return () => clearInterval(interval);
            }, [slideCount]);

            // Prepare cards for infinite loop (repeat first card after last)
  const displayTutors = [...tutors, tutors[0]];
  

  return (
    <div className="bg-white">
      <div className="w-[88%] mx-auto flex items-center min-h-[calc(100vh-5rem)] pt-10 pb-1">
        {/* Left Side: Text Content */}
        <div className="flex-1 pr-16 pb-10">
          <h1 className="text-[70px] font-bold text-gray-700 leading-tight">
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
        </div>

        {/* Right Side: Image */}
        <div className="  h-[calc(100vh-100px)] ">
          <img
            src="https://imgs.search.brave.com/dClIuH0wiakH7ETDvNNTSS_j_rQ25OOJFzQCKGGQp4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3R1/ZGVudHMtYS1jdXdp/OWU4NjVudXIwczZ5/LnBuZw"
            alt="A student learning with a smile"
            className="h-full w-auto object-contain "
          />
        </div>
      </div>

      {/* Features Section */}
      <div className=" pb-12 pt-16  w-[88%] mx-auto flex flex-col gap-12 justify-center items-center border-t border-[0.6px border-gray-400">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
          Features That Set Us Apart
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
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
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            }
            title="Flexible Scheduling"
            description="Book sessions at your convenience, anytime, anywhere."
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
                  d="M2.25 18.75a60.072 60.072 0 0 1 15.794 2.195M2.25 18.75A1.5 1.5 0 0 0 3.75 20.25H12m-1.5-8.25L12 18m-8.25-6.75h1.5m-1.5 0a48.667 48.667 0 0 0-.562 6.333m0 0c1.396 0 2.802-.34 4.208-1.02M12 21.75V12m0 0V10.5m0 11.25c4.721 0 8.642-3.41 9.458-7.968m-9.458 7.968A9.002 9.002 0 0 0 12 12m6.821 2.25a60.024 60.024 0 0 1 2.77-4.017M18.75 10.5h.375a.375.375 0 1 1 0 .75H18.75m0-1.5.004.004v.001m-.499.001h.002"
                />
              </svg>
            }
            title="Affordable Rates"
            description="Quality education that fits your budget."
          />
        </div>
      </div>

      {/* Best Tutors Section */}
      <div className="py-16 bg-white  w-[88%] mx-auto border-t border-[0.6px border-gray-400">
        <div className="w-full mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-600">
            Meet City's Top Tutors
          </h2>
          <p className="mt-4 text-lg font-medium text-gray-500 max-w-3xl mx-auto">
            Get to know the highly-rated educators making a difference in our
            community.
          </p>
        </div>

        {/* Tutors Carousel */}
        <div className="relative w-full py-5 px-5 mt-13 my-8 mx-auto overflow-hidden shadow-xl rounded-md bg-gray-100">
          <div
            className="flex transition-transform duration-700"
            style={{
              transform: `translateX(-${currentIndex * 350}px)`,
              width: `${displayTutors.length * 350}px`,
            }}
          >
            {displayTutors.map((tutor, idx) => (
              <div
                key={idx}
                className="min-w-[450px] max-w-[450px] 
                            bg-[blue]/5 rounded-md shadow-xl border-1 boder-black/20 mx-2 flex flex-col items-center px-4 py-6"
              >
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-[150px] h-[150px]   object-cover mb-2  object-top rounded-full"
                />
                <h3 className="font-bold text-lg text-gray-800">
                  {tutor.name}
                </h3>
                <p className="text-sm text-gray-600 mb-1">
                  Subjects: {tutor.subjects.join(" | ")}
                </p>
                <div className="flex items-center gap-1">
                  {[...Array(tutor.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ⭐
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
