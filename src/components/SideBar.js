import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import PaidIcon from '@mui/icons-material/Paid';
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { ProductCard } from './ProductCard';
import { useEffect } from 'react';
import { useUserAuth } from '../context/UserAuthContext';
import { collection, getDocs, doc, updateDoc, onSnapshot, deleteDoc} from '@firebase/firestore';
import { db } from '../firebase';
import { Alert, Button, Grid, Paper, Snackbar } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import EarningCard from './EarningCard';
import InsightsIcon from '@mui/icons-material/Insights';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const data = [
  {
    "name": "January",
    "Sales": 4000,
    "Revenue": 2400
  },
  {
    "name": "February",
    "Sales": 3000,
    "Revenue": 1398
  },
  {
    "name": "March",
    "Sales": 2000,
    "Revenue": 9800
  },
  {
    "name": "April",
    "Sales": 2780,
    "Revenue": 3908
  },
  {
    "name": "May",
    "Sales": 1890,
    "Revenue": 4800
  },
  {
    "name": "June",
    "Sales": 2390,
    "Revenue": 3800
  }
]

export default function SideBar() {

  const { user, logOut } = useUserAuth();

  const handleLogOut = async () => {
    try {
        await logOut();
    } catch (err) {
        console.log(err.message);
    }
  } 

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [tabValue, setTabValue] = useState("1");

  const handleTabChange = (newValue) => {
    setTabValue(newValue);
  }

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);
  const servicesCollectionRef = collection(db, "services");
  const usersCollectionRef = collection(db, 'users');
  const [orders, setOrders] = useState([]);

  const [snackOpen, setSnackOpen] = useState(false);
  const [snackReject, setSnackReject] = useState(false);

  const handleSnackClose = () => {
    setSnackOpen(false);
    setSnackReject(false);
  }

  useEffect(() => {

    const getOrders = async() => {

        let orders = [];
        const orderSnapshot = await getDocs(collection(db, 'orders'))
        orderSnapshot.forEach((doc) => {
            orders.push(doc.data());
        })
        setOrders(orders);
    }

    getOrders();
  }, [])

  useEffect(() => {

    const unsub = onSnapshot(servicesCollectionRef, (data) => {
      setServices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
    })

    return () => unsub();
  }, [])

  useEffect(() => {
    const unsub = onSnapshot(usersCollectionRef, (data) => {
      setUsers(data.docs.map((doc) => ({...doc.data(), id: doc.id})))
    })

    return () => unsub();
  }, [])

  const handleApproval = async(id) => {
    const serviceReference = doc(db, 'services', id);
    await updateDoc(serviceReference, {
      verified: true
    }).then(
      setSnackOpen(true)
    );
  }

  const handleReject = async(id) => {
    const serviceReference = doc(db, 'services', id);
    await deleteDoc(serviceReference).then(
      setSnackReject(true)
    )
  }

  const calcTotalSales = () => {
    const tempSales = orders?.filter((order) => (
        order.isCompleted == true
    ))

    return tempSales.length
  }

  const calcTotalRevenue = () => {
    let revenue = 0;

    const tempOrders = orders.filter((order) => order.isCompleted == true);
    
    tempOrders.forEach((order) => {
        let tempService = services?.filter((service) => (service.id == order.serviceID))

        revenue += 0.03 * parseInt(tempService[0].price)
    })

    return revenue;
}

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }), color: "#fff" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color="#fff">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleTabChange("1")}>
                <ListItemIcon>
                    <FactCheckIcon />
                </ListItemIcon>
                <ListItemText>
                    Service Approval
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleTabChange("2")}>
                <ListItemIcon>
                    <PaidIcon />
                </ListItemIcon>
                <ListItemText>
                    Earnings
                </ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} to='/home'>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText>
                    Home
                </ListItemText>
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton onClick={() => handleLogOut()}>
                <ListItemIcon>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText>
                    Logout
                </ListItemText>
              </ListItemButton>
            </ListItem>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <TabContext value={tabValue}>
            <TabPanel value="1">
              <Grid container>
                <Typography variant='h4' sx={{mb: 3}}>
                  Service Approval
                </Typography>
              </Grid>
              <Grid
                container
                gap={2}
              >
                {
                  services.filter((service) => (service.verified == false)).map((service) => (
                      <Paper
                        sx={{
                          p: 2,
                          display: "flex",
                          flexDirection: "column",
                          gap: 2
                        }}
                        elevation={3}
                        component={Grid}
                      >
                        <Grid item height='100%'>
                          <ProductCard 
                            name={service.name}
                            desc={service.desc}
                            img={service.photoURL}
                            owner={service.owner}
                            ownerEmail={service.owner}
                            ratings={0}
                            totalRatings={0}
                            serviceLink={service.id}
                          />
                        </Grid>
                        <Grid 
                          item
                          display="flex"
                          flexDirection="column"
                          gap={1}

                        >
                          <Button
                            onClick={() => handleApproval(service.id)}
                            variant="contained" 
                            fullWidth
                            color='primary'
                            sx={{ color: "#fff" }}
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject(service.id)}
                            variant="outlined" 
                            fullWidth
                            color="error"
                          >
                            Reject
                          </Button>
                        </Grid>
                      </Paper>
                  ))
                }
                <Snackbar
                  open={snackOpen}
                  autoHideDuration={3000}
                  onClose={handleSnackClose}
                  >
                    <Alert severity='success' sx={{ width: "100%" }}>
                        Service is approved and going live!
                    </Alert>
                </Snackbar>
                <Snackbar
                  open={snackReject}
                  autoHideDuration={3000}
                  onClose={handleSnackClose}
                  >
                    <Alert severity='error' sx={{ width: "100%" }}>
                        Service is rejected and removed!
                    </Alert>
                </Snackbar>
                </Grid>
            </TabPanel>
            <TabPanel value="2">
              <Grid container spacing={5}>
                <Grid container item md={6} sx={{ width: '100%' }} gap={2}>
                  <Grid item>
                      <Typography variant="h4">
                          User Earnings
                      </Typography>
                  </Grid>
                  {users.map((user) => (
                      <EarningCard
                        key={user.id}
                        user={user}
                      />
                    ))}
                </Grid>
                <Grid item md={6}>
                  <Grid item>
                      <Typography variant="h4" sx={{ mb: 2 }}>
                          Site Earnings <InsightsIcon sx={{ width: 30, height: 30}}/>
                      </Typography>
                  </Grid>
                  <Paper sx={{ p: 3 }}>
                    <Typography fontSize={20} sx={{ textDecoration: 'underline' }}>
                      Total site revenue for this month, June 2022
                    </Typography>
                    <Typography fontSize={32} fontWeight={600}>
                      RM {calcTotalRevenue()}
                    </Typography>
                    <Typography fontSize={16} sx={{ color: '#6C757D' }}>
                      {calcTotalSales()} total succesful transactions
                    </Typography>
                    <Typography fontSize={20} sx={{ textDecoration: 'underline', mt: 4 }}>
                      Total site revenue
                    </Typography>
                    <Typography fontSize={32} fontWeight={600}>
                      RM {calcTotalRevenue()}
                    </Typography>
                    <Typography fontSize={16} sx={{ color: '#6C757D', mb: 4 }}>
                      {calcTotalSales()} total succesful transactions
                    </Typography>
                    <ResponsiveContainer width='95%' height={400}>
                      <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="Sales" fill="#8884d8" />
                        <Bar dataKey="Revenue" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Paper>
                </Grid>
              </Grid>
            </TabPanel>
        </TabContext>
      </Main>
    </Box>
  );
}