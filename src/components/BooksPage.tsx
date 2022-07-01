import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from "../bll/store";
import {getBooks, loadMore, setQuerySubject, setQueryTitle} from "../bll/booksReducer";
import {useDispatch} from "react-redux";
import {BookType, SubjectTypes} from "../api/booksApi";

const noBookCover = "https://onlinebookclub.org/book-covers/no-cover.jpg"

export const BooksPage = () => {

  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState<SubjectTypes>('all')

  const dispatch = useDispatch()
  const error = useAppSelector<string>(state => state.books.error)
  const books = useAppSelector<BookType[]>(state => state.books.books)
  const totalBooks = useAppSelector<number>(state => state.books.totalItems)

  const onSearchClickHandler = () => {
    dispatch(setQueryTitle(title));
    dispatch(setQuerySubject(subject))
    dispatch<any>(getBooks())
  }
  const onLoadMoreClickHandler = () => {
    dispatch<any>(loadMore())
  }
  const onSubjectSelectChangeHandler = (subject: SubjectTypes) => {
    setSubject(subject)
  }
  return (
    <div>
      {totalBooks && (<h1>Total books {totalBooks}</h1>)}
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder={"Enter title"}/>
      <button onClick={onSearchClickHandler}>Get books</button>
      <button onClick={onLoadMoreClickHandler}>Load more</button>
      {error && <div>{error}</div>}
      <div>
        <select name="" id="" value={subject}
                onChange={(e) => onSubjectSelectChangeHandler(e.target.value as SubjectTypes)}>
          <option value="all">all</option>
          <option value="Biography">biography</option>
          <option value="Computers">computers</option>
          <option value="History">history</option>
          <option value="Medical"> medical</option>
          <option value="Poetry"> poetry</option>
        </select>
      </div>
      {
        books.length !== 0
          ? <div>{books.map(el => {
            return <div>
              <img src={
                el.volumeInfo.imageLinks?.smallThumbnail
                || noBookCover
              } alt=""/>
              <div>Title: {el.volumeInfo.title}</div>
              <div>Category: {el.volumeInfo.categories ? el.volumeInfo.categories[0] : "N/A"}</div>
              <pre>Authors: {el.volumeInfo.authors}</pre>
            </div>
          })}</div>
          :
          <div>No books found</div>
      }
    </div>
  );
};
