import React, { useState } from "react";
import { fetchUserProfile } from "../redux/thunk/userThunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
function Profile() {
  const [activeTab, setActiveTab] = useState("profile");
  const dispatch = useDispatch();

  const user = {
    name: "Adarsh Sharma",
    email: "adarsh.sharma@example.com",
    avatar:
      "https://imgs.search.brave.com/vrMGJV5BswCpL-Z9H0sg7-v5dvGiHL_hA9dbk9JhZmM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/ODQ3OTQ3My9waG90/by9tYXRoLXRlYWNo/ZXItaG9sZGluZy1h/LXRyb3BoeS1pbi1j/bGFzc3Jvb20uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPXQx/X0RtVWJFN05PTFp1/X3U4N2ZCVDBhNThh/dWI0aUFQUWdmTm10/ZHlTUkE9",
    joinDate: "Joined in March 2024",
    bio: "Passionate about lifelong learning and sharing knowledge with others. My goal is to make education accessible and engaging for everyone.",
    stats: {
      courses: 5,
      hours: 42,
      rating: 4.8,
    },
    address: "New Delhi, India",
  };
 const fetchedUser = useSelector((state) => state.auth.user);
  console.log(fetchedUser);
  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);



  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="w-[88%] mx-auto py-12">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl  shadow-xl p-8 flex flex-col md:flex-row items-center  gap-8">
          <div className="avatar">
            <div className="w-32 h-32 rounded-full ring ring-sky-800 ring-offset-base-100 ring-offset-2">
              <img src={user.avatar} alt={`${user.name}'s avatar`} />
            </div>
          </div>

          <div className="flex-grow text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-600">{user.name}</h1>
            <p className="text-lg text-gray-500 mt-1">{user.email}</p>
            <p className="text-md text-gray-600 mt-4 max-w-2xl">{user.bio}</p>
            <div className="mt-4 flex justify-center md:justify-start items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-sky-800">
                  {user.stats.courses}
                </p>
                <p className="text-sm text-gray-500">Courses</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-sky-800">
                  {user.stats.hours}
                </p>
                <p className="text-sm text-gray-500">Hours Learned</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-sky-800">
                  {user.stats.rating}
                </p>
                <p className="text-sm text-gray-500">Rating</p>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0">
            <button className="px-6 py-3 bg-sky-800 text-white rounded-lg font-semibold text-md hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-10">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex gap-6" aria-label="Tabs">
              <button
                onClick={() => setActiveTab("profile")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-lg font-medium ${
                  activeTab === "profile"
                    ? "border-sky-800 text-sky-800"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Profile Details
              </button>
              <button
                onClick={() => setActiveTab("bookings")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-lg font-medium ${
                  activeTab === "bookings"
                    ? "border-sky-800 text-sky-800"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`shrink-0 border-b-2 px-1 pb-4 text-lg font-medium ${
                  activeTab === "settings"
                    ? "border-sky-800 text-sky-800"
                    : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                }`}
              >
                Account Settings
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="mt-8">
            {activeTab === "profile" && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Profile Details
                </h2>
                <p className="mt-4 text-gray-600">
                  This section will contain more detailed information about the
                  user's public profile, such as subjects they teach or are
                  learning, qualifications, and more.
                </p>
                {/* Example of more details */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Joined On
                    </p>
                    <p className="text-md text-gray-800">{user.joinDate}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Location
                    </p>
                    <p className="text-md text-gray-800">New Delhi, India</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Interests
                    </p>
                    <p className="text-md text-gray-800">
                      Technology, History, Literature
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Preferred Subjects
                    </p>
                    <p className="text-md text-gray-800">
                      Mathematics, Physics
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Qualifications
                    </p>
                    <p className="text-md text-gray-800">
                      B.Tech in Computer Science
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Teaching Experience
                    </p>
                    <p className="text-md text-gray-800">
                      3 Years (Online & Offline)
                    </p>
                  </div>
                </div>
              </div>
            )}
            {activeTab === "bookings" && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  My Bookings
                </h2>
                <p className="mt-4 text-gray-600">
                  Here you will find a list of your upcoming and past tutoring
                  sessions.
                </p>
                {/* Placeholder for bookings list */}
                <ul className="mt-6 space-y-4">
                  <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    Mathematics with Jane Doe - Tomorrow at 3 PM
                  </li>
                  <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    Physics with John Smith - Today at 10 AM
                  </li>
                  <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    Chemistry with Emily White - Next Monday at 5 PM
                  </li>
                  <li className="p-4 bg-gray-50 rounded-lg shadow-sm">
                    History with David Green - Last Tuesday at 11 AM
                  </li>
                </ul>
                <button className="mt-6 px-6 py-3 bg-sky-800 text-white rounded-lg font-semibold text-md hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  View All Bookings
                </button>
              </div>
            )}
            {activeTab === "settings" && (
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-800">
                  Account Settings
                </h2>
                <p className="mt-4 text-gray-600">
                  Manage your account preferences, password, and privacy
                  settings here.
                </p>
                {/* Placeholder for settings form */}
                <form className="mt-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        defaultValue={user.name}
                        className="mt-1 h-10 outline:none block w-full rounded-md outline-gray-500 text-gray-600 px-3 py-2  shadow-md focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user.email}
                        className="mt-1 h-10 block w-full rounded-md bg-gray/50 outline-gray-500 text-gray-600 px-3 py-2  shadow-md focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        id="password"
                        defaultValue="********"
                        className="mt-1 block w-1/2 h-10 rounded-md outline-gray-500 text-gray-600 px-3 py-2 shadow-md focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        {" "}
                        Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        defaultValue={user.address}
                        className="mt-1 h-10 block w-full rounded-md outline-gray-500 text-gray-600 px-3 py-2 shadow-md focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        defaultValue="********"
                        className="mt-1 block h-10 w-1/2 rounded-md outline-gray-600 text-gray-600 px-3 py-2 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="notifications"
                      className="h-4 w-4 rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      defaultChecked
                    />
                    <label
                      htmlFor="notifications"
                      className="ml-2 block text-sm font-medium text-gray-700"
                    >
                      Receive email notifications
                    </label>
                  </div>
                  <p className="text-sm text-gray-500">
                    You can also manage your privacy settings and delete your
                    account from here.
                  </p>

                  <button
                    type="submit"
                    className="px-5 py-2 bg-sky-800 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                  >
                    Save Settings
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
