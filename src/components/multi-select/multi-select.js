import React, {useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

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

const names = [
    'au', 'br', 'ca', 'ch', 'de', 'dk', 'es', 'fi', 'fr', 'gb', 'ie', 'ir', 'no', 'nl', 'nz', 'tr', 'us'
];

function getStyles(name, personNat, theme) {
    return {
        fontWeight:
            personNat.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultiSelect({currentURL, getFullUrl, fullUrl}) {
    const theme = useTheme();
    const [personNat, setPersonNat] = React.useState([]);

    useEffect(() => {
        setPersonNat(fullUrl.hasOwnProperty(currentURL) && fullUrl[currentURL].length !== 0 ? fullUrl[currentURL].split(',') : [])
    }, [fullUrl[currentURL]]);

    const handleChange = (event) => {
        setPersonNat(event.target.value);

        if (event.target.value.length === 0) {
            getFullUrl(currentURL, event, currentURL)
        } else {
            getFullUrl(currentURL, event)
        }
    };

    return (
        <div>
            <FormControl sx={{width: '100%'}}>
                <InputLabel id="demo-multiple-name-label">Nationality</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personNat}
                    onChange={handleChange}
                    input={<OutlinedInput label="Nationality"/>}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personNat, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
