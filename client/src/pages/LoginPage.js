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
                {hasAccount ? <Login /> : <Register />}
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