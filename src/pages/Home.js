import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { NavBar } from "../components/NavBar";
import { Button, Grid, Paper, Typography } from "@mui/material";
import { textAlign, width } from "@mui/system";

function Home() {
  return (
    <>
    <NavBar />
    <Grid 
    container
    justifyContent="center"
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
    </Grid>
    </>
  )
      
}

export default Home;