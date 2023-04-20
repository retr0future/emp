import React, { useState } from "react";

const SearchArea = ({
  columns,
  transactions,
  setTransactionsData,
  resetData,
}) => {
  const [filters, setFilters] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const [matchBy, setMatchBy] = useState("equal");
  const [value, setValue] = useState("");
  const [results, setSearchResults] = useState([]);

  const handleAddFilter = () => {
    if (!selectedColumn) return;
    if (filters.some((filter) => filter.column === selectedColumn)) return;
    setFilters([...filters, { column: selectedColumn, matchBy, value }]);
    setSelectedColumn(null);
    setMatchBy("equal");
    setValue("");
  };

  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    setFilters(newFilters);
  };
  const handleReset = () => {
    resetData();
    setFilters([]);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    let filteredTransactions = [...transactions];
    const fromDate = new Date(document.getElementById("date-range-from").value);
    const toDate = new Date(document.getElementById("date-range-to").value);
    filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.isoDate);
      return (
        transactionDate.getTime() >= fromDate.getTime() &&
        transactionDate.getTime() <= toDate.getTime()
      );
    });
    filters.forEach((filter) => {
      const { column, matchBy, value } = filter;
      filteredTransactions = filteredTransactions.filter((transaction) => {
        const transactionValue = transaction[column].toString();
        switch (matchBy) {
          case "equal":
            return transactionValue === value;
          case "starts_with":
            return transactionValue.startsWith(value);
          case "ends_with":
            return transactionValue.endsWith(value);
          case "contains":
            return transactionValue.includes(value);
          default:
            return true;
        }
      });
    });

    setSearchResults(filteredTransactions);
    setTransactionsData(filteredTransactions);
  };
  console.log(results);
  return (
    <div>
      <label htmlFor="date-range">Date range:</label>
      <input
        type="datetime-local"
        id="date-range-from"
        name="date-range-from"
      />
      <input type="datetime-local" id="date-range-to" name="date-range-to" />
      <br />
      <label htmlFor="filters">Filters:</label>
      <select
        id="filters"
        name="filters"
        value={selectedColumn}
        onChange={(e) => setSelectedColumn(e.target.value)}
      >
        <option value="" disabled>
          Select a filter
        </option>
        {columns
          .filter((column) => column !== "created_at")
          .map((column) => (
            <option key={column} value={column}>
              {column}
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
      <div>
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
      </div>
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};

export default SearchArea;
