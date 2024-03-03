import "./App.css";
import React, { useEffect, useState } from "react";
import Cookies from "universal-cookie";
//components

import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

const cookies = new Cookies();

function App() {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const verifyUser = async () => {
    try {
      const token = cookies.get("TOKEN");
      if (token) {
        console.log("token exists");
        const response = await fetch("http://localhost:5001/auth/userInfo", {
          method: "GET",
          headers: { "Authorization": `Bearer ${token}` },
        });
        const json = await response.json();
        if (!json.success) {
          console.log("invalid token");
          cookies.remove("TOKEN", { path: "/" });
          window.location.href = "/login";
        } else {
          setUserId(json.userId);
          setEmail(json.email);
          setFirstname(json.firstname);
        }
      }
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <Routes>
      <Route exact path="/" element={<HomePage user={{ userId, email, firstname }} />} />
      <Route exact path="/login" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
