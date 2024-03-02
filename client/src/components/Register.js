import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Register({ registerAccount }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [secondPassword, setSecondPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [middlename, setMiddlename] = useState("");
    const [lastname, setLastname] = useState("");
    const [failedRegister, setFailedRegister] = useState(false);
    const registerUser = async (e) => {
        e.preventDefault();
        try {
            await registerAccount(email, password, firstname, middlename, lastname);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Fragment>
            <Typography component="h1" variant="h5">
                Sign Up For an Account
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
                    name="firstname"
                    label="First Name"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    type="text"
                    id="firstname"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="middlename"
                    label="Middle Name"
                    value={middlename}
                    onChange={(e) => setMiddlename(e.target.value)}
                    type="text"
                    id="middlename"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastname"
                    label="Last Name"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    type="text"
                    id="lastname"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    autoComplete="current-password"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="passwordRepeat"
                    label="Repeat Password"
                    value={secondPassword}
                    onChange={(e) => setSecondPassword(e.target.value)}
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                />
                <Button
                    fullWidth
                    variant="contained"
                    onClick={(e) => registerUser(e)}
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
                {failedRegister && "Failed To Create Account. Try Again."}
            </Box>
        </Fragment>
    )
}