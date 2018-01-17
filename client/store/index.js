import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import thunk from "redux-thunk";

import { rootReducer } from "./reducers";

export function configureStore() {
    let middleware = applyMiddleware(thunk)

    middleware = composeWithDevTools(middleware)

    const store = createStore(rootReducer, middleware)

    return store;
}
