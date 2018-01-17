import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom"
import { bindActionCreators, Dispatch } from "redux";
import { v4 } from 'uuid'


import * as UserActions from "../../store/actions";


class Header extends Component {
    componentDidMount() {
        const { user, userActions } = this.props
        if (!user.id) {
            const userData = {
                id: v4(),
                alias: "",
            };
            userActions.loginUser(userData);
        }
    }

    render() {
        return (
            <header className="test">
                <div className="nav-header">
                   <div className="container">
                       <div className="row-flex row-flex-middle row-flex-row">
                           <div className="col col-30">
                                <h1 className="intro">Go<span>moku!</span></h1>
                           </div>

                           <div className="col col-end col-70">
                               <nav>
                                   <ul>
                                       <li><Link to="/">Lobby</Link></li>
                                   </ul>
                               </nav>
                           </div>
                       </div>
                   </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = ({user}) => {
    return {
        user,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        userActions:  bindActionCreators(UserActions, dispatch),
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
