import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/helper/ProtectedRoute";
import Login from "./pages/Login/Login";
import Home from "./pages/Home";
import "./App.css";
import FaviconLoader from "./components/FaviconLoader";
import AnalysisResults from "./pages/AnalysisResults";
import AnalysisDetailPage from "./pages/AnalysisDetailPage";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <FaviconLoader />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/results" element={<AnalysisResults />} />
          <Route path="/analysis-detail" element={<AnalysisDetailPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
