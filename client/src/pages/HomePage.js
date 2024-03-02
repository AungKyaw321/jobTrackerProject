import React, { Component, Fragment } from "react";
import ListTodos from "../components/ListTodos";
import InputTodo from "../components/InputTodo";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

// receives component and any other props represented by ...rest
export default function HomePage({ element: Element }) {
    const token = cookies.get("TOKEN");
    let toReturn;
    if (token) {
        toReturn = (<div className="container">
            <Button onClick={(e) => logout(e)}>Log Out</Button>
            <InputTodo />
            <ListTodos />
        </div>);
    } else {
        toReturn = (<Navigate to="/login" replace={true} />)
    }
    const logout = (e) => {
        e.preventDefault();
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/login";
    }
    return (
        toReturn
    );
}
