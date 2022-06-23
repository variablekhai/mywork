import { Avatar, Card, CardActions, CardContent, Collapse, Grid, IconButton, Typography, Button } from "@mui/material";
import { useEffect, useState } from "react";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { styled } from "@mui/system";
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { collection, doc, getDocs } from "@firebase/firestore";
import { db } from "../firebase";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export const EarningCard = (props) => {

    const [expanded, setExpanded] = useState(false);
    const [user, setUser] = useState("");
    const [totalEarnings, setTotalEarnings] = useState("");
    const [orders, setOrders] = useState([]);
    const [services, setServices] = useState([]);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    }

    useEffect(() => {
        setUser(props.user);

        const getOrders = async() => {

            let orders = [];
            const orderSnapshot = await getDocs(collection(db, 'orders'))
            orderSnapshot.forEach((doc) => {
                orders.push(doc.data());
            })
            setOrders(orders);
        }

        const getServices = async() => {

            let services = [];
            const serviceSnapshot = await getDocs(collection(db, 'services'))
            serviceSnapshot.forEach((doc) => {
                services.push({...doc.data(), id: doc.id});
            })
            setServices(services);
        }

        getOrders();
        getServices();
    }, [])

    const calcEarnings = () => {
        let earnings = 0;

        const tempOrders = orders.filter((order) => order.isCompleted == true && order.sellerID == user?.id);
        
        tempOrders.forEach((order) => {
            let tempService = services?.filter((service) => (service.id == order.serviceID))

            earnings += parseInt(tempService[0]?.price)
        })

        return earnings;
    }

    const calcSales = () => {
        let sales = 0;

        const tempSales = orders.filter((order) => order.isCompleted == true && order.sellerID == user?.id);

        return tempSales.length;
    }

    return (
        <>
        <Card sx={{ width: '100%' }}>
            <CardContent>
                <Grid 
                    container
                    gap={2}
                >
                    <Grid item>
                        <Avatar
                            src={user?.photoURL}
                            sx={{ width: '50px', height: '50px' }}
                        />
                    </Grid>
                    <Grid item>
                        <Typography
                            fontSize={20}
                            fontWeight={600}
                        >
                            {user?.userName}
                        </Typography>
                        <Typography
                            fontSize={18}
                            fontWeight={500}
                        >
                            Total earnings this month: <Typography fontWeight={600} sx={{ display: 'inline' }}>RM{calcEarnings()}</Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions disableSpacing>
                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-label="Show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout='auto' unmountOnExit>
                <CardContent>
                    <Typography 
                        fontSize={14}
                        sx={{ color: '#6C757D' }}
                    >
                        Account created: 23 June 2022
                    </Typography>
                    <Typography 
                        fontSize={14}
                        sx={{ color: '#6C757D' }}
                    >
                        Phone number: +60 {user.phoneNo}
                    </Typography>
                    <Typography 
                        fontSize={14}
                        sx={{ color: '#6C757D' }}
                    >
                        Email address: {user.email}
                    </Typography>
                    
                    <Grid 
                        container
                        alignItems='center'
                        justifyContent='space-between'
                        sx={{ mt: 1.5 }}
                    >
                        <Grid item>
                        <Typography 
                            fontSize={20}
                            sx={{ textDecoration: 'underline' }}
                        >
                            Total Earnings
                        </Typography>
                        <Typography
                            fontSize={26}
                            fontWeight={700}
                        >
                            RM{calcEarnings()} <Typography display='inline'>{"("+ calcSales() + " service sales)"}</Typography>
                        </Typography>
                        </Grid>
                        <Grid item>
                            <Button 
                                variant='contained'
                                sx={{ color: '#fff' }}
                            >
                                <CurrencyExchangeIcon sx={{ mr: 1 }}/>
                                Cash Out
                            </Button>
                        </Grid>
                    </Grid>
                    
                </CardContent>
            </Collapse>
        </Card>
        </>
    )
}
export default EarningCard;