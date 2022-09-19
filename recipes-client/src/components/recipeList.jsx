import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IconButton, Card, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

const Recipe = (props) => (
  <Card className="recipeCard">
    <div className="textSection">
      <div className="textBox">
        <Typography variant="h5" className="recipeText" color="secondary" align="center">{props.recipe.name}</Typography>
      </div>
      <div className="textBox">
        <Typography variant="p" className="recipeText">Ingredients: {props.recipe.ingredients.map((ingredient) => {return (ingredient.quantity + " " + ingredient.name) + ", ";})}</Typography>
      </div>
      <div className="textBox">
        <Typography variant="p" className="recipeText">Num. of meals: {props.recipe.meals}</Typography>
      </div>
      <div className="textBox">
        <Typography variant="p" className="recipeText">Labels: {props.recipe.labels.map((recipe) => {return (recipe + ", ");})}</Typography>
      </div>
      <div className="textBox">
        <Typography variant="p" className="recipeText">Notes: {props.recipe.notes}</Typography>
      </div>
    </div>
    <div className="iconSection">
      <Link to={`/edit/${props.recipe._id}`}> 
        <IconButton><EditIcon/></IconButton>
      </Link>
      <IconButton onClick={() => {
          props.deleteRecipe(props.recipe._id);
        }}>
        <DeleteIcon/>
      </IconButton>
    </div>
  </Card>
 );
 
export default function RecipeList() {
 const [recipes, setRecipes] = useState([]);
 
 // This method fetches the recipes from the database.
 useEffect(() => {
   async function getRecipes() {
     const response = await fetch(`http://localhost:5000/recipe/`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const recipes = await response.json();
     setRecipes(recipes);
   }
 
   getRecipes();
 
   return;
 }, [recipes.length]);
 
 // This method will delete a recipe
 async function deleteRecipe(id) {
   await fetch(`http://localhost:5000/${id}`, {
     method: "DELETE"
   });
 
   const newRecipes = recipes.filter((el) => el._id !== id);
   setRecipes(newRecipes);
 }
 
 // This method will map out the recipes on the table
 function recipeList() {
   return recipes.map((recipe) => {
     return (
       <Recipe
         recipe={recipe}
         deleteRecipe={() => deleteRecipe(recipe._id)}
         key={recipe._id}
       />
     );
   });
 }
 
 // This following section will display the table with the recipes of individuals.
 return (
   <div>
     <div className="recipeContainer">
      {recipeList()}
     </div>
   </div>
 );
}