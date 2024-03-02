import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Register() {
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
                    autoComplete="email"
                    autoFocus
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="firstname"
                    label="First Name"
                    type="text"
                    id="firstname"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="middlename"
                    label="Middle Name"
                    type="text"
                    id="middlename"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="lastname"
                    label="Last Name"
                    type="text"
                    id="lastname"
                />
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
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
                    type="password"
                    id="password2"
                    autoComplete="current-password"
                />
                <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </Button>
            </Box>
        </Fragment>
    )
}