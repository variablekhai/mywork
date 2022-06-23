import NavBar from "../components/NavBar";
import { Breadcrumbs, Grid, InputAdornment, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from "react";
import { collection, getDocs } from "@firebase/firestore";
import { db } from "../firebase";
import { ProductCard } from "../components/ProductCard";
import pluralize from "pluralize";
import { useParams } from "react-router-dom";

function Search() {

    const { onSearch } = useParams();

    const [services, setServices] = useState([]);
    const servicesCollectionRef = collection(db, "services");

    const [searchTerm, setSearchTerm] = useState("");
    const [numOfServices, setNumOfServices] = useState(0);

    const filterFunction = () => {

        const filteredArray = services.filter((service) => {
            let filteredArray;

            if (searchTerm == "") {
                filteredArray = service;
            } else if (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
                filteredArray = service;
            }

            return filteredArray;
        })

        return filteredArray.length;
    }

    useEffect(() => {
        if(onSearch) {
            setSearchTerm(onSearch);
        }
    }, [])

    useEffect(() => {

        const getServices = async() => {
            const data = await getDocs(servicesCollectionRef);
            setServices(data.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }
  
        getServices();
  
    },[])

    const handleSearchBar = (e) => {
        setSearchTerm(e.target.value);
    }

    return (
        <>
        <NavBar />
        <Grid 
        container
        justifyContent="center" 
        >
            <Grid 
            container
            direction="column"
            sx={{ m: 3 }}
            md={8}
            >
                <Grid 
                item
                sx={{ mb: 3 }}
                >
                    <Breadcrumbs 
                    separator={<NavigateNextIcon/>}
                    >
                        <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center"}}
                        color="inherit"
                        href="/home"
                        >
                            <HomeIcon sx={{ mr: 0.5 }}/>
                            Home
                        </Link>
                        <Link
                        underline="hover"
                        sx={{ display: "flex", alignItems: "center"}}
                        color="inherit"
                        >
                            <SearchIcon sx={{ mr: 0.5 }}/>
                            Search
                        </Link>
                    </Breadcrumbs>
                </Grid>
                <Grid item>
                    <OutlinedInput
                    placeholder="Search"
                    endAdornment={
                        <InputAdornment position="end">
                            <SearchIcon />
                        </InputAdornment>
                    }
                    sx={{ borderRadius: 7, width: 350, mb: 5 }}
                    size="small"
                    onChange={handleSearchBar}
                    value={searchTerm}
                    
                    />
                </Grid>
                <Grid item sx={{ mb: 3 }}>
                    <Typography variant="h4">
                        Results for "{searchTerm}"
                    </Typography>
                    <Typography 
                    sx={{ color: "#666666" }}
                    >
                        {pluralize('service', filterFunction(), true)} available
                    </Typography>
                </Grid>
                <Grid
                container
                item
                gap={3}
                >
                    {services.filter((service) => {

                        let filteredArray;

                        if (searchTerm == "") {
                            filteredArray = service;
                        } else if (service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.desc.toLowerCase().includes(searchTerm.toLowerCase())) {
                            filteredArray = service;
                        }

                        return filteredArray;

                    }).map((service) => {


                        const calc = () => {
                            let amount = 0;
                            
                            if (service.review.length > 0) {
                            for (let i = 0; i < service.review.length; i++) {
                            amount += parseInt(service.review[i].rating);
                            }
                            return (amount/service.review.length).toFixed(1);
                        } else {
                            return (0).toFixed(1);
                        }
                        }

            
                    return (

                    <Grid item key={service.id}>
                        <ProductCard 
                        name={service.name}
                        desc={service.desc}
                        img={service.photoURL}
                        owner={service.owner}
                        ownerEmail={service.owner}
                        ratings={calc()}
                        totalRatings={service.review.length}
                        serviceLink={service.id}
                        />
                    </Grid>
                    )

                    })}
                </Grid>
            </Grid>
        </Grid>
        </>
    )
}
export default Search;