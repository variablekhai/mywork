import { Alert, AlertTitle, Button, CardMedia, Grid, Typography } from "@mui/material"
import NavBar from "../components/NavBar"
import pic from "../assets/success.svg"

const OrderSuccess = () => {
    return (
        <>
        <NavBar />
        <Grid 
        container
        justifyContent="center"
        alignItems="center"
        direction="column"
        >
            <Grid item>
                <CardMedia
                component="img"
                src={pic}
                sx={{
                    width: {md: 400, xs: 200},
                    height: {md: 400, xs: 200},
                    mt: 10
                }}
                />
            </Grid>
            <Grid 
            item
            sx={{ mx: 3 }}
            >
                <Alert>
                    Your order has been succesfully placed and we have notified the seller!
                </Alert>
            </Grid>
            <Grid item>
                <Button
                    variant="contained" 
                    sx={{color: "#fff", width: {md: 300, xs: 200}, mt: 3}}
                    href="/home"
                    >
                        Return to home
                </Button>
            </Grid>
        </Grid>
        </>
    )
}
export default OrderSuccess;