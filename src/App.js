import React from "react";
import './App.css';
const App = () => {
  return (
    <table className="table">
      <thead>
      <tr className="headRow">
        <th>id</th>
        <th>status</th>
        <th>created_at</th>
        <th>merchant_name</th>
        <th>type</th>
        <th>error_class</th>
        <th>card_holder</th>
        <th>card_number</th>
        <th>amount</th>
      </tr>
      </thead>
    </table>
  );
};

export default App;
