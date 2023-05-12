import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { setActiveFilters, setColumns } from '../store/data';

const FilterTable = ({ handleReset, handleSearch }) => {
  const filters = useSelector(({ data }) => data.activeFilters);
  const columns = useSelector(({ data }) => data.filteredColumns);
  const dispatch = useDispatch();
  const handleRemoveFilter = (index) => {
    const newFilters = [...filters];
    newFilters.splice(index, 1);
    const updatedColumns = columns.map((column) => {
      if (column.columnName === filters[index].column) {
        return { ...column, show: true };
      }
      return column;
    });
    dispatch(setActiveFilters(newFilters));
    dispatch(setColumns(updatedColumns));
    handleSearch();
  };
  return (
    <div className="FilterBar">
      <table className="table">
        <thead>
          <tr className="headRow">
            <th>Filter By</th>
            <th>Match By</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {filters.map((filter, index) => (
            <tr key={index}>
              <td> {filter.column}</td>
              <td>{filter.matchBy}</td>
              <td>{filter.value}</td>
              <td>
                <button type="button" onClick={() => handleRemoveFilter(index)}>
                  Remove filter
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button type="button" onClick={handleReset}>
        Reset
      </button>
    </div>
  );
};
FilterTable.propTypes = {
  handleSearch: PropTypes.func,
  handleReset: PropTypes.func
};
export default FilterTable;
