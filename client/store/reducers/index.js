import { combineReducers } from "redux";

import games from "./games";
import user from "./user";

export const rootReducer = combineReducers({
    games,
    user,
});
