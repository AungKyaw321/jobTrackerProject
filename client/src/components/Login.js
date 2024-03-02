import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [failedLogin, setFailedLogin] = useState(false);
    const authenticateLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `http://localhost:5001/auth/login`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                }
            );
            const jsonData = await response.json();
            console.log(jsonData);
            if (jsonData.success) {
                setFailedLogin(false);
                cookies.set("TOKEN", jsonData.token, {
                    path: "/",
                });
                window.location.href = "/";
            } else {
                setFailedLogin(true);
            }
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <Fragment>
            <Typography component="h1" variant="h5">
                Sign In
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <Button
                    fullWidth
                    onClick={(e) => authenticateLogin(e)}
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Sign In
                </Button>
                {failedLogin && "Failed To Log In. Try Again."}
            </Box>
        </Fragment>
    )
}