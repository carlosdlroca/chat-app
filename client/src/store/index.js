import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";

export default function configureStore() {
    const composeEnhansers =
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    return createStore(rootReducer, composeEnhansers(applyMiddleware(thunk)));
}
