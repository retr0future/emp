import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
import HomePage from './pages/HomePage';
import TransactionPage from './pages/TransactionPage';
import ErrorPage from './pages/Error';

const router = createBrowserRouter([
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  { path: '/transaction/:id', element: <TransactionPage />, errorElement: <ErrorPage /> }
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
