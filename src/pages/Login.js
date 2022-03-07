import { ThemeProvider } from "@emotion/react";
import { AppBar, Paper, Container, Grid, TextField, Toolbar, Typography, Button, createMuiTheme, InputAdornment, Link, Divider } from "@mui/material";
import { createTheme } from "@mui/material";
import { borderColor, color, textTransform, typography } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import React from "react"
import { ReactComponent as Logo } from '../assets/logo.svg'
import './login.css'


function Login() {
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
                        my: 2
                    }}
                    >
                        <Typography variant="h4">
                            Login to myWork
                        </Typography>
                    </Grid>
                        <Grid item>
                            <TextField
                            className="inputField"
                            placeholder="Username"
                            size="small"
                            sx={{
                                width: 300,
                            }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonIcon />
                                    </InputAdornment>
                                )
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <TextField
                            className="inputField"
                            size="small"
                            type="password"
                            sx={{
                                width: 300,
                            }}
                            placeholder="Password"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                )
                            }}
                            />
                        </Grid>
                        <Grid item>
                            <Button
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