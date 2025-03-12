import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountdownTimer from "./components/CountdownTimer";
import SurprisePage from "./components/SurprisePage";
import PhotoGallery from "./components/PhotoGallery"; 
import Note from "./components/Note"; 
import WishesList from "./components/WishesList";

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
