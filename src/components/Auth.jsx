import { useState } from "react";
import { auth } from "../firebase"; // Firebase authentication
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password); // Sign Up
        alert("Account Created Successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password); // Login
        alert("Login Successful!");
        navigate("/message"); // Redirect to message page after login
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">{isSignUp ? "Sign Up" : "Login"}</h1>

      <input
        type="email"
        placeholder="Enter Email"
        className="mb-3 p-3 border rounded-lg w-80"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      
      <input
        type="password"
        placeholder="Enter Password"
        className="mb-3 p-3 border rounded-lg w-80"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="p-3 bg-blue-500 text-white rounded-lg w-80"
        onClick={handleAuth}
      >
        {isSignUp ? "Sign Up" : "Login"}
      </button>

      <p className="mt-3 cursor-pointer text-blue-500" onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? "Already have an account? Login" : "Don't have an account? Sign Up"}
      </p>
    </div>
  );
};

export default Auth;
