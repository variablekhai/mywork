import { Avatar, Button, Grid, Input, TextField, Typography, Stack, TextareaAutosize } from "@mui/material";
import NavBar from "../components/NavBar";
import { useUserAuth } from "../context/UserAuthContext";
import React, { useEffect, useRef, useState } from "react";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { db, storage } from "../firebase";

function EditProfile() {

    const { user } = useUserAuth();
    const [userData, setUserData] = useState({});
    const [name, setName] = useState("");

    useEffect(async () => {
        const docRef = doc(db, 'users', user.uid);
        getDoc(docRef).then((doc) => {
            setUserData(doc.data());
        });
  
        setName(userData.userName);
        console.log(name);
    },[])

    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);


    const handleSkillChange = (e) => {
        setSkill(e.target.value);
    }

    const addSkill = (e) => {
        e.preventDefault();
        skills.push(skill);
        setSkill("");
    }

    const handleNameChange = (e) => {
        setName(e.target.value);
    }

    const updateUser = async(name) => {
        const userDoc = doc(db, "users", user.uid);
        const newFields = {userName: name}

        await updateDoc(userDoc, newFields);
    }

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
                    Edit Profile {userData.userName}
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
                <TextField 
                size="small" 
                placeholder="Username" 
                value={name}
                onChange={handleNameChange}
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
                <TextField 
                size="small"
                placeholder="Insert a skill you have"
                value={skill}
                onChange={handleSkillChange}
                required
                />
                <Button
                disabled={!skill}
                variant="outlined"
                onClick={addSkill}
                >
                Add
                </Button>
            </Stack>
            <Stack>
                <ul>
                {skills.map((item) => (
                    <li>{item}</li>
                ))}
                </ul>
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