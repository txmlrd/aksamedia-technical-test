import React, { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import EditUser from "./components/EditUser";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="App">
      <Navbar user={user ? user.name : null} onLogout={handleLogout} />

      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/edit-user" element={<EditUser setUser={setUser} />} />
      </Routes>
    </div>
  );
}

export default App;
