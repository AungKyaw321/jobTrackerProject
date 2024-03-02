import React, { Fragment, useState } from "react";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Register from "../components/Register";
import Login from "../components/Login";


export default function LoginPage() {
    const [hasAccount, setHasAccount] = useState(true);
    const registerAccount = async (email, password, firstname, middlename, lastname) => {
        console.log(`email: ${email} password: ${password} fname: ${firstname} mname: ${middlename} lname: ${lastname}`);
        try {
            const response = await fetch(
                `http://localhost:5001/auth/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email,
                        password,
                        firstname,
                        middlename,
                        lastname,
                    }),
                }
            );
            const jsonData = await response.json();
            console.log(jsonData);
            if (jsonData.success) {
                console.log("created account");
                setHasAccount(true);
            } else {
                console.log("failed to creat account.");
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {hasAccount ? <Login /> : <Register registerAccount={registerAccount} />}
                <Grid container>
                    <Grid item>
                        <Button onClick={() => setHasAccount(!hasAccount)}>
                            {hasAccount ? "Don't Have an Account? Sign Up" : "Already Have an Account? Sign In"}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
        </Container>);
}