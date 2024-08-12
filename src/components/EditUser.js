import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function EditUser({ user, setUser }) {
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setName(user.name);
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = { ...user, name };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };

  const handleToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="p-6 bg-gray-100 dark:bg-[#0f0f0f] h-screen flex items-center justify-center">
      <div className="p-6 max-w-md w-full bg-white dark:bg-[#1f1f1f] shadow-lg rounded-lg transition-colors duration-300">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Edit User</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              New Full Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-colors duration-300 px-3 py-2"
              required
            />
          </div>
          <div className="flex flex-col space-y-4">
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300">
              Save
            </button>
            <button type="button" onClick={handleToDashboard} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition-colors duration-300">
              Back To Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditUser;
