
import './App.css';



// import时如果引入的不是default组件，就加{}
// import { Component } from 'react';

import ExpenseListApp from './components/expense/ExpenseListApp';

function App() {
  return (
    <div className="App">
      <ExpenseListApp />
    </div>
  );
}


export default App;
