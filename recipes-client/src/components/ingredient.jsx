import '../App.css';
import React from "react";
import { IconButton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import ClearIcon from '@mui/icons-material/Clear';

export default function Ingredient(props) {
    const theme = useTheme();
    return (
    <div className="addedItem" style={{ backgroundColor: theme.palette.secondary.main }} >
      <div className="textBox">
        <Typography variant="p" className="recipeText" color="white" align="center">{props.ingredient.quantity} {props.ingredient.name}</Typography>
      </div>
      <IconButton aria-label="delete" id="deleteIngredientButton" onClick={props.deleteIngredient}><ClearIcon/></IconButton>
    </div>
   );
  }