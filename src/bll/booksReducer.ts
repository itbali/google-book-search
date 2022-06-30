import {BookType, GetBooksQueryParams, OrderByTypes, SubjectTypes} from "../api/booksApi";

type InitStateType = {
  "kind": string,
  "totalItems": number,
  searchParams: GetBooksQueryParams
  "books": Array<BookType>
}
export type BooksActionsType = ReturnType<typeof setBooks>

const SET_BOOKS = "SET_BOOKS"
const SET_TITLE = "SET_TITLE"
const SET_SUBJECT = "SET_SUBJECT"
const SET_ORDER_BY = "SET_ORDER_BY"
const GET_BOOKS = "GET_BOOKS"
const LOAD_MORE = "LOAD_MORE"

const initialState:InitStateType = {
  kind:'',
  totalItems: 0,
  searchParams:{
    title: '',
    maxResults: 30,
    subject: "all",
    orderBy: "relevance",
  },
  books:[]
}

export const booksReducer = (state:InitStateType, action:BooksActionsType) =>{
 switch (action.type){
   case "SET_BOOKS":
     return
   default:
     return state
 }
}

export const setBooks = (books:Array<BookType>)=>{return {type:SET_BOOKS, books} as const}
export const setTitle = (title:string)=>{return {type:SET_TITLE, title} as const}
export const setSubject = (subject:SubjectTypes)=>{return {type:SET_SUBJECT, subject} as const}
export const setOrderBy = (orderBy:OrderByTypes)=>{return {type:SET_ORDER_BY, orderBy} as const}
