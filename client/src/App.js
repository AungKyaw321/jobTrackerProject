import "./App.css";
import React, { Fragment } from "react";
//components
import ListTodos from "./components/ListTodos";
import InputTodo from "./components/InputTodo";

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
