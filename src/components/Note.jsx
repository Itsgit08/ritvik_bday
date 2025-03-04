import { useState } from "react";
import { db } from "../firebase"; // Ensure correct import path
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const HeartfeltNote = () => {
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigate

  const handleSave = async () => {
    if (note.trim() === "") return;
    setLoading(true);

    try {
      await addDoc(collection(db, "wishes"), {
        message: note,
        timestamp: new Date(),
      });
      alert("Your heartfelt note has been saved! ❤️");
      setNote(""); // Clear textarea after saving
    } catch (error) {
      console.error("Error saving message:", error);
      alert("Failed to save your note. Please try again.");
    }

    setLoading(false);
  };

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate("/surprise"); // ✅ Go back only if there's history
    } else {
      navigate("/"); // ✅ Default to home or another route
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: "url('/images/back2.jpeg')" }}
    >
      <h1 className="text-4xl font-bold text-white mb-6">💌 BEST WISHES TO RITVIK 💌</h1>

      <textarea
        className="w-full max-w-2xl h-60 p-4 text-lg border-2 border-pink-500 bg-pink-500 bg-opacity-20 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
        placeholder="Write your message here..."
        value={note}
        onChange={(e) => setNote(e.target.value)}
      ></textarea>

      <button
        className={`mt-4 px-6 py-3 rounded-lg text-lg font-bold text-white transition-all duration-300 ${
          note.trim() !== "" ? "bg-pink-500 hover:bg-pink-600" : "bg-pink-300 cursor-not-allowed"
        }`}
        onClick={handleSave}
        disabled={loading || note.trim() === ""}
      >
        {loading ? "Saving..." : "Save Note"}
      </button>

      <button
        onClick={handleBack}
        className="mt-6 px-6 py-3 bg-pink-500 text-white font-bold rounded-xl shadow-md hover:bg-pink-300 transition duration-300 z-10"
      >
        🔙 Back
      </button>
    </div>
  );
};

export default HeartfeltNote;
