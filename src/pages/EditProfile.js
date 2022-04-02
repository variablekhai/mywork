import React, { useEffect, useRef, useState } from "react";
import { Avatar, Button, Grid, Input, TextField, Typography, IconButton, Divider, FormControl, List, ListItem, ListItemText, ListItemAvatar, Alert } from "@mui/material";
import NavBar from "../components/NavBar";
import StarIcon from '@mui/icons-material/Star';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { yellow } from '@mui/material/colors';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useUserAuth } from "../context/UserAuthContext";
import { collection, doc, getDoc, updateDoc, onSnapshot, setDoc } from "@firebase/firestore";
import { db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


function EditProfile() {

    const { user } = useUserAuth();
    const [userData, setUserData] = useState({});
    localStorage.setItem("keyid", user.uid);

    const [image, setImage] = useState(null);
    const [url, setURL] = useState(null);
    const [success, setSuccess] = useState({success: false, msg: ""});
    
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [phone, setPhone] = useState("");
    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState("");

    useEffect(() => {

        const unsub = onSnapshot(
            doc(db, "users", localStorage.keyid),
            (userSnap) => {
                setUserData(userSnap.data())
            }
        )

        return () => {
            unsub();
        };

    }, [])

    useEffect(() => {

        if (userData) {
            setName(userData.userName)
            setBio(userData.bio)
            setPhone(userData.phoneNo)
            setSkills(userData.skills)
        }

    }, [userData])


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
                updateDoc(doc(db, "users", localStorage.keyid), {
                    photoURL: url
                })
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

    const handleUpdateAccount = () => {
        updateDoc(doc(db, "users", localStorage.keyid), {
            userName: name,
            bio: bio,
            phoneNo: phone,
            skills: skills
        }).then(() => {
            setSuccess({success: true, msg: "Succesfully updated your account!"})
        })
    }

    const handleAddSkill = () => {
        setSkills(skills => [...skills, skillInput]);
    }
    
    const handleDeleteSkill = (id) => {
        console.log(id);
        const newList = skills.filter((skill) => skill !== id);

        setSkills(newList);
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
                    src={userData?.photoURL}
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
                        {success.success && <Alert severity="success">{ success.msg }</Alert>}
                        <TextField 
                        size="small"
                        label="Username"
                        value={name || ""}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        />
                        <TextField 
                        size="small"
                        label="Email"
                        value={user.email || ""}
                        fullWidth
                        disabled
                        />
                        <TextField 
                        label="Bio"
                        value={bio || ""}
                        onChange={(e) => setBio(e.target.value)}
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
                        value={phone || ""}
                        onChange={(e) => setPhone(e.target.value)}
                        fullWidth
                        InputProps={{
                            startAdornment: '+60 ',
                            maxLength: 8
                        }}
                        />
                        <Typography variant="h4">
                            Skills
                        </Typography>
                        <List dense>
                            {skills?.map((skill) => (
                                <ListItem 
                                key={skill}
                                secondaryAction={
                                    <IconButton edge="end" onClick={() => handleDeleteSkill(skill)}>
                                        <RemoveCircleIcon sx={{ color: '#FF0000 '}}/>
                                    </IconButton>
                                }
                                >
                                    <ListItemAvatar>
                                        <StarIcon
                                        sx={{ color: yellow[700] }}
                                        />
                                    </ListItemAvatar>
                                    <ListItemText>
                                        {skill}
                                    </ListItemText>
                                </ListItem>
                            ))}
                        </List>
                        <TextField 
                        size="small"
                        label="Skill"
                        fullWidth
                        onChange={(e) => setSkillInput(e.target.value)}
                        InputProps={{
                          endAdornment: <IconButton edge="end" color="primary" onClick={handleAddSkill}><AddCircleIcon /></IconButton>
                        }}
                        helperText="You may only add 3 skills. (Be sure to save)"
                        />
                        <Button 
                        variant="contained" 
                        onClick={handleUpdateAccount}
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