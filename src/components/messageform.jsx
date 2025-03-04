// src/components/MessageForm.js
import React, { useState } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const MessageForm = () => {
  const [message, setMessage] = useState("");

  const addMessage = async () => {
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "messages"), { 
        text: message, 
        timestamp: serverTimestamp() 
      });
      setMessage(""); // Message add hone ke baad input clear karna
    } catch (error) {
      console.error("Error adding message:", error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={addMessage}>Send</button>
    </div>
  );
};

export default MessageForm;
