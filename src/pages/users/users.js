import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import {filterUsers, getRandomUsers, setGenderUrl, setNatUrl} from "./services/action";
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
    const dispatch = useDispatch();
    const {users: {results}} = useSelector(state => state.usersReducer);
    const {genderUrl} = useSelector(state => state.usersReducer);
    const {natUrl} = useSelector(state => state.usersReducer);
    const {isLoading} = useSelector(state => state.usersReducer);
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams();


    useEffect(() => {
        if (location.search !== '') {
            const gender = searchParams.get("gender") ? searchParams.get("gender") : '';
            const nat = searchParams.get("nat") ? searchParams.get("nat") : [];
            dispatch(setGenderUrl(gender))
            dispatch(setNatUrl(nat.length > 0 ? nat.split(',') : []))
            dispatch(filterUsers(location.search))
        } else {
            dispatch(getRandomUsers());
        }

    }, []);

    const handleFilter = () => {
        navigate((genderUrl.trim() === '' || genderUrl.includes('all') ? '?' : `/?gender=${genderUrl}`) + (natUrl.length > 0 ? `&nat=${natUrl.join()}` : ''))
        dispatch(filterUsers(genderUrl.trim() === '' ? '' : `gender=${genderUrl}`, natUrl.length > 0 ? `nat=${natUrl.join()}` : ''))
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
                        <BasicSelect/>
                    </Grid>
                    <Grid item xs={12} md={3} lg={3}>
                        <MultiSelect/>
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
                            disabled={genderUrl === '' && natUrl.length === 0}
                        >Apply Filters</Button>
                    </Grid>
                </Grid>

                <Grid container spacing={3}>
                    {
                        isLoading
                            ?
                            'Loading Users ...'
                            :
                            results && results.map((item, i) => {
                                return <Grid key={i} item xs={6} md={2} lg={2}>
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
            </Container>
        </Box>
    );
}

export default Users