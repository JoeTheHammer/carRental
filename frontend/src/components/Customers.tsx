// Customers.tsx

import React, { useEffect, useState } from "react";
import { Customer } from "../interfaces/Customer";
import CreateModifyCustomerDialog from "./CreateModifyCustomerDialog"; // You will create this component similar to CreateModifyCarDialog
import { Add, Edit, Delete, Cancel, Save } from "@mui/icons-material";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  Box,
  Button,
} from "@mui/material";

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerDialogOpen, setCustomerDialogOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(
    undefined
  );

  useEffect(() => {
    const fetchCustomers = async () => {
      // Placeholder: Implement fetching of customers
      const response = await fetch(
        "http://localhost:8080/api/customer/getAllCustomers"
      );
      const data = await response.json();
      setCustomers(data);
    };

    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenCreateDialog = () => {
    setEditingCustomer(undefined);
    setCustomerDialogOpen(true);
  };

  const handleCloseCustomerDialog = () => {
    setCustomerDialogOpen(false);
  };

  const handleOpenEditDialog = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerDialogOpen(true);
  };

  // Placeholder: Implement deletion of customer
  const handleDelete = (customer: Customer) => {
    console.log("Deleting customer:", customer);
  };

  return (
    <>
      <Box sx={{ pr: 2, pl: 2, pt: 10, pb: 2, width: "100%" }}>
        <TextField
          label="Search Customers"
          variant="outlined"
          fullWidth
          margin="normal"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 50, overflow: "auto" }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>First Name</b>
                </TableCell>
                <TableCell>
                  <b>Last Name</b>
                </TableCell>
                <TableCell>
                  <b>Phone Number</b>
                </TableCell>
                <TableCell>
                  <b>Email Address</b>
                </TableCell>
                <TableCell>
                  <b>License ID</b>
                </TableCell>
                <TableCell>
                  <b>Register Date</b>
                </TableCell>
                <TableCell>
                  <b>Place of Residence</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.emailAddress}>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.phoneNumber}</TableCell>
                  <TableCell>{customer.emailAddress}</TableCell>
                  <TableCell>{customer.licenseId}</TableCell>
                  <TableCell>{new Date().toISOString().slice(0, 10)}</TableCell>
                  <TableCell>
                    {customer.postalCode +
                      " " +
                      customer.city +
                      ", " +
                      customer.country}
                  </TableCell>
                  {/* Additional fields */}
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit />}
                      onClick={() => handleOpenEditDialog(customer)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Delete />}
                      onClick={() => handleDelete(customer)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ pt: 2 }}>
          <Button
            onClick={handleOpenCreateDialog}
            variant="contained"
            color="primary"
            startIcon={<Add />}
          >
            Add New Customer
          </Button>
        </Box>
        <CreateModifyCustomerDialog
          open={customerDialogOpen}
          onClose={handleCloseCustomerDialog}
          customer={editingCustomer}
        />
      </Box>
    </>
  );
}

export default Customers;
