import { useState } from "react";
import TutorRole from "../components/TutorRole.jsx";


function TeacherRegister() {
  const [step, setStep] = useState(1);
  const [showRole, setShowRole] = useState(true);
  const [roleData, setRoleData] = useState(null);
  const [formData, setFormData] = useState({
    // Step 1
    tuitionName: "",
    teacherName: "",
    classes: "",
    medium: "",
    board: "",
    subjects: "",
    // Step 2
    address: "",
    // Step 3
    qualification: "",
    experience: "",
    bio: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    setStep((prev) => Math.min(prev + 1, 3));
  };

  const handlePrev = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For subjects, you might want to split the string into an array
    const submissionData = {
      ...formData,
      ...roleData,
      subjects: formData.subjects
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s),
    };
    console.log("Form submitted:", submissionData);
    // Here you would typically send the data to your backend API
  };

  // Handler for TutorRole continue
  const handleRoleContinue = (data) => {
    setRoleData(data);
    setShowRole(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 ">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl my-8">
        {/* Header */}
        <div className="bg-[#403D39] p-6 text-center">
          <h1 className="text-2xl font-bold text-white">
            Register Your Tuition
          </h1>
          <p className="text-white/80 text-sm mt-2">
            Fill in the details below to get listed on Learnzy.
          </p>
        </div>
        {showRole && <TutorRole onSubmit={handleRoleContinue} />}
        {/* Form Container */}
        {!showRole && (
          <div className="overflow-hidden">
            <form onSubmit={handleSubmit}>
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${(step - 1) * 100}%)` }}
              >
                {/* Step 1: Basic Details */}
                <div className="w-full flex-shrink-0 p-8 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Basic Details
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="tuitionName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tuition Name
                      </label>
                      <input
                        id="tuitionName"
                        name="tuitionName"
                        type="text"
                        required
                        value={formData.tuitionName}
                        onChange={handleChange}
                        className="w-full px-4 bg-white text-black py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Parihar's Coaching"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="teacherName"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Teacher's Name
                      </label>
                      <input
                        id="teacherName"
                        name="teacherName"
                        type="text"
                        required
                        value={formData.teacherName}
                        onChange={handleChange}
                        className="w-full px-4  bg-white text-black py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., Aditya Parihar"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="classes"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Classes Taught
                      </label>
                      <input
                        id="classes"
                        name="classes"
                        type="text"
                        required
                        value={formData.classes}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., 6-10, 11-12"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="medium"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Medium
                      </label>
                      <input
                        id="medium"
                        name="medium"
                        type="text"
                        required
                        value={formData.medium}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., English, Hindi"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="board"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Board
                      </label>
                      <input
                        id="board"
                        name="board"
                        type="text"
                        required
                        value={formData.board}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., CBSE, MP Board"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="subjects"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Subjects
                      </label>
                      <input
                        id="subjects"
                        name="subjects"
                        type="text"
                        required
                        value={formData.subjects}
                        onChange={handleChange}
                        className="w-full px-4 py-2  bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="Maths, Physics (comma-separated)"
                      />
                    </div>
                  </div>
                </div>

                {/* Step 2: Address */}
                <div className="w-full flex-shrink-0 p-8 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Address Details
                  </h2>
                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Address
                    </label>
                    <textarea
                      id="address"
                      name="address"
                      rows="4"
                      required
                      value={formData.address}
                      onChange={handleChange}
                      className="w-full px-4 py-2  bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="Enter the full address of the tuition center"
                    />
                  </div>
                </div>

                {/* Step 3: Qualifications */}
                <div className="w-full flex-shrink-0 p-8 space-y-6">
                  <h2 className="text-xl font-semibold text-gray-800 border-b pb-2">
                    Teacher's Qualifications
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="qualification"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Highest Qualification
                      </label>
                      <input
                        id="qualification"
                        name="qualification"
                        type="text"
                        required
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., B.Sc in Physics"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="experience"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Teaching Experience (Years)
                      </label>
                      <input
                        id="experience"
                        name="experience"
                        type="number"
                        required
                        value={formData.experience}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="e.g., 5"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="bio"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Short Bio
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows="4"
                      required
                      value={formData.bio}
                      onChange={handleChange}
                      className="w-full px-4 py-2 bg-white text-black border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                      placeholder="A brief introduction about your teaching style and expertise."
                    />
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="p-8 bg-gray-50 border-t flex justify-between items-center">
                <div>
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                    >
                      Previous
                    </button>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  {/* Progress Dots */}
                  <div className="flex gap-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className={`w-3 h-3 rounded-full transition-colors ${
                          step === i ? "bg-[#403D39]" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {step < 3 && (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="px-6 py-2 bg-[#403D39] text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                    >
                      Next
                    </button>
                  )}

                  {step === 3 && (
                    <button
                      type="submit"
                      className="w-full bg-[#403D39] text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors font-semibold"
                    >
                      Register
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default TeacherRegister;
