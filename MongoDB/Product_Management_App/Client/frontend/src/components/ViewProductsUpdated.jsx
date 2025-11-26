import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Container,
  Typography,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  IconButton,
  Stack,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ViewProductsUpdated() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Update modal state
  const [editing, setEditing] = useState(null); // product object or null
  const [form, setForm] = useState({ name: "", cost: "" });

  // Pagination / page size
  const [pageSize, setPageSize] = useState(10);

  // Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data || []);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open update modal
  const handleOpenUpdate = (product) => {
    setEditing(product);
    setForm({ name: product.name ?? "", cost: product.cost ?? "" });
  };

  // Close update modal
  const handleCloseUpdate = () => {
    setEditing(null);
    setForm({ name: "", cost: "" });
  };

  // Perform update (PUT)
  const handleUpdate = async () => {
    if (!editing) return;
    try {
      const res = await axios.put(
        `http://localhost:5000/api/products/${editing._id}`,
        {
          name: form.name,
          cost: Number(form.cost),
        }
      );

      const updated = res.data;
      // Update local state (immutable)
      setProducts((prev) =>
        prev.map((p) => (p._id === updated._id ? updated : p))
      );
      handleCloseUpdate();
      toast.success("Product updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Update failed!");
    }
  };

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      toast.success("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Delete failed!");
    }
  };

  // DataGrid expects each row to have id field
  const rows = products.map((p) => ({
    id: p._id,
    _id: p._id,
    name: p.name,
    cost: p.cost,
  }));

  const columns = [
    { field: "name", headerName: "Product Name", flex: 1, minWidth: 150, sortable: true },
    { field: "cost", headerName: "Cost", type: "number", width: 120, sortable: true },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      filterable: false,
      width: 140,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        const row = params.row;
        return (
          <Stack direction="row" spacing={1} justifyContent="center">
            <IconButton
              size="small"
              color="primary"
              onClick={() => handleOpenUpdate(row)}
              title="Update"
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={() => handleDelete(row._id)}
              title="Delete"
            >
              <DeleteIcon />
            </IconButton>
          </Stack>
        );
      },
    },
  ];

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Product List
      </Typography>

      <Paper elevation={3} sx={{ height: "70vh", p: 1 }}>
        <DataGrid
          rows={rows}
          columns={columns}
          loading={loading}
          initialState={{
            pagination: { paginationModel: { pageSize: 5, page: 0 } },
          }}
          pageSizeOptions={[5, 10, 20, 50]} // renamed in v8
          pagination
          disableRowSelectionOnClick
        //   autoHeight={false}
          sx={{ border: "none" }}
          // ENABLE the built-in toolbar (no deprecated imports)
          showToolbar
          // pass quick filter (search) props to the built-in toolbar
          slotProps={{
            toolbar: {
              quickFilterProps: {
                debounceMs: 300,
                placeholder: "Search products...",
              },
            },
          }}
        />
      </Paper>

      {/* Update Modal */}
      <Dialog
        open={!!editing}
        onClose={handleCloseUpdate}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Product Name"
            fullWidth
            variant="outlined"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            sx={{ mt: 1 }}
          />
          <TextField
            margin="dense"
            label="Cost"
            type="number"
            fullWidth
            variant="outlined"
            value={form.cost}
            onChange={(e) => setForm({ ...form, cost: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseUpdate}>Cancel</Button>
          <Button variant="contained" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
