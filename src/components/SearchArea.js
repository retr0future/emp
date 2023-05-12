import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './SearchArea.css';
import { filterArrayByDateRange, applyFilters } from './utils';
import FilterTable from './FilterTable';
import DateRangePicker from './DataRangePicker';
import { setRange, setActiveFilters, resetColumns } from '../store/data';
import PropTypes from 'prop-types';
import FilterSelection from './FilterSelection';

const SearchArea = ({ setTransactionsData, resetData }) => {
  const filteredColumns = useSelector(({ data }) => data.filteredColumns);

  const dispatch = useDispatch();
  const initialTransActionData = useSelector(({ data }) => data.mappedData);
  const filters = useSelector(({ data }) => data.activeFilters);
  const dateObj = useSelector(({ data }) => data.dateRange);

  const handleReset = () => {
    resetData();
    dispatch(setActiveFilters([]));
    dispatch(resetColumns(filteredColumns));
    dispatch(setRange({ fromDate: '', toDate: '' }));
  };

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
      <FilterSelection />
      <FilterTable handleSearch={handleSearch} handleReset={handleReset} filters={filters} />
    </div>
  );
};
SearchArea.propTypes = {
  setTransactionsData: PropTypes.func,
  resetData: PropTypes.func
};
export default SearchArea;
