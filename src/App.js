import { BrowserRouter, Routes, Route } from "react-router-dom";

import LanguageSync from "./components/LanguageSync";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import InfraProjects from "./pages/InfraProjects";
import Trading from "./pages/Trading";
import Investment from "./pages/Investment";
import Physio from "./pages/Physio";
import Admin from "./pages/Admin";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <LanguageSync />
      <ScrollManager />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/infra-projects" element={<InfraProjects />} />
        <Route path="/trading" element={<Trading />} />
        <Route path="/physio" element={<Physio />} />
        <Route path="/investment" element={<Investment />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/in-project" element={<Trading />} />
        <Route path="/physio-life" element={<Physio />} />
        <Route path="/investment-planner" element={<Investment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
