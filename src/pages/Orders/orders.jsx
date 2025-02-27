import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  Button,
  Select,
  MenuItem,
  TextField,
  Chip,
} from "@mui/material";
import { useState } from "react";


const orders = [
  { id: "#12512B", date: "May 5, 4:20 PM", customer: "Tom Anderson", payment: "Paid", status: "Ready", total: "$49.90" },
  { id: "#12523C", date: "May 5, 4:15 PM", customer: "Jayden Walker", payment: "Paid", status: "Ready", total: "$34.36" },
  { id: "#51232A", date: "May 5, 4:15 PM", customer: "Inez Kim", payment: "Paid", status: "Ready", total: "$5.51" },
  { id: "#23534D", date: "May 5, 4:12 PM", customer: "Francisco Henry", payment: "Paid", status: "Shipped", total: "$29.74" },
  { id: "#51232A", date: "May 5, 4:03 PM", customer: "Rosalie Singleton", payment: "Pending", status: "Received", total: "$91.63" },
];

const getStatusColor = (status) => {
  switch (status) {
    case "Ready": return "warning";
    case "Shipped": return "default";
    case "Received": return "primary";
    default: return "default";
  }
};






const Orders = () => {


  const [selected, setSelected] = useState([]);
  const [filter, setFilter] = useState("Newest");

  const handleSelect = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
  <div>

<Box sx={{ p: 3 }}>
    <Box display="flex" justifyContent="space-between" mb={2}>
      <TextField label="Search..." variant="outlined" size="small" />
      <Select value={filter} onChange={(e) => setFilter(e.target.value)} size="small">
        <MenuItem value="Newest">Newest</MenuItem>
        <MenuItem value="Oldest">Oldest</MenuItem>
      </Select>
      <Button variant="contained" color="primary">+ Add Order</Button>
    </Box>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Checkbox />
            </TableCell>
            <TableCell>Order</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Customer</TableCell>
            <TableCell>Payment Status</TableCell>
            <TableCell>Order Status</TableCell>
            <TableCell>Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id} selected={selected.includes(order.id)}>
              <TableCell>
                <Checkbox checked={selected.includes(order.id)} onChange={() => handleSelect(order.id)} />
              </TableCell>
              <TableCell>{order.id}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>
                <Chip label={order.payment} color={order.payment === "Paid" ? "success" : "default"} />
              </TableCell>
              <TableCell>
                <Chip label={order.status} color={getStatusColor(order.status)} />
              </TableCell>
              <TableCell>{order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Box>
  
  </div>


  )
};

export default Orders;
