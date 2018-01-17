import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Header from "./pages/layout/Header"
import { Lobby, Play } from "./pages"

const App = () => {
    return (
        <Router>
            <div>
                <Header/>
                <main>
                    <Route exact={true} path="/" component={Lobby} />
                    <Route exact={true} path="/play" component={Play} />
                </main>
            </div>
        </Router>
    );
}

export default App;
