import '../App.css';
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, IconButton, Card, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';

const Label = (props) => {
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
 
export default function CreateRecipe() {
  const [form, setForm] = useState({
    name: "",
    meals: 0,
    labels: [],
    notes: "",
  });
  const navigate = useNavigate();
 
  // Label:
  const [labelForm, setLabelForm] = useState({
    label: "",
  });
  
  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function updateLabelForm(value) {
    return setLabelForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function labelList() {
    return form.labels.map((label) => {
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
    const newLabels = form.labels.filter((el) => el !== name);
    updateForm({labels: newLabels});
  }

  async function onSubmitLabel(e) {
    e.preventDefault();

    // When a post request is sent to the create url, we'll add a new recipe to the database.
    const newLabel = { ...labelForm };
    const newLabelList = [...form.labels, newLabel.label]

    updateForm({ labels: newLabelList});

    setLabelForm({ label: "" });
  }
 
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
 
    // When a post request is sent to the create url, we'll add a new recipe to the database.
    const newRecipe = { ...form };

    console.log(newRecipe);
 
    await fetch("http://localhost:5000/recipe/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecipe),
    })
    .catch(error => {
      window.alert("Problem submitting: " + error);
      return;
    });
 
    setForm({ name: "", meals: 0, labels: [], notes: "" });
    navigate("/");
  }
 
  // This following section will display the form that takes the input from the user.
  return (
    <div className="mainContainer">
      <Card sx={{ borderRadius: '1em' }} className="formCard">
        <div className="textBox">
          <Typography variant="h5" className="recipeText" color="secondary" align="center">Create Recipe</Typography>
        </div>
        <form className="form" onSubmit={onSubmit} component="form">
            <TextField label="Name" variant="outlined" style={{marginBottom: "2em"}} required onChange={(e) => updateForm({ name: e.target.value })} value={form.name}/>
            <TextField label="Number of meals" variant="outlined" style={{marginBottom: "2em"}} required onChange={(e) => updateForm({ meals: e.target.value })} value={form.meals} type="number"/>
            <div className="miniForm">
              <div className="addedItems">{labelList()}</div>
              <div className="formLineContainer">
                <TextField label="Label" variant="outlined" style={{marginBottom: "2em"}} onChange={(e) => updateLabelForm({ label: e.target.value })} value={labelForm.label}/>
                <IconButton color="primary" aria-label="add" id="submitLabelButton" onClick={onSubmitLabel}><AddCircleIcon fontSize="large" /></IconButton>
              </div>
            </div>
            <TextField label="Notes" variant="outlined" style={{marginBottom: "2em"}} required multiline onChange={(e) => updateForm({ notes: e.target.value })} value={form.notes}/>
            <div id="submitDiv">
                <Button variant="contained" color="primary" id="submitButton" onClick={onSubmit}>Submit</Button>
            </div>
        </form>
      </Card>
    </div>
  );
}