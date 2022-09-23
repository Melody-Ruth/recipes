import '../App.css';
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { IconButton, Button, Card, TextField, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ClearIcon from '@mui/icons-material/Clear';
import Label from './label';
import Ingredient from './ingredient';
 
export default function EditRecipe() {
  const [form, setForm] = useState({
    name: "",
    meals: 0,
    ingredients: [],
    labels: [],
    notes: "",
  });
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5000/recipe/${params.id.toString()}`);
  
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
  
      const recipe = await response.json();
      if (!recipe) {
        window.alert(`Recipe with id ${id} not found`);
        navigate("/");
        return;
      }
  
      setForm(recipe);
    }
  
    fetchData();
  
    return;
  }, [params.id, navigate]);
 
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
    console.log(newLabelList);

    updateForm({ labels: newLabelList});

    setLabelForm({ label: "" });
    console.log(form);
  }
  
  // Ingredients:
  const [ingredientForm, setIngredientForm] = useState({
    name: "",
    quantity: "",
  });

  function updateIngredientForm(value) {
    return setIngredientForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function ingredientList() {
    return form.ingredients.map((ingredient) => {
      return (
        <Ingredient
          ingredient={ingredient}
          deleteIngredient={() => deleteIngredient(ingredient.name,ingredient.quantity)}
          key={ingredient.quantity+ingredient.name}
        />
      );
    });
  }

  async function deleteIngredient(name, quantity) {
    const newIngredients = form.ingredients.filter((el) => (el.name !== name || el.quantity !== quantity) );
    updateForm({ingredients: newIngredients});
  }

  async function onSubmitIngredient(e) {
    e.preventDefault();

    const newIngredient = { ...ingredientForm };
    const newIngredientList = [...form.ingredients, newIngredient]

    updateForm({ ingredients: newIngredientList});

    setIngredientForm({ name: "", quantity: "" });
  }

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }
 
  // This function will handle the submission.
  async function onSubmit(e) {
    e.preventDefault();
 
    // When a post request is sent to the create url, we'll update the recipe in the database.
    const editedRecipe = { ...form };
    console.log("Edited recipe: ");
    console.log(editedRecipe);
 
    await fetch(`http://localhost:5000/update/${params.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedRecipe),
    })
    .catch(error => {
      window.alert("Problem submitting: " + error);
      return;
    });
 
    setForm({ name: "", meals: 0, labels: [], ingredients: [], notes: "" });
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
            <div className="miniForm">
              <div className="addedItems">{ingredientList()}</div>
              <div className="formLineContainer">
                <TextField label="Quantity" variant="outlined" style={{marginBottom: "2em", marginRight: "1em"}} onChange={(e) => updateIngredientForm({ quantity: e.target.value })} value={ingredientForm.quantity}/>
                <TextField label="Ingredient" variant="outlined" style={{marginBottom: "2em"}} onChange={(e) => updateIngredientForm({ name: e.target.value })} value={ingredientForm.name}/>
                <IconButton color="primary" aria-label="add" id="submitIngredientButton" onClick={onSubmitIngredient}><AddCircleIcon fontSize="large" /></IconButton>
              </div>
            </div>
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