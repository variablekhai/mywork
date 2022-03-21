import react, { useState } from 'react';
import { Button, Container, Grid, Hidden, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useUserAuth } from '../context/UserAuthContext';

export default function HelloCard(props)  {

    const { user } = useUserAuth();
    
    return (
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
              Hello, {props.username}!
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
    )
}