import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import TransactionPage from "./pages/TransactionPage";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/transaction/:id", element: <TransactionPage /> },
]);

const App = () => {
  return <RouterProvider router={router}/>;
};

export default App;
