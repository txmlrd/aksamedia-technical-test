import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const staticUsername = "user";
const staticPassword = "pass";
const staticName = "Gung Adhi";

function Login({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === staticUsername && password === staticPassword) {
      const user = { username, name: staticName };
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
      navigate("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/dashboard");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col  items-center justify-center min-h-screen dark:bg-[#121212] bg-[#f0f0f0] transition-colors duration-300">
      <div className="bg-white dark:bg-[#1f1f1f] md:scale-100 scale-75 p-8 rounded-lg shadow-lg w-[400px]">
        <h1 className="text-3xl dark:text-white text-[#333] font-semibold mb-6 text-center">Login</h1>
        <div className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 dark:border-gray-600 p-3 mb-4 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all duration-300"
          />
          <button onClick={handleLogin} className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-blue-700 dark:hover:bg-blue-400 transition-colors duration-300">
            Login
          </button>
          <div>
            <h1 className=" bg-gradient-to-r from-pink-500 font-medium via-yellow-500 to-blue-500 text-transparent bg-clip-text">
              Username : <span className="dark:text-white  font-bold italic">user</span>
            </h1>
            <h1 className=" bg-gradient-to-r  from-pink-500 font-medium via-yellow-500 to-blue-500 text-transparent bg-clip-text">
              Password : <span className="dark:text-white  font-bold italic">pass</span>
            </h1>
          </div>

          {error && <p className="text-red-600 dark:text-red-400 mt-2 text-center">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
