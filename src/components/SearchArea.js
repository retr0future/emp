import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import './SearchArea.css';

const SearchArea = ({ transactions, setTransactionsData, resetData }) => {
  const [filters, setFilters] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const [matchBy, setMatchBy] = useState('equal');
  const [value, setValue] = useState('');
  const filteredColumns = useSelector(({ data }) => data.filteredColumns);
  const [results, setSearchResults] = useState([]);
  const [columns, setColumns] = useState(filteredColumns);
  const handleAddFilter = () => {
    if (!selectedColumn) return;
    if (filters.some((filter) => filter.column === selectedColumn)) return;
    setFilters([...filters, { column: selectedColumn, matchBy, value }]);
    setSelectedColumn('');
    setMatchBy('equal');
    setValue('');
  };
  const handleSelectColumn = (e) => {
    const selected = e.target.value;
    setSelectedColumn(selected);
    const updatedColumns = columns.map((column) => {
      if (column.columnName === selected) {
        return { ...column, show: false };
      }
      return column;
    });
    setColumns(updatedColumns);
  };
  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
    const updatedColumns = columns.map((column) => {
      if (column.columnName === filters[index].column) {
        return { ...column, show: true };
      }
      return column;
    });
    setColumns(updatedColumns);
  };
  const handleReset = () => {
    resetData();
    setFilters([]);
    setColumns(filteredColumns);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    let filteredTransactions = [...transactions];
    const fromDate = new Date(document.getElementById('date-range-from').value);
    const toDate =
      new Date(document.getElementById('date-range-to').value) === 'Invalid Date'
        ? new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)
        : new Date(document.getElementById('date-range-to').value);
    if (fromDate.toString() !== 'Invalid Date' && toDate.toString() !== 'Invalid Date') {
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.isoDate);
        return (
          transactionDate.getTime() >= fromDate.getTime() &&
          transactionDate.getTime() <= toDate.getTime()
        );
      });
    }

    filters.forEach((filter) => {
      const { column, matchBy, value } = filter;
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionValue = transaction[column].toString();
        switch (matchBy) {
          case 'equal':
            return transactionValue === value;
          case 'starts_with':
            return transactionValue.startsWith(value);
          case 'ends_with':
            return transactionValue.endsWith(value);
          case 'contains':
            return transactionValue.includes(value);
          default:
            return true;
        }
      });
    });
    setSearchResults(filteredTransactions);
    setTransactionsData(filteredTransactions);
  };

  return (
    <div className="SearchBar">
      <label htmlFor="date-range">Date range:</label>
      <input type="datetime-local" id="date-range-from" name="date-range-from" />
      <input type="datetime-local" id="date-range-to" name="date-range-to" />
      <br />
      <label htmlFor="filters">Filters:</label>
      <select id="filters" name="filters" value={selectedColumn} onChange={handleSelectColumn}>
        <option value="" disabled>
          Select a filter
        </option>
        {columns
          .filter((column) => column.show === true)
          .map((column) => (
            <option key={column.id} value={column.columnName}>
              {column.columnName}
            </option>
          ))}
      </select>
      {selectedColumn && (
        <div>
          <select value={matchBy} onChange={(e) => setMatchBy(e.target.value)}>
            <option value="equal">Equal</option>
            <option value="starts_with">Starts with</option>
            <option value="ends_with">Ends with</option>
            <option value="contains">Contains</option>
          </select>
          <label htmlFor="filter-value">Value:</label>
          <input
            type="text"
            id="filter-value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button type="button" onClick={handleAddFilter}>
            Add Filter
          </button>
        </div>
      )}
      <div className="FilterBar">
        {filters.map((filter, index) => (
          <div key={index}>
            <span>
              {filter.column} {filter.matchBy} "{filter.value}"
            </span>
            <button type="button" onClick={() => handleRemoveFilter(index)}>
              x
            </button>
          </div>
        ))}
        <button type="button" onClick={handleSearch}>
          Search
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchArea;
