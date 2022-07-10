import React, {useEffect} from 'react';
import {BookType} from "../../api/booksApi";
import {Book} from "../Book/Book";
import {useAppSelector} from "../../bll/store";
import s from "./Books.module.scss"
import {useDispatch} from "react-redux";
import {useNavigate, useSearchParams} from "react-router-dom";
import {setStartIndex} from "../../bll/booksReducer";

export const Books = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const totalItems = useAppSelector<number>(state => state.books.totalItems)
  const isFirstSearch = useAppSelector<boolean>(state => state.books.isFirstSearch)
  const books = useAppSelector<Array<BookType>>(state => state.books.books)
  const isLoading = useAppSelector<boolean>(state => state.books.isLoading)


  // change search params on load more click handler
  const onLoadMoreClickHandler = () => {
    // @ts-ignore
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchParams({
      q: currentParams.q,
      orderBy: currentParams.orderBy,
      startIndex: (Number(currentParams.startIndex) + 30).toString(),
      maxResults: currentParams.maxResults,
      key: "AIzaSyB1G9yn8AfZrs6_yQ-Xdng4d007jB2rfMM",
    }, {replace: true})
    // dispatch(setStartIndex(Number(currentParams.startIndex) + 30))
    // navigate({
    //   pathname: '/', search: `q=${currentParams.q}&orderBy=${currentParams.orderBy}&startIndex=${Number(currentParams.startIndex) + 30}&maxResults=${currentParams.maxResults}&key=AIzaSyB1G9yn8AfZrs6_yQ-Xdng4d007jB2rfMM`
    // })
  }

  if (isFirstSearch) {
    return (
      <div className={s.background}>
        <h1 className={s.container}>To search books type some text and press enter or just press search icon</h1>
      </div>
    )
  }

  return (
    <div className={s.background}>
      <div className={s.container}>
        {
          (totalItems !== 0)
            ?
            <div>
              <div className={s.books}>
                {books.map(el => {
                  return (
                    <Book key={el.id} book={el}/>
                  )
                })}
              </div>

              <div className={s.loadMore}>
                <button
                  disabled={isLoading}
                  onClick={onLoadMoreClickHandler}
                >
                  Load more
                </button>
              </div>
            </div>
            :
            (<div>No books found</div>)
        }
      </div>
    </div>
  );
}
