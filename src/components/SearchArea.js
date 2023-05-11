import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './SearchArea.css';
import { filterArrayByDateRange, applyFilters } from './utils';

const SearchArea = ({ transactions, setTransactionsData, resetData }) => {
  const [filters, setFilters] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const [matchBy, setMatchBy] = useState('equal');
  const [value, setValue] = useState('');
  const [columns, setColumns] = useState(filteredColumns);
  const filteredColumns = useSelector(({ data }) => data.filteredColumns);
  const initialTransActionData = useSelector(({ data }) => data.mappedData);
  const fromDateRef = useRef(null);
  const toDateRef = useRef(null);
  const handleAddFilter = () => {
    if (!selectedColumn) return;
    if (filters.some((filter) => filter.column === selectedColumn)) return;
    setFilters([...filters, { column: selectedColumn, matchBy, value }]);
    setSelectedColumn('');
    setMatchBy('equal');
    setValue('');
    const updatedColumns = columns.map((column) => {
      if (column.columnName === selectedColumn) {
        return { ...column, show: false };
      }
      return column;
    });
    setColumns(updatedColumns);
  };
  const handleSelectColumn = (e) => {
    const selected = e.target.value;
    setSelectedColumn(selected);
  };
  const handleReset = () => {
    resetData();
    fromDateRef.current.value = '';
    toDateRef.current.value = '';
    setFilters([]);
  };
  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    const updatedColumns = columns.map((column) => {
      if (column.columnName === filters[index].column) {
        return { ...column, show: true };
      }
      return column;
    });
    setFilters(newFilters);
    setColumns(updatedColumns);
    handleSearch();
  };
  const handleSearch = () => {
    const fromDate = new Date(fromDateRef.current.value);
    const toDate = new Date(toDateRef.current.value);
    const filteredTransactions = filterArrayByDateRange(initialTransActionData, fromDate, toDate);
    const updatedTransactions = applyFilters(filteredTransactions, filters);
    setTransactionsData(updatedTransactions);
  };
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="SearchBar">
      <form>
        <label htmlFor="date-range">Date range:</label>
        <input
          type="datetime-local"
          id="date-range-from"
          name="date-range-from"
          ref={fromDateRef}
        />
        <input type="datetime-local" id="date-range-to" name="date-range-to" ref={toDateRef} />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </form>
      {/*      <DateRangePicker></DateRangePicker> */}
      <button type="button" onClick={handleSearch}>
        Search
      </button>
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
      <div className="SearchBar">
        <p>Selected Filters</p>
        {selectedColumn && (
          <div>
            {selectedColumn}
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
      </div>
      <div className="FilterBar">
        {filters.map((filter, index) => (
          <div key={index}>
            <span>
              {filter.column} {filter.matchBy} {filter.value}
            </span>
            <button type="button" onClick={() => handleRemoveFilter(index)}>
              Remove filter
            </button>
          </div>
        ))}
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default SearchArea;
