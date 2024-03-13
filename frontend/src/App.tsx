import MenuBar from "./components/MenuBar";
import "./App.css";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Cars from "./components/Cars";
import Customers from "./components/Customers";
import Rentals from "./components/Rentals";
import { CssBaseline } from "@mui/material";
import RentalHistory from "./components/RentalHistory";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#006400", // Dark Green color
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <Router>
            <MenuBar></MenuBar>
            <Routes>
              <Route path="/" element={<Navigate replace to="/cars" />} />
              <Route path="/cars" element={<Cars />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/rentals" element={<Rentals />} />
              <Route path="/rentalHistory" element={<RentalHistory />} />
            </Routes>
          </Router>
        </CssBaseline>
      </ThemeProvider>
    </>
  );
}

export default App;
