import React from "react";
import { Link, useParams } from "react-router-dom";

const TransactionPage = () => {
  const params = useParams();
  return <>
  <h1>Transaction details for transaction {params.id}</h1>
  <p>Go to <Link to="/">Home</Link>.</p></>
};

export default TransactionPage;
