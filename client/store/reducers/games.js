import { handleActions } from "redux-actions";

import { gameActions } from "../../constants/actions";

const initialState = [
    {
        name: "Test",
        _id: "abcd_1",
        player_1: "",
        player_2: "",
        boardValues: [],
        status: 0,
        winner: 0,
        turn: 0,
    }
]

export default handleActions(
    {
        [gameActions.GAME_CREATE]: (state, action) => {
            return {
                ...state,
            };
        },
        [gameActions.RECEIVE_GAMES]: (state, action) => {
            return [
                ...action.payload,
            ]
        },
    },
    initialState
);
