import React, {ChangeEvent, useEffect, useState} from 'react';
import {SelectOrderBy} from "../uiUtils/SelectOrderBy/SelectOrderBy";
import {SelectCategories} from "../uiUtils/SelectCategories/SelectCategories";
import {useAppSelector} from "../../bll/store";
import {getBooks, setError, setQueryOrderBy, setQuerySubject, setQueryTitle} from "../../bll/booksReducer";
import {OrderByTypes, SubjectTypes} from "../../api/booksApi";
import {useDispatch} from "react-redux";
import s from "./Header.module.scss"

export const Header = () => {

  //get state params
  const dispatch = useDispatch()
  const isLoading = useAppSelector<boolean>(state => state.books.isLoading)
  const error = useAppSelector<string>(state => state.books.error)
  const totalBooks = useAppSelector<number>(state => state.books.totalItems)

  //set local state
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState<SubjectTypes>('all')
  const [orderBy, setOrderBy] = useState<OrderByTypes>('relevance')

  //clean error in 10 sec if it occurred
  useEffect(() => {
    (setTimeout(() =>
        dispatch(setError('')), 10000)
    )
  }, [dispatch, error])
  //callback functions
  const onSubjectSelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    let selectedSubject = e.target.value as SubjectTypes
    setSubject(selectedSubject)
  };
  const onOrderBySelectChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    let selectedOrderBy = e.target.value as OrderByTypes
    setOrderBy(selectedOrderBy)
  }
  const onSearchClickHandler = () => {
    dispatch(setQueryTitle(title));
    dispatch(setQuerySubject(subject))
    dispatch(setQueryOrderBy(orderBy))
    dispatch<any>(getBooks())
    setTitle('')
  }
  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.subHeader}>Google books search api</div>
        <form className={s.search} onSubmit={onSearchClickHandler}>
          <input
            style={s}
            disabled={isLoading}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={"Enter title"}/>
          <button disabled={isLoading} onClick={onSearchClickHandler}>🔍</button>
        </form>
        {error && <div className={s.error}>{error}</div>}
        <div className={s.categories}>
          <SelectCategories subject={subject} callback={onSubjectSelectChangeHandler}/>
          <SelectOrderBy orderBy={orderBy} callback={onOrderBySelectChangeHandler}/>
          <span className={s.totalFound}>{Boolean(totalBooks) && <>Total books: {totalBooks}</>}</span>
        </div>
      </div>
    </div>
  );
};
