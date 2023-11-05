import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, color: "white", textDecoration: "none" }}
        >
          TeX
        </Typography>
        <Button color="inherit" component={Link} to="/manage">
          Manage Tokens
        </Button>
        <Button color="inherit" component={Link} to="/upload">
          Upload
        </Button>
        <Button color="inherit" component={Link} to="/swap">
          Swap ETH
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
