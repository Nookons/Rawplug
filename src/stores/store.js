import {applyMiddleware, combineReducers, createStore} from "redux";
import {barrelReducer} from "./barrelReducer";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {actionsReducer} from "./actionsReducer";
import {nozReducer} from "./nozleReducer";
import {cartridgeReducer} from "./cartridgeReducer";

const rootReducer = combineReducers({
    action: actionsReducer,
    barrel: barrelReducer,
    noz: nozReducer,
    cartridge: cartridgeReducer
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))