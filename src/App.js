import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  Routes,
} from "react-router-dom";
import "./App.css";
import POS from "./pages/Pos";
import { useSelector } from "react-redux";
import Login from "./pages/Login";
import ErrorPage from "./pages/ErrorPage";
import StocksManagement from "./pages/StocksManagement";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.userRole);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        {isAuthenticated ? (
          <>
            {userRole === "ADMIN" && (
              <Route path="/stocks" element={<StocksManagement />} />
            )}
            <Route path="/pos" element={<POS />} />
          </>
        ) : (
          <Route path="*" element={<Navigate to="/login" />} />
        )}

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
