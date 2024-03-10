import React, { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

interface Customer {
  firstName: string;
  lastName: string;
  testValue: string;
}

function App() {
  const [count, setCount] = useState(0);
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/customer/getAllCustomers")
      .then((response) => response.json())
      .then((data: Customer[]) => setCustomers(data)) // Type assertion here
      .catch((error) =>
        console.error("There was an error fetching the customer data:", error)
      );
  }, []);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount(count + 1)}>count is {count}</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
        <div>
          <h2>Customers</h2>
          <ul>
            {customers.map((customer, index) => (
              <li key={index}>
                {customer.firstName} {customer.lastName} - {customer.testValue}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
