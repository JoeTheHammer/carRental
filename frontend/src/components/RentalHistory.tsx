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
} from "@mui/material";

function RentalHistory() {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRentals = async () => {
    const response = await fetch(
      "http://localhost:8080/api/rental/getRentalHistory"
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography variant="subtitle1" sx={{ pt: 2 }}>
          {rentals.length} closed rentals are in the system.
        </Typography>
      </Box>
    </>
  );
}

export default RentalHistory;
