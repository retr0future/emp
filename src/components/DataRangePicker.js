import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRange } from '../store/data';
import PropTypes from 'prop-types';

const DateRangePicker = ({ handleSearch }) => {
  const [dateRange, setDateRange] = useState({ fromDate: '', toDate: '' });
  const dispatch = useDispatch();
  const handleDateRangeChange = (e) => {
    const { name, value } = e.target;
    setDateRange((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleBlur = () => {
    dispatch(setRange(dateRange));
  };
  const dateObj = useSelector(({ data }) => data.dateRange);
  const { fromDate, toDate } = dateObj;
  return (
    <div>
      <form>
        <label htmlFor="date-range">Date range:</label>
        <label htmlFor="from-date">From:</label>
        <input
          type="datetime-local"
          id="from-date"
          name="fromDate"
          value={fromDate}
          onChange={handleDateRangeChange}
          onBlur={handleBlur}
        />
        <label htmlFor="to-date">To:</label>
        <input
          type="datetime-local"
          id="to-date"
          name="toDate"
          value={toDate}
          onChange={handleDateRangeChange}
          onBlur={handleBlur}
        />
        <button type="button" onClick={handleSearch}>
          Apply
        </button>
      </form>
    </div>
  );
};
DateRangePicker.propTypes = {
  handleSearch: PropTypes.func
};
export default DateRangePicker;
