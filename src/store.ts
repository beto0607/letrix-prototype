import { createStore, combineReducers } from "redux";
import { letterReducer, wordReducer } from "./reducers/reducers";


export const rootReducer = combineReducers({
    letterReducer: letterReducer,
    wordReducer: wordReducer
})

export const store = createStore(rootReducer);