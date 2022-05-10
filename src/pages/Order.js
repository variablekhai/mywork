import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Tab, Tabs, Typography, Grid, Card, Paper, CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../components/NavBar";
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import { ExpandCircleDown } from "@mui/icons-material";
import { where, getDocs, query, collection, getDoc, doc, onSnapshot } from "@firebase/firestore";
import { db } from "../firebase";
import OrderCard from "../components/OrderCard";
import OrderCompletedCard from "../components/OrderCompletedCard";
import PendingPurchaseCard from "../components/PendingPurchaseCard";
import CompletedPurchaseCard from "../components/CompletedPurchaseCard";

function Order() {

    let { userID } = useParams();

    const [tabValue, setTabValue] = useState("1");

    const [userPendingOrders, setUserPendingOrders] = useState([]);
    const [userPurchases, setUserPurchases] = useState([]);

    const [serviceData, setServiceData] = useState({});
    const [buyerData, setBuyerData] = useState({});

    // OnClick Events
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    }  
    //

    // Firebase

    const q = query(collection(db, "orders"), where("sellerID", "==", userID));
    const qPurchases = query(collection(db, "orders"), where("buyerID", "==", userID));

    useEffect(() => {


        const getPendingOrders = onSnapshot(q, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({...doc.data(), id: doc.id});
            })
            setUserPendingOrders(orders);
        })

        const getUserPurchases = onSnapshot(qPurchases, (querySnapshot) => {
            const orders = [];
            querySnapshot.forEach((doc) => {
                orders.push({...doc.data(), id: doc.id});
            })
            setUserPurchases(orders);
        })

        return () => {
            getPendingOrders();
            getUserPurchases();
        }


    }, [])
   
    function isPending(value) {
        return value.isCompleted == false
    }

    function isCompleted(value) {
        return value.isCompleted == true
    }

    function isMyOrder(value) {
        return value.buyerID == userID;
    }

    //

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
                        <Tab label="Your pending purchases" value="3" />
                        <Tab label="Your completed purchases" value="4" />
                    </TabList>
                    <TabPanel value="1">
                        {userPendingOrders.filter(isPending).map((order) => {                  

                            return(
                                <OrderCard
                                key={order?.id}
                                serviceID={order?.serviceID}
                                buyerID={order?.buyerID}
                                date={order?.dateOrderCreated}
                                status={order?.isCompleted}
                                requirements={order?.specialRequirements}
                                />
                            )
                        })}
                        
                    </TabPanel>
                    <TabPanel value="2">
                        {userPendingOrders.filter(isCompleted).map((order) => {                  

                            return(
                            <OrderCompletedCard
                            key={order?.id}
                            serviceID={order?.serviceID}
                            buyerID={order?.buyerID}
                            date={order?.dateOrderCreated}
                            status={order?.isCompleted}
                            requirements={order?.specialRequirements}
                            />
                            )
                        })}
                    </TabPanel>
                    <TabPanel value="3">
                        {userPurchases.filter(isPending).map((order) => {
                            return (
                                <PendingPurchaseCard
                                key={order?.id}
                                serviceID={order?.serviceID}
                                sellerID={order?.sellerID}
                                date={order?.dateOrderCreated}
                                status={order?.isCompleted}
                                requirements={order?.specialRequirements}
                                orderID={order?.id}
                                />
                            )
                        })
                        }
                    </TabPanel>
                    <TabPanel value="4">
                        {userPurchases.filter(isCompleted).map((order) => {
                            return (
                                <CompletedPurchaseCard
                                key={order?.id}
                                serviceID={order?.serviceID}
                                sellerID={order?.sellerID}
                                date={order?.dateOrderCreated}
                                status={order?.isCompleted}
                                requirements={order?.specialRequirements}
                                />
                            )
                        })
                        }
                    </TabPanel>
                </TabContext>
            </Grid>
        </Grid>
        </>
    )

}
export default Order;