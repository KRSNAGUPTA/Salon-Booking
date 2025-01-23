import "./App.css";
import { HomePage } from "./pages/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import { ToastProvider } from "./components/ui/toast";
import { AuthProvider } from "./contexts/authContext";
import SalonsPage from "./pages/SalonListingPage";
import RegisterSalon from "./pages/RegisterSalon";
import Authorized from "./Middleware/Authorized";
import SalonDashboard from "./pages/SalonDashboard";

function App() {
  return (
    <ToastProvider>
        <Router>
      <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/salon" element={<SalonsPage />} />
            <Route path="/salon/register" element={<Authorized>
              <RegisterSalon />
            </Authorized>} />
            <Route path="/salon/dashboard" element={<Authorized>
              <SalonDashboard />
            </Authorized>} />
          </Routes>
      </AuthProvider>
        </Router>
    </ToastProvider>
  );
}

export default App;
