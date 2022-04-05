import { Grid, Typography } from "@mui/material";

export const Footer = () => {
    return(
        <Grid 
        container
        textAlign="center"
        justifyContent="center"
        sx={{
            borderTop: 1,
            borderColor: '#39B54A'
        }}
        >
            <Typography sx={{ p: 1, color: '#39B54A' }}>2022 myWork, CC20075 Final Year Project</Typography>
        </Grid>
    )
}
export default Footer;