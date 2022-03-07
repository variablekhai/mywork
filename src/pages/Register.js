import { ThemeProvider } from "@emotion/react";
import { AppBar, Paper, Container, Grid, TextField, Toolbar, Typography, Button, createMuiTheme, InputAdornment, Link, Divider } from "@mui/material";
import { createTheme } from "@mui/material";
import { borderColor, borderRadius, color, textTransform, typography } from "@mui/system";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import React from "react"
import { ReactComponent as Logo } from '../assets/logo.svg'
import './login.css'

function Register() {
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
                            Register to myWork
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
                            type="email"
                            sx={{
                                width: 300,
                            }}
                            placeholder="Email"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon />
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
                            Register
                            </Button>
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
                            href="/login"
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