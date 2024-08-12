import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ user, onLogout }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [themeMode, setThemeMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme || "system";
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (themeMode === "system") {
      const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
      document.documentElement.classList.toggle("dark", isDarkMode);
    } else {
      document.documentElement.classList.toggle("dark", themeMode === "dark");
    }
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

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

  const setDarkMode = () => {
    setThemeMode("dark");
  };

  const setLightMode = () => {
    setThemeMode("light");
  };

  const setSystemMode = () => {
    setThemeMode("system");
  };

  return (
    <nav className="bg-[#171717] text-white p-4 dark:bg-[#0d0d0d] transition-colors duration-300">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <ul className="flex flex-col md:flex-row md:items-center justify-between md:space-x-4 w-full">
          <div className="flex flex-col space-y-1">
            <li className="flex-grow text-center md:text-left mb-4 md:mb-0">
              <h1 className="md:text-3xl text-2xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">AksaMedia Technical Test</h1>
            </li>
            <li className="flex space-x-2 mb-4 md:mb-0 justify-center md:justify-start">
              <button onClick={setDarkMode} className={`p-2 rounded-lg transition-colors duration-300 ${themeMode === "dark" ? "bg-gray-200 text-black" : "bg-transparent border border-white text-white hover:bg-gray-800"}`}>
                Dark
              </button>
              <button onClick={setLightMode} className={`p-2 rounded-lg transition-colors duration-300 ${themeMode === "light" ? "bg-gray-200 text-black" : "bg-transparent border border-white text-white hover:bg-gray-800"}`}>
                Light
              </button>
              <button onClick={setSystemMode} className={`p-2 rounded-lg transition-colors duration-300 ${themeMode === "system" ? "bg-gray-200 text-black" : "bg-transparent border border-white text-white hover:bg-gray-800"}`}>
                System
              </button>
            </li>
          </div>

          <li className="flex md:flex-row flex-col md:space-y-0 space-y-5 items-center mt-5 space-x-2 relative">
            {user ? (
              <div className="flex md:flex-row flex-col space-y-2 md:space-y-0">
                <h1 className="text-lg mx-5">
                  Hai, <span className="bg-gradient-to-r font-bold italic from-pink-500 via-yellow-500 to-blue-500 text-transparent bg-clip-text">{user}</span>
                </h1>{" "}
                <div className="flex flex-row space-x-4">
                  <button onClick={handleEditUser} className="border border-white text-white font-bold rounded-lg p-1 px-2 hover:bg-gray-700 transition-colors duration-300">
                    Edit User
                  </button>

                  <div className="relative group">
                    <button onClick={toggleNavbar} className="bg-transparent border border-white text-white font-bold rounded-lg p-1 px-2 hover:bg-gray-700 transition-colors duration-300 focus:outline-none">
                      Dropdown
                    </button>
                    <div className="absolute right-0 mt-2 bg-[#1f1f1f] border border-gray-700 rounded-lg shadow-lg  opacity-0 invisible group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 ease-in-out">
                      <button onClick={handleLogout} className="w-full text-left p-2 text-red-500 rounded-lg hover:bg-red-600 hover:text-white transition-colors duration-300">
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <a href="https://github.com/txmlrd/aksamedia-technical-test" target="/blank" className="border border-white text-white font-bold rounded-lg p-1 px-2 hover:bg-gray-700 transition-colors duration-300">
                GitHub Link
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
