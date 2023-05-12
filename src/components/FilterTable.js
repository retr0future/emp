import React from 'react';
import PropTypes from 'prop-types';

const FilterTable = ({ filters, handleRemoveFilter, handleReset }) => {
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
              <button type="button" onClick={() => handleRemoveFilter(index)}>
                Remove filter
              </button>
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
  filters: PropTypes.array,
  handleRemoveFilter: PropTypes.func,
  handleReset: PropTypes.func
};
export default FilterTable;
