import React, {useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {setFullUrl} from "../../pages/users/services/action";
import {useDispatch, useSelector} from "react-redux";

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

export default function MultiSelect({currentURL}) {
    const theme = useTheme();
    const [personNat, setPersonNat] = React.useState([]);
    const dispatch = useDispatch();
    const {fullUrl} = useSelector(state => state.usersReducer);

    useEffect(() => {
        setPersonNat(fullUrl.hasOwnProperty('nat') && fullUrl.nat.length !== 0 ? fullUrl?.nat.split(',') : [])
    }, [fullUrl.nat]);

    const handleChange = (event) => {

        const {
            target: {value},
        } = event;

        setPersonNat(
            value
        );

        if (event.target.value.length === 0) {
            delete fullUrl.nat
        } else {
            dispatch(setFullUrl(
                {
                    ...fullUrl,
                    [currentURL]: event.target.value.length === 0 ? [] : event.target.value.join(','),
                }
            ))
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
