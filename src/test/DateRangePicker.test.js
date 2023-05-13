import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import DateRangePicker from '../components/DataRangePicker';

const mockStore = configureStore([]);

describe('DateRangePicker', () => {
  let store;
  let component;
  const handleSearch = jest.fn();

  beforeEach(() => {
    store = mockStore({
      data: {
        dateRange: { fromDate: '', toDate: '' }
      }
    });
    //store.dispatch({ type: 'data/setRange', payload: { fromDate: '', toDate: '' } });
    component = render(
      <Provider store={store}>
        <DateRangePicker handleSearch={handleSearch} />
      </Provider>
    );
  });
  afterEach(function () {
    store.clearActions();
  });
  test('renders "From" label', () => {
    const labelElement = screen.getByLabelText(/From:/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders "To" label', () => {
    const labelElement = screen.getByLabelText(/To:/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('renders "Apply" button', () => {
    const buttonElement = screen.getByRole('button', { name: /Apply/i });
    expect(buttonElement).toBeInTheDocument();
  });

  test('calls handleSearch when Apply button is clicked', () => {
    const buttonElement = screen.getByRole('button', { name: /Apply/i });
    fireEvent.click(buttonElement);
    expect(handleSearch).toHaveBeenCalledTimes(1);
  });

  test('dispatches setRange action when input is blurred', () => {
    render(
      <Provider store={store}>
        <DateRangePicker handleSearch={() => {}} />
      </Provider>
    );

    const fromDateInput = screen.getByLabelText('From:');

    fireEvent.change(fromDateInput, { target: { value: '2022-01-02T00:00' } });
    fireEvent.blur(fromDateInput);

    const actions = store.getActions();
    expect(actions).toEqual([
      {
        type: 'data/setRange',
        payload: { fromDate: '2022-01-02T00:00', toDate: '' }
      }
    ]);
  });
});
