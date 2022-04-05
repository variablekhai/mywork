import react, { useEffect, useState } from 'react';
import { Button, Container, Grid, Hidden, IconButton, Menu, MenuItem, Paper, Stack, Typography } from "@mui/material";
import { useUserAuth } from '../context/UserAuthContext';
import { doc, onSnapshot } from '@firebase/firestore';
import { db } from '../firebase';

export default function HelloCard(props)  {
    
    const { user } = useUserAuth();
    localStorage.setItem("keyid", user.uid);
    
    useEffect(() => {

        const unsub = onSnapshot(
            doc(db, "users", localStorage.keyid),
            (userSnap) => {
                localStorage.setItem("name", userSnap.data().userName)
            }
        )

        return () => {
            unsub();
        };

    }, [])

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
              Hello, {localStorage.name}!
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