import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const gridItems = [
  { image: "/images/11.jpg", message: "You are my today, my tomorrow, and my forever." },
  { image: "/images/15.jpg", message: "Loving you is the easiest and most beautiful thing I’ve ever done." },
  { image: "/images/13.jpg", message: "No matter where life takes us, my heart will always beat for you." },
  { image: "/images/14.jpg", message: "My love, you are the most beautiful part of my life, the melody in my heart, the warmth in my soul, and the light that guides me through every moment." },
  { image: "/images/12.jpg", message: "Your love has given me strength, joy, and a sense of completeness I never knew I needed." },
  { image: "/images/16.jpg", message: "My heart will always belong to you. I love you more than words can ever express, now and forever." },
];

const SurpriseGrid = () => {
  return (
    <div
  className="min-h-screen w-full overflow-y-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-2 gap-4 p-4 bg-cover bg-center"
  style={{ backgroundImage: "url('/images/back14.jpeg')" }}
>

      {gridItems.map((item, index) => (
        <motion.div
          key={index}
          className="relative flex items-center justify-center overflow-hidden rounded-lg shadow-lg group cursor-pointer h-[200px] sm:h-[250px] md:h-[300px] lg:h-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <motion.img
            src={item.image}
            alt="Grid Image"
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
          />
          <div className="absolute inset-0 bg-[#5e0c10] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-2">
            <p className="text-white text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center px-2">
              {item.message}
            </p>
          </div>
        </motion.div>
      ))}

      {/* Animated Button */}
      <motion.div
        className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Link to="/Gallery">
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-pink-500 to-red-500 text-white text-sm sm:text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all">
            Musical Gallery
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default SurpriseGrid;
