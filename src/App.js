import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import InfraProjects from "./pages/InfraProjects";
import InProject from "./pages/InProject";
import InvestmentPlanner from "./pages/InvestmentPlanner";
import PhysioLife from "./pages/PhysioLife";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/infra-projects" element={<InfraProjects />} />
        <Route path="/in-project" element={<InProject />} />
        <Route path="/investment-planner" element={<InvestmentPlanner />} />
        <Route path="/physio-life" element={<PhysioLife />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
