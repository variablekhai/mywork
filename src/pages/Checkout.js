import { addDoc, collection, doc, onSnapshot, Timestamp } from "@firebase/firestore";
import { Button, Card, CardMedia, Checkbox, Divider, FormControlLabel, FormGroup, FormHelperText, Grid, Paper, Rating, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import { db } from "../firebase";
import pluralize from "pluralize";

function Checkout() {

    const { serviceID, userID, sellerID } = useParams();
    const [serviceData, setServiceData] = useState({});
    
    const navigate = useNavigate();
    
    const [requirements, setRequirements] = useState("");
    const [fastDelivery, setFastDelivery] = useState(false);


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

    const calcServiceTax = (service) => {

        let serviceTax = 0;

        serviceTax = 0.03 * service?.price;

        return serviceTax.toFixed(2);
    }

    const handlePlaceOrder = async(e) => {

        addDoc(collection(db, "orders"), {
            serviceID: serviceID,
            buyerID: userID,
            sellerID: sellerID,
            dateOrderCreated: new Date().toDateString(),
            fastDelivery: fastDelivery,
            specialRequirements: requirements,
            isCompleted: false
        }).then(() => {
            navigate("/checkout/success");
        })

    }

    return (
        <>
        <NavBar />
        <Grid container justifyContent="center" sx={{mt: 3}}>
            <Grid
            className="l-section"
            container
            item
            md={6}
            padding={3}
            >
                <Typography variant="h4">
                    Place order
                </Typography>
                <Divider sx={{ width: "100%", my: 3 }}/>
                <Grid
                className="order-wrapper" 
                container 
                item
                gap={2}
                >
                    <CardMedia 
                    className="order-img"
                    component="img"
                    src={serviceData?.photoURL} 
                    sx={{ width: 150 }}
                    />
                    <Grid
                    className="order-info-wrapper"
                    container
                    item
                    direction="column"
                    gap={2}
                    width={{ xs: 220, md: 400 }}
                    >
                        <Typography 
                        variant="h5" 
                        fontSize={16}
                        sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical',
                        }}
                        >
                            {serviceData?.name}
                        </Typography>
                        <Stack direction="row" spacing={1}>
                            <Rating readOnly value={parseInt(calc(serviceData))} size="small" />
                            <Typography fontSize={14}>
                                {calc(serviceData)} ({pluralize('review', serviceData?.review?.length, true)})
                            </Typography>
                        </Stack>
                    </Grid>
                </Grid>
                <Divider sx={{ width: "100%", my: 3 }}/>
                <Grid
                className="requirement-section"
                item
                md={12}
                xs={12}
                sx={{ mb: 3 }}
                >
                    <Typography 
                    variant="h5"
                    sx={{mb: 2}}
                    
                    >
                        Add special requirements
                    </Typography>
                    <TextField
                    multiline
                    rows={4}
                    label="Special Requirements"
                    placeholder="Add special requirements for your order."
                    helperText="Max: 300 Characters"
                    fullWidth
                    onChange={(e) => setRequirements(e.target.value)}
                    />
                </Grid>
                <Grid
                className="upgrade-container"
                item
                >
                    <Typography 
                    variant="h5"
                    sx={{mb: 2}}
                    >
                        Upgrade your order
                    </Typography>
                    <FormGroup>
                        <FormControlLabel
                        control={<Checkbox onChange={(e) => {
                            setFastDelivery(e.target.checked)
                        }}/>}  
                        label="Fast Delivery"/>
                        <FormHelperText>Fast delivery within 1-2 days</FormHelperText>
                    </FormGroup>
                </Grid>
            </Grid>
            <Grid
            className="r-section"
            container
            item
            md={4}
            padding={3}
            direction="column"
            > 
                <Card
                component={Grid}
                variant="outlined"
                sx={{
                    p: 3,
                    width: 350
                }}
                >
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                        Price summary
                    </Typography>
                    <Grid container item justifyContent="space-between" sx={{mb: 2}}>
                        <Typography display="inline">
                            Subtotal
                        </Typography>
                        <Typography display="inline">
                            RM{serviceData?.price}
                        </Typography>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                        <Typography display="inline">
                            Service Tax
                        </Typography>
                        <Typography display="inline">
                            RM{calcServiceTax(serviceData)}
                        </Typography>
                    </Grid>
                    <Divider sx={{my: 2}}/>
                    <Grid container item justifyContent="space-between" sx={{mb: 3}}>
                        <Typography display="inline">
                            Total
                        </Typography>
                        <Typography display="inline">
                            RM{(parseFloat(serviceData.price)+parseFloat(calcServiceTax(serviceData))).toFixed(2)}
                        </Typography>
                    </Grid>
                    <Grid container item justifyContent="space-between">
                        <Typography display="inline">
                            Delivery Time
                        </Typography>
                        <Typography display="inline">
                            {pluralize('day', parseInt(serviceData?.deliveryTime), true)}
                        </Typography>
                    </Grid>
                    <Button 
                    variant="contained" 
                    sx={{ color: "#fff", fontWeight: 800, letterSpacing: 1, fontSize: 16, mt: 4 }} 
                    fullWidth
                    onClick={() => handlePlaceOrder()}
                    >
                        Place order
                    </Button>
                </Card>
            </Grid>
        </Grid>
        </>
    )
}
export default Checkout;