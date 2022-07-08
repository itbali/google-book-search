import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {SelectOrderBy} from "../uiUtils/SelectOrderBy/SelectOrderBy";
import {SelectCategories} from "../uiUtils/SelectCategories/SelectCategories";
import {useAppSelector} from "../../bll/store";
import {getBooks, setError, setQueryOrderBy, setQuerySubject, setQueryTitle} from "../../bll/booksReducer";
import {key, OrderByTypes, SubjectTypes} from "../../api/booksApi";
import {useDispatch} from "react-redux";
import s from "./Header.module.scss"
import {useNavigate, useSearchParams} from "react-router-dom";

const timeBeforeErrorDisappear = 10000

export const Header = () => {

  //get hooks
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams();

  //get store
  const isLoading = useAppSelector<boolean>(state => state.books.isLoading)
  const error = useAppSelector<string>(state => state.books.error)
  const totalBooks = useAppSelector<number>(state => state.books.totalItems)
  const qFromStateParams = useAppSelector<string>(state => state.books.searchParams.q as string)
  const subjectFromStateParams = useAppSelector<string>(state => state.books.searchParams.subject as string)
  const orderByFromStateParams = useAppSelector<string>(state => state.books.searchParams.orderBy as string)
  const maxResultsFromStateParams = useAppSelector<string>(state => state.books.searchParams.maxResults!.toString() as string)
  const startIndexFromStateParams = useAppSelector<string>(state => state.books.searchParams.startIndex!.toString() as string)



  // @ts-ignore
  useEffect(() => {
    // read the params on component load and when any changes occur
    // @ts-ignore
    const currentParams = Object.fromEntries([...searchParams]);
    // get new values on change
    console.log('useEffect:', currentParams);
    // update the search params programmatically
    if (currentParams.q){
      dispatch(setQueryTitle(currentParams.q));
      dispatch(setQuerySubject('all'))
      dispatch(setQueryOrderBy(currentParams.orderBy || 'relevance'))

      dispatch<any>(getBooks())
    }
    // setSearchParams({
    //   q: subjectFromStateParams !== 'all'
    //     ? `${qFromParams}+${subjectFromStateParams}`
    //     : qFromParams,
    //   orderBy: orderByFromStateParams,
    //   startIndex: startIndexFromStateParams,
    //   maxResults: maxResultsFromStateParams,
    //   key: key,
    // });
  }, [qFromStateParams, subjectFromStateParams, orderByFromStateParams, startIndexFromStateParams, maxResultsFromStateParams]);


  //set local state
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState<SubjectTypes>('all')
  const [orderBy, setOrderBy] = useState<OrderByTypes>('relevance')

  //clean error in 10 sec if it left
  useEffect(() => {
    (setTimeout(() =>
        dispatch(setError('')), timeBeforeErrorDisappear)
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

  //main search logic
  const onSearchClickHandler = (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(setQueryTitle(title));
    dispatch(setQuerySubject(subject))
    dispatch(setQueryOrderBy(orderBy))

    const q = subject !== 'all'
      ? `${title}+${subject}`
      : title

    navigate({pathname:'/', search:`q=${q}&orderBy=${orderBy}&startIndex=${startIndexFromStateParams}&maxResults=${maxResultsFromStateParams}&key=AIzaSyB1G9yn8AfZrs6_yQ-Xdng4d007jB2rfMM`})

    // setSearchParams({
    //   q: subjectFromStateParams !== 'all'
    //     ? `${qFromStateParams}+${subjectFromStateParams}`
    //     : qFromStateParams,
    //   orderBy: orderByFromStateParams,
    //   startIndex: startIndexFromStateParams,
    //   maxResults: maxResultsFromStateParams,
    //   key: key,
    // });

    // dispatch<any>(getBooks())
  }

  return (
    <div className={s.header}>
      <div className={s.container}>
        <div className={s.subHeader}>Google books search api</div>
        <form className={s.search} onSubmit={(e)=>onSearchClickHandler(e)}>
          <input
            style={s}
            disabled={isLoading}
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder={"Enter title"}/>
          <button disabled={isLoading}>🔍</button>
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
