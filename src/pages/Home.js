import React, { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useUserAuth } from "../context/UserAuthContext";
import { NavBar } from "../components/NavBar";
import { ProductCard } from "../components/ProductCard";
import { Button, Grid, Hidden, IconButton, Menu, MenuItem, Paper, Typography } from "@mui/material";
import { display, height, textAlign, width } from "@mui/system";
import Carousel from "react-material-ui-carousel";

function Home() {

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
          <Paper
          sx={{
            p: 4,
            px: 7,
            textAlign: 'center'
          }}>
            <Typography
            fontSize={20}
            fontWeight={600}
            sx={{
              mb: 1
            }}
            >
              Hello, Khairul!
            </Typography>
            <Typography
            fontSize={16}
            sx={{
              mb: 5
            }}
            >
              Ready to kickstart<br/>your career?
            </Typography>
            <Button
            variant="outlined"
            sx={{
              fontSize: 16
            }}
            >
              Post a service
            </Button>
          </Paper>
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
        columns={14}
        container
        justifyContent="center"
        >
          <Grid item md={2}>
          <ProductCard />
          </Grid>
          <Grid item md={2}>
          <ProductCard />
          </Grid>
          <Grid item md={2}>
          <ProductCard />
          </Grid>
          <Grid item md={2}>
          <ProductCard />
          </Grid>
        </Grid>
    </Grid>
    </>
  )
      
}

export default Home;