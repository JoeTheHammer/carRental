// Customers.tsx

import { useEffect, useState } from "react";
import { Customer } from "../interfaces/Customer";
import CreateModifyCustomerDialog from "./CreateModifyCustomerDialog"; // You will create this component similar to CreateModifyCarDialog
import { Add, Edit, Delete, CarRental } from "@mui/icons-material";
import { Snackbar } from "@mui/material";
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
import RentCarDialog from "./RentCarDialog";

function Customers() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerDialogOpen, setCustomerDialogOpen] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<Customer | undefined>(
    undefined
  );
  const [rentCarDialogOpen, setRentCarDialogOpen] = useState<boolean>(false);
  const [customerForRent, setCustomerForRent] = useState<Customer | undefined>(
    undefined
  );
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleRentalSaveSuccess = () => {
    setSnackbarOpen(true);
  };

  const fetchCustomers = async () => {
    // Placeholder: Implement fetching of customers
    const response = await fetch(
      "http://localhost:8080/api/customer/getAllCustomers"
    );
    const data = await response.json();
    setCustomers(data);
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    Object.values(customer).some((value) =>
      value !== null
        ? value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        : false
    )
  );

  const handleOpenCreateDialog = () => {
    setEditingCustomer(undefined);
    setCustomerDialogOpen(true);
  };

  const handleCloseCustomerDialog = () => {
    setCustomerDialogOpen(false);
    fetchCustomers();
  };

  const handleOpenEditDialog = (customer: Customer) => {
    setEditingCustomer(customer);
    setCustomerDialogOpen(true);
  };

  const handleOpenRentCarDialog = (customer: Customer) => {
    setCustomerForRent(customer);
    setRentCarDialogOpen(true);
  };

  const handleCloseRentCarDialog = () => {
    setRentCarDialogOpen(false);
  };

  // Placeholder: Implement deletion of customer
  const handleDelete = (customer: Customer) => {
    if (window.confirm(`Are you sure you want to delete the customer?`)) {
      fetch(
        `http://localhost:8080/api/customer/deleteCustomer/${customer.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete customer");
          }

          fetchCustomers();
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    }
  };

  return (
    <>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Rental was added!"
      />
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
                  <b>Date of birth</b>
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
                  <TableCell>{customer.dateOfBirth.slice(0, 10)}</TableCell>
                  <TableCell>{customer.registerDate.slice(0, 10)}</TableCell>
                  <TableCell>
                    {customer.postalCode +
                      " " +
                      customer.city +
                      ", " +
                      customer.country}
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<CarRental />}
                      onClick={() => handleOpenRentCarDialog(customer)}
                    >
                      Rent Car
                    </Button>
                  </TableCell>
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
          inputCustomer={editingCustomer}
        />
        {customerForRent && (
          <RentCarDialog
            open={rentCarDialogOpen}
            onClose={handleCloseRentCarDialog}
            givenCustomer={customerForRent}
            onRentalSuccess={handleRentalSaveSuccess}
          />
        )}
      </Box>
    </>
  );
}

export default Customers;
