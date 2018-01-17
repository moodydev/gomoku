import { Meteor } from 'meteor/meteor';
import React, { Component } from 'react'
import { connect } from "react-redux";
import { Redirect } from 'react-router'
import { bindActionCreators, Dispatch } from "redux";
import { v4 } from 'uuid'

import CreateGameModal from "./presentational/createGameModal"

import Modal from "../components/Modal"

import { GameStat, WinStat } from "../constants/gameStat";
import { boardCols } from "../constants/general";

import * as LobbyActions from "../store/actions";

import Games from "../../api/games"
import Messages from "../../api/messages"

class Lobby extends Component {

    state = {
      redirect: false,
      popup: false,
      gameName: ""
    }

    componentWillMount() {
        if (this.props.user && this.props.user.game) {
            this.props.lobbyActions.refreshGame()
        }
    }

    createGame = () => {
        if (this.state.gameName) {
            const gameID = v4()
            const gameData = {
                name: this.state.gameName,
                _id: gameID,
                player_1: this.props.user.id,
                player_2: "",
                boardValues: this.cleanBoard(),
                status: GameStat.PENDING,
                winner: WinStat.NOT_STARTED,
                turn: 0,
            }

            Promise.resolve(
                Games.insert(gameData)
            ).then(
                this.props.lobbyActions.joinGame({
                    game: gameID,
                    player: 1
                })
            ).then(
                this.setState({redirect: true})
            )
        }
        this.closePopup()
    }

    joinGame = (gameID) => {
        const { user, lobbyActions } = this.props
        const gameData = {
            game: gameID,
            player: 2,
        };

        Promise.resolve(
            Games.update(
                gameID,
                {$set:
                    {
                        player_2: user.id,
                        status: GameStat.ACTIVE,
                        turn: 1,
                    }
                }
            )
        ).then(
            lobbyActions.joinGame(gameData)
        ).then(
            this.setState({redirect: true})
        )
    }

    cleanBoard = () => {
        const boardValues = []
        for (let row = 0; row < boardCols; row++) {
            const cells = []
            for (let cell = 0; cell < boardCols; cell++) {
                cells.push(0);
            }

            boardValues.push(cells);
        }
        return boardValues
    }

    renderGames = () => {
        return this.props.games.map((game, i) => (
                <div className="game-info row-flex" key={i}>
                    <div className="col">
                        {game._id} - {game.name}
                    </div>
                    <div className="col col-end">
                        <div className="link" onClick={() => this.joinGame(game._id)}>
                            Join Game!
                        </div>
                    </div>
                </div>
            )
        )
    }

    closePopup = () => {
        this.setState({
            popup: !this.state.popup,
            gameName: ""
        })
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/play'/>;
        }
        return (
            <div>
                {this.state.popup &&
                    <Modal onClose={this.closePopup}>
                        <CreateGameModal
                            closePopup={this.closePopup}
                            createGame={this.createGame}
                            nameUpdate={(value) => this.setState({gameName: value})}
                        />
                    </Modal>
                }
                <div className="container">
                    {!this.props.games.length &&
                        <span>
                            <h1>NO ACTIVE GAMES</h1>
                            <p>Please click on a link bellow to create a game</p>
                        </span>
                    }
                    {this.renderGames()}
                </div>
                <footer>
                    <div className="container">
                        <div className="row-flex">
                            <div className="col col-center">
                                <div className="link" onClick={this.closePopup}>
                                    Create Game
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        )
    }
}

const mapStateToProps = ({games, user}) => {
    return {
        games,
        user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        lobbyActions:  bindActionCreators(LobbyActions, dispatch),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
