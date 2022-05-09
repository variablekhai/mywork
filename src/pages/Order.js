import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs, Typography, Grid, Card, Paper, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { ExpandCircleDown } from "@mui/icons-material";

function Order() {

    let { userID } = useParams();

    const [tabValue, setTabValue] = useState("1");
    const [open, setOpen] = useState(false);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }

    const handleOpenDialog = () => {
        setOpen(true)
    }

    const handleCloseDialog = () => {
        setOpen(false)
    }

    return (
        <>
        <NavBar />
        <Grid 
        container
        justifyContent="center"
        >
            <Grid item md={8}>
                <Typography variant="h4" sx={{ mt: 5, mb: 2 }}>
                    Orders
                </Typography>
            </Grid>
            <Grid 
            item
            md={8}
            >
                <TabContext value={tabValue}>
                    <TabList onChange={handleTabChange}>
                        <Tab label="Your pending tasks" value="1" />
                        <Tab label="Your completed tasks" value="2" />
                        <Tab label="Your purchases" value="3" />
                    </TabList>
                    <TabPanel value="1">
                        <Paper
                        sx={{ p: 2 }}
                        >
                            <Grid container alignItems="center">
                                <Grid item md={2}>
                                    <CardMedia
                                        component="img"
                                        src="https://fiverr-res.cloudinary.com/videos/so_1.768885,t_main1,q_auto,f_auto/mhbrsng1kblc1k7xm9df/record-any-voice-over-today-within-24hrs-or-less.png"
                                        sx={{ width: {md: 130, xs: 300}, height: {md: 100, xs: 180}}}
                                    />
                                </Grid>
                                <Grid container item direction="column" md={8}>
                                <Typography variant="h5">
                                    I will design you a very good logo
                                </Typography>
                                <Typography
                                sx={{
                                    fontSize: 14
                                }}
                                >
                                    Buyer: <Box component="span" sx={{ fontWeight: 600 }}>buyer.name</Box>
                                </Typography>
                                <Typography
                                sx={{
                                    fontSize: 14
                                }}
                                >
                                    Date order placed: <Box component="span" sx={{ fontWeight: 600 }}>1/1/1</Box>
                                </Typography>
                                <Typography
                                sx={{
                                    fontSize: 14
                                }}
                                >
                                    Time remaining: <Box component="span" sx={{ fontWeight: 600 }}>3 days left</Box>
                                </Typography>
                                <Typography
                                sx={{
                                    fontSize: 14
                                }}
                                >
                                    Status: <Box component="span" sx={{ fontWeight: 600 }}>Pending</Box>
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
                                            Here is some special requirements.
                                        </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleCloseDialog}>Ok</Button>
                                    </DialogActions>
                                </Dialog>
                                </Grid>
                                <Grid container item direction="column" md={2} gap={1}>
                                    <Button variant="contained" sx={{ color: "#fff" }}>
                                        Deliver your work
                                    </Button>
                                    <Button variant="outlined">
                                        Contact buyer
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </TabPanel>
                    <TabPanel value="2">Hello 2</TabPanel>
                </TabContext>
            </Grid>
        </Grid>
        </>
    )

}
export default Order;