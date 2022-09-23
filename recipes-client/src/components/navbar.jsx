import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ThemeProvider } from "@mui/material";
import '../App.css';
import React from 'react';
import myTheme from "./myTheme";
import { Link } from 'react-router-dom';
 
// We import NavLink to utilize the react router.
import { NavLink } from "react-router-dom";

const NavBar = ({}) => {
  return (
      <ThemeProvider theme={myTheme}>
      <AppBar position="static" className="appBar">
      <Toolbar className="myToolBar" style={{justifyContent: "space-between"}}>
          <Button size="large" color="inherit" component={Link} to={'/'}>Recipes</Button>
          <div className="navButtons">
          <Button color="inherit" component={Link} to={'/create'}>Create Recipe</Button>
          </div>
      </Toolbar>
    </AppBar>
    </ThemeProvider>
  )
}

export default NavBar;