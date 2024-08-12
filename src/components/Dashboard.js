import React, { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import CRUD from "./CRUD";

function Dashboard() {
  // const navigate = useNavigate();

  // useEffect(() => {
  //   const user = localStorage.getItem("user");
  //   if (!user) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <div className="p-6 bg-white dark:bg-[#0f0f0f] h-screen shadow-md transition-colors duration-300">
      <CRUD />
    </div>
  );
}

export default Dashboard;
