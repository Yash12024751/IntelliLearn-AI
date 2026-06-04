import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import DashboardPreview from "./Pages/DashboardPreview";
import AdaptiveLearningView from "./Pages/AdaptiveLearningView";
import LectureProcessing from "./Pages/LectureProcessing";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<DashboardPreview />} />
        <Route path="/learning" element={<AdaptiveLearningView />} />
        <Route path="/processing" element={<LectureProcessing />} />
      </Routes>
    </Router>
  );
}

export default App;