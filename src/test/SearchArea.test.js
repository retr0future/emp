import React from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import SearchArea from '../components/SearchArea';
import { filterArrayByDateRange, applyFilters } from '../components/utils';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn()
}));

describe('SearchArea component', () => {
  let mockFilteredColumns,
    mockInitialTransActionData,
    mockFilters,
    mockDateObj,
    mockSetTransactionsData,
    mockResetData;
  beforeEach(() => {
    mockFilteredColumns = ['column1', 'column2'];
    mockInitialTransActionData = [
      { id: 1, date: '2022-01-01', amount: 100 },
      { id: 2, date: '2022-01-02', amount: 200 }
    ];
    mockFilters = [{ column: 'date', matchBy: 'eq', value: '2022-01-01' }];
    mockDateObj = { fromDate: '2022-01-01', toDate: '2022-01-01' };
    mockSetTransactionsData = jest.fn();
    mockResetData = jest.fn();

    useSelector.mockImplementation((selector) =>
      selector({
        data: {
          filteredColumns: mockFilteredColumns,
          mappedData: mockInitialTransActionData,
          activeFilters: mockFilters,
          dateRange: mockDateObj
        }
      })
    );

    useDispatch.mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    render(<SearchArea setTransactionsData={mockSetTransactionsData} resetData={mockResetData} />);
  });

  it('calls handleSearch when filters change', () => {
    const { rerender } = render(
      <SearchArea setTransactionsData={mockSetTransactionsData} resetData={mockResetData} />
    );
    expect(mockSetTransactionsData).toHaveBeenCalledWith(
      applyFilters(
        filterArrayByDateRange(
          mockInitialTransActionData,
          mockDateObj.fromDate,
          mockDateObj.toDate
        ),
        mockFilters
      )
    );
    const newFilters = [{ column: 'status', matchbB: 'equals', value: 'error' }];
    mockFilters = newFilters;
    rerender(
      <SearchArea setTransactionsData={mockSetTransactionsData} resetData={mockResetData} />
    );
    expect(mockSetTransactionsData).toHaveBeenCalledWith(
      applyFilters(
        filterArrayByDateRange(
          mockInitialTransActionData,
          mockDateObj.fromDate,
          mockDateObj.toDate
        ),
        newFilters
      )
    );
  });
});
