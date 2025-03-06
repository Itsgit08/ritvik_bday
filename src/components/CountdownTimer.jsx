import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti"; // 🎊 Confetti Import

const CountdownTimer = () => {
  const navigate = useNavigate();
  const { width, height } = useWindowSize(); // Get screen size for Confetti

  const targetDate = new Date("2025-03-06T00:00:00").getTime();
  const today = new Date();
  const [timeLeft, setTimeLeft] = useState(targetDate - Date.now());
  const [isCountdownOver, setIsCountdownOver] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(today >= new Date("2025-03-03")); // Enable button from March 13 onward

  useEffect(() => {
    const timer = setInterval(() => {
      const remainingTime = Math.max(0, targetDate - Date.now());
      setTimeLeft(remainingTime);

      if (remainingTime === 0) {
        setIsCountdownOver(true); // 🎉 Confetti Trigger
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (time) => {
    const days = Math.floor(time / (1000 * 60 * 60 * 24));
    const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((time % (1000 * 60)) / 1000);
    return { days, hours, minutes, seconds };
  };

  const { days, hours, minutes, seconds } = formatTime(timeLeft);

  const handleButtonClick = () => {
    if (isUnlocked) {
      navigate("/surprise"); // 🎁 Redirect to Surprise Page
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-white p-4 overflow-hidden bg-fixed bg-center bg-no-repeat"
      style={{ 
        backgroundImage: "url('/images/back5.jpeg')",
        backgroundSize: "cover" // 🔥 Ensuring image properly fits
      }}
    >
      {/* 🎊 Show Confetti when countdown is over */}
      {isCountdownOver && <Confetti width={width} height={height} />}

      {/* Hide the countdown heading when countdown is over */}
      {!isCountdownOver && (
        <motion.h1
          className="text-[#FC427B] text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-center bg-pink-100 text-pink-600 px-4 py-2 md:px-6 md:py-3 rounded-lg shadow-lg inline-block"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          THE COUNTDOWN HAS BEGUN
        </motion.h1>
      )}

      {/* Show countdown timer if time is left */}
      {timeLeft > 0 ? (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          {[{ label: "Days", value: days }, { label: "Hours", value: hours }, { label: "Minutes", value: minutes }, { label: "Seconds", value: seconds }].map((item, index) => (
            <motion.div
              key={index}
              className="bg-white text-pink-600 p-4 rounded-2xl shadow-lg w-20 md:w-28 lg:w-32"
              whileHover={{ scale: 1.1 }}
            >
              <p className="text-3xl md:text-4xl font-bold">{item.value}</p>
              <p className="text-xs md:text-sm">{item.label}</p>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        // 🎉 Show birthday message when countdown ends
        <motion.div
  className="text-3xl md:text-5xl lg:text-6xl font-bold text-center font-extrabold text-text-pink-600 mt-6"
  initial={{ opacity: 0, scale: 0.5 }}
  animate={{ opacity: 1, scale: window.innerWidth < 768 ? 1.1 : 1.5 }}
  transition={{ duration: 1 }}
>
  HAPPY BIRTHDAY Bubuu
</motion.div>

      )}

      {/* 🎁 Surprise Button (Enabled from March 13) */}
      <button
        className={`mt-6 px-6 py-3 font-bold rounded-xl shadow-md transition duration-300 ${
          isUnlocked
            ? "bg-yellow-400 text-black hover:bg-yellow-500"
            : "bg-yellow-300 text-black cursor-not-allowed"
        }`}
        onClick={handleButtonClick}
        disabled={!isUnlocked} // Disable button until March 13
      >
        Surprises
      </button>
    </div>
  );
};

export default CountdownTimer;
