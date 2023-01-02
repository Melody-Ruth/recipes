import React, { useEffect, useState } from "react";
import { IconButton, Card, Typography, TextField } from '@mui/material';
import Label from "./label";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import '../App.css';

export default function RecipeFilter(props) {
    // Label:
  const [labelForm, setLabelForm] = useState({
    label: "",
  });
  const [labels, setLabels] = useState([]);

  function updateLabelForm(value) {
    return setLabelForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function labelList() {
    return labels.map((label) => {
      return (
        <Label
          label={label}
          deleteLabel={() => deleteLabel(label)}
          key={label}
        />
      );
    });
  }

  async function deleteLabel(name) {
    const newLabels = labels.filter((el) => el !== name);
    setLabels(newLabels);
    props.updateFilter(newLabels);
  }

  async function onSubmitLabel(e) {
    e.preventDefault();

    const newLabel = { ...labelForm };
    const newLabelList = [...labels, newLabel.label]

    setLabels(newLabelList);

    setLabelForm({ label: "" });

    props.updateFilter(newLabelList);
  }
  
  return(
    <Card className="filterCard" sx={{ borderRadius: 0 }}>
      <div className="textBox">
        <Typography variant="h5" className="recipeText" color="tertiary.main" align="center">Filter Recipes</Typography>
        <div className="miniFormFilter">
          <div className="addedItems">{labelList()}</div>
          <div className="formLineContainer">
            <TextField label="Label" variant="outlined" style={{}} onChange={(e) => updateLabelForm({ label: e.target.value })} value={labelForm.label}/>
            <IconButton color="primary" aria-label="add" id="submitLabelButton" onClick={onSubmitLabel}><AddCircleIcon fontSize="large" /></IconButton>
          </div>
        </div>
      </div>
    </Card>
  );
}