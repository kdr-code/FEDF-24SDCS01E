import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
} from "@mui/material";

function AddProduct() {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const handleSubmit = async (e) => {
    try {
      await axios.post("http://localhost:5000/api/products", { name, cost });
      toast.success("Product added successfully!");
      setName("");
      setCost("");
    } catch (err) {
      console.error(err);
      toast.error("Failed to add product!");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={4} sx={{ p: 4 }}>
        <Typography variant="h5" gutterBottom>
          Add Product
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Product Name"
            variant="outlined"
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            fullWidth
            label="Cost"
            type="number"
            variant="outlined"
            margin="normal"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            Add Product
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddProduct;
