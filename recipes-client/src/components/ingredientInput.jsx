import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';

const filter = createFilterOptions();

export default function IngredientInput(props) {
  const [value, setValue] = React.useState(null);

  const testIngredients = [{_id: "63b2340ab9118336e19ddec4", name: "pesto" }, {name: "onion"}];

  const [ingredients, setIngredients] = useState([]);
  // This method fetches the ingredients from the database.
  useEffect(() => {
    async function getIngredients(_callback) {
      console.log("started fetching");
      const response = await fetch(`http://localhost:5000/ingredient/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const ingredients = await response.json();
      setIngredients(ingredients);
      console.log(ingredients);
      setIngredients(ingredients)
      _callback();
    }
    getIngredients(() => {});
    //getIngredients(() => {setIngredients(ingredients)});
  
    return;
  }, []);

  async function addIngredient(ingredientName) {
    console.log({name: ingredientName});
    await fetch("http://localhost:5000/ingredient/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: ingredientName}),
    })
    .catch(error => {
      window.alert("Problem submitting: " + error);
      return;
    });
  }

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        console.log("real ingredients: "+ingredients);
        console.log("test ingredients: "+testIngredients);
        if (typeof newValue === 'string') {
          setValue({
            name: newValue,
          });
          props.changeToParent(newValue);
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            name: newValue.inputValue,
          });
          setIngredients([...ingredients,{name: newValue.inputValue}]);
          addIngredient(newValue.inputValue);
          props.changeToParent(newValue.inputValue);
        } else {
          setValue(newValue);
          props.changeToParent(newValue.name);
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params);

        const { inputValue } = params;
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.name);
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            name: `Add "${inputValue}"`,
          });
        }

        return filtered;
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="ingredient-input-name"
      options={ingredients}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => <li {...props}>{option.name}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => (
        <TextField {...params} label="Ingredient" />
      )}
    />
  );
}


