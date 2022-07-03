import React from 'react';
import {useAppSelector} from "../../bll/store";
import {loadMore} from "../../bll/booksReducer";
import {useDispatch} from "react-redux";
import {BookType} from "../../api/booksApi";
import {Books} from "../../components/Books/Books";
import {Loader} from "../../components/uiUtils/Loader/Loader";
import {Header} from "../../components/Header/Header";

export const BooksPage = () => {

  //get state params
  const dispatch = useDispatch()
  const isLoading = useAppSelector<boolean>(state => state.books.isLoading)

  //jsx
  return (
    <div>
      {isLoading && <Loader/>}
      <Header/>
      <Books/>
    </div>
  );
};
