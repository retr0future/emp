import { render } from '@testing-library/react';
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App.js';

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
