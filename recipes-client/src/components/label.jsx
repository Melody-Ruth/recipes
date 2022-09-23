import '../App.css';
import React from "react";
import { IconButton,Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

export default function Label(props) {
    const theme = useTheme();
    return (
        <div className="addedItem" style={{ backgroundColor: theme.palette.secondary.main }} >
            <div className="textBox">
                <Typography variant="p" className="recipeText" color="white" align="center">{props.label}</Typography>
            </div>
            <IconButton aria-label="delete" id="deleteLabelButton" onClick={props.deleteLabel}><ClearIcon/></IconButton>
        </div>
    );
}