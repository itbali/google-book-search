import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import {BookType} from "../../api/booksApi";
import {v1} from "uuid";
import s from "./BookDescription.module.scss"

const noBookCover = "https://onlinebookclub.org/book-covers/no-cover.jpg"
export const BookDescription = () => {

  const params = useParams()
  const navigate = useNavigate()
  const currentBook = useAppSelector<BookType>(state => state.books.books.find(el => el.id === params.id) as BookType)

  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className={s.container} onClick={goBack}>
      <div className={s.wrapper} onClick={(e) => {
        e.stopPropagation()
      }}>
        <div onClick={goBack} className={s.goBack}>go back</div>

        {currentBook
          ? <> <img src={currentBook.volumeInfo.imageLinks?.thumbnail || noBookCover} alt=""/>
            <h1>{currentBook.volumeInfo.title}</h1>
            {currentBook.volumeInfo.subtitle && <h2>{currentBook.volumeInfo.subtitle}</h2>}
            <p><strong>Authors: </strong>
              {currentBook.volumeInfo.authors
                ? currentBook.volumeInfo.authors.map(el => (<span key={v1()} className={s.countable}>{el}</span>))
                : <span> "N/A" </span>
              }.
            </p>
            <p><strong>Categories: </strong>
              {currentBook.volumeInfo.categories
                ? currentBook.volumeInfo.categories.map(el => (<span key={v1()} className={s.countable}>{el}</span>))
                : <span> "N/A" </span>
              }.
            </p>
            <p><strong>Description: </strong>{currentBook.volumeInfo.description || " N/A "}</p>
          </>
          :<h1>
            Some error has acquired, try to search again
          </h1>
        }
      </div>
    </div>
  );
};
