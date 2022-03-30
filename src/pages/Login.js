import { Alert, AppBar, Paper, Container, Grid, TextField, Toolbar, Typography, Button, createMuiTheme, InputAdornment, Link, Divider, Icon } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import React, { useContext, useState } from "react"
import { ReactComponent as Logo } from '../assets/logo.svg'
import { ReactComponent as GoogleIcon } from '../assets/google.svg'
import './login.css'
import { useUserAuth } from "../context/UserAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { logIn, googleSignIn } = useUserAuth();
    const navigate = useNavigate();
    const { currentUser } = useUserAuth();

    const handleGoogleSignIn = async (e) => {
        e.preventDefault();

        try {
            await googleSignIn();
            navigate("/home");
        } catch (err) {
            setError(err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            navigate("/home");
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
                            Login to myWork
                        </Typography>
                        {error && <Alert severity="error" sx={{ mt: 1, width: 300}}>{ error }</Alert>}
                    </Grid>
                        <Grid item>
                            <form onSubmit={handleSubmit}>
                                <TextField
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                }}
                                className="inputField"
                                placeholder="Email"
                                size="small"
                                sx={{
                                    width: 300,
                                    mb: 1
                                }}
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <EmailIcon />
                                        </InputAdornment>
                                    )
                                }}
                                /><br/>
                                <TextField
                                onChange={(e) => {
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
                                Login
                                </Button>
                            </form>
                        </Grid>
                        <Grid item>
                            <Button
                            onClick={handleGoogleSignIn}
                            variant="outlined"
                            startIcon={<GoogleIcon width={20}/>}
                            sx={{
                                width: 300,
                                py: 1,
                                color: '#000',
                                borderColor: '#000',
                                borderRadius: 5
                            }}
                            >
                                Sign in with Google
                            </Button>
                        </Grid>
                    </Grid>
                    <Divider
                    sx={{
                        my: 5,
                        fontFamily: 'Poppins',
                    }}
                    >Don't have an account?</Divider>
                    <Grid
                    container
                    className="bottom-container"
                    direction="column"
                    alignItems="center"
                    spacing={2}
                    >
                        <Grid 
                        item
                        >
                            <Button
                            variant="outlined"
                            href="/register"
                            sx={{
                                width: 300,
                                borderRadius: 5
                            }}
                            >
                                Register one!
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    )
}

export default Login;