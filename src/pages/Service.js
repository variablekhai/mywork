import { Avatar, Divider, Grid, Typography, Rating, CardMedia, Card, Button, List, ListItemIcon, ListItem, ListItemText } from "@mui/material";
import NavBar from "../components/NavBar";
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "@firebase/firestore";
import { db } from "../firebase";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { useUserAuth } from "../context/UserAuthContext";

function Service() {

    let { user } = useUserAuth();
    const { serviceID } = useParams();
    const [serviceData, setServiceData] = useState({});
    const [userData, setUserData] = useState([]);

    useEffect(() => {

        const getService = onSnapshot(
            doc(db, 'services', serviceID), 
            (serviceSnap) => {
                setServiceData(serviceSnap.data());
            }
        )       

        return () => {
            getService();
        };
       
    }, [])


    useEffect(async() => {
        const q = query(collection(db, "users"), where("email", "==", serviceData.owner));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
        })

    }, [serviceData]);

    const calc = ( service ) => {

        let amount = 0;
            
            if (service?.review?.length > 0) {
            for (let i = 0; i < service.review.length; i++) {
              amount += parseInt(service.review[i].rating);
            }
            return (amount/service.review.length).toFixed(1);
          } else {
            return (0).toFixed(1);
          }
    }

    return (
        <>
        <NavBar />
        <Grid
        container
        sx={{
            p: {xs: 2, md: 4}
        }}
        justifyContent="center"
        spacing={4}
        >
            <Grid
            container
            item
            direction="column"
            md={6}
            >
                <Grid item>
                    <Grid item>
                        <Typography variant="h3">
                           {serviceData.name}
                        </Typography>
                        </Grid>
                        <Grid 
                        item 
                        display="flex"
                        alignItems="center"
                        gap={2}
                        >
                        <Grid 
                        item
                        display="flex"
                        alignItems="center"
                        gap={1}
                        >
                            <Avatar sx={{ width: 30, height: 30}} src={userData.photoURL}/>
                            <Typography>
                                {userData.userName}
                            </Typography>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid 
                        item
                        display="flex"
                        gap={1}
                        >
                            <Rating value={calc(serviceData)} readOnly/>
                            <Typography>
                                {calc(serviceData)} ({serviceData?.review?.length})
                            </Typography>
                        </Grid>
                    </Grid>
                    <Divider variant="middle" flexItem sx={{ my: 2 }}/>
                    <CardMedia
                    component="img"
                    src={serviceData.photoURL}
                    sx={{ height: 400 }}
                    />
                    <Divider variant="middle" flexItem sx={{ my: 2 }}/>
                    <Grid item>
                    <Typography variant="h5">
                        About This Gig
                    </Typography>
                    <Typography sx={{ mt: 1 }}>
                        {serviceData.desc}
                    </Typography>
                </Grid>
                <Grid item sx={{ mt: 3 }}>
                    <Typography variant="h5">
                        About the Seller
                    </Typography>
                    <Grid container item  sx={{ mt: 1 }}>
                        <Grid item>
                            <Avatar sx={{ width: 100, height: 100 }} src={userData.photoURL}/>
                        </Grid>
                        <Grid item sx={{ ml: 2 }}>
                            <Typography sx={{ fontWeight: 600, color: "#62646A" }}>
                                {userData.userName}
                            </Typography>
                            <Typography sx={{ color: "#62646A" }}>
                                {userData.bio}
                            </Typography>
                            <Grid item display="flex" alignItems="center" textAlign="center">
                                <Rating value={5} size="small" />
                                <Typography>
                                    5.0 (11)
                                </Typography>
                            </Grid>
                            <Button variant="outlined">
                                Contact Me
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item sx={{ mt: 3 }}>
                    <Card variant="outlined" sx={{ p: 2 }}>
                        <Typography variant="h4">
                            Skills / Expertise
                        </Typography>
                        <List>
                            {userData?.skills?.map((skill) => (
                                <ListItem>
                                    <ListItemIcon>
                                        <GradeIcon sx={{ color: yellow[700]}}/>
                                    </ListItemIcon>
                                    <ListItemText>
                                        {skill}
                                    </ListItemText>
                                 </ListItem>
                            ))}
                        </List>
                    </Card>
                    </Grid>       
                </Grid>
            </Grid>
            <Grid
            container
            item
            md={4}
            sx={{
                mt: {xs: 0, md: 15}
            }}
            >
                <Grid container item>
                    <Card
                    variant="outlined"
                    sx={{
                        py: 3,
                        px: 5,
                        width: 350,
                        position: {xs: "static", md: "fixed"}
                    }}
                    >
                        <Grid container item direction="column" gap={2}>
                            <List dense={true}>
                                <ListItem>
                                    <ListItemIcon>
                                        <LocalShippingIcon />
                                    </ListItemIcon>
                                    <ListItemText>
                                        {serviceData.deliveryTime} days delivery
                                    </ListItemText>
                                </ListItem>
                            </List>
                            <Button
                            component={Link} 
                            variant="contained" 
                            fullWidth 
                            sx={{ color: "#fff" }}
                            to={'/checkout/'+serviceID+'/for/'+user.uid+'/'+userData.id}
                            >
                                Continue (RM{serviceData.price})
                            </Button>
                            <Button variant="outlined">
                                Contact Seller
                            </Button>
                        </Grid>
                    </Card>
            </Grid>
            </Grid>
        </Grid>
        </>
        
    )
}
export default Service;