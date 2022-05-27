import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { Typography, Grid, Paper, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import pluralize from "pluralize";

export default function PendingPurchaseCard(props) {

    const [serviceData, setServiceData] = useState({});
    const [sellerData, setSellerData] = useState({});

    const [openCompleteDialog, setOpenCompleteDialog] = useState(false);

    const serviceID = props.serviceID;
    const sellerID = props.sellerID;

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

    const handleOpenCompleteDialog = () => {
        setOpenCompleteDialog(true);
    }

    const handleCloseCompleteDialog = () => {
        setOpenCompleteDialog(false);
    }

    const handleMarkAsCompleted = async() => {
        await updateDoc(doc(db, "orders", props.orderID), {
            isCompleted: true
        }).then(
            setOpenCompleteDialog(false)
        )
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
                    <Button variant="contained" sx={{ color: "#fff" }} onClick={handleOpenCompleteDialog}>
                        Mark as completed
                    </Button>
                    <Dialog
                    open={openCompleteDialog}
                    onClose={handleCloseCompleteDialog}
                    >
                        <DialogTitle>
                            Are you sure you want to mark this purchase as completed?
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                This proves that the seller has delivered their work to you.
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleCloseCompleteDialog}>No</Button>
                            <Button onClick={handleMarkAsCompleted}>Yes</Button>
                        </DialogActions>
                    </Dialog>
                    <Button variant="outlined" href={/chats/+props.userID}>
                        Contact Seller
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    )
}