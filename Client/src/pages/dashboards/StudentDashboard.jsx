import React, { useState } from "react";

const mockStudent = {
  name: "Aarav Sharma",
  batch: "Grade 10 Warriors",
  subjects: [
    { name: "Math", progress: 85 },
    { name: "Science", progress: 78 },
    { name: "English", progress: 92 },
  ],
};

const mockNotifications = [
  {
    id: 1,
    text: "Math class for Grade 10 is cancelled tomorrow.",
    date: "2025-10-06",
  },
  {
    id: 2,
    text: "Science test for Grade 10 will be held next Monday.",
    date: "2025-10-05",
  },
];

const sidebarLinks = [
  { key: "dashboard", label: "Dashboard" },
  { key: "progress", label: "Progress" },
  { key: "notifications", label: "Notifications" },
  { key: "profile", label: "Profile" },
];

const StudentDashboard = () => {
  const [student] = useState(mockStudent);
  const [notifications] = useState(mockNotifications);
  const [activeView, setActiveView] = useState("dashboard");

  // Sidebar
  const Sidebar = () => (
    <nav className="h-screen w-64 bg-[#2c3e50] text-white flex flex-col py-8 px-4 shadow-2xl">
      
      <div className="flex-1 flex flex-col gap-2">
        {sidebarLinks.map((link) => (
          <button
            key={link.key}
            className={`w-full text-left px-5 py-3 rounded-lg font-medium text-lg transition-all duration-200 ${
              activeView === link.key
                ? "bg-white text-sky-800 shadow-lg"
                : "hover:bg-sky-700 hover:text-white"
            }`}
            onClick={() => setActiveView(link.key)}
          >
            {link.label}
          </button>
        ))}
      </div>
      <div className="mt-10 text-center text-sm text-sky-100 opacity-80">
        &copy; {new Date().getFullYear()} Learnzy
      </div>
    </nav>
  );

  // Main content views
  const DashboardView = () => (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4 bg-gradient-to-r from-sky-500 to-sky-300 rounded-xl p-8 shadow-lg">
        <div>
          <h1 className="text-3xl font-extrabold text-white mb-1">
            Welcome, {student.name}
          </h1>
          <p className="text-white/90 text-lg font-medium">
            Batch: <span className="font-bold">{student.batch}</span>
          </p>
        </div>
        <img
          src="https://img.freepik.com/free-vector/online-learning-concept-illustration_114360-1194.jpg?w=200"
          alt="Student Dashboard"
          className="h-24 rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
        <div className="bg-white rounded-xl shadow p-6 text-center border-t-4 border-sky-500">
          <div className="text-sky-700 font-bold text-lg mb-2">Subjects</div>
          <div className="text-3xl font-bold text-sky-700">
            {student.subjects.length}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center border-t-4 border-sky-500">
          <div className="text-sky-700 font-bold text-lg mb-2">Batch</div>
          <div className="text-2xl text-sky-700 font-bold">
            {student.batch}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow p-6 text-center border-t-4 border-sky-500">
          <div className="text-sky-700 font-bold text-lg mb-2">
            Notifications
          </div>
          <div className="text-3xl text-sky-700 font-bold">
            {notifications.length}
          </div>
        </div>
      </div>
      <div className="bg-sky-50 rounded-xl p-8 shadow-inner">
        <h2 className="text-xl font-bold text-sky-800 mb-4">
          Quick Progress Overview
        </h2>
        <div className="space-y-5 ">
          {student.subjects.map((subj) => (
            <div
              key={subj.name}
              className="flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div className="font-semibold text-gray-700 text-lg mb-2 md:mb-0">
                {subj.name}
              </div>
              <div className="flex-1 mx-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-sky-500 h-4 rounded-full transition-all duration-500"
                    style={{ width: `${subj.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="font-bold text-sky-700 text-lg min-w-[60px] text-right">
                {subj.progress}%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const ProgressView = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-6">
        Detailed Progress
      </h2>
      <div className="space-y-8">
        {student.subjects.map((subj) => (
          <div
            key={subj.name}
            className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row md:items-center md:justify-between border-l-4 border-sky-500"
          >
            <div className="font-semibold text-gray-700 text-lg mb-2 md:mb-0">
              {subj.name}
            </div>
            <div className="flex-1 mx-4">
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-sky-500 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${subj.progress}%` }}
                ></div>
              </div>
            </div>
            <div className="font-bold text-sky-700 text-lg min-w-[60px] text-right">
              {subj.progress}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const NotificationsView = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-6">
        Batch Notifications
      </h2>
      <div className="space-y-4">
        {notifications.length === 0 && (
          <div className="text-gray-400 italic">No notifications yet.</div>
        )}
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="bg-white border-l-4 border-sky-500 p-4 rounded shadow-sm flex justify-between items-center"
          >
            <div>
              <div className="text-gray-700 font-medium">{notif.text}</div>
              <div className="text-gray-400 text-xs mt-1">{notif.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProfileView = () => (
    <div className="w-full">
      <h2 className="text-2xl font-bold text-sky-800 mb-6">Profile</h2>
      <div className="bg-white rounded-xl shadow p-8 flex flex-col md:flex-row gap-8 items-center">
        <img
          src="https://randomuser.me/api/portraits/men/32.jpg"
          alt="Profile"
          className="w-32 h-32 rounded-full border-4 border-sky-200 shadow"
        />
        <div>
          <div className="text-xl font-bold text-gray-800 mb-2">
            {student.name}
          </div>
          <div className="text-gray-600 mb-1">
            Batch: <span className="font-semibold">{student.batch}</span>
          </div>
          <div className="text-gray-600 mb-1">
            Subjects: {student.subjects.map((s) => s.name).join(", ")}
          </div>
          <div className="text-gray-600">
            Parent Contact:{" "}
            <span className="font-semibold">+91-9876543210</span>
          </div>
        </div>
      </div>
    </div>
  );

  let content;
  if (activeView === "dashboard") content = <DashboardView />;
  else if (activeView === "progress") content = <ProgressView />;
  else if (activeView === "notifications") content = <NotificationsView />;
  else if (activeView === "profile") content = <ProfileView />;
  // Ensure content is always set
  else content = <DashboardView />;

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-10 md:p-16 overflow-y-auto">{content}</main>
    </div>
  );
};

export default StudentDashboard;
