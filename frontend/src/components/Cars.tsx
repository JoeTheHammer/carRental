import { useEffect, useState } from "react";
import { Car } from "../interfaces/Car";
import CreateModifyCarDialog from "./CreateModifyCarDialog";
import { Add, Edit, Delete, Close, Check } from "@mui/icons-material";
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

  const fetchCars = async () => {
    const response = await fetch("http://localhost:8080/api/car/getAllCars");
    const data = await response.json();
    setCars(data);
  };

  useEffect(() => {
    fetchCars();
  }, []); // Effect called when page is loaded because of empty array.

  const filteredCars = cars.filter((car) =>
    Object.values(car).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleOpenCarDialog = () => {
    setEditingCar(undefined);
    setCarDialogOpen(true);
  };

  const handleCloseCarDialog = () => {
    setCarDialogOpen(false);
    fetchCars();
  };

  const handleOpenEditDialog = (car: Car) => {
    setEditingCar(car); // Set the selected car for editing
    setCarDialogOpen(true);
  };

  const handleDelete = (car: Car) => {
    if (window.confirm(`Are you sure you want to delete the car?`)) {
      fetch(`http://localhost:8080/api/car/deleteCar/${car.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete car");
          }

          fetchCars();
        })
        .catch((error) => {
          console.error("Error deleting car:", error);
        });
    }
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
                <TableCell align="center">
                  <b>License Plate</b>
                </TableCell>
                <TableCell align="center">
                  <b>Brand</b>
                </TableCell>
                <TableCell align="center">
                  <b>Model</b>
                </TableCell>
                <TableCell align="center">
                  <b>Color</b>
                </TableCell>
                <TableCell align="center">
                  <b>Manufactured Year</b>
                </TableCell>
                <TableCell align="center">
                  <b>Mileage (km)</b>
                </TableCell>
                <TableCell align="center">
                  <b>Available</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCars.map((car) => (
                <TableRow key={car.id}>
                  <TableCell align="center">{car.licensePlate}</TableCell>
                  <TableCell align="center">{car.brand}</TableCell>
                  <TableCell align="center">{car.model}</TableCell>
                  <TableCell align="center">{car.color}</TableCell>
                  <TableCell align="center">{car.manufacturedYear}</TableCell>
                  <TableCell align="center">{car.mileage}</TableCell>
                  <TableCell align="center">
                    {car.currentlyRented ? <Close /> : <Check />}
                  </TableCell>
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
            onClick={handleOpenCarDialog}
            variant="contained"
            color="primary"
            startIcon={<Add></Add>}
          >
            Add new car
          </Button>
        </Box>
        <CreateModifyCarDialog
          open={carDialogOpen}
          onClose={handleCloseCarDialog}
          inputCar={editingCar}
        />
      </Box>
    </>
  );
}

export default Cars;
