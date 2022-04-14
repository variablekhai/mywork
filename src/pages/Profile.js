import { Avatar, Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, IconButton, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from "@mui/material";
import GradeIcon from '@mui/icons-material/Grade';
import StarIcon from '@mui/icons-material/Star';
import { Link, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { yellow } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from "react";
import { collection, deleteDoc, doc, getDoc, getDocs, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import { ProductCard } from "../components/ProductCard";
import { useUserAuth } from "../context/UserAuthContext";
import DeleteIcon from '@mui/icons-material/Delete';

function Profile({ props }) {

    let { userID } = useParams();
    let { user } = useUserAuth();
    const [userData, setUserData] = useState({});
    const [open, setOpen] = useState(false);
    const [profileOwnerData, setProfileOwnerData] = useState({});
    const profileOwnerRef = doc(db, "users", userID);

    const [services, setServices] = useState([]);
    const servicesCollectionRef = collection(db, "services");

    const handleDelete = async(id) => {
        await deleteDoc(doc(db, "services", id));
    }

    const handleOpenDialog = () => {
        setOpen(true);
    }

    const handleCloseDialog = () => {
        setOpen(false);
    }

    useEffect(() => {

        const getProfileOwner = async() => {
            const ownerData = await getDoc(profileOwnerRef);
            setProfileOwnerData(ownerData.data());
        }
      
        const getServices = async() => {
            const data = await getDocs(servicesCollectionRef);
            setServices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
  
        getServices();
        getProfileOwner();

    },[services])

    useEffect(() => {

        const unsub = onSnapshot(
            doc(db, "users", userID),
            (userSnap) => {
                setUserData(userSnap.data())
            }
        )

        return () => {
            unsub();
        };
    }, [])

    return (
        <>
        <NavBar />
        <Grid container justifyContent="center">
            <Grid 
            container
            item
            direction="column"
            md={3}
            sx={{
                m: 3
            }}
            >
                <Grid item>
                    <Grid 
                    item
                    sx={{
                        mb: 2
                    }}
                    >
                        <Paper
                        variant="outlined"
                        component={Grid}
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        textAlign="center"
                        sx={{
                            p: 2
                        }}
                        gap={2}
                        >
                        <Grid 
                        container
                        item
                        justifyContent="flex-end"
                        >
                            {user.uid === userID && 
                            <IconButton
                            component={Link}
                            to="/editprofile"
                            >
                                <EditIcon
                                sx={{
                                    width: 30,
                                    height: 30,
                                    color: 'primary.main'
                                }}
                                />
                            </IconButton>
                            }     
                        </Grid>
                        <Grid 
                        item
                        >
                                <Avatar 
                                sx={{
                                    width: 120,
                                    height: 120
                                }}
                                src={userData.photoURL}
                                />
                        </Grid>
                        <Grid item>
                                <Typography
                                variant="h5"
                                fontWeight={600}
                                >
                                    {userData.userName}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography>
                                    {userData.bio}
                                </Typography>
                            </Grid>
                            <Grid
                            container
                            item
                            alignItems="center"
                            justifyContent="center"
                            >
                                <GradeIcon
                                sx={{
                                    color: yellow[700],
                                    mr: 1
                                }} 
                                />
                                <Typography
                                display="inline"
                                >
                                    5.0 (11)
                                </Typography>
                            </Grid>
                        </Paper>
                    </Grid>
                    <Grid 
                    item
                    textAlign="center"
                    >
                        <Paper
                        variant="outlined"
                        component={Grid}
                        direction="column"
                        container
                        sx={{
                            p: 2
                        }}
                        >
                            <Grid
                            item
                            >
                                <Typography variant="h4">
                                    Skills / Expertise
                                </Typography>
                                <List>
                                    {userData.skills?.map((skill) => (
                                        <ListItem key={skill}>
                                        <ListItemIcon
                                        sx={{
                                            color: yellow[700]
                                        }}
                                        >
                                            <StarIcon />
                                        </ListItemIcon>
                                        <ListItemText>
                                            {skill}
                                        </ListItemText>
                                    </ListItem>
                                    ))}
                                </List>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item md={6} alignItems={{ md: "flex-start", xs: "center" }} sx={{ m: 3 }} direction="column">
                <Paper
                variant="outlined"
                sx={{
                    px: 3,
                    py: 1,
                    width: {xs: 280, md: 600}
                }}
                
                >
                    {user.uid != userID && <Typography 
                    variant="h4"
                    textAlign={{ xs: "center", md: "left" }}
                    >
                        {userData.userName}'s services
                    </Typography>}
                    {user.uid == userID && <Typography 
                    variant="h4"
                    textAlign={{ xs: "center", md: "left" }}
                    >
                        Your services
                    </Typography>}
                </Paper>
                <Grid container item gap={2} sx={{ mt: 1 }} justifyContent={{ md: "flex-start", xs: "center" }}>

                {services.filter((service) => {

                    return service.owner === profileOwnerData.email;

                }).map((service) => {

                    const calc = () => {
                    let amount = 0;
                    
                    if (service.review.length > 0) {
                    for (let i = 0; i < service.review.length; i++) {
                        amount += parseInt(service.review[i].rating);
                    }
                    return (amount/service.review.length).toFixed(1);
                    } else {
                    return (0).toFixed(1);
                    }
                    }
                    
                    return (
                    <Grid item key={service.id} sx={{ mb: 3 }}>
                    {user.uid === userID &&
                    <>
                        <IconButton component={Link} to={"/editservices/"+service.id} sx={{ color: "primary.main" }}>
                            <EditIcon />
                        </IconButton>
                        <IconButton sx={{ color: "#D11A2A" }} onClick={() => handleOpenDialog()}>
                            <DeleteIcon />
                        </IconButton>
                        <Dialog
                        open={open}
                        onClose={handleCloseDialog}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Are you sure you want to delete this?"}
                            </DialogTitle>
                            <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                This action cannot be undone.
                            </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseDialog}>No</Button>
                                <Button onClick={() => handleDelete(service.id)} autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                    </Dialog>
                    </>
                    }
                    <ProductCard 
                    name={service.name}
                    desc={service.desc}
                    img={service.photoURL}
                    owner={service.owner}
                    ownerEmail={service.owner}
                    ratings={calc()}
                    totalRatings={service.review.length}
                    />
                    </Grid>
                    )

                })}
                </Grid>
            </Grid>
        </Grid> 
        </>
    )
}
export default Profile;