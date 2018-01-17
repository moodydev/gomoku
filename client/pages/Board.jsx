import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'

import Timer from '../components/Timer'
import { GameStat } from "../constants/gameStat";
import { boardCols } from "../constants/general";


import Games from "../../api/games"

class Board extends Component {
    state = {
      redirect: false
    }

    componentDidMount() {
        if (!this.props.user.game) this.setState({redirect: true})
    }

    componentWillUnmount() {
        if(this.props.game) {
            const { game } = this.props
            switch(game.status) {
                case GameStat.PENDING:
                    Games.update(game._id, {$set: {status: GameStat.CANCELLED}})
                    break;
                case GameStat.ACTIVE:
                    Games.update(game._id, {$set:
                        {
                            status: GameStat.CANCELLED,
                            winner: this.props.user.player === 1 ? 2 : 1
                        }
                    })
                    break;
            }

        }
    }

    winConditions = (boardValues, player) => {
        let count = 0
        const colMax = 10

        for (let row = 0; row < boardCols; row++) {
            for (let cell = 0; cell <= colMax; cell++) {
                count = 0
                for (let i = 0; i < 5; i++) {
                    if(boardValues[row][cell+i] === player) {count++}
                }
                if (count > 4) {return player}
            }
        }
        for (let cell = 0; cell <= boardCols; cell++) {
            for (let row = 0; row < colMax; row++) {
                count = 0
                for (let i = 0; i <= 5; i++) {
                    if(boardValues[row+i][cell] === player) {count++}
                }
                if (count > 4) {return player}
            }
        }
        for (let cell = 0; cell < colMax; cell++) {
            for (let row = 0; row < colMax; row++) {
                count = 0
                for (let i = 0; i <= 5; i++) {
                    if(boardValues[row+i][cell+i] === player) {count++}
                }
                if (count > 4) {return player}
            }
        }
        for (let cell = 5; cell <= boardCols; cell++) {
            for (let row = 0; row < colMax; row++) {
                count = 0
                for (let i = 0; i <= 5; i++) {
                    if(boardValues[row+i][cell-i] === player) {count++}
                }
                if (count > 4) {return player}
            }
        }
        return 0
    }

    updateBoard = (row,cell) => {
        const { user, game } = this.props
        if (user.player && !game.winner && user.player === game.turn) {
            const { boardValues } = game
            const validMove = boardValues[row][cell] ? false : true
            if (validMove) {
                boardValues[row][cell] = user.player
                winner = this.winConditions(boardValues, user.player)
                Games.update(
                    user.game,
                    {$set:
                        {
                            turn: user.player == 2 ? 1 : 2,
                            boardValues,
                            winner,
                            status: winner ? GameStat.FINISHED : GameStat.ACTIVE
                        }
                    }
                )
            }
        }
    }

    userTimeout = () => {
        const { user, game } = this.props
        if (game.turn  === user.player ) {
            const gameID = this.props.user.game
            Games.update(gameID, {$set:
                {
                    status: GameStat.PLAYER_TIMEOUT,
                    winner: this.props.user.player === 1 ? 2 : 1
                }
            })
        }
    }

    cellValue = (row, cell) => {
        const { boardValues } = this.props.game
        cellValue = boardValues[row][cell]
        return !cellValue ? 'board-cell' : cellValue == 1 ? 'board-cell active' : 'board-cell active second'
    }

    renderCell = (row, cell) => {
        if (this.props.game) {
            return (
                <div
                    className={this.cellValue(row, cell)}
                    key={cell}
                    onClick={() => this.updateBoard(row, cell)}>
                </div>
            )
        }
    }

    renderBoard = () => {
        const rows = [];

        for (let row = 0; row < boardCols; row++) {
            const cells = []
            for (let cell = 0; cell < boardCols; cell++) {
                cells.push(
                    this.renderCell(row, cell)
                );
            }
            rows.push(<div className = 'board-row' key={row}>{cells}</div>);
        }
        return (
            <div className="board">
                {rows}
            </div>
        )
    }

    renderStatus = () => {
        const { game, user } = this.props
        const button = <Link to="/" className="link center">Back to Lobby</Link>
        if (!game) {
            return <h2>Initializing</h2>
        } else if (!game.status) {
            return <h2>Matching... Waiting for opponent</h2>
        } else if (!game.winner) {
            if (game.turn !== user.player) {
                return <h2>Opponent playing</h2>
            } else {
                return <h2 className="active-turn">PLAY!</h2>
            }
        } else {
            if (game.winner === user.player) {
                return (
                    <span>
                        <h2>YOU WON!</h2>
                        {button}
                    </span>
                )

            } else {
                return (
                    <span>
                        <h2>oh... better luck next time, you lost...</h2>
                        {button}
                    </span>
                )
            }
        }
    }

    renderPlayerIcon() {
        const playerIcon = {
            player: "",
            opponent: ""
        }
        const { player } = this.props.user
        const player_1 = <i className="material-icon" style={{color: "green"}}>close</i>
        const player_2 = <i className="material-icon" style={{color: "red"}}>fiber_manual_record</i>

        playerIcon.player = player === 1 ? player_1 : player_2
        playerIcon.opponent = player === 1 ? player_2 : player_1

        return playerIcon
    }

    renderTimer() {
        const { user, game } = this.props
        if (game && game.status === GameStat.ACTIVE && game.turn === user.player) {
            return <Timer onTimeout={this.userTimeout}/>
        }
    }

    renderPlayerInfo() {
        const playerIcon = this.renderPlayerIcon()
        return (
            <div className="row-flex">
                <div className="col">
                    You: {playerIcon.player}
                </div>
                <div className="col col-end">
                    Opponent: {playerIcon.opponent}
                </div>
            </div>
        )
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to='/'/>;
        }
        return (
            <div className="container">
                <div className="turn-info">
                    {this.renderStatus()}
                    <div className="timer-height">
                        {this.renderTimer()}
                    </div>
                    {this.renderPlayerInfo()}
                </div>
                {this.renderBoard()}
            </div>
        );
    }
}

export default withTracker((props) => {
    const gameID = props.user.game
    return {
        game: Games.findOne(gameID),
    };
})(Board);
