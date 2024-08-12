import React, { useState, useEffect } from "react";

function EditUser({ user, setUser }) {
  const [name, setName] = useState("");

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

  return (
    <div className="p-6 max-w-md h-full mx-auto bg-white shadow-lg rounded-lg ">
      <h1 className="text-2xl font-bold mb-4">Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            New Full Name:
          </label>
          <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm" required />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md shadow">
          Save
        </button>
      </form>
    </div>
  );
}

export default EditUser;
