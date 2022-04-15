import React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


interface BasicSelectProps {
    currentKey: string;
    currentUrl: {};
    list: { name: string; value: string; }[];
    gender: string | null;
    handleParams: any;
}

interface ItemProps {
    name: string,
    value: string,
}


const BasicSelect = ({currentKey, currentUrl, list, gender, handleParams}: BasicSelectProps) => {

    const handleChange = (event: any) => {
        handleParams({
            ...currentUrl,
            [currentKey]: event.target.value
        })
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
                    {
                        list.map((item:ItemProps, i) => {
                            return <MenuItem key={i} value={item.value}>{item.name}</MenuItem>
                        })
                    }
                </Select>
            </FormControl>
        </Box>

    )
}


export default BasicSelect;
