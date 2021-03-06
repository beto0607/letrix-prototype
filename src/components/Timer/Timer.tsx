import React, { Component } from "react";
import { connect } from "react-redux";

import styles from './timer.module.scss';
import { AppActions, ApplicationState, GameplayState } from "../../types/types";
import { Dispatch } from "redux";
import ms from 'pretty-ms';
import { gameOver } from "../../actions/actions";

interface OwnProps {
    timerGoal: number;//In seconds
}
interface StateProps extends GameplayState {
    wordsFindedCounter: number;
}
interface DispatchProps {
    gameOver: (win: boolean) => void;
}
type TimerProps = OwnProps & StateProps & DispatchProps;
interface TimerState {
    startTime: number;
    elapsedTime: number;
}
class TimerConnected extends Component<TimerProps, TimerState>{
    timer: NodeJS.Timeout;
    constructor(props: TimerProps) {
        super(props);
        this.state = {
            startTime: Date.now(),
            elapsedTime: 0
        };
        this.timer = setInterval(() => this.setState({
            elapsedTime: this.props.playing ? Date.now() - this.state.startTime : 0
        }), 1000);
    }
    componentDidUpdate(prevProps: TimerProps, prevState: TimerState) {
        const { elapsedTime } = this.state;
        const { timerGoal, playing, gameOver, win } = this.props;
        if (playing && elapsedTime !== prevState.elapsedTime && (timerGoal * 1000) <= elapsedTime) {
            gameOver(false);
        }
        if (prevProps.playing !== playing) {
            clearInterval(this.timer);
            if (!win) {
                this.setState({
                    elapsedTime: timerGoal * 1000
                })
            }
        }
    }
    render() {
        const { elapsedTime } = this.state;
        const { timerGoal, playing, win } = this.props;
        const classNames = `${styles['timer-wrapper']} ${playing ? '' : (win ? styles['game-won'] : styles['game-lost'])}`
        return (
            <div className={classNames}>
                {ms((timerGoal * 1000) - elapsedTime, { secondsDecimalDigits: 0 })}
            </div>
        );
    }
}
const mapStateToProps = ({ wordReducer, gameOverReducer }: ApplicationState): StateProps => ({
    wordsFindedCounter: wordReducer.wordsFindedCounter,
    playing: gameOverReducer.playing,
    win: gameOverReducer.win
})
const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({
    gameOver: (win: boolean) => dispatch(gameOver(win))
})

export const TimerComponent = connect(mapStateToProps, mapDispatchToProps)(TimerConnected);
