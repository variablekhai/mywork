import { collection, doc, getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { AppBar, Toolbar, Box, Button, Tooltip, Avatar, Grid, IconButton, Menu, MenuItem, Badge, TextField, OutlinedInput, InputAdornment } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ReactComponent as Logo } from '../assets/logo.svg'
import { useUserAuth } from "../context/UserAuthContext";
import { db } from "../firebase";
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import styled from "@emotion/styled";
import SearchIcon from '@mui/icons-material/Search';
import Search from "../pages/Search";
import { Navigation } from "@mui/icons-material";

export const NavBar = ({ userID }) => {

    const { user, logOut } = useUserAuth();
    const [searchInput, setSearchInput] = useState("");

    const navigate = useNavigate();

    localStorage.setItem("keyid", user.uid);

    useEffect(() => {

        const unsub = onSnapshot(
            doc(db, "users", localStorage.keyid),
            (userSnap) => {
                localStorage.setItem("picture", userSnap.data().photoURL)
            }
        )

        return () => {
            unsub();
        };

    }, [])

    const handleLogOut = async () => {
        try {
            await logOut();
        } catch (err) {
            console.log(err.message);
        }
    }

    const [anchorElUser, setAnchorElUser] = useState(null);
    
    const handleOpenUserMenu = (event)  => {
        setAnchorElUser(event.currentTarget);
    }

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    }

    const StyledBadge = styled(Badge)({
        "& .MuiBadge-badge": {
          color: "#fff",
          backgroundColor: "#39B54A"
        }
      });


    const handleKeyEnter = (e) => {
        if (e.keyCode == 13) {
            navigate('/search/'+searchInput);
        }
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
                        alignItems="center"
                        gap={10}
                        >
                            <Button href="/home"><Logo height={40}/></Button>
                            <Grid 
                            item
                            display={{ md: 'block', xs: 'none' }}
                            >
                                    <OutlinedInput 
                                    size="small"
                                    sx={{
                                        borderRadius: 5,
                                        mr: 4
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton component={Link} to={"/search/"+ searchInput}>
                                                <SearchIcon sx={{ color: "#39B54A" }}/>
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyDown={(e) => handleKeyEnter(e)}
                                    />
                                    <Button
                                    href="/search"
                                    sx={{
                                        color: "primary.dark",
                                        fontSize: 18
                                    }}
                                    >
                                        Find Services
                                    </Button>
                                    <Button
                                    href="/addservices"
                                    sx={{
                                        color: "primary.dark",
                                        fontSize: 18
                                    }}
                                    >
                                        Post Services
                                    </Button>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <IconButton sx={{ mr: 0.5 }} component={Link} to={"/chats/"+user.uid}>
                                <StyledBadge variant="dot">
                                    <ForumIcon sx={{ width: 25, height: 25}}/>
                                </StyledBadge>
                            </IconButton>
                            <IconButton sx={{ mr: 1 }} component={Link} to={"/orders/"+user.uid}>
                                <StyledBadge badgeContent={"!"} variant="dot">
                                    <ArticleIcon sx={{ width: 25, height: 25}}/>
                                </StyledBadge>
                            </IconButton>
                            <Tooltip title="Profile">
                                <IconButton onClick={handleOpenUserMenu}>
                                    <Avatar src={localStorage.getItem("picture")}/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                            id="user-menu"
                            anchorEl={anchorElUser}
                            keepMounted
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                            >
                                <MenuItem component={Link} to={"/profile/"+user.uid}>Profile</MenuItem>
                                {user.uid == 'e206yZbUWHUUHDlIYBrSZ0vVREl2' ? <MenuItem component={Link} to={'/admin'}>Admin Dashboard</MenuItem> : null}
                                <MenuItem onClick={handleLogOut}>Log Out</MenuItem>  
                            </Menu>
                        </Grid>
                    </Grid>
                </Toolbar>
        </AppBar>
    )
}

export default NavBar;