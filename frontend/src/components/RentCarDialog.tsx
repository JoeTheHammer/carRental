import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { Save, Cancel, RecentActorsOutlined } from "@mui/icons-material";
import { Customer } from "../interfaces/Customer";
import { Car } from "../interfaces/Car";
import { Rental } from "../interfaces/Rental";

interface RentCarDialogProps {
  open: boolean;
  onClose: () => void;
  givenCustomer: Customer;
  onRentalSuccess: () => void;
}

const RentCarDialog: React.FC<RentCarDialogProps> = ({
  open,
  onClose,
  givenCustomer,
  onRentalSuccess,
}) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | undefined>(
    undefined
  );
  const [rentalDetails, setRentalDetails] = useState<Partial<Rental>>({});
  const [submitAttempted, setSubmitAttempted] = useState(false);

  useEffect(() => {
    if (open) {
      const fetchCars = async () => {
        try {
          const response = await fetch(
            "http://localhost:8080/api/car/getAvailableCars"
          );
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          setCars(data);
        } catch (error) {
          console.error("Failed to fetch cars:", error);
        }
      };
      fetchCars();
    }
  }, [open]);

  const handleRentalDetailChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value, type, checked } = event.target;

    if (type === "checkbox") {
      // Special handling for checkbox to ensure value is stored as boolean
      setRentalDetails((prevDetails) => ({ ...prevDetails, [name]: checked }));
      console.log(event.target.checked);
    } else {
      setRentalDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
    }
  };

  const handleSubmit = () => {
    // TODO: Implement rent logic
    if (
      selectedCarId === null ||
      selectedCarId === undefined ||
      rentalDetails.rentedKilometers === null ||
      rentalDetails.rentedKilometers === undefined ||
      rentalDetails.rentedKilometers === 0 ||
      rentalDetails.endDate === undefined ||
      rentalDetails.endDate === null
    ) {
      setSubmitAttempted(true);
      alert("Required fields are missing!");
      return;
    }

    const createRentalCmd = {
      endDate: rentalDetails.endDate,
      rentedKilometers: rentalDetails.rentedKilometers,
      carId: selectedCarId,
      customerId: givenCustomer.id,
      twoAddresses: rentalDetails.twoAddresses,
      country: rentalDetails.country,
      addressLine1: rentalDetails.addressLine1,
      addressLine2: rentalDetails.addressLine2,
      city: rentalDetails.city,
      region: rentalDetails.region,
      postalCode: rentalDetails.postalCode,
    };

    fetch("http://localhost:8080/api/rental/saveRental", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(createRentalCmd), // Convert the saveCarCmd object to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save car");
        }

        console.log("Rental was successfully added");
        onRentalSuccess();
        onClose();
      })
      .catch((error) => {
        console.error("Error saving car:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Rent Car</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Autocomplete
            options={cars}
            getOptionLabel={(option) =>
              option.licensePlate + ": " + option.brand + " " + option.model
            }
            onChange={(event, value) =>
              setSelectedCarId(value?.id || undefined)
            }
            renderInput={(params) => (
              <TextField {...params} label="Select Car" variant="outlined" />
            )}
            fullWidth
          />
          <TextField
            margin="dense"
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            variant="outlined"
            required
            InputLabelProps={{ shrink: true }}
            onChange={handleRentalDetailChange}
          />
          <TextField
            margin="dense"
            name="rentedKilometers"
            label="Rented Kilometers"
            type="number"
            fullWidth
            variant="outlined"
            required
            onChange={handleRentalDetailChange}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rentalDetails.twoAddresses || false}
                onChange={handleRentalDetailChange}
                name="twoAddresses"
              />
            }
            label="Use different billing address"
          />
          {rentalDetails.twoAddresses && (
            <div>
              <h4>Billing Address</h4>
              <TextField
                margin="dense"
                name="country"
                label="Country"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
              <TextField
                margin="dense"
                name="addressLine1"
                label="Address Line 1"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
              <TextField
                margin="dense"
                name="addressLine2"
                label="Address Line 2"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
              <TextField
                margin="dense"
                name="city"
                label="City"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
              <TextField
                margin="dense"
                name="region"
                label="Region"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
              <TextField
                margin="dense"
                name="postalCode"
                label="Postal Code"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleRentalDetailChange}
              />
            </div>
          )}
        </Box>
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

export default RentCarDialog;
