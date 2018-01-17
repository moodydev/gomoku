import React, { Component } from 'react';

const Modal = (props) => {

    return (
        <div className="modal">
            <div className="container-modal">
                <div className="close" onClick={props.onClose}>x</div>
                {props.children}
            </div>
        </div>
    );
};

export default Modal
