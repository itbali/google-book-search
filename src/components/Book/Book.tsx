import React from 'react';
import {BookType} from "../../api/booksApi";
import s from "./Book.module.scss"
import {v1} from "uuid";
import {useNavigate} from "react-router-dom";

const noBookCover = "https://onlinebookclub.org/book-covers/no-cover.jpg"

type BookPropsType = {
  book: BookType
}

export const Book = ({book}: BookPropsType) => {

  const navigate = useNavigate()

  function openBookHandler() {
    navigate(`/${book.id}`)
  }

  return (
    <div onClick={openBookHandler} className={s.singeBook}>
      <img src={
        book.volumeInfo.imageLinks?.smallThumbnail
        || noBookCover
      } alt=""/>
      <h3>{book.volumeInfo.title}</h3>
      <p>
        <strong>Category:</strong> {book.volumeInfo.categories ? book.volumeInfo.categories[0] : "N/A"}
      </p>
      <p><b>Author:</b> {!!book.volumeInfo.authors
        ? <span key={v1()}>{book.volumeInfo.authors[0]}</span>
        : "N/A"}</p>
    </div>
  );
};
