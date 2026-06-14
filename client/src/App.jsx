import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import MeetingsList from "./pages/MeetingsList";
import UpdateMeeting from "./pages/UpdateMeeting";
import AddMeeting from "./pages/AddMeeting";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app-wrapper">
        <Navbar />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/meetings" element={<MeetingsList />} />
            <Route path="/meetings/add" element={<AddMeeting />} />
            <Route path="/meetings/:id/edit" element={<UpdateMeeting />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}


export default App;
