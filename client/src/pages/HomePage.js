import React, { Component, Fragment } from "react";
import ListTodos from "../components/ListTodos";
import InputTodo from "../components/InputTodo";
import Cookies from "universal-cookie";
import { Button } from "@mui/material";
import { Navigate } from "react-router-dom";

const cookies = new Cookies();

export default function HomePage({ user }) {
    const token = cookies.get("TOKEN");
    if (!token) {
        return (<Navigate to="/login" replace={true} />)
    }
    const logout = (e) => {
        e.preventDefault();
        cookies.remove("TOKEN", { path: "/" });
        window.location.href = "/login";
    }
    return (
        <div className="container">
            {user.firstname}
            <Button onClick={(e) => logout(e)}>Log Out</Button>
            <InputTodo token={token} />
            <ListTodos token={token} />
        </div>
    );
}
