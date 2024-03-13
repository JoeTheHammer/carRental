import { useEffect, useState } from "react";
import { Rental } from "../interfaces/Rental";
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
  Typography,
  Button,
} from "@mui/material";
import { Garage } from "@mui/icons-material";

function Rentals() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRentals = async () => {
    const response = await fetch(
      "http://localhost:8080/api/rental/getActiveRentals"
    );
    const data = await response.json();
    setRentals(data);
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter(
    (rental) =>
      rental.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.carInformation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rental.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCloseRental = (rental: Rental) => {
    if (
      window.confirm(
        `Are you sure you want to return the car and close the rental?`
      )
    ) {
      fetch(`http://localhost:8080/api/rental/closeRental/${rental.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete customer");
          }

          fetchRentals();
        })
        .catch((error) => {
          console.error("Error deleting customer:", error);
        });
    }
  };

  return (
    <>
      <Box sx={{ pr: 2, pl: 2, pt: 10, pb: 2, width: "100%" }}>
        <TextField
          label="Search Rentals"
          variant="outlined"
          fullWidth
          margin="normal"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>License Plate</b>
                </TableCell>
                <TableCell>
                  <b>Car Information</b>
                </TableCell>
                <TableCell>
                  <b>Customer Name</b>
                </TableCell>
                <TableCell>
                  <b>Start Date</b>
                </TableCell>
                <TableCell>
                  <b>End Date</b>
                </TableCell>
                <TableCell>
                  <b>Rented Kilometers</b>
                </TableCell>
                <TableCell>
                  <b>Billing Address</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRentals.map((rental) => (
                <TableRow key={rental.id}>
                  <TableCell>{rental.licensePlate}</TableCell>
                  <TableCell>{rental.carInformation}</TableCell>
                  <TableCell>{rental.customerName}</TableCell>
                  <TableCell>{rental.startDate.slice(0, 10)}</TableCell>
                  <TableCell>{rental.endDate.slice(0, 10)}</TableCell>
                  <TableCell>{rental.rentedKilometers}</TableCell>
                  <TableCell>{rental.billingAddress}</TableCell>
                  <TableCell align="left">
                    <Button
                      variant="outlined"
                      color="primary"
                      startIcon={<Garage />}
                      onClick={() => handleCloseRental(rental)}
                    >
                      Return Car
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="subtitle1" sx={{ pt: 2 }}>
          {rentals.length} cars are rented at the moment.
        </Typography>
      </Box>
    </>
  );
}

export default Rentals;
