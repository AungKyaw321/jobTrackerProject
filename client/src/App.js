import "./App.css";
import React, { Fragment } from "react";
//components

import LoginPage from "./pages/LoginPage";
import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  return (
    <Routes>
      <Route exact path="/" element={<HomePage />} />
      <Route exact path="/login" element={<LoginPage />} />
    </Routes>
    // <Fragment>
    //   <LoginPage />
    //   {/* <div className="container">
    //     <InputTodo />
    //     <ListTodos />
    //   </div> */}
    // </Fragment>
  );
}

export default App;
