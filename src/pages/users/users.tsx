import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {fetchUsers} from "../../Services/user";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import BasicSelect from "../../components/basic-select";
import Button from '@mui/material/Button';
import {
    useNavigate,
    useSearchParams,
} from "react-router-dom";
import MultiSelect from "../../components/multi-select";
import {createUrlSearchParams, genderList, natList} from "../../helpers/helpers";

interface FormDataProps {
    gender: string;
    nat: [];
}

interface itemProps {
    gender: string,
    nat: string,
    email: string,
    dob: {
        date: string,
        age: number
    }
    picture: {
        medium: string
    }
    name: {
        first: string,
        last: string,
    }
}


const Users = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const gender = searchParams.get("gender");
    const nat = searchParams.get("nat");


    useEffect(() => {
        async function fetchMyAPI() {
            const {error, data} = await fetchUsers({gender, nat})
            if (!error) {
                setIsLoading(false)
                setUsers(data.results)
            }
        }

        fetchMyAPI()
    }, []);


    const setUrlSearchParams = (formData: FormDataProps) => {
        const urlSearchParams = createUrlSearchParams(formData)
        navigate(`/?${urlSearchParams.toString()}`)
    }


    const handleFilter = async () => {
        setIsLoading(false)

        const {error, data} = await fetchUsers({gender, nat})
        if (!error) {
            setIsLoading(false)
            setUsers(data.results)
        }
    }

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                overflow: 'auto',
            }}
        >
            <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                <Grid container spacing={3} sx={{mb: 4}}>
                    <Grid item xs={12} md={3} lg={3}>
                        <BasicSelect
                            currentKey='gender'
                            currentUrl={{gender, nat}}
                            list={genderList}
                            gender={gender}
                            handleParams={setUrlSearchParams}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <MultiSelect
                            currentKey='nat'
                            currentUrl={{gender, nat}}
                            nat={nat}
                            handleParams={setUrlSearchParams}
                            list={natList}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}
                          sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center'
                          }}
                    >
                        <Button
                            variant="contained"
                            onClick={handleFilter}
                            disabled={nat === gender}
                        >Apply Filters</Button>
                    </Grid>
                </Grid>

                {
                    isLoading
                        ?
                        <Typography variant="h6" component="div">
                            Loading Users ...
                        </Typography>
                        :
                        <Grid container spacing={3}>
                            {
                                users && users.map((item: itemProps, i) => {
                                    const formattedDob = new Date(item.dob.date).toISOString().slice(0, 10)

                                    return <Grid key={i} item xs={6} sm={4} md={2} lg={2}>
                                        <Card sx={{
                                            padding: '8px',
                                            height: '300px'
                                        }}>
                                            <CardMedia
                                                component="img"
                                                height='100'
                                                image={item.picture.medium}
                                                alt="green iguana"
                                                sx={{
                                                    objectFit: 'contain'
                                                }}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h6" component="div">
                                                    {item.name.first} {item.name.last}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.gender}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {formattedDob}
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.dob.age} age
                                                </Typography>
                                                <Typography variant="body2" color="text.secondary">
                                                    {item.nat}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                })
                            }

                        </Grid>
                }
            </Container>
        </Box>
    );
}

export default Users