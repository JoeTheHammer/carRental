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

const invalidIdValue = 0;

interface CreateModifyCustomerDialogProps {
  open: boolean;
  onClose: () => void;
  inputCustomer?: Customer; // Optional customer for editing
}

const CreateModifyCustomerDialog: React.FC<CreateModifyCustomerDialogProps> = ({
  open,
  onClose,
  inputCustomer: inputCustomer,
}) => {
  const initialCustomerState: Customer = {
    id: invalidIdValue,
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    licenseId: "",
    registerDate: new Date().toISOString().slice(0, 10),
    country: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    region: "",
    postalCode: "",
    dateOfBirth: "",
  };

  const [customerDetails, setCustomerDetails] =
    useState<Customer>(initialCustomerState);

  useEffect(() => {
    if (inputCustomer) {
      setCustomerDetails({
        id: inputCustomer.id,
        firstName: inputCustomer.firstName,
        lastName: inputCustomer.lastName,
        phoneNumber: inputCustomer.phoneNumber,
        emailAddress: inputCustomer.emailAddress,
        licenseId: inputCustomer.licenseId,
        registerDate: inputCustomer.registerDate.slice(0, 10),
        country: inputCustomer.country,
        addressLine1: inputCustomer.addressLine1,
        addressLine2: inputCustomer.addressLine2 || "",
        city: inputCustomer.city,
        region: inputCustomer.region,
        postalCode: inputCustomer.postalCode,
        dateOfBirth: inputCustomer.dateOfBirth.slice(0, 10),
      });
    } else {
      setCustomerDetails(initialCustomerState);
    }
  }, [inputCustomer, open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCustomerDetails((temporaryCustomer) => ({
      ...temporaryCustomer,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const saveCustomerCmd = {
      id: customerDetails.id == invalidIdValue ? null : customerDetails.id,
      firstName: customerDetails.firstName,
      lastName: customerDetails.lastName,
      phoneNumber: customerDetails.phoneNumber,
      emailAddress: customerDetails.emailAddress,
      licenseId: customerDetails.licenseId,
      registerDate: customerDetails.registerDate,
      country: customerDetails.country,
      addressLine1: customerDetails.addressLine1,
      addressLine2: customerDetails.addressLine2,
      city: customerDetails.city,
      region: customerDetails.region,
      postalCode: customerDetails.postalCode,
      dateOfBirth: customerDetails.dateOfBirth,
    };

    fetch("http://localhost:8080/api/customer/saveCustomer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveCustomerCmd),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save customer");
        }
        // Handle success response
        console.log("Customer saved successfully");
        // Optionally, you can update your UI or close the dialog
        onClose();
      })
      .catch((error) => {
        // Handle error
        console.error("Error saving customer:", error);
        // Optionally, you can show an error message to the user
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {inputCustomer ? "Edit Customer" : "Add New Customer"}
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
          name="dateOfBirth"
          label="Date of birth"
          type="date"
          fullWidth
          variant="outlined"
          InputLabelProps={{ shrink: true }}
          value={customerDetails.dateOfBirth}
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
