import React from 'react';
import Table from './components/Table';
import {columnsExample, datasExample} from './dataForExemple'

function App() {
  return (
    <div className="App">
      <Table data={datasExample} columns={columnsExample} />
    </div>
  );
}

export default App;
