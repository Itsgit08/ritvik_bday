import React, { useState, useRef, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaRandom, FaRedo, FaHeart, FaEllipsisH } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const photos = [
  { src: "/images/7.webp", song: "/songs/2.mp3" },
  { src: "/images/8.webp", song: "/songs/6.mp3" },
  { src: "/images/6.webp", song: "/songs/1.mp3" },
  { src: "/images/1.webp", song: "/songs/4.mp3" },
  { src: "/images/10.webp", song: "/songs/3.mp3" },
  { src: "/images/2.webp", song: "/songs/5.mp3" }
];

const PhotoGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeated, setIsRepeated] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(photos[0].song));
  const navigate = useNavigate();

  useEffect(() => {
    audioRef.current.src = photos[currentIndex].song;

    if (isPlaying) {
      audioRef.current.play().catch((error) => console.log("Auto-play blocked:", error));
    }

    const updateProgress = () => {
      if (audioRef.current.duration) {
        setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
      }
    };

    audioRef.current.addEventListener("timeupdate", updateProgress);

    audioRef.current.onended = () => {
      if (isRepeated) {
        audioRef.current.play();
      } else {
        nextSong();
      }
    };

    return () => {
      audioRef.current.removeEventListener("timeupdate", updateProgress);
      audioRef.current.onended = null;
    };
  }, [currentIndex, isPlaying, isRepeated]);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    let nextIndex = isShuffled ? Math.floor(Math.random() * photos.length) : (currentIndex + 1) % photos.length;
    setCurrentIndex(nextIndex);
  };

  const prevSong = () => {
    let prevIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const handleSeek = (e) => {
    const newTime = (e.target.value / 100) * audioRef.current.duration;
    audioRef.current.currentTime = newTime;
    setProgress(e.target.value);
  };

  const handleMessagePageClick = () => {
    navigate("/message");
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* Video Background (Optimized for Mobile) */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      >
        <source src="/v3.mp4" type="video/mp4" />
      </video>

      {/* Music Player Card */}
      <div className="bg-gradient-to-r from-red-500 to-pink-600 p-4 sm:p-6 rounded-lg shadow-lg w-80 sm:w-96 flex flex-col items-center z-10">
        <img
          src={photos[currentIndex].src}
          alt="Current"
          className="w-64 h-64 sm:w-80 sm:h-80 object-cover rounded-lg"
          loading="lazy"
        />

        <input
          type="range"
          min="0"
          max="100"
          value={progress}
          onChange={handleSeek}
          className="w-full mt-4 appearance-none bg-gray-300 h-2 rounded-lg focus:outline-none"
          style={{ background: `linear-gradient(to right, black ${progress}%, #ccc ${progress}%)` }}
        />

        <div className="flex items-center justify-between w-full p-4">
          <FaHeart className="text-gray-700 text-lg sm:text-xl cursor-pointer" />
          <div className="flex items-center space-x-2 sm:space-x-4">
            <FaRandom 
              className={`text-lg sm:text-xl cursor-pointer ${isShuffled ? "text-black" : "text-gray-500"}`} 
              onClick={() => setIsShuffled(!isShuffled)} 
            />
            <FaStepBackward className="text-lg sm:text-xl text-black cursor-pointer" onClick={prevSong} />
            {isPlaying ? (
              <FaPause className="text-2xl sm:text-3xl text-black cursor-pointer" onClick={togglePlayPause} />
            ) : (
              <FaPlay className="text-2xl sm:text-3xl text-black cursor-pointer" onClick={togglePlayPause} />
            )}
            <FaStepForward className="text-lg sm:text-xl text-black cursor-pointer" onClick={nextSong} />
            <FaRedo 
              className={`text-lg sm:text-xl cursor-pointer ${isRepeated ? "text-black" : "text-gray-500"}`} 
              onClick={() => setIsRepeated(!isRepeated)} 
            />
          </div>
          <FaEllipsisH className="text-gray-700 text-lg sm:text-xl cursor-pointer" />
        </div>
      </div>

      {/* Leave a Message Button */}
      <button
        className="mt-4 sm:mt-6 px-5 sm:px-6 py-2 sm:py-3 bg-yellow-500 text-white font-bold rounded-lg sm:rounded-xl shadow-md hover:bg-red-600 transition duration-300 z-10 text-sm sm:text-base"
        onClick={handleMessagePageClick}
      >
        BIRTHDAY WISHES ✍️
      </button>
    </div>
  );
};

export default PhotoGallery;
