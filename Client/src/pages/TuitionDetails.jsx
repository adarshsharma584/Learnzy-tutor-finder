import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

// Add animation styles
const style = document.createElement("style");
style.textContent = `
  @keyframes scroll {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-100%);
    }
  }
  .animate-scroll {
    animation: scroll 20s linear infinite;
    display: flex;
    width: max-content;
  }
  .animate-scroll:hover {
    animation-play-state: paused;
  }
`;
document.head.appendChild(style);

import {
  FaChalkboardTeacher,
  FaCalendarAlt,
  FaBook,
  FaClock,
  FaRupeeSign,
  FaMapMarkerAlt,
} from "react-icons/fa";

function TuitionDetails() {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch tuition details when component mounts
  useEffect(() => {
    // Hardcoded tuition details for testing
    const mockTuition = {
      subject: {
        name: "Mathematics",
        grade: "Grade 10",
      },
      teacher: {
        fullName: "Dr. Sarah Wilson",
        qualification: "PhD in Mathematics",
      },
      schedule: {
        startDate: "2025-11-01",
        endDate: "2026-03-31",
        recurringDays: ["Monday", "Wednesday", "Friday"],
        timeSlot: {
          startTime: "4:00 PM",
          endTime: "5:30 PM",
        },
      },
      payment: {
        hourlyRate: 500,
      },
      mode: "Online",
      topStudents: [
        {
          name: "Adarsh Kumar",
          grade: "A+",
          score: 95,
          achievement: "Consistent Top Performer",
          image: "https://randomuser.me/api/portraits/men/1.jpg",
        },
        {
          name: "Priya Sharma",
          grade: "A",
          score: 92,
          achievement: "Most Improved Student",
          image: "https://randomuser.me/api/portraits/women/2.jpg",
        },
        {
          name: "Rahul Verma",
          grade: "A+",
          score: 94,
          achievement: "Best in Problem Solving",
          image: "https://randomuser.me/api/portraits/men/3.jpg",
        },
      ],
      batches: [
        {
          name: "Morning Batch",
          timing: "6:00 AM - 7:30 AM",
          strength: 15,
          availability: "Available",
        },
        {
          name: "Evening Batch",
          timing: "4:00 PM - 5:30 PM",
          strength: 20,
          availability: "Full",
        },
        {
          name: "Weekend Batch",
          timing: "10:00 AM - 12:00 PM",
          strength: 12,
          availability: "Available",
        },
      ],
      subjects: [
        {
          name: "Mathematics",
          topics: ["Algebra", "Trigonometry", "Calculus"],
          level: "Advanced",
        },
        {
          name: "Physics",
          topics: ["Mechanics", "Electromagnetism", "Optics"],
          level: "Intermediate",
        },
        {
          name: "Chemistry",
          topics: ["Organic", "Inorganic", "Physical"],
          level: "Basic",
        },
      ],
      sessions: [
        {
          date: "2025-11-01",
          status: "completed",
          notes: "Covered Introduction to Trigonometry",
        },
        {
          date: "2025-11-03",
          status: "completed",
          notes: "Solved practice problems on Trigonometric ratios",
        },
        {
          date: "2025-11-05",
          status: "scheduled",
          notes: "Topics: Heights and Distances",
        },
      ],
      materials: [
        {
          title: "Trigonometry Basics",
          type: "PDF Notes",
          url: "#",
        },
        {
          title: "Practice Problems Set 1",
          type: "Worksheet",
          url: "#",
        },
        {
          title: "Video Tutorial - Sine and Cosine",
          type: "Video",
          url: "#",
        },
      ],
      progressReports: [
        {
          date: "2025-11-01",
          score: 85,
          description:
            "Excellent understanding of basic concepts. Needs more practice with complex problems.",
        },
        {
          date: "2025-11-03",
          score: 90,
          description:
            "Showing significant improvement in problem-solving speed.",
        },
      ],
    };

    setTuition(mockTuition);
    setLoading(false);
  }, [id]);
  if (loading || !tuition) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Teacher Info & Subject Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Subject and Basic Info Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {tuition.subject.name} - {tuition.subject.grade}
              </h1>

              <div className="flex items-center mb-4">
                <FaChalkboardTeacher className="text-purple-600 text-xl mr-2" />
                <span className="text-gray-700 font-medium">
                  {tuition.teacher.fullName}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center">
                  <FaBook className="text-purple-600 mr-2" />
                  <span className="text-gray-600">
                    Subject: {tuition.subject.name}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaClock className="text-purple-600 mr-2" />
                  <span className="text-gray-600">
                    Duration: {tuition.schedule.startDate} -{" "}
                    {tuition.schedule.endDate}
                  </span>
                </div>
                <div className="flex items-center">
                  <FaRupeeSign className="text-purple-600 mr-2" />
                  <span className="text-gray-600">
                    Fee: ₹{tuition.payment.hourlyRate}/hour
                  </span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-purple-600 mr-2" />
                  <span className="text-gray-600">Mode: {tuition.mode}</span>
                </div>
              </div>
            </div>

            {/* Schedule Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <FaCalendarAlt className="text-purple-600 mr-2" />
                Schedule
              </h2>
              <div className="space-y-4">
                {tuition.schedule.recurringDays.map((day, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <span className="font-medium text-gray-700">{day}</span>
                    <span className="text-gray-600">
                      {tuition.schedule.timeSlot.startTime} -{" "}
                      {tuition.schedule.timeSlot.endTime}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Sessions History */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Session History
              </h2>
              <div className="space-y-4">
                {tuition.sessions.map((session, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">
                        {new Date(session.date).toLocaleDateString()}
                      </span>
                      <span
                        className={`px-3 py-1 rounded-full text-sm ${
                          session.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : session.status === "cancelled"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {session.status}
                      </span>
                    </div>
                    {session.notes && (
                      <p className="text-gray-600 text-sm mt-2">
                        {session.notes}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Top Students Section - Moving Cards */}
            <div className="bg-white rounded-lg shadow-md p-6 overflow-hidden">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Top Performers
              </h2>
              <div className="flex  px-4 justify-center items-center gap-4">
                {tuition.topStudents.map((student, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-64 bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-md p-4"
                  >
                    <div className="flex items-center space-x-4">
                      <img
                        src={student.image}
                        alt={student.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {student.name}
                        </h3>
                        <div className="flex items-center mt-1">
                          <span className="text-sm font-medium text-purple-600">
                            Grade: {student.grade}
                          </span>
                          <span className="mx-2 text-gray-300">|</span>
                          <span className="text-sm text-gray-600">
                            {student.score}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-gray-600">
                      {student.achievement}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Batches Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Available Batches
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tuition.batches.map((batch, index) => (
                  <div
                    key={index}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <h3 className="font-semibold text-gray-800">
                      {batch.name}
                    </h3>
                    <div className="mt-2 space-y-1">
                      <p className="text-sm text-gray-600">
                        Timing: {batch.timing}
                      </p>
                      <p className="text-sm text-gray-600">
                        Students: {batch.strength}
                      </p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                          batch.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {batch.availability}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Subjects Section */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Subjects Covered
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {tuition.subjects.map((subject, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-gray-800">
                        {subject.name}
                      </h3>
                      <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                        {subject.level}
                      </span>
                    </div>
                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">
                        Topics Covered:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {subject.topics.map((topic, topicIndex) => (
                          <span
                            key={topicIndex}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Actions & Materials */}
          <div className="space-y-6">
            {/* Quick Actions Card */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors">
                  Join Next Session
                </button>
                <button className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50 transition-colors">
                  View Study Materials
                </button>
                <button className="w-full border border-purple-600 text-purple-600 py-2 px-4 rounded-md hover:bg-purple-50 transition-colors">
                  Contact Teacher
                </button>
              </div>
            </div>

            {/* Study Materials */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Study Materials
              </h2>
              <div className="space-y-3">
                {tuition.materials?.map((material, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded-md hover:bg-gray-50"
                  >
                    <div>
                      <h3 className="font-medium text-gray-800">
                        {material.title}
                      </h3>
                      <p className="text-sm text-gray-500">{material.type}</p>
                    </div>
                    <a
                      href={material.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800"
                    >
                      View
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Report */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Progress Reports
              </h2>
              <div className="space-y-4">
                {tuition.progressReports?.map((report, index) => (
                  <div key={index} className="border-b pb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-700">
                        {new Date(report.date).toLocaleDateString()}
                      </span>
                      {report.score && (
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                          Score: {report.score}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 text-sm">
                      {report.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TuitionDetails;
