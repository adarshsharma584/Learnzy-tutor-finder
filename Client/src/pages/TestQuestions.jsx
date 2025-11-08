import React, { useEffect, useState } from "react";

const QUESTIONS = [
  {
    id: 1,
    question: "Which is the largest planet in our solar system?",
    options: ["Earth", "Mars", "Jupiter", "Venus"],
    answer: 2,
  },
  {
    id: 2,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "Charles Dickens",
      "William Shakespeare",
      "Jane Austen",
      "Mark Twain",
    ],
    answer: 1,
  },
  {
    id: 3,
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "NaCl"],
    answer: 2,
  },
  {
    id: 4,
    question: "Which continent is known as the 'Dark Continent'?",
    options: ["Asia", "Africa", "Europe", "Australia"],
    answer: 1,
  },
  {
    id: 5,
    question: "What is the capital of France?",
    options: ["Madrid", "Berlin", "Paris", "Rome"],
    answer: 2,
  },
  {
    id: 6,
    question: "Which element has the atomic number 1?",
    options: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    answer: 1,
  },
  {
    id: 7,
    question: "What is 12 * 8?",
    options: ["96", "86", "112", "102"],
    answer: 0,
  },
  {
    id: 8,
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Pablo Picasso",
      "Leonardo da Vinci",
      "Claude Monet",
    ],
    answer: 2,
  },
  {
    id: 9,
    question: "Which gas do plants primarily absorb for photosynthesis?",
    options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    answer: 2,
  },
  {
    id: 10,
    question: "Which language is primarily used for styling web pages?",
    options: ["HTML", "Python", "CSS", "Java"],
    answer: 2,
  },
  {
    id: 11,
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "UK", "Russia"],
    answer: 1,
  },
  {
    id: 12,
    question: "Who developed the theory of relativity?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Niels Bohr",
    ],
    answer: 1,
  },
  {
    id: 13,
    question: "What is the square root of 144?",
    options: ["10", "11", "12", "13"],
    answer: 2,
  },
  {
    id: 14,
    question: "Which organ in the human body pumps blood?",
    options: ["Lungs", "Liver", "Heart", "Kidneys"],
    answer: 2,
  },
  {
    id: 15,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Mercury", "Saturn"],
    answer: 1,
  },
  {
    id: 16,
    question: "Which is the smallest prime number?",
    options: ["0", "1", "2", "3"],
    answer: 2,
  },
  {
    id: 17,
    question: "What does HTML stand for?",
    options: [
      "HyperText Markup Language",
      "HighText Machine Language",
      "Hyperlinks Text Markup Language",
      "Home Tool Markup Language",
    ],
    answer: 0,
  },
  {
    id: 18,
    question: "Which instrument measures temperature?",
    options: ["Barometer", "Thermometer", "Hygrometer", "Altimeter"],
    answer: 1,
  },
  {
    id: 19,
    question: "Who is known as the father of computers?",
    options: [
      "Alan Turing",
      "Charles Babbage",
      "Tim Berners-Lee",
      "John von Neumann",
    ],
    answer: 1,
  },
  {
    id: 20,
    question: "Which country is famous for the Great Wall?",
    options: ["India", "China", "Japan", "Korea"],
    answer: 1,
  },
  {
    id: 21,
    question: "Which chemical is commonly used as table salt?",
    options: [
      "Sodium Chloride",
      "Potassium",
      "Magnesium Sulfate",
      "Calcium Carbonate",
    ],
    answer: 0,
  },
  {
    id: 22,
    question: "What is the boiling point of water at sea level (°C)?",
    options: ["90", "95", "100", "105"],
    answer: 2,
  },
  {
    id: 23,
    question: "Which planet has rings around it?",
    options: ["Mars", "Jupiter", "Saturn", "Neptune"],
    answer: 2,
  },
  {
    id: 24,
    question: "Which year did the first man land on the moon?",
    options: ["1965", "1969", "1972", "1959"],
    answer: 1,
  },
  {
    id: 25,
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<img>", "<a>", "<link>", "<href>"],
    answer: 1,
  },
];

function TestQuestions() {
  const [loading, setLoading] = useState(true);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [autosubmitted, setAutosubmitted] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  // Tab switch detection
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "hidden" && !submitted) {
        setSubmitted(true);
        setAutosubmitted(true);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibility);
  }, [submitted]);

  const handleOptionChange = (qid, idx) => {
    setAnswers((prev) => ({ ...prev, [qid]: idx }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  // Score calculation (optional)
  const score = Object.entries(answers).reduce((acc, [qid, idx]) => {
    const q = QUESTIONS.find((q) => q.id === Number(qid));
    return acc + (q && q.answer === idx ? 1 : 0);
  }, 0);

  return (
    <div className="min-h-screen bg-[#FFFCF2] flex flex-col items-center py-10 px-4">
      <div className=" w-full bg-white rounded-xl shadow-lg p-8 border border-gray-200">
        <h1 className="text-3xl font-bold text-sky-800 mb-4">
          Tutor Test Questions
        </h1>
        <div className="bg-yellow-200 border-l-4 border-yellow-500 p-4 rounded mb-6">
          <strong className="text-yellow-800">Note:</strong>
          <span className="text-gray-700 ml-2">
            No switching of tabs allowed, otherwise it will autosubmit your
            test.
          </span>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-sky-800 mb-4"></div>
            <span className="text-gray-500">Loading questions...</span>
          </div>
        ) : submitted ? (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-green-700 mb-2">
              Test Submitted
            </h2>
            {autosubmitted ? (
              <p className="text-red-600 font-semibold">
                Test was autosubmitted due to tab switch.
              </p>
            ) : null}
            <p className="text-gray-700 mt-2">
              Your Score:{" "}
              <span className="font-bold text-sky-800">
                {score} / {QUESTIONS.length}
              </span>
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center gap-4">
            <form onSubmit={handleSubmit}>
              {/* <div className="bg-red-600 flex flex-wrap justify-cemter gap-4 items-center"> */}
              <div className="space-y-4 flex flex-wrap items-center space-x-2 justify-between   ">
                {QUESTIONS.map((q, idx) => (
                  <div
                    key={q.id}
                    className="bg-gray-50 rounded-lg p-4  min-w-[48%] max-w-[45%]"
                  >
                    {/* <div className="text-sm text-gray-500 mb-1">
                      Question {idx + 1} of {QUESTIONS.length}
                    </div> */}
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">
                      Question {idx + 1}. {q.question}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {q.options.map((opt, optIdx) => (
                        <label
                          key={optIdx}
                          className="flex items-center cursor-pointer py-2 px-3 rounded hover:bg-sky-50 transition-all"
                        >
                          <input
                            type="radio"
                            name={`q_${q.id}`}
                            value={optIdx}
                            checked={answers[q.id] === optIdx}
                            onChange={() => handleOptionChange(q.id, optIdx)}
                            className="form-radio h-5 w-5 text-sky-800 mr-3"
                            required
                          />
                          <span className="text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              {/* </div> */}
            </form>
            <div className="w-full flex justify-end items-center py-4">
              <button
                type="submit"
                className="mt-8 px-4 py-3 bg-sky-800 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 transition-colors"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TestQuestions;
