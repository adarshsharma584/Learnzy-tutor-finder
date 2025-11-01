import React, { useRef, useState, useEffect } from "react";
import { SiMaildotru } from "react-icons/si";
import { useNavigate,useLocation } from "react-router-dom";

const OtpGenerationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [expired, setExpired] = useState(false);
  const inputs = useRef([]);

  useEffect(() => {
    if (timer === 0) {
      setExpired(true);
      return;
    }
    setExpired(false);
    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (e, idx) => {
    const value = e.target.value.replace(/\D/g, "");
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[idx] = value;
    setOtp(newOtp);
    if (value && idx < 5) {
      inputs.current[idx + 1].focus();
    }
  };

  const handleKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !otp[idx] && idx > 0) {
      inputs.current[idx - 1].focus();
    }
  };

  const handleGenerateNewOtp = () => {
    setOtp(["", "", "", "", "", ""]);
    setTimer(60);
    setExpired(false);
    if (inputs.current[0]) inputs.current[0].focus();
    // Optionally, trigger backend OTP resend here
  };

  const formatTime = (t) => {
    const m = String(Math.floor(t / 60)).padStart(2, "0");
    const s = String(t % 60).padStart(2, "0");
    return `${m}:${s}`;
  };
  const handleVerifyOtp = () => {
    const enteredOtp = otp.join("");
    console.log("Verifying OTP:", enteredOtp);
    navigate(from, { replace: true });
    // Add actual OTP verification logic here
  };
   
   
  return (
    <div className="min-h-screen flex flex-col items-center   bg-gray-100 px-4 py-8 border-2">
      <SiMaildotru className="h-8 w-auto text-gray-700 " />
      <h2 className="text-3xl font-semibold text-gray-700 mb-6 mt-2 ">
        Verify your Email
      </h2>
      <div className="bg-gray-50 rounded-xl shadow-2xl border-1 border-gray-200 px-8 py-10 w-full max-w-md flex flex-col items-center">
        <h2 className="text-3xl font-bold text-sky-800 mb-2">Enter OTP</h2>
        <p className="text-gray-600 mb-8 text-center">
          We have sent a 6-digit verification code to your email.
        </p>
        <div className="flex gap-3 mb-6">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputs.current[idx] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              className="w-12 h-14 text-2xl text-center text-sky-600 border-2 border-sky-200 focus:border-sky-500 rounded-lg bg-white shadow-sm outline-none transition-all duration-200"
              value={typeof digit === "string" ? digit : ""}
              onChange={(e) => handleChange(e, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              autoFocus={idx === 0}
            />
          ))}
        </div>
        {!expired ? (
          <button
            className="w-full py-3 mt-2 bg-sky-800 text-white rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl"
            disabled={otp.some((d) => d === "")}
            onClick={ handleVerifyOtp }
          >
            Verify OTP
          </button>
        ) : (
          <button
            className="w-full py-3 mt-2 bg-sky-800 text-white rounded-lg font-semibold text-lg hover:bg-sky-900 transition-all duration-300 shadow-lg hover:shadow-xl"
            onClick={handleGenerateNewOtp}
          >
            Generate New OTP
          </button>
        )}
      </div>
      <div className="text-gray-700 mt-4 text-center">
        {expired ? (
          <span className=" font-medium"></span>
        ) : (
          <>
            OTP will end in{" "}
            <span className="text-sky-800 font-medium">
              {formatTime(timer)}
            </span>
          </>
        )}
      </div>
    </div>
  );
};

export default OtpGenerationPage;
