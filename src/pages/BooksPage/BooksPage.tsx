import React from 'react';
import {useAppSelector} from "../../bll/store";
import {Books} from "../../components/Books/Books";
import {Loader} from "../../components/uiUtils/Loader/Loader";
import {Header} from "../../components/Header/Header";

export const BooksPage = () => {

  //get state params
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
