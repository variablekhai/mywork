import { collection, doc, setDoc, addDoc } from "@firebase/firestore";
import { SettingsRemoteOutlined } from "@mui/icons-material";
import { Alert, Button, ButtonGroup, CardMedia, FormControl, Grid, Input, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from "@mui/material";
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import React, { useState } from "react";
import { NavBar } from "../components/NavBar";
import { useUserAuth } from "../context/UserAuthContext";
import { db, storage } from "../firebase";

function AddServices() {

    const { user } = useUserAuth();
    const [serviceName, setServiceName] = useState("");
    const [serviceDesc, setServiceDesc] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState(null);
    const [url, setURL] = useState(null);
    const [price, setPrice] = useState(0);
    const [message, setMessage] = useState({error: false, msg: ""});
    const [successMessage, setSuccessMessage] = useState({success: false, msg: ""});

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
    
    const clearFields = () => {
        setServiceName("")
        setServiceDesc("")
        setCategory("")
        setImage(null)
        setURL(null)
        setPrice(0)
        setSuccessMessage({success: false, msg: ""})
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        setMessage("");

        if (serviceName === "" || serviceDesc === "" || category === "" || price === 0 || url == null) {
            setSuccessMessage({success: false, msg: ""})
            setMessage({error: true, msg: "All fields are required!"})
            return;
        }

        addDoc(collection(db, "services"), {
            owner: user.email,
            name: serviceName,
            desc: serviceDesc,
            category: category,
            price: price,
            photoURL: url,
            verified: false,
            review: []
        }).then(() => {
            clearFields()
            setSuccessMessage({success: true, msg: "Successfully posted your service!"})
        })
    }

    return (
        <>
        <NavBar />
        <Grid 
        container
        justifyContent="center"
        gap={2}
        sx={{
            mt: 4
        }}
        >
            <Grid 
            container 
            item
            justifyContent="center"
            >
                <Typography
                variant="h4"
                >
                    Post a Service
                </Typography>
            </Grid>
            <Grid 
            container
            justifyContent="center"
            alignItems="center"
            >
                <Grid 
                item
                gap={2}
                >
                <form onSubmit={handleSubmit}>
                <FormControl 
                sx={{ width: {xs: 300, md: 400}, gap: 2, m: 2 }}
                >
                    {message.error && <Alert severity="error" sx={{ width: {xs: 269, md: 367}}}>{ message.msg }</Alert>}
                    {successMessage.success && <Alert severity="success" sx={{ width: {xs: 269, md: 367}}}>{ successMessage.msg }</Alert>}
                    <TextField 
                    label="Service Name"
                    size="small"
                    fullWidth
                    required
                    value={serviceName}
                    onChange={(e) => setServiceName(e.target.value)}
                    />
                    <TextField 
                    label="Description"
                    multiline
                    rows={3}
                    fullWidth
                    required
                    value={serviceDesc}
                    onChange={(e) => setServiceDesc(e.target.value)}
                    inputProps={{
                        maxLength: 100
                    }}
                    />
                    <FormControl fullWidth>
                        <InputLabel id="cat-input-label">Category</InputLabel>
                        <Select
                        required
                        id="cat-input"
                        labelId="cat-input-label"
                        label="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        >
                            <MenuItem value={1}>Graphics & Design</MenuItem>
                            <MenuItem value={2}>Digital Marketing</MenuItem>
                            <MenuItem value={3}>Writing & Translation</MenuItem>
                            <MenuItem value={4}>Video & Animation</MenuItem>
                            <MenuItem value={5}>Music & Audio</MenuItem>
                            <MenuItem value={6}>Programming & Tech</MenuItem>
                            <MenuItem value={7}>Business</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="price-input-label">Price</InputLabel>
                        <OutlinedInput
                        required
                        id="price-input-label"
                        startAdornment={<InputAdornment position="start">RM</InputAdornment>}
                        label="Price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        />
                    </FormControl>
                    <Typography variant="h5">
                        Photo:
                    </Typography>
                    <CardMedia 
                    component="img"
                    src={url}
                    />
                    <label htmlFor="upload-btn">
                        <Input 
                        id="upload-btn" 
                        type="file"
                        inputProps={{
                            accept: "image/*"
                        }}
                        sx={{
                            display: 'none'
                        }}
                        onChange={handleImageChange}
                        />
                        <Button 
                        variant="outlined" 
                        component="span"
                        >
                            Choose
                        </Button>
                        <Button
                        variant="contained"
                        sx={{
                            color: '#fff'
                        }}
                        onClick={handleUploadImage}
                        >
                        Upload
                        </Button>
                    </label>
                    <Button
                    variant="contained"
                    onClick={handleSubmit}
                    sx={{
                        color: '#fff'
                    }}
                    >Add</Button>
                </FormControl>
                </form>
                </Grid>
            </Grid>
        </Grid>

        
        
        </>
    )
}
export default AddServices;