import { handleActions } from "redux-actions";

import { gameActions } from "../../constants/actions";

const initialState = {
    id: '',
    alias: '',
    boardValues: [],
    owner: '',
    player_1: '',
    player_2: '',
}

export default handleActions(
    {
        [gameActions.GAME_JOIN]: (state, action) => {
            return {
                ...state,
                id: action.payload.id,
            };
        },
    },
    initialState
);
