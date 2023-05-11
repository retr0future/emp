import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  filteredColumns: [
    { columnName: 'id', id: 1, show: true },
    { columnName: 'status', id: 2, show: true },
    { columnName: 'merchant_name', id: 3, show: true },
    { columnName: 'type', id: 4, show: true },
    { columnName: 'error_class', id: 5, show: true },
    { columnName: 'card_holder', id: 6, show: true },
    { columnName: 'card_number', id: 7, show: true },
    { columnName: 'amount', id: 8, show: true }
  ],
  mappedData: [],
  dateRange: { fromDate: '', toDate: '' }
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getData: (state, action) => {
      return { ...state, data: action.payload };
    },
    setRange: (state, action) => {
      return {
        ...state,
        dateRange: action.payload
      };
    },
    setMappedData: (state, action) => {
      return { ...state, mappedData: action.payload };
    }
  }
});

export const { getData, setRange, setMappedData } = dataSlice.actions;
export default dataSlice.reducer;
