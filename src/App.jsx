import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownTimer from "./components/CountDownTimer";
import SurprisePage from "./components/SurprisePage";
import PhotoGallery from "./components/PhotoGallery"; 
import Note from "./components/Note"; 
import WishesList from "./components/WishesList";
//import Auth from "./components/Auth";
//import MessageForm from "./components/messageform";
//import MessageList from "./components/message";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CountdownTimer />} />
        <Route path="/surprise" element={<SurprisePage />} />
        <Route path="/gallery" element={<PhotoGallery />} />
        <Route path="/message" element={<Note />} />
        <Route path="/wishes" element={<WishesList />} />
        <Route path="/add-message" element={<messageform />} />
        <Route path="/messages" element={<message/>} />
        <Route path="/login" element={<auth />} />
      </Routes>
    </Router>
  );
}

export default App;
