import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {legacy_createStore as createStore, applyMiddleware, combineReducers} from 'redux'
import thunk, {ThunkAction, ThunkDispatch} from 'redux-thunk';
import {BooksActionsType, booksReducer} from "./booksReducer";

export type AppStateType = ReturnType<typeof rootReducer>;
export type RootActionsType = BooksActionsType
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, AppStateType, unknown, RootActionsType>;
export type AppDispatchType = ThunkDispatch<AppStateType, unknown, RootActionsType>;

const rootReducer = combineReducers({books: booksReducer})
export const store = createStore(rootReducer, applyMiddleware(thunk))

export const useAppDispatch = () => useDispatch<AppDispatchType>();
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;

//TODO DELETE TS IGNORE
//@ts-ignore
window.store = store
