import { Meteor } from 'meteor/meteor';
import { createAction } from "redux-actions";
import { Tracker } from 'meteor/tracker';

import {gameActions, userActions} from "../../constants/actions";

import Games from "../../../api/games"
import Messages from "../../../api/messages"

export const loginUser = createAction(userActions.USER_LOGIN);
export const joinGame = createAction(userActions.GAME_JOIN);
export const refreshGame = createAction(userActions.GAME_LEAVE);

export const createGame = createAction(gameActions.GAME_CREATE);

// export function login() {
//     return async function(dispatch) {
//       const games = await Meteor.call('games.fetch');
//       return dispatch({
//         type: 'GAMES_FETCH',
//         payload: games
//       });
//     }
// }
