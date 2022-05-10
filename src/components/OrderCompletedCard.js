import { doc, getDoc } from "@firebase/firestore";
import { Typography, Grid, Paper, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import pluralize from "pluralize";

export default function OrderCompletedCard(props) {

    const [serviceData, setServiceData] = useState({});
    const [buyerData, setBuyerData] = useState({});

    const serviceID = props.serviceID;
    const buyerID = props.buyerID;

    useEffect(() => {

        const getDatas = async() => {
            const data = await getDoc(doc(db, "services", serviceID));
            setServiceData(data.data());
            const data2 = await getDoc(doc(db, "users", buyerID));
            setBuyerData(data2.data());
        }

        getDatas();

    }, [serviceID, buyerID])

    const [open, setOpen] = useState(false);

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

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
                    Buyer: <Box component="span" sx={{ fontWeight: 600 }}>{buyerData?.userName}</Box>
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
                    Time remaining: <Box component="span" sx={{ fontWeight: 600 }}>Completed</Box>
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
                    Special Requirements
                </Button>
                <Dialog
                open={open}
                onClose={handleCloseDialog}
                >
                    <DialogTitle>
                        {"Special Requirements by Customer"}
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
            </Grid>
        </Paper>
    )
}