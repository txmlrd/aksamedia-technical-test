import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const staticUsername = "user";
const staticPassword = "pass";
const staticName = "Adhi";

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
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#1f1f1f]">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[500px]">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="flex flex-col space-y-5">
          <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 mb-4 w-full" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 mb-4 w-full" />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">
            Login
          </button>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default Login;
