import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark" || window.matchMedia("(prefers-color-scheme: dark)").matches);
  const navigate = useNavigate();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleNavbar = () => {
    setNavbarOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    onLogout();
    navigate("/");
  };

  const handleEditUser = () => {
    navigate("/edit-user");
  };

  const toggleTheme = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <nav className="bg-[#171717] text-white p-4">
      <ul className="flex justify-between items-center">
        <li className="flex space-x-3">
          <button onClick={toggleTheme} className={`p-2 rounded-lg ${darkMode ? "bg-gray-200 text-black" : "bg-black text-white"}`}>
            {darkMode ? "Lightmode" : "Darkmode"}
          </button>
        </li>

        <li className="flex items-center space-x-3">
          <h1 className="text-lg">{user}</h1>
          <button onClick={handleEditUser} className="border border-white text-white font-bold rounded-lg p-1 px-2">
            Edit User
          </button>
          <div className="relative">
            <button onClick={toggleNavbar} className="bg-transparent border border-white text-white font-bold rounded-lg p-1 px-2">
              Dropdown
            </button>
            <button onClick={handleLogout} className={`absolute right-0 mt-2 p-2 rounded-lg bg-red-500 text-white transition-all duration-150 ease-in-out ${navbarOpen ? "opacity-100 translate-y-8" : "opacity-0 -translate-y-20 "}`}>
              Logout
            </button>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
