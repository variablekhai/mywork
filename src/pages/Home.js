import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useUserAuth } from "../context/UserAuthContext";
import { NavBar } from "../components/NavBar";
import { ProductCard } from "../components/ProductCard";
import { Grid, Hidden, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import HelloCard from "../components/HelloCard";
import { getDoc, doc, collection, getDocs } from '@firebase/firestore';
import { db } from "../firebase";

function Home() {

  const { user } = useUserAuth();
  const [anchorElCat, setAnchorElCat] = useState(null)

  const [services, setServices] = useState([]);
  const servicesCollectionRef = collection(db, "services");

  useEffect(() => {
      
      const getServices = async() => {
          const data = await getDocs(servicesCollectionRef);
          setServices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
      }

      getServices();
  },[])

  

  const handleOpenCatMenu = (event) => {
    setAnchorElCat(event.currentTarget);
  }

  const handleCloseCatMenu = () => {
    setAnchorElCat(null);
  }


  return (
    <>
    <NavBar />
    <Grid 
    container
    justifyContent="center"
    gap={3}
    sx={{
      mt: 5
    }}
    >
        <Grid item>
          <HelloCard username="TEST"/>
        </Grid>
        <Grid 
        item
        display={{ md: 'block', xs: 'none' }}
        >
          <Carousel
          indicators={false}
          duration={900}
          sx={{
            width: 800,
            height: 230,
            borderRadius: 1
          }}>
              <img src={require('../assets/banner1.svg').default} width={800}/>
              <img src={require('../assets/img2.png')} width={800}/>
              <img src={require('../assets/img3.png')} width={800}/>
          </Carousel>
        </Grid>
        <Grid 
        container
        justifyContent="space-around"
        spacing={25}
        alignItems="center"
        >
          <Grid item>
            <Typography
            variant="h4"
            >
              Trending Services
            </Typography>
          </Grid>
          <Grid item>
            <Typography
            color="primary.main"
            >
              Categories
              <IconButton
              color="primary"
              onClick={handleOpenCatMenu}
              >
                  <KeyboardArrowDownIcon />
              </IconButton>
            </Typography>
            <Menu
            id="cat-menu"
            anchorEl={anchorElCat}
            keepMounted
            open={Boolean(anchorElCat)}
            onClose={handleCloseCatMenu}
            >
                <MenuItem onClick={handleCloseCatMenu}>Graphics & Design</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Digital Marketing</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Writing & Translation</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Video & Animation</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Music & Audio</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Programming & Tech</MenuItem>
                <MenuItem onClick={handleCloseCatMenu}>Business</MenuItem>
            </Menu>
          </Grid>
        </Grid>
        <Grid 
        container
        justifyContent="center"
        gap={3}
        sx={{
          mx: '10%'
        }}
        >
          {services.map((service) => (
              <Grid item key={service.id}>
                <ProductCard 
                name={service.name}
                desc={service.desc}
                img={service.photoURL}
                owner={service.owner}
                />
              </Grid>
          ))}
        </Grid>
    </Grid>
    </>
  )
      
}

export default Home;