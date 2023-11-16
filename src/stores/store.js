import {applyMiddleware, combineReducers, createStore} from "redux";
import {barrelReducer} from "./barrelReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {actionsReducer} from "./actionsReducer";
import {nozReducer} from "./nozleReducer";

const rootReducer = combineReducers({
    action: actionsReducer,
    barrel: barrelReducer,
    noz: nozReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))