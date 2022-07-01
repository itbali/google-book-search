import {booksAPI, BookType, GetBooksQueryParams, OrderByTypes, SubjectTypes} from "../api/booksApi";
import {AppStateType, AppThunkType} from "./store";

const SET_BOOKS = "SET_BOOKS"
const SET_TITLE = "SET_TITLE"
const SET_ERROR = "SET_ERROR"
const SET_TOTAL_ITEMS = "SET_TOTAL_ITEMS"
const SET_SUBJECT = "SET_SUBJECT"
const SET_ORDER_BY = "SET_ORDER_BY"
const SET_LOADING = "SET_LOADING"
const SET_LOAD_MORE = "SET_LOAD_MORE"

type InitStateType = {
  isLoading: boolean,
  "kind": string,
  "totalItems": number,
  error: string,
  searchParams: GetBooksQueryParams
  "books": Array<BookType>
}
export type BooksActionsType =
  ReturnType<typeof setBooks> |
  ReturnType<typeof setQueryTitle> |
  ReturnType<typeof setError> |
  ReturnType<typeof setQuerySubject> |
  ReturnType<typeof setOrderBy> |
  ReturnType<typeof setTotalItems> |
  ReturnType<typeof setLoadMore> |
  ReturnType<typeof setIsLoading>

const initialState: InitStateType = {
  isLoading: false,
  kind: '',
  error: '',
  totalItems: 0,
  searchParams: {
    startIndex: 0,
    q: '',
    maxResults: 30,
    subject: "all",
    orderBy: "relevance",
  },
  books: []
}

export const booksReducer = (state: InitStateType = initialState, action: BooksActionsType) => {
  switch (action.type) {
    case "SET_BOOKS":
      return {...state, books: action.books}
    case "SET_TITLE":
      return {...state, searchParams: {...state.searchParams, q: action.title}}
    case "SET_ERROR":
      return {...state, error: action.error}
    case "SET_TOTAL_ITEMS":
      return {...state, totalItems: action.totalItems}
    case "SET_SUBJECT":
      return {...state, searchParams: {...state.searchParams, subject: action.subject}}
    case "SET_ORDER_BY":
      return {...state, searchParams: {...state.searchParams, orderBy: action.orderBy}}
    case "SET_LOADING":
      return {...state, isLoading: action.isLoading}
    case "SET_LOAD_MORE":
      return {
        ...state,
        searchParams: {
          ...state.searchParams,
          startIndex: state.searchParams.startIndex ? (state.searchParams.startIndex + 30) : 30
        }
      }
    default:
      return state
  }
}

export const setBooks = (books: Array<BookType>) => {
  return {type: SET_BOOKS, books} as const
}
export const setQueryTitle = (title: string) => {
  return {type: SET_TITLE, title} as const
}
export const setQuerySubject = (subject: SubjectTypes) => {
  return {type: SET_SUBJECT, subject} as const
}
export const setOrderBy = (orderBy: OrderByTypes) => {
  return {type: SET_ORDER_BY, orderBy} as const
}
export const setIsLoading = (isLoading: boolean) => {
  return {type: SET_LOADING, isLoading} as const
}
export const setTotalItems = (totalItems: number) => {
  return {type: SET_TOTAL_ITEMS, totalItems} as const
}
export const setError = (error: string) => {
  return {type: SET_ERROR, error} as const
}
export const setLoadMore = () => {
  return {type: SET_LOAD_MORE,} as const
}

export const getBooks = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
  const {q, orderBy, maxResults, subject} = getState().books.searchParams
  const queryParams: GetBooksQueryParams = {
    q: subject === "all" ? q : `${q}+subject:${subject}`,
    orderBy,
    maxResults,
    startIndex: 0
  }
  console.log(queryParams)
  dispatch(setIsLoading(true));
  booksAPI.getBooks(queryParams)
    .then(data => {
      console.log(data)
      dispatch(setBooks(data.items));
      dispatch(setTotalItems(data.totalItems));
    })
    .catch(err => {
      dispatch(setError(err.message ? err.message : err.response.data.error.message));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
}

export const loadMore = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
  dispatch(setLoadMore())
  const {q, orderBy, maxResults, subject, startIndex} = getState().books.searchParams
  const currentBooks = getState().books.books
  const queryParams: GetBooksQueryParams = {
    q: subject === "all" ? q : `${q}+subject:${subject}`,
    orderBy,
    maxResults,
    startIndex,
  }
  console.log(queryParams)
  dispatch(setIsLoading(true));
  booksAPI.getBooks(queryParams)
    .then(data => {
      dispatch(setBooks([...currentBooks, ...data.items]));
    })
    .catch(err => {
      dispatch(setError(err.message ? err.message : err.response.data.error.message));
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
}
