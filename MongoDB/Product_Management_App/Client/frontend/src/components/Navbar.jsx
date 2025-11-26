import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6">Product Management</Typography>
        <div>
          <Button color="inherit" component={Link} to="/">
            Add Product
          </Button>
          <Button color="inherit" component={Link} to="/view">
            View Products
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
