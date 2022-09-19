import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Card, Typography } from '@mui/material';

const Recipe = (props) => (
  <Card className="recipeCard">
    <div className="textBox">
      <Typography variant="h5" className="recipeText" color="secondary" align="center">{props.recipe.name}</Typography>
    </div>
    <div className="textBox">
      <Typography variant="p" className="recipeText">Num. of meals: {props.recipe.meals}</Typography>
    </div>
    <div className="textBox">
      <Typography variant="p" className="recipeText">Labels: {props.recipe.labels.map((recipe) => {return (recipe + " ");})}</Typography>
    </div>
    <div className="textBox">
      <Typography variant="p" className="recipeText">Notes: {props.recipe.notes}</Typography>
    </div>
    <Link className="btn btn-link" to={`/edit/${props.recipe._id}`}>Edit</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecipe(props.recipe._id);
       }}
     >
       Delete
     </button>
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
     <h3>Recipe List</h3>
     <div className="recipeContainer">
      {recipeList()}
     </div>
   </div>
 );
}