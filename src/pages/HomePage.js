import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import './HomePage.css';
import PaymentTransactions from '../PaymentTransactions';
import { Link } from 'react-router-dom';
import { getData, setMappedData } from '../store/data';
import SearchArea from '../components/SearchArea';
import { transactionsMapper } from './mapper';

const HomePage = () => {
  const dispatch = useDispatch();
  const [order, setOrder] = useState('asc');
  const [data, setData] = useState([]);
  const initializeData = () => {
    const paymentTransactions = new PaymentTransactions();
    const transactions = paymentTransactions.getTransactions();
    const mappedTransactions = transactionsMapper(transactions);
    setData(mappedTransactions);
    dispatch(getData(transactions));
    dispatch(setMappedData(mappedTransactions));
  };
  useEffect(() => {
    initializeData();
  }, []);
  const handleSort = (col) => {
    if (order === 'asc') {
      const sorted = [...data].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setData(sorted);
      setOrder('desc');
    }
    if (order === 'desc') {
      const sorted = [...data].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setData(sorted);
      setOrder('asc');
    }
  };

  return (
    <>
      <SearchArea transactions={data} setTransactionsData={setData} resetData={initializeData} />
      <table className="table">
        <thead>
          <tr className="headRow">
            <th>ID</th>
            <th onClick={() => handleSort('status')}>Status</th>
            <th onClick={() => handleSort('created_at')}>Created At</th>
            <th onClick={() => handleSort('merchant_name')}>Merchant Name</th>
            <th onClick={() => handleSort('type')}>Type</th>
            <th onClick={() => handleSort('error_class')}>Error Class</th>
            <th onClick={() => handleSort('card_holder')}>Card Holder</th>
            <th onClick={() => handleSort('card_number')}>Card Number</th>
            <th onClick={() => handleSort('amount')}>Amount</th>
            <th onClick={() => handleSort('currency')}>Currency</th>
          </tr>
        </thead>
        <tbody>
          {data.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.status}</td>
              <td>
                <Link to={`/transaction/${transaction.id}`}>{transaction.created_at}</Link>
              </td>
              <td>{transaction.merchant_name}</td>
              <td>{transaction.type}</td>
              <td>{transaction.error_class}</td>
              <td>{transaction.card_holder}</td>
              <td>{transaction.card_number}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.currency}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default HomePage;
