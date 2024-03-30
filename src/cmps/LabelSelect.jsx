import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { toyService } from '../services/toy.service';

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


// const labels = toyService.getLabels()

function getStyles(name, label, theme) {
    return {
        fontWeight:
            label.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}

export function LabelSelect({setToyToEdit,toyToEdit}) {
    const theme = useTheme();

    function handleLabelChange({ target }) {
        const {value}= target
          setToyToEdit(prevToy => ({ ...prevToy, labels:  typeof value === 'string' ? value.split(',') : value}))
    }
    return (
        <div>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-name-label">Label</InputLabel>
                <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    multiple
                    value={toyToEdit.labels}
                    onChange={handleLabelChange}
                    input={<OutlinedInput label="Name" />}
                    MenuProps={MenuProps}
                >
                    {toyService.getLabels().map((name) => (
                        <MenuItem
                            key={name}
                            value={name}
                            style={getStyles(name, toyService.getLabels(), theme)}
                        >
                            {name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}