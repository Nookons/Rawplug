import {applyMiddleware, combineReducers, createStore} from "redux";
import {cashReducer} from "./cashReducer";
import {barrelReducer} from "./barrelReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    cash: cashReducer,
    barrel: barrelReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))