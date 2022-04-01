import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Grid, Input, TextField, Typography, IconButton, Divider, FormControl, List, ListItem, ListItemText, ListItemAvatar } from "@mui/material";
import NavBar from "../components/NavBar";
import StarIcon from '@mui/icons-material/Star';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { yellow } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useUserAuth } from "../context/UserAuthContext";
import { collection, doc, getDoc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function EditProfile() {

    const { user } = useUserAuth();
    const [userData, setUserData] = useState({});
    const userCollectionRef = doc(db, "users", user.uid);

    const [image, setImage] = useState(null);
    const [url, setURL] = useState(null);
    
    const [name, setName] = useState("");

    useEffect(() => {

        const getUsers = async() => {
            const data = await getDoc(userCollectionRef);
        }
        getUsers();
    }, [])
    
    const handleImageChange = (e) => {
        if(e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };
    
    const handleUploadImage = () => {
        const imageRef = ref(storage, `${image.name}`);
        uploadBytes(imageRef, image).then(() => {
            getDownloadURL(imageRef).then((url) => {
                setURL(url);
                user.photoURL = url;
                console.log(user.photoURL);
            })
            .catch(err => {
                console.log(err.message, "Error getting the image url");
            });
        })
        .catch(err => {
            console.log(err.message, "Error getting the image url");
        });
        setImage(null);
    }
    
    return (
        <>
        <NavBar />
        <Typography
        variant="h4"
        textAlign="center"
        sx={{ my: 5 }}
        >
            Edit Profile
        </Typography>
        <Grid 
        container
        justifyContent="center"
        gap={{ xs: 2, md: 5 }}
        sx={{ mb: 5 }}
        >
            <Grid 
            container 
            item 
            md={5}
            direction="column"
            alignItems={{ xs: 'center', md: 'flex-end'}}
            justifyContent="flex-start"
            gap={2}
            >
                <Grid 
                item
                display="flex"
                direction="column"
                alignItems="center"
                gap={2}
                >
                    <Avatar
                    src={user.photoURL}
                    sx={{
                        width: 200,
                        height: 200
                    }}
                    />
                    <label htmlFor="icon-button-file">
                    <Input 
                    accept="image/*" 
                    id="icon-button-file" 
                    type="file" 
                    sx={{
                        display: 'none'
                    }}
                    onChange={handleImageChange}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="span">
                    <PhotoCamera />
                    </IconButton>
                    <Button
                    variant="outlined"
                    onClick={handleUploadImage}
                    >
                        Upload
                    </Button>
                    </label>
                </Grid>
            </Grid>
            <Grid item>
            <Divider orientation="vertical"/>
            </Grid>
            <Grid 
            container 
            item 
            md={5}
            justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
                <Grid item>
                    <FormControl
                    fullWidth
                    sx={{
                        width: {xs: 300, md: 400},
                        gap: 2,
                    }}
                    >
                        <TextField 
                        size="small"
                        label="Username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        />
                        <TextField 
                        size="small"
                        label="Email"
                        value={user.email}
                        fullWidth
                        disabled
                        />
                        <TextField 
                        label="Bio"
                        multiline
                        rows={2}
                        fullWidth
                        inputProps={{
                            maxLength: 80
                        }}
                        />
                        <TextField 
                        size="small"
                        label="Phone Number"
                        fullWidth
                        InputProps={{
                            startAdornment: '+60 '
                        }}
                        />
                        <Typography variant="h4">
                            Skills
                        </Typography>
                        <List dense>
                            <ListItem>
                                <ListItemAvatar>
                                    <StarIcon
                                    sx={{ color: yellow[700] }}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    Skill 1
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <StarIcon
                                    sx={{ color: yellow[700] }}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    Skill 2
                                </ListItemText>
                            </ListItem>
                            <ListItem>
                                <ListItemAvatar>
                                    <StarIcon
                                    sx={{ color: yellow[700] }}
                                    />
                                </ListItemAvatar>
                                <ListItemText>
                                    Skill 3
                                </ListItemText>
                            </ListItem>
                        </List>
                        <TextField 
                        size="small"
                        label="Skill"
                        fullWidth
                        InputProps={{
                          endAdornment: <IconButton edge="end" color="primary"><AddCircleIcon /></IconButton>
                        }}
                        helperText="You may only add 3 skills."
                        />
                        <Button 
                        variant="contained" 
                        sx={{ color: '#fff' }}
                        >
                            Save
                        </Button>
                    </FormControl>
                </Grid>
            </Grid>
        </Grid>

        </>
    )
}

export default EditProfile;