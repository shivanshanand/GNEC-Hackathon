import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import ReportForm from "./components/ReportForm";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import ResourcesPage from "./pages/Resources";
import Navbar from "./components/Navbar"; 
import { ToastContainer } from "react-toastify";
import { Toaster } from "react-hot-toast";
import "./index.css";

const AppWrapper = () => {
  const location = useLocation();
  const hideNavbarRoutes = ["/admin", "/admin-login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/submit-report" element={<ReportForm />} />
        <Route path="/resources" element={<ResourcesPage />} />
        <Route
          path="/admin"
          element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/admin-login"
          element={<AdminLogin setIsAdmin={setIsAdmin} />}
        />
      </Routes>

      <ToastContainer
        position="top-right"
        autoClose={4000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        style={{ marginTop: "80px" }}
      />
      <Toaster position="top-right" />
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
};

export default App;
