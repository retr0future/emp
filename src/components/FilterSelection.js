import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilters, setSelectedColumn, setColumns } from '../store/data';

const FilterSelection = () => {
  const [matchBy, setMatchBy] = useState('equal');
  const [value, setValue] = useState('');
  const dispatch = useDispatch();
  const filters = useSelector(({ data }) => data.activeFilters);
  const selectedColumn = useSelector(({ data }) => data.selectedColumn);
  const columns = useSelector(({ data }) => data.filteredColumns);

  const handleAddFilter = () => {
    if (!selectedColumn) return;
    if (filters.some((filter) => filter.column === selectedColumn)) return;
    dispatch(setActiveFilters([...filters, { column: selectedColumn, matchBy, value }]));
    dispatch(setSelectedColumn(''));
    setMatchBy('equal');
    setValue('');
    const updatedColumns = columns.map((column) => {
      if (column.columnName === selectedColumn) {
        return { ...column, show: false };
      }
      return column;
    });
    dispatch(setColumns(updatedColumns));
  };

  const handleSelectColumn = (e) => {
    const selected = e.target.value;
    dispatch(setSelectedColumn(selected));
  };

  return (
    <>
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
    </>
  );
};
export default FilterSelection;
