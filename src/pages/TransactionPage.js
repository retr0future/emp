import React from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const TransactionPage = () => {
  const { id } = useParams();
  const { data } = useSelector((state) => state.data);
  const transaction = data.find((tr) => tr.id === Number(id));
  return (
    <>
      <h1>Transaction details for transaction {id}</h1>
      <p>
        Go to <Link to="/">Home</Link>.
      </p>
      <table className="table">
        <thead>
          <tr className="headRow">
            <th>ID</th>
            <th>Status</th>
            <th>Created at</th>
            <th>Merchant Name</th>
            <th>Terminal Name</th>
            <th>Type</th>
            <th>Error Class</th>
            <th>Error Message</th>
            <th>Card Holder</th>
            <th>Card Number</th>
            <th>Amount</th>
            <th>Currency</th>
            <th>Unique id</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{transaction.id}</td>
            <td>{transaction.status}</td>
            <td>{transaction.created_at}</td>
            <td>{transaction.merchant_name}</td>
            <td>{transaction.terminal_name}</td>
            <td>{transaction.type}</td>
            <td>{transaction.error_class}</td>
            <td>{transaction.error_message}</td>
            <td>{transaction.card_holder}</td>
            <td>{transaction.card_number}</td>
            <td>{transaction.amount}</td>
            <td>{transaction.currency}</td>
            <td>{transaction.unique_id}</td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default TransactionPage;
