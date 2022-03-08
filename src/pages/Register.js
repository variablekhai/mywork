import { ThemeProvider } from "@emotion/react";
import { AppBar, Paper, Container, Grid, TextField, Toolbar, Typography, Button, createMuiTheme, InputAdornment, Link, Divider, Alert } from "@mui/material";
import { createTheme } from "@mui/material";
import { borderColor, borderRadius, color, textTransform, typography, width } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import React, { useState } from "react"
import { ReactComponent as Logo } from '../assets/logo.svg'
import './login.css'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { signUp } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await signUp(email, password);
            navigate("/");
        } catch (err) {
            setError(err.message);
        }
    }

    return (
        <div>
            <AppBar
            className="navbar"
            color="transparent"
            position="static"
            elevation={3}
            >
                <Toolbar>
                <Logo className="logo"/>
                </Toolbar>
            </AppBar>
            <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{
                mt: 10
            }}
            >
                <Grid item>
                    <Grid 
                    container
                    className="top-container"
                    direction="column" 
                    alignItems="center"
                    spacing={1}
                    >
                    <Grid 
                    item
                    sx={{
                        my: 1
                    }}
                    >
                        <Typography variant="h4" textAlign="center">
                            Register to myWork
                        </Typography>
                        {error && <Alert severity="error" sx={{ mt: 1, width: 300 }}>{ error }</Alert>}
                    </Grid>
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                onChange={ (e) => {
                                    setEmail(e.target.value)
                                }}
                                className="inputField"
                                size="small"
                                type="email"
                                sx={{
                                    width: 300,
                                    mb: 1
                                }}
                                placeholder="Email"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                                /><br/>
                                <TextField
                                onChange={ (e) => {
                                    setPassword(e.target.value)
                                }}
                                className="inputField"
                                size="small"
                                type="password"
                                sx={{
                                    width: 300,
                                    mb: 1
                                }}
                                placeholder="Password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <LockIcon />
                                        </InputAdornment>
                                    )
                                }}
                                /><br/>
                                <Button
                                type="submit"
                                variant="contained" 
                                color="primary"
                                sx={{
                                    width: 300,
                                    py: 1,
                                    color: '#fff',
                                    borderRadius: 5
                                }}
                                >
                                Register
                                </Button>
                            </form>
                        </Grid> 
                    </Grid>
                    <Divider
                    sx={{
                        my: 5,
                        fontFamily: 'Poppins',
                        color: 'primary'
                    }}
                    >Already have an account?</Divider>
                    <Grid
                    container
                    className="bottom-container"
                    direction="column"
                    alignItems="center"
                    >
                        <Grid 
                        item
                        >
                            <Button
                            variant="outlined"
                            href="/"
                            sx={{
                                width: 300,
                                borderRadius: 5
                            }}
                            >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Register;