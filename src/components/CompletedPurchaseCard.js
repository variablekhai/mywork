import { arrayUnion, doc, getDoc, updateDoc } from "@firebase/firestore";
import { Alert, Typography, Grid, Paper, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Rating, TextField, Snackbar } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import pluralize from "pluralize";
import { useUserAuth } from "../context/UserAuthContext";
import DoneIcon from '@mui/icons-material/Done';

export default function CompletedPurchaseCard(props) {

    const { user } = useUserAuth();

    const [serviceData, setServiceData] = useState({});
    const [sellerData, setSellerData] = useState({});
    const [isRated, setIsRated] = useState(false);

    const serviceID = props.serviceID;
    const sellerID = props.sellerID;

    const [rateOpen, setRateOpen] = useState(false);
    const [snackOpen, setSnackOpen] = useState(false);

    const handleOpenRateDialog = () => {
        setRateOpen(true);
    }

    const handleCloseRateDialog = () => {
        setRateOpen(false);
    }

    const handleSnackClose = () => {
        setSnackOpen(false);
    }

    const [ratingValue, setRatingValue] = useState(0);
    const [feedbackValue, setFeedbackValue] = useState("");

    const handleRatingChange = (e) => {
        setRatingValue(e.target.value);
    }

    const handleFeedbackChange = (e) => {
        setFeedbackValue(e.target.value)
    }

    const handleSubmitRate = async() => {

        let review = {userID: user.uid, rating: ratingValue, feedbackValue: feedbackValue}

        await updateDoc(doc(db, "services", serviceID), {
            review: arrayUnion(review)
        }).then(() => {
            setSnackOpen(true)
            setIsRated(true)
        }
        )

        setRateOpen(false);
    }

    useEffect(() => {

        const getDatas = async() => {
            const data = await getDoc(doc(db, "services", serviceID));
            setServiceData(data.data());
            const data2 = await getDoc(doc(db, "users", sellerID));
            setSellerData(data2.data());
        }

        getDatas();

    }, [serviceID, sellerID])

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    useEffect(() => {
        console.log(isRated);
    }, [isRated])

    return (
        <Paper
        sx={{ p: 2, mb: 1}}
        >
            <Grid container alignItems="center">
                <Grid item md={2}>
                    <CardMedia
                        component="img"
                        src={serviceData?.photoURL}
                        sx={{ width: {md: 130, xs: 300}, height: {md: 100, xs: 180}}}
                    />
                </Grid>
                <Grid container item direction="column" md={8}>
                <Typography variant="h5">
                    {serviceData?.name}
                </Typography>
                <Typography
                sx={{
                    fontSize: 14
                }}
                >
                    Seller: <Box component="span" sx={{ fontWeight: 600 }}>{sellerData?.userName}</Box>
                </Typography>
                <Typography
                sx={{
                    fontSize: 14
                }}
                >
                    Date order placed: <Box component="span" sx={{ fontWeight: 600 }}>{props.date}</Box>
                </Typography>
                <Typography
                sx={{
                    fontSize: 14
                }}
                >
                    Time remaining: <Box component="span" sx={{ fontWeight: 600 }}>{pluralize('day', serviceData?.deliveryTime, true)}</Box>
                </Typography>
                <Typography
                sx={{
                    fontSize: 14
                }}
                >
                    Status: <Box component="span" sx={{ fontWeight: 600 }}>{props.status ? "Completed" : "Pending"}</Box>
                </Typography>
                <Button 
                variant="outlined"
                sx={{ width: {md: "30%", xs: "100%"}, mt: 1}}
                onClick={handleOpenDialog}
                >
                    Your requests
                </Button>
                <Dialog
                open={open}
                onClose={handleCloseDialog}
                >
                    <DialogTitle>
                        {"Your special requests"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {props.requirements}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog}>Ok</Button>
                    </DialogActions>
                </Dialog>
                </Grid>
                <Grid container item direction="column" md={2} gap={1}>
                    {isRated == true ?
                        <Button variant="outlined">
                        Rated <DoneIcon sx={{ ml: 0.5, width: 18, height: 18 }}/>
                        </Button>   
                     :  
                        <Button onClick={handleOpenRateDialog} variant="contained" sx={{ color: "#fff" }}>
                        Rate this work
                        </Button>
                    }
                    
                    <Dialog
                    open={rateOpen}
                    onClose={handleCloseRateDialog}
                    fullWidth
                    >
                        <DialogTitle>
                            Rate this work
                        </DialogTitle>
                        <DialogContent>
                            <Rating 
                            onChange={handleRatingChange}                            
                            /><br></br>
                            <TextField
                            variant="standard"
                            label="Feedback"
                            multiline
                            rows={2}
                            fullWidth
                            onChange={handleFeedbackChange}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseRateDialog}>Cancel</Button>
                            <Button onClick={handleSubmitRate}>Rate</Button>
                        </DialogActions>
                    </Dialog>
                    <Snackbar 
                    open={snackOpen}
                    autoHideDuration={6000}
                    onClose={handleSnackClose}
                    >
                        <Alert severity="success" onClose={handleSnackClose} sx={{width: "100%"}}>
                            Thank you for your feedback!
                        </Alert>
                    </Snackbar>
                </Grid>
            </Grid>
        </Paper>
    )
}