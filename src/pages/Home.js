import React, { useState, useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useUserAuth } from "../context/UserAuthContext";
import { NavBar } from "../components/NavBar";
import { ProductCard } from "../components/ProductCard";
import { Grid, Hidden, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import Carousel from "react-material-ui-carousel";
import HelloCard from "../components/HelloCard";
import { getDoc, doc, collection, getDocs, query, where } from '@firebase/firestore';
import { db } from "../firebase";
import Footer from "../components/Footer";

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

      localStorage.setItem("keyid", user.uid);
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
    sx={{
      my: '3%',
    }}
    >
      <Grid
      container
      item
      justifyContent="center"
      gap={3}
      sx={{
        mb: '3%'
      }}
      >
        <HelloCard />
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
      </Grid>
      <Grid
      container
      item
      justifyContent="space-around"
      gap={{ xs: 2, md: 30 }}
      sx={{
        mb: '1%'
      }}
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
      item
      justifyContent="center"
      gap={3}
      sx={{
        mx: '5%'
      }}
      >
        {services.map((service) => {

          const calc = () => {
            let amount = 0;
            
            if (service.review.length > 0) {
            for (let i = 0; i < service.review.length; i++) {
              amount += parseInt(service.review[i].rating);
            }
            return (amount/service.review.length).toFixed(1);
          } else {
            return (0).toFixed(1);
          }
        }

        return (
          <Grid item key={service.id}>
            <ProductCard 
            name={service.name}
            desc={service.desc}
            img={service.photoURL}
            owner={service.owner}
            ownerEmail={service.owner}
            ratings={calc()}
            totalRatings={service.review.length}
            />
          </Grid>
        )

        })}
      </Grid>
    </Grid>
    </>
  )
      
}

export default Home;