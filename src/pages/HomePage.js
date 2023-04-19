import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import "./HomePage.css";
import PaymentTransactions from "../PaymentTransactions";
import { Link } from "react-router-dom";
import { getData } from "../store/data";

const HomePage = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState("asc");
  const [data, setData] = useState([]);
  useEffect(() => {
    const paymentTransactions = new PaymentTransactions();
    const transactions = paymentTransactions.getTransactions();
    dispatch(getData(transactions));
    setData(transactions);
  }, []);
   const handleSort = (col) => {
    if (order === "asc") {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder("desc");
    }
    if (order === "desc") {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder("asc");
    }
  }; 
  const errorClassMap = {
    "Module::SystemError": "System",
    "Module::RemoteError": "Remote",
    "Module::ConfigurationError": "Unknown",
  };
  
  return (
    <table className="table">
      <thead>
        <tr className="headRow">
          <th>ID</th>
          <th onClick={() => handleSort("status")}>Status</th>
          <th onClick={() => handleSort("status")}>Status</th>
          <th onClick={() => handleSort("status")}>Status</th>
          <th onClick={() => handleSort("status")}>Status</th>
          <th onClick={() => handleSort("created_at")}>Created At</th>
          <th onClick={() => handleSort("merchant_name")}>Merchant Name</th>
          <th onClick={() => handleSort("type")}>Type</th>
          <th onClick={() => handleSort("error_class")}>Error Class</th>
          <th onClick={() => handleSort("card_holder")}>Card Holder</th>
          <th onClick={() => handleSort("card_number")}>Card Number</th>
          <th onClick={() => handleSort("amount")}>Amount</th>
        </tr>
      </thead>
      <tbody>
        {data.map((transaction) => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.status}</td>
            <td>
              <Link to={`/transaction/${transaction.id}`}>
                {new Date(transaction.created_at)
                  .toLocaleString("en-GB", {
                    year: "2-digit",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                  .replace(",", "")
                  .replace(/\//g, "-")}
              </Link>
            </td>
            <td>{transaction.merchant_name}</td>
            <td>{transaction.type.replace("Transaction", "")}</td>
            <td>{errorClassMap[transaction.error_class]}</td>
            <td>{transaction.card_holder}</td>
            <td>{transaction.card_number}</td>
            <td>
              {parseFloat(transaction.amount / 100).toFixed(2)}{" "}
              {transaction.currency}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default HomePage;
