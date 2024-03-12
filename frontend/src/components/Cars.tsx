import React, { useEffect, useState } from "react";
import { Car } from "../interfaces/Car";
import CreateModifyCarDialog from "./CreateModifyCarDialog";
import { Add, Edit, Delete } from "@mui/icons-material";
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

function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [carDialogOpen, setCarDialogOpen] = useState<boolean>(false);

  const [editingCar, setEditingCar] = useState<Car | undefined>(undefined);

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:8080/api/car/getAllCars");
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []); // Effect called when page is loaded because of empty array.

  const filteredCars = cars.filter((car) =>
    Object.values(car).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenCreateDialog = () => {
    setEditingCar(undefined);
    setCarDialogOpen(true);
  };

  const handleCloseCarDialogOpen = () => {
    setCarDialogOpen(false);
  };

  const handleOpenEditDialog = (car: Car) => {
    setEditingCar(car); // Set the selected car for editing
    setCarDialogOpen(true);
  };

  const handleDelete = (car: Car) => {
    //TODO: Call API to delete Car
  };

  return (
    <>
      <Box
        sx={{ pr: "20px", pl: "20px", pb: "20px", pt: "80px", width: "100%" }}
      >
        <TextField
          label="Search Cars"
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
                  <b>License Plate</b>
                </TableCell>
                <TableCell>
                  <b>Brand</b>
                </TableCell>
                <TableCell>
                  <b>Model</b>
                </TableCell>
                <TableCell>
                  <b>Color</b>
                </TableCell>
                <TableCell>
                  <b>Manufactured Year</b>
                </TableCell>
                <TableCell>
                  <b>Mileage (km)</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell>{car.licensePlate}</TableCell>
                  <TableCell>{car.brand}</TableCell>
                  <TableCell>{car.model}</TableCell>
                  <TableCell>{car.color}</TableCell>
                  <TableCell>{car.manufacturedYear}</TableCell>
                  <TableCell>{car.mileage}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Edit></Edit>}
                      onClick={() => handleOpenEditDialog(car)}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Delete></Delete>}
                      onClick={() => handleDelete(car)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={{ pt: "10px", width: "100%" }}>
          <Button
            onClick={handleOpenCreateDialog}
            variant="contained"
            color="primary"
            startIcon={<Add></Add>}
          >
            Add new car
          </Button>
        </Box>
        <CreateModifyCarDialog
          open={carDialogOpen}
          onClose={handleCloseCarDialogOpen}
          car={editingCar}
        />
      </Box>
    </>
  );
}

export default Cars;
