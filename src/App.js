import React from "react";
import "./App.css";
import PaymentTransactions from "./PaymentTransactions.js";
const App = () => {
  const paymentTransactions = new PaymentTransactions();
  const transactions = paymentTransactions.getTransactions();
  const errorClassMap = {
    'Module::SystemError': 'System',
    'Module::RemoteError': 'Remote',
    'Module::ConfigurationError': 'Unknown'
  };
  return (
    <table className="table">
      <thead>
        <tr className="headRow">
          <th>ID</th>
          <th>Status</th>
          <th>Created At</th>
          <th>Merchant Name</th>
          <th>Type</th>
          <th>Error Class</th>
          <th>Card Holder</th>
          <th>Card Number</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {transactions.map(transaction => (
          <tr key={transaction.id}>
            <td>{transaction.id}</td>
            <td>{transaction.status}</td>
            <td>{new Date(transaction.created_at).toLocaleString('en-GB', { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }).replace(',', '').replace(/\//g, '-')}</td>
            <td>{transaction.merchant_name}</td>
            <td>{transaction.type.replace('Transaction', '')}</td>
            <td>{errorClassMap[transaction.error_class]}</td>
            <td>{transaction.card_holder}</td>
            <td>{transaction.card_number}</td>
            <td>{parseFloat(transaction.amount/100).toFixed(2)} {transaction.currency}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default App;
