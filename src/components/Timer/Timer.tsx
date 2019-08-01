import React, { useState, Component } from "react";
import { connect } from "react-redux";

import styles from './timer.module.scss';
import { AppActions, ApplicationState } from "../../types/types";
import { Dispatch } from "redux";
import ms from 'pretty-ms';

interface OwnProps {
    timerGoal: number;//In seconds
}
interface StateProps {
    wordsFindedCounter: number;
}
interface DispatchProps {
}
type TimerProps = OwnProps & StateProps & DispatchProps;
interface TimerState {
    startTime: number;
    elapsedTime: number;
    isRunning: boolean;
}
class TimerConnected extends Component<TimerProps, TimerState>{
    timer: NodeJS.Timeout;
    constructor(props: TimerProps) {
        super(props);
        this.state = {
            startTime: Date.now(),
            elapsedTime: 0,
            isRunning: true
        };
        this.timer = setInterval(() => this.setState({
            elapsedTime: Date.now() - this.state.startTime
        }), 1000);
    }
    render() {
        const { elapsedTime } = this.state;
        const { timerGoal } = this.props
        return (
            <div className={styles['words-counter-wrapper']}>
                {ms((timerGoal * 1000) - elapsedTime, { secondsDecimalDigits: 0 })}
            </div>
        );
    }
}
const mapStateToProps = ({ wordReducer }: ApplicationState): StateProps => ({
    wordsFindedCounter: wordReducer.wordsFindedCounter
})
const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({})

export const TimerComponent = connect(mapStateToProps)(TimerConnected);
