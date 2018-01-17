import React, { Component } from 'react';

class Timer extends Component {
    constructor(props) {
        super(props)
        this.state =  {timeLeft: null, timer: null}
        this.startTimer = this.startTimer.bind(this)
    }

    componentDidMount() {
        this.startTimer(15)
    }


    componentWillUnmount() {
        clearInterval(this.state.timer)
    }

    startTimer(timeLeft) {
        clearInterval(this.state.timer)
        let timer = setInterval(() => {
            let timeLeft = this.state.timeLeft - 1
            if (timeLeft == 0) {
                clearInterval(timer)
                this.props.onTimeout()
            }
            this.setState({timeLeft})
        }, 1000)
        this.setState({timeLeft: timeLeft, timer: timer})
    }

    render() {
        return (
            <p className="timer">{this.state.timeLeft}</p>
        )
    }
}

export default Timer
