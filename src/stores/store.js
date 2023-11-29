import {applyMiddleware, combineReducers, createStore} from "redux";
import {itemsReducer} from "./itemsReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {actionsReducer} from "./actionsReducer";

const rootReducer = combineReducers({
    action: actionsReducer,
    items: itemsReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))