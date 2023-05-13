import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.js';
import TransactionPage from '../pages/TransactionPage.js';
import store from '../store/index.js';

global.Request = jest.fn(() => ({}));

describe('App', () => {
  test('renders home page by default', () => {
    const router = createBrowserRouter([
      { path: '/', element: <div>Home Page</div> },
      { path: '/transaction/:id', element: <div>Transaction Page</div> }
    ]);
    const { getByText } = render(
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    );
    expect(getByText('Home Page')).toBeInTheDocument();
  });
});
