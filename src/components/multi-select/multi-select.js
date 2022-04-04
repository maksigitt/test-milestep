import React, {useEffect} from 'react';
import {useTheme} from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {setNatUrl} from "../../pages/users/services/action";
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

function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export default function MultiSelect() {
    const theme = useTheme();
    const [personName, setPersonName] = React.useState([]);
    const dispatch = useDispatch();
    const {natUrl} = useSelector(state => state.usersReducer);

    useEffect(() => {
        setPersonName(natUrl)
    }, [natUrl]);

    const handleChange = (event) => {

        const {
            target: {value},
        } = event;

        setPersonName(
            value
        );
        dispatch(setNatUrl(value))
    };

    return (
        <div>
            <FormControl sx={{width: 300}}>
                <InputLabel id="demo-multiple-name-label">Nationality</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={personName}
                    onChange={handleChange}
                    input={<OutlinedInput label="Name"/>}
                    MenuProps={MenuProps}
                >
                    {names.map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, personName, theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}
