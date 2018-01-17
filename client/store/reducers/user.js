import { handleActions } from "redux-actions";

import { userActions } from "../../constants/actions";

const initialState = {
    id: "",
    alias: "",
    game: "",
    player: 0,
};

export default handleActions(
    {
        [userActions.USER_LOGIN]: (state, action) => {
            return {
                ...state,
                id: action.payload.id,
            };
        },
        [userActions.GAME_JOIN]: (state, action) => {
            return {
                ...state,
                game: action.payload.game,
                player: action.payload.player,
            };
        },
        [userActions.GAME_LEAVE]: (state, action) => {
            return {
                ...state,
                game: "",
                player: 0,
            };
        },
    },
    initialState
);
