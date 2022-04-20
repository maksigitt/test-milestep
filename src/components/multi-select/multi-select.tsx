import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, {SelectChangeEvent} from '@mui/material/Select';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

interface MultiSelectProps {
    currentKey: string;
    currentUrl: {};
    list: string[];
    nat: string | null;
    handleParams: any;
}

export default function MultiSelect({currentKey, currentUrl, nat, list, handleParams}: MultiSelectProps) {

    const handleChange = (event: SelectChangeEvent<string[]>) => {
        handleParams({
            ...currentUrl,
            [currentKey]: event.target.value,
        })

    };

    return (
        <div>
            <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-multiple-name-label">Nationality</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={nat !== null ? nat.split(',') : []}
                    onChange={handleChange}
                    input={<OutlinedInput label="Nationality"/>}
                    MenuProps={MenuProps}
                >
                    {list.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
