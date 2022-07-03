import React from 'react';
import './App.css';
import {BooksPage} from "./pages/BooksPage/BooksPage";
import {Route, Routes} from "react-router-dom";
import {BookDescription} from "./pages/BookDescription/BookDescription";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={"/"} element={<BooksPage/>}/>
        <Route path={"/:id"} element={<BookDescription/>}/>
      </Routes>

    </div>
  );
}

export default App;
