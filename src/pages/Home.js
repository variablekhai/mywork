import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useUserAuth } from "../context/UserAuthContext";
import { NavBar } from "../components/NavBar";
import { ProductCard } from "../components/ProductCard";
import { Button, Container, Grid, Hidden, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { Box, display, height, textAlign, width } from "@mui/system";
import Carousel from "react-material-ui-carousel";
import FirstTimeForm from "../components/FirstTimeForm";
import HelloCard from "../components/HelloCard";

function Home() {

  const { user } = useUserAuth();

  const [anchorElCat, setAnchorElCat] = useState(null)

  const categories = ['Graphics', 'Writing'];

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
          <FirstTimeForm />
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
              {categories.map((category) => (
                <MenuItem onClick={handleCloseCatMenu}>{category}</MenuItem>
              ))}
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
          <Grid 
          item
          justifyContent="center"
          >
            <ProductCard />
          </Grid>
          <Grid item>
            <ProductCard />
          </Grid>
          <Grid item>
            <ProductCard />
          </Grid>
          <Grid item>
            <ProductCard />
          </Grid>
          <Grid item>
            <ProductCard />
          </Grid>
        </Grid>
    </Grid>
    </>
  )
      
}

export default Home;