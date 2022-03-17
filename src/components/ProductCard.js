import { Avatar, Card, CardActions, CardContent, CardMedia, Icon, IconButton, Typography } from '@mui/material'
import GradeIcon from '@mui/icons-material/Grade';
import { yellow } from '@mui/material/colors';
import react from 'react';
import { borderColor, color, width } from '@mui/system';

export const ProductCard = () => {

    return (
        <Card sx={{ maxWidth: 260 }}>
            <CardMedia
            component="img"
            height="150"
            image={require('../assets/product1.png')}
            />
            <CardContent>
                <Typography variant='h5'>
                    Logo Design
                </Typography>
                <Typography variant='body2'>
                I will help you design a professional
                logo for your brand.
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
                    Abu Bakar
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