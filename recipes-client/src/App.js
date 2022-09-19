import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecipeList from "./components/recipeList";
import EditRecipe from "./components/editRecipe";
import CreateRecipe from "./components/createRecipe";
import myTheme from './components/myTheme';
import { ThemeProvider } from "@mui/material";
 
const App = () => {
 return (
  <ThemeProvider theme={myTheme}>
    <div className="appContainer">
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecipeList />} />
       <Route path="/edit/:id" element={<EditRecipe />} />
       <Route path="/create" element={<CreateRecipe />} />
     </Routes>
    </div>
  </ThemeProvider>
 );
};
 
export default App;