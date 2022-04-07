import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {setFullUrl} from "../../pages/users/services/action";



const BasicSelect = ({currentURL}) => {
    const [gender, setGender] = React.useState('');
    const dispatch = useDispatch();
    const {fullUrl} = useSelector(state => state.usersReducer);

    useEffect(() => {
        setGender(fullUrl.gender)
    }, [fullUrl]);

    const handleChange = (event) => {
        setGender(event.target.value)
        if (event.target.value !== 'all') {
            dispatch(setFullUrl(
                {
                    ...fullUrl,
                    [currentURL]: event.target.value,
                }
            ))
        } else {
            delete fullUrl.gender
        }
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender || ''}
                    label="Gender"
                    onChange={handleChange}
                >
                    <MenuItem value={'male'}>Male</MenuItem>
                    <MenuItem value={'female'}>Female</MenuItem>
                    <MenuItem value={'all'}>All</MenuItem>
                </Select>
            </FormControl>
        </Box>

    )
}


export default BasicSelect;
