import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Login from "./pages/Login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import NewHired from "./pages/NewHired";
import DayPage from "./pages/DayPage";
import Assessment from "./pages/Assessment";
import FinalAssessment from "./pages/FinalAssessment";
import VideoPlayer from "./pages/VideoPlayer";
import SoftSkill from "./pages/SoftSkill";
import ProductTraining from "./pages/ProductTraining";
import OJT from "./pages/OJT";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <main className="main-content">
        <Routes>

          <Route path="/" element={<Login />} />

          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />

          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />

          <Route path="/new-hired" element={<NewHired />} />
          <Route path="/new-hired/:dayId" element={<DayPage />} />
          <Route path="/video/:dayId/:topicId" element={<VideoPlayer />} />
          <Route path="/assesment/:dayId/:topicId" element={<Assessment />} />
          <Route path="/final-assesment/:dayId" element={<FinalAssessment />} />

          <Route path="/soft-skill" element={<SoftSkill />} />
          <Route path="/product-training" element={<ProductTraining />} />
          <Route path="/ojt" element={<OJT />} />

        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;