import { AppBar, Toolbar, Box, Button, Tooltip, Avatar, Grid, IconButton, Menu, MenuItem, Typography } from "@mui/material"
import React, { useState } from "react"
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg'
import { useUserAuth } from "../context/UserAuthContext";

export const NavBar = () => {

    const { user, logOut } = useUserAuth();
    
    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
        }
        }

    const pages = ['Find Services', 'Post Services'];
    const settings = ['Profile', 'Logout'];

    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleOpenUserMenu = (event)  => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    return (
        <AppBar
            color="transparent"
            position="static"
            elevation={3}
            >
                <Toolbar>
                    <Grid 
                    container
                    justifyContent="space-between"
                    alignItems="center"
                    >
                        <Grid
                        item
                        display="flex"
                        gap={10}
                        >
                            <Logo height={40}/>
                            <Grid 
                            item
                            display={{ md: 'block', xs: 'none' }}
                            >
                                {pages.map((page) => (
                                    <Button
                                    key={page}
                                    sx={{
                                        color: "primary.dark",
                                        fontSize: 18
                                    }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar />
                                </IconButton>
                            </Tooltip>
                            <Menu
                            id="user-menu"
                            anchorEl={anchorElUser}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to="/editprofile">Profile</MenuItem>
                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
        </AppBar>
    )
}

export default NavBar;