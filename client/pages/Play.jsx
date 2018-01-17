import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { v4 } from 'uuid'

import { GameStat } from "../constants/gameStat";
import * as LobbyActions from "../store/actions";

import Games from "../../api/games"

import Board from './Board'

const boardCols = 15

class Play extends Component {
    constructor(props) {
        super(props)
        this.state = {
            redirect: false,
        }
    }

    gameForfeit = () =>{
        const gameID = this.props.user.game
        Games.update(gameID, {$set:
            {
                status: GameStat.PLAYER_LEFT,
                winner: this.props.user.player === 1 ? 2 : 1
            }
        })
    }

    render() {
        return (
            <div>
                <Board user={this.props.user}/>
                <footer>
                    <div className="container">
                        <div className="row-flex">
                            <div className="col col-end">
                                <div className="link" onClick={this.gameForfeit}>
                                    Forfeit
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        );
    }
}

const mapStateToProps = ({user}) => {
    return {
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
)(Play)
