import React from 'react'

const CreateGameModal = (props) => {
    return (
        <React.Fragment>
            <form method="post" style={{width: "400px"}} onSubmit={props.createGame}>
                <div className="row-flex">
                    <div className="col">
                        <div className="input-icon">
                            <input
                                autoFocus={true}
                                type="text"
                                placeholder="Enter game name"
                                onChange={(e) => {props.nameUpdate(e.target.value)}}
                            />
                            <i className="material-icon">games</i>
                        </div>
                    </div>
                </div>
            </form>
            <div className="row-flex">
                <div className="col">
                    <div
                        className="link"
                        onClick={props.closePopup}
                    >
                        Cancel
                    </div>
                </div>
                <div className="col col-end">
                    <div
                        className="link"
                        onClick={props.createGame}
                    >
                        Create
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}


export default CreateGameModal
