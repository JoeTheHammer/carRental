import React, { useState, useEffect } from "react";
import { Save, Cancel } from "@mui/icons-material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { Customer } from "../interfaces/Customer"; // Ensure this import path matches your project structure

interface CreateModifyCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  customer?: Customer; // Optional customer for editing
}

const CreateModifyCustomerDialog: React.FC<CreateModifyCustomerDialogProps> = ({
  open,
  onClose,
  customer,
}) => {
  const initialCustomerState: Omit<Customer, "id"> = {
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    licenseId: "",
    registerDate: new Date().toISOString().slice(0, 10), // Using ISO string for simplicity, slice to get YYYY-MM-DD format
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
  };

  const [customerDetails, setCustomerDetails] =
    useState<Omit<Customer, "id">>(initialCustomerState);

  useEffect(() => {
    if (customer) {
      setCustomerDetails({
        firstName: customer.firstName,
        lastName: customer.lastName,
        phoneNumber: customer.phoneNumber,
        emailAddress: customer.emailAddress,
        licenseId: customer.licenseId,
        registerDate: customer.registerDate,
        country: customer.country,
        addressLine1: customer.addressLine1,
        addressLine2: customer.addressLine2 || "",
        city: customer.city,
        region: customer.region,
        postalCode: customer.postalCode,
      });
    } else {
      setCustomerDetails(initialCustomerState);
    }
  }, [customer, open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    //TODO: Call api
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {customer ? "Edit Customer" : "Add New Customer"}
      </DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="firstName"
          label="First Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.firstName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="lastName"
          label="Last Name"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.lastName}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="phoneNumber"
          label="Phone Number"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.phoneNumber}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="emailAddress"
          label="Email Address"
          type="email"
          fullWidth
          variant="outlined"
          value={customerDetails.emailAddress}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="licenseId"
          label="License ID"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.licenseId}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="registerDate"
          label="Register Date"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={customerDetails.registerDate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="country"
          label="Country"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.country}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="addressLine1"
          label="Address Line 1"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.addressLine1}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="addressLine2"
          label="Address Line 2"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.addressLine2}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="city"
          label="City"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.city}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="region"
          label="Region"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.region}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="postalCode"
          label="Postal Code"
          type="text"
          fullWidth
          variant="outlined"
          value={customerDetails.postalCode}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" startIcon={<Save />}>
          Save
        </Button>
        <Button onClick={onClose} color="secondary" startIcon={<Cancel />}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModifyCustomerDialog;
