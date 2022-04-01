import { Avatar, Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import React from 'react';

export const ProductCard = (props) => {

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
                sx={{
                    p:0
                }}>
                    <Avatar
                    sx={{
                        height: 30,
                        width: 30
                    }}
                    />
                </IconButton>
                <Typography
                sx={{
                    ml: 1
                }}>
                    {props.owner}
                </Typography>
                <GradeIcon 
                sx={{
                    color: yellow[700],
                    ml: 'auto'
                }}/>
                <Typography>
                    5.0 (11)
                </Typography>
            </CardActions>
        </Card>
    )
}