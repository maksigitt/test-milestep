import React, {useEffect, useState} from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {fetchUsers} from "./services/action";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import dateFormat from "dateformat";
import BasicSelect from "../../components/basic-select";
import Button from '@mui/material/Button';
import {
    useNavigate,
    useLocation,
    useSearchParams
} from "react-router-dom";
import MultiSelect from "../../components/multi-select";


const Users = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();
    const [users, setUsers] = useState([]);
    const [fullUrl, setFullUrl] = useState({});
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (location.search !== '') {
            const gender = searchParams.get("gender") ? searchParams.get("gender") : '';
            const nat = searchParams.get("nat") ? searchParams.get("nat") : [];
            setFullUrl({
                gender,
                nat
            })
            fetchUsers({
                gender,
                nat
            })
                .then((data) => {
                    setUsers(data.results)
                    setIsLoading(false)
                });
        } else {
            fetchUsers({})
                .then((data) => {
                    setUsers(data.results)
                    setIsLoading(false)
                });
        }
    }, []);

    const getFullUrl = (currentURL, event, key) => {
        if (key) {
            delete fullUrl[key]
        } else if (Array.isArray(event.target.value)) {
            setFullUrl(
                {
                    ...fullUrl,
                    [currentURL]: event.target.value.length === 0 ? [] : event.target.value.join(','),
                }
            )
        } else {
            setFullUrl(
                {
                    ...fullUrl,
                    [currentURL]: event.target.value
                }
            )
        }
    }


    const handleFilter = () => {
        setIsLoading(false)
        let path = ''
        Object.keys(fullUrl).map((item, i) => {
            if (i === 0 && fullUrl[item] !== '' && fullUrl[item].length !== 0) {
                path = '?' + item + '=' + fullUrl[item]
            } else if (fullUrl[item] !== '' && fullUrl[item].length !== 0) {
                path = path + '&' + item + '=' + fullUrl[item]
            }
        })
        navigate(path)
        fetchUsers(fullUrl)
            .then((data) => {
                setUsers(data.results)
                setIsLoading(false)
            })
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
                            currentURL='gender'
                            getFullUrl={getFullUrl}
                            fullUrl={fullUrl}
                        />
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <MultiSelect
                            currentURL='nat'
                            getFullUrl={getFullUrl}
                            fullUrl={fullUrl}
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
                            disabled={Object.keys(fullUrl).length === 0}
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
                                users && users.map((item, i) => {
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
                                                    {dateFormat(new Date(item.dob.date), 'dd-mm-yyyy')}
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