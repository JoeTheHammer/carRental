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
import { Car } from "../interfaces/Car";

interface CreateModifyCarDialogProps {
  open: boolean;
  onClose: () => void;
  car?: Car; //optional car for editing
}

const CreateModifyCarDialog: React.FC<CreateModifyCarDialogProps> = ({
  open,
  onClose,
  car,
}) => {
  const [newCar, setNewCar] = useState<Omit<Car, "id">>({
    licensePlate: "",
    brand: "",
    model: "",
    color: "",
    manufacturedYear: new Date().getFullYear(),
    mileage: 0,
  });

  useEffect(() => {
    if (car) {
      setNewCar({
        licensePlate: car.licensePlate,
        brand: car.brand,
        model: car.model,
        color: car.color,
        manufacturedYear: car.manufacturedYear,
        mileage: car.mileage,
      });
    } else {
      setNewCar({
        licensePlate: "",
        brand: "",
        model: "",
        color: "",
        manufacturedYear: new Date().getFullYear(),
        mileage: 0,
      });
    }
  }, [car, open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  };

  const handleSubmit = () => {
    //TODO: Implement call to backend
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {car ? (
        <DialogTitle>Update Car</DialogTitle>
      ) : (
        <DialogTitle>Add New Car</DialogTitle>
      )}
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="licensePlate"
          label="License Plate"
          type="text"
          fullWidth
          variant="outlined"
          value={newCar.licensePlate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="outlined"
          value={newCar.brand}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="model"
          label="Model"
          type="text"
          fullWidth
          variant="outlined"
          value={newCar.model}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          type="text"
          fullWidth
          variant="outlined"
          value={newCar.color}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="manufacturedYear"
          label="Manufactured Year"
          type="number"
          fullWidth
          variant="outlined"
          value={newCar.manufacturedYear}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="mileage"
          label="Mileage (km)"
          type="number"
          fullWidth
          variant="outlined"
          value={newCar.mileage}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleSubmit}
          color="primary"
          startIcon={<Save></Save>}
        >
          Save
        </Button>
        <Button
          onClick={onClose}
          color="secondary"
          startIcon={<Cancel></Cancel>}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModifyCarDialog;
