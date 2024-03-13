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

const invalidId = -1; // Inidicates that car has no id;

interface CreateModifyCarDialogProps {
  open: boolean;
  onClose: () => void;
  inputCar?: Car; //optional car for editing
}

const CreateModifyCarDialog: React.FC<CreateModifyCarDialogProps> = ({
  open,
  onClose,
  inputCar: inputCar,
}) => {
  const [temporaryCar, setNewCar] = useState<Car>({
    id: invalidId,
    licensePlate: "",
    brand: "",
    model: "",
    color: "",
    manufacturedYear: new Date().getFullYear(),
    mileage: 0,
    currentlyRented: false,
  });

  useEffect(() => {
    if (inputCar) {
      setNewCar({
        id: inputCar.id,
        licensePlate: inputCar.licensePlate,
        brand: inputCar.brand,
        model: inputCar.model,
        color: inputCar.color,
        manufacturedYear: inputCar.manufacturedYear,
        mileage: inputCar.mileage,
        currentlyRented: inputCar.currentlyRented,
      });
    } else {
      setNewCar({
        id: invalidId,
        licensePlate: "",
        brand: "",
        model: "",
        color: "",
        manufacturedYear: new Date().getFullYear(),
        mileage: 0,
        currentlyRented: false,
      });
    }
  }, [inputCar, open]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setNewCar({ ...temporaryCar, [name]: value });
  };

  const handleSubmit = () => {
    const saveCarCmd = {
      id: temporaryCar.id == invalidId ? null : temporaryCar.id,
      licensePlate: temporaryCar.licensePlate,
      brand: temporaryCar.brand,
      model: temporaryCar.model,
      color: temporaryCar.color,
      manufacturedYear: temporaryCar.manufacturedYear,
      mileage: temporaryCar.mileage,
    };

    fetch("http://localhost:8080/api/car/saveCar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(saveCarCmd), // Convert the saveCarCmd object to JSON string
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save car");
        }
        console.log("Car saved successfully");
        onClose();
      })
      .catch((error) => {
        console.error("Error saving car:", error);
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {inputCar ? (
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
          value={temporaryCar.licensePlate}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="brand"
          label="Brand"
          type="text"
          fullWidth
          variant="outlined"
          value={temporaryCar.brand}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="model"
          label="Model"
          type="text"
          fullWidth
          variant="outlined"
          value={temporaryCar.model}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="color"
          label="Color"
          type="text"
          fullWidth
          variant="outlined"
          value={temporaryCar.color}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="manufacturedYear"
          label="Manufactured Year"
          type="number"
          fullWidth
          variant="outlined"
          value={temporaryCar.manufacturedYear}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="mileage"
          label="Mileage (km)"
          type="number"
          fullWidth
          variant="outlined"
          value={temporaryCar.mileage}
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
