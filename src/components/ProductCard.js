import { Avatar, Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from '@firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

export const ProductCard = (props) => {

    const [userData, setUserData] = useState([]);

    const q = query(collection(db, "users"), where("email", "==", props.ownerEmail));

    useEffect(async() => {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            setUserData(doc.data())
        })
    }, [])

    return (
        <Card 
        sx={{ 
            height: '100%', 
            width: 270,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}
        >
            <CardMedia
            component="img"
            height="150"
            image={props.img}
            />
            <CardContent
            >
                <Typography variant='h5' noWrap>
                    {props.name}
                </Typography>
                <Typography 
                variant='body2' 
                sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: '2',
                    WebkitBoxOrient: 'vertical',
                }}
                >
                    {props.desc}
                </Typography>
            </CardContent>
            <CardActions
            disableSpacing
            sx={{
                borderTop: 1,
                borderColor: 'primary.light',
            }}
            > 
                <IconButton
                component={Link}
                to={"/profile/"+userData.id}
                sx={{
                    p:0
                }}>
                    <Avatar
                    src={userData.photoURL}
                    sx={{
                        height: 30,
                        width: 30
                    }}
                    />
                </IconButton>
                <Typography
                sx={{
                    ml: 1,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    width: 135
                }}>
                    {userData.userName}
                </Typography>
                <GradeIcon 
                sx={{
                    color: yellow[700],
                    ml: 'auto'
                }}/>
                <Typography>
                    {props.ratings} ({props.totalRatings})
                </Typography>
            </CardActions>
        </Card>
    )
}