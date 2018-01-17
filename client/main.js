import { Meteor } from 'meteor/meteor';
import { Tracker } from 'meteor/tracker';

import React from 'react';
import { Provider } from "react-redux"
import { render } from 'react-dom';

import { configureStore } from "./store"

import App from './App.js';
import Games from "../api/games"

const appContainer = document.getElementById("app");
const store = configureStore()

Tracker.autorun(() => {
    let data = Games.find({ status: 0 }).fetch()
    store.dispatch({type: 'RECEIVE_GAMES', payload: data})
});

Meteor.startup(() => {
    render(
        <Provider store ={store}>
            <App />
        </Provider>,
        appContainer
    );
});
