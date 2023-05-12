import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchArea.css';
import { filterArrayByDateRange, applyFilters } from './utils';
import FilterTable from './FilterTable';
import DateRangePicker from './DataRangePicker';
import { setRange } from '../store/data';
import PropTypes from 'prop-types';

const SearchArea = ({ transactions, setTransactionsData, resetData }) => {
  const [filters, setFilters] = useState([]);
  const [selectedColumn, setSelectedColumn] = useState();
  const [matchBy, setMatchBy] = useState('equal');
  const [value, setValue] = useState('');
  const filteredColumns = useSelector(({ data }) => data.filteredColumns);
  const [columns, setColumns] = useState(filteredColumns);
  const dispatch = useDispatch();
  const initialTransActionData = useSelector(({ data }) => data.mappedData);
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
    setFilters([]);
    setColumns(filteredColumns);
    dispatch(setRange({ fromDate: '', toDate: '' }));
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
  const dateObj = useSelector(({ data }) => data.dateRange);
  const handleSearch = () => {
    const { fromDate, toDate } = dateObj;
    const filteredTransactions = filterArrayByDateRange(initialTransActionData, fromDate, toDate);
    const updatedTransactions = applyFilters(filteredTransactions, filters);
    setTransactionsData(updatedTransactions);
  };
  useEffect(() => {
    handleSearch();
  }, [filters]);

  return (
    <div className="SearchBar">
      <DateRangePicker handleSearch={handleSearch} />
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
            <span className="SearchBarText">{selectedColumn}</span>
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
      <FilterTable
        handleRemoveFilter={handleRemoveFilter}
        handleReset={handleReset}
        filters={filters}
      />
    </div>
  );
};
SearchArea.propTypes = {
  transactions: PropTypes.array,
  setTransactionsData: PropTypes.func,
  resetData: PropTypes.func
};
export default SearchArea;
