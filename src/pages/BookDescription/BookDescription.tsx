import React, {useEffect} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useAppSelector} from "../../bll/store";
import {SingleBookResponseDataType} from "../../api/booksApi";
import {v1} from "uuid";
import s from "./BookDescription.module.scss"
import {useDispatch} from "react-redux";
import {getBookDescription, resetBookDescription} from "../../bll/bookDescriptionReducer";

const noBookCover = "https://onlinebookclub.org/book-covers/no-cover.jpg"
export const BookDescription = () => {

  //get hooks and state data
  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const currentBook = useAppSelector<SingleBookResponseDataType>(state => state.bookDescription)

  //getServData
  useEffect(()=>{
    dispatch<any>(getBookDescription(params.id as string))
    return ()=>{
      dispatch(resetBookDescription())
    }
  },[dispatch,params.id])

  const goBack = () => {
    navigate(-1)
  }
  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div onClick={goBack} className={s.goBack}>go back</div>

        {currentBook
          ? <> <img src={currentBook.volumeInfo.imageLinks?.thumbnail || noBookCover} alt=""/>
            <h1>{currentBook.volumeInfo.title}</h1>
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
