import React from 'react';
import './App.css';
import {BooksPage} from "./components/BooksPage";
import {Provider} from "react-redux";
import {store} from "./bll/store";

function App() {
  return (
    <div className="App">
      <BooksPage/>
    </div>
  );
}

export default App;
