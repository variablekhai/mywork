import { Label } from "@mui/icons-material";
import { Avatar, Button, Grid, Input, TextField, Typography, Stack, TextareaAutosize } from "@mui/material";
import NavBar from "../components/NavBar";
import { useUserAuth } from "../context/UserAuthContext";
import React from "react";

function EditProfile() {

    const { user } = useUserAuth();

    return (
        <>
        <NavBar />
        <Grid 
        container
        justifyContent="center"
        sx={{
            mt: 5
        }}
        >
            <Grid item>
                <Typography variant="h4">
                    Edit Profile
                </Typography>
            </Grid>
        </Grid>
        <Grid 
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{
            mt: 3
        }}
        >
            <Grid 
            item
            display="flex"
            gap={2}
            alignItems="flex-end"
            >
                <Avatar
                sx={{
                    width: 150,
                    height: 150
                }}
                />
                <label htmlFor="contained-button-file">
                    <Input 
                    accept="image/*" 
                    id="contained-button-file" 
                    type="file" 
                    sx={{
                        display: 'none'
                    }}
                    />
                    <Button 
                    variant="contained"
                    component="span"
                    sx={{
                        color: '#fff'
                    }}
                    >
                        Upload
                    </Button>
                </label>
            </Grid>
            <Stack 
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
                mt: 5
            }}
            >
                <Typography variant="h5">
                    Name: 
                </Typography>
                <TextField size="small" label="Username"/>
            </Stack>
            <Stack 
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
                mt: 2
            }}
            >
                <Typography variant="h5">
                    Bio: 
                </Typography>
                <TextareaAutosize 
                placeholder="Bio will be displayed on your profile.."
                minRows={3}
                />
            </Stack>
            <Stack 
            direction="row"
            alignItems="center"
            gap={2}
            sx={{
                mt: 2
            }}
            >
                <Typography variant="h5">
                    Skills: 
                </Typography>
                <TextareaAutosize 
                placeholder="Skills will be displayed on your profile.."
                minRows={3}
                />
            </Stack>
            <Stack>
                <Button 
                variant="contained"
                sx={{
                    mt: 4,
                    color: '#fff'
                }}
                >
                    Save
                </Button>
            </Stack>
        </Grid>
        </>
    )
}

export default EditProfile;