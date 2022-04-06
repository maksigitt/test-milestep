import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import {useDispatch, useSelector} from "react-redux";
import {setGenderUrl} from "../../pages/users/services/action";


const BasicSelect = () => {
    const [gender, setGender] = React.useState('');
    const dispatch = useDispatch();
    const {genderUrl} = useSelector(state => state.usersReducer);

    useEffect(() => {
        setGender(genderUrl)
    }, [genderUrl]);

    const handleChange = (event) => {
        setGender(event.target.value)
        dispatch(setGenderUrl(event.target.value))
    };

    return (
        <Box sx={{minWidth: 120}}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={gender}
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
