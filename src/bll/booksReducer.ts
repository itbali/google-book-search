import {booksAPI, BookType, GetBooksQueryParams, OrderByTypes, SubjectTypes} from "../api/booksApi";
import {AppStateType, AppThunkType} from "./store";

//consts
const SET_BOOKS = "SET_BOOKS"
const SET_FIRST_SEARCH = "SET_FIRST_SEARCH"
const SET_TITLE = "SET_TITLE"
const SET_ERROR = "SET_ERROR"
const SET_TOTAL_ITEMS = "SET_TOTAL_ITEMS"
const SET_SUBJECT = "SET_SUBJECT"
const SET_ORDER_BY = "SET_ORDER_BY"
const SET_LOADING = "SET_LOADING"
const SET_LOAD_MORE = "SET_LOAD_MORE"
const SET_START_INDEX_ZERO = "SET_START_INDEX_ZERO"

//types
type InitStateType = {
  isLoading: boolean,
  isFirstSearch: boolean,
  kind: string,
  totalItems: number,
  error: string,
  searchParams: GetBooksQueryParams
  books: Array<BookType>
}
export type BooksActionsType =
  ReturnType<typeof setBooks> |
  ReturnType<typeof setQueryTitle> |
  ReturnType<typeof setError> |
  ReturnType<typeof setQuerySubject> |
  ReturnType<typeof setQueryOrderBy> |
  ReturnType<typeof setTotalItems> |
  ReturnType<typeof setLoadMore> |
  ReturnType<typeof setStartIndexToZero> |
  ReturnType<typeof setIsFirstSearch> |
  ReturnType<typeof setIsLoading>

//initState
const initialState: InitStateType = {
  isLoading: false,
  isFirstSearch: true,
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

//reducer
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
    case "SET_FIRST_SEARCH":
      return {...state, isFirstSearch: action.isFirstSearch}
    case "SET_START_INDEX_ZERO":
      return {...state, searchParams: {...state.searchParams, startIndex: 0}}
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

//actions
export const setBooks = (books: Array<BookType>) => {
  return {type: SET_BOOKS, books} as const
}
export const setQueryTitle = (title: string) => {
  return {type: SET_TITLE, title} as const
}
export const setQuerySubject = (subject: SubjectTypes) => {
  return {type: SET_SUBJECT, subject} as const
}
export const setQueryOrderBy = (orderBy: OrderByTypes) => {
  return {type: SET_ORDER_BY, orderBy} as const
}
export const setIsLoading = (isLoading: boolean) => {
  return {type: SET_LOADING, isLoading} as const
}
export const setIsFirstSearch = (isFirstSearch: boolean) => {
  return {type: SET_FIRST_SEARCH, isFirstSearch} as const
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
export const setStartIndexToZero = () => {
  return {type: SET_START_INDEX_ZERO,} as const
}


//thunks
export const getBooks = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
  dispatch(setStartIndexToZero())
  setError('')
  // setBooks([])
  const {q, orderBy, maxResults, subject, startIndex} = getState().books.searchParams
  const queryParams: GetBooksQueryParams = {
    q: subject === "all" ? q : `${q}+subject:${subject}`,
    orderBy,
    maxResults,
    startIndex
  }
  dispatch(setIsLoading(true));
  booksAPI.getBooks(queryParams)
    .then(data => {
      dispatch(setBooks(data.items));
      dispatch(setTotalItems(data.totalItems));
    })
    .catch(err => {
      dispatch(setError(err.message ? "Some error has acquired" : err.response.data.error.message));
      setTimeout(() => setError(''), 10000)
    })
    .finally(() => {
      dispatch(setIsLoading(false));
      dispatch(setIsFirstSearch(false));
    });
}

export const loadMore = (): AppThunkType => (dispatch, getState: () => AppStateType) => {
  dispatch(setLoadMore())
  const {q, orderBy, maxResults, subject, startIndex} = getState().books.searchParams
  const currentBooks = getState().books.books
  const totalItems = getState().books.totalItems
  const queryParams: GetBooksQueryParams = {
    q: subject === "all" ? q : `${q}+subject:${subject}`,
    orderBy,
    maxResults: (totalItems - maxResults!) >= 30 ? 30 : (totalItems - maxResults!),
    startIndex,
  }
  dispatch(setIsLoading(true));
  booksAPI.getBooks(queryParams)
    .then(data => {
      dispatch(setBooks([...currentBooks, ...data.items]));
    })
    .catch(err => {
      dispatch(setError(err.message ? "Some error has acquired" : err.response.data.error.message));
      setTimeout(() => setError(''), 10000)
    })
    .finally(() => {
      dispatch(setIsLoading(false));
    });
}
