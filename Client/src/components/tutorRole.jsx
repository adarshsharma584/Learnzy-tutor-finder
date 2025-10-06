import React, { useState } from "react";

const buttonBase =
  "px-6 py-3 rounded-lg min-w-[200px] font-semibold text-lg border-2 transition-all duration-200 focus:outline-none shadow-sm";
const buttonSelected =
  "bg-sky-800 text-white border-sky-800 shadow-lg scale-105";
const buttonUnselected = "bg-white text-sky-800 border-sky-200 hover:bg-sky-50";

const TutorRole = ({ onSubmit }) => {
  const [roleType, setRoleType] = useState("");
  const [workType, setWorkType] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ roleType, workType, status });
    }
  };

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center  px-4 py-8">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl  px-10 py-12 w-full max-w-lg flex flex-col gap-6 border border-gray-100"
      >
        <h2 className="text-3xl font-extrabold text-gray-600 mb-2 text-start tracking-tight border-b pb-4">
          Role Details
        </h2>
        {/* Tutor Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4 text-lg">
            You want to become a:
          </label>
          <div className="flex gap-6 justify-around">
            <button
              type="button"
              className={`${buttonBase} ${
                roleType === "individual" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setRoleType("individual")}
            >
              Individual Tutor
            </button>
            <button
              type="button"
              className={`${buttonBase} ${
                roleType === "institution" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setRoleType("institution")}
            >
              Start an Institution
            </button>
          </div>
        </div>
        {/* Work Type */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4 text-lg">
            You want to do:
          </label>
          <div className="flex gap-6 justify-around">
            <button
              type="button"
              className={`${buttonBase} ${
                workType === "part-time" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setWorkType("part-time")}
            >
              Part Time
            </button>
            <button
              type="button"
              className={`${buttonBase} ${
                workType === "full-time" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setWorkType("full-time")}
            >
              Full Time
            </button>
          </div>
        </div>
        {/* Current Status */}
        <div>
          <label className="block text-gray-700 font-semibold mb-4 text-lg">
            You are currently:
          </label>
          <div className="flex gap-6 justify-around">
            <button
              type="button"
              className={`${buttonBase} ${
                status === "studying" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setStatus("studying")}
            >
              Studying
            </button>
            <button
              type="button"
              className={`${buttonBase} ${
                status === "teacher" ? buttonSelected : buttonUnselected
              }`}
              onClick={() => setStatus("teacher")}
            >
              Teacher
            </button>
          </div>
        </div>
        <button
          type="submit"
          className="w-full py-3 mt-2 bg-sky-800 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!roleType || !workType || !status}
        >
          Continue
        </button>
      </form>
    </div>
  );
};

export default TutorRole;
