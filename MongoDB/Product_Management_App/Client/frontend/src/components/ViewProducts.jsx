import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: "", cost: "" });

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:5000/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    setProducts(products.filter((p) => p._id !== id));
  };

  const handleOpenUpdate = (product) => {
    setEditing(product);
    setForm({ name: product.name, cost: product.cost });
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/products/${editing._id}`, form);
    setEditing(null);
    fetchProducts();
  };

  return (
    <Container sx={{ mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ backgroundColor: "#e3f2fd" }}>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Cost</b></TableCell>
              <TableCell align="center"><b>Actions</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((p) => (
              <TableRow key={p._id}>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.cost}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleOpenUpdate(p)}
                    sx={{ mr: 1 }}
                  >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={() => handleDelete(p._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Update Modal */}
      <Dialog open={!!editing} onClose={() => setEditing(null)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <TextField
            margin="dense"
            label="Cost"
            fullWidth
            type="number"
            variant="outlined"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditing(null)} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="contained" color="primary">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default ViewProducts;
