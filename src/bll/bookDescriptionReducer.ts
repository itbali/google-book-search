import {booksAPI, SingleBookResponseDataType} from "../api/booksApi";
import {AppThunkType} from "./store";
import {setError, setIsLoading} from "./booksReducer";

//consts
const SET_BOOK_DESCRIPTION = "SET_BOOK_DESCRIPTION"
const RESET_BOOK_DESCRIPTION = "RESET_BOOK_DESCRIPTION"

//types
export type BookDescriptionActionsTypes =
  |ReturnType<typeof setBookDescription>
|ReturnType<typeof resetBookDescription>

//init state
const initialState: SingleBookResponseDataType = {
  kind: "",
  id: "",
  etag: "",
  selfLink: "",
  volumeInfo: {
    title: "",
    authors: [
      ""
    ],
    publisher: "",
    publishedDate: "",
    description: "",
    industryIdentifiers: [
      {
        type: "",
        identifier: ""
      },
      {
        type: "",
        identifier: ""
      }
    ],
    readingModes: {
      text: true,
      image: true
    },
    pageCount: 0,
    printedPageCount: 0,
    printType: "",
    categories: [
      ""
    ],
    maturityRating: "",
    allowAnonLogging: false,
    contentVersion: "",
    panelizationSummary: {
      containsEpubBubbles: false,
      containsImageBubbles: false
    },
    imageLinks: {
      smallThumbnail: "",
      thumbnail: "",
      small: "",
      medium: "",
      large: "",
      extraLarge: ""
    },
    language: "",
    previewLink: "",
    infoLink: "",
    canonicalVolumeLink: ""
  },
  layerInfo: {
    layers: [
      {
        layerId: "",
        volumeAnnotationsVersion: ""
      }
    ]
  },
  saleInfo: {
    country: "",
    saleability: "",
    isEbook: false
  },
  accessInfo: {
    country: "",
    viewability: "",
    embeddable: true,
    publicDomain: false,
    textToSpeechPermission: "",
    epub: {
      isAvailable: true,
      acsTokenLink: ""
    },
    pdf: {
      isAvailable: true,
      acsTokenLink: ""
    },
    webReaderLink: "",
    accessViewStatus: "",
    quoteSharingAllowed: false
  }
}

//reducers
export const bookDescriptionReducer=(state:SingleBookResponseDataType = initialState, action:BookDescriptionActionsTypes):SingleBookResponseDataType =>{
  switch (action.type) {
    case "SET_BOOK_DESCRIPTION":
      return {...state, ...action.books}
    case "RESET_BOOK_DESCRIPTION":
      return {...initialState}
    default:
      return state
  }
}

//action creators
export const setBookDescription = (book:SingleBookResponseDataType) =>{
  return ({type: SET_BOOK_DESCRIPTION, books: book} as const)
}
export const resetBookDescription = () =>{
  return ({type: RESET_BOOK_DESCRIPTION} as const)
}

//think creators
export const getBookDescription = (id: string): AppThunkType => (dispatch) => {
  dispatch(setIsLoading(true))
  booksAPI.getBookDescription(id)
    .then(data=>{
      // console.log(data)
      dispatch(setBookDescription(data as SingleBookResponseDataType))
    })
    .catch(err => {
      dispatch(setError(err.message ? "Some error has acquired" : err.response.data.error.message));
      setTimeout(() => setError(''), 10000)})
    .finally(()=>{
      dispatch(setIsLoading(false))
    })
}
