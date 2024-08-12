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
    <div>
      <CRUD />
    </div>
  );
}

export default Dashboard;
