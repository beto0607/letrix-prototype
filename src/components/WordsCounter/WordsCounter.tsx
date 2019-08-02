import React from "react";
import { connect } from "react-redux";
import { ApplicationState, GameOverActions, GameplayState } from "../../types/types";
import styles from './wordscounter.module.scss';
import { gameOver } from "../../actions/actions";
import { Dispatch } from "redux";

interface OwnProps {
    wordsGoal: number;
}
interface StateProps extends GameplayState {
    wordsFindedCounter: number;
}
interface DispatchProps {
    gameOver: (win: boolean) => void;
}

type WordsCounterProps = OwnProps & StateProps & DispatchProps;
const WordsCounterConnected: React.FC<WordsCounterProps> = ({ wordsFindedCounter, wordsGoal, gameOver, playing, win }: WordsCounterProps) => {
    if (wordsFindedCounter >= wordsGoal) {
        gameOver(true);
    }
    const classNames = `${styles['words-counter-wrapper']} ${playing ? '' : (win ? styles['game-won'] : styles['game-lost'])}`
    return (
        <div className={classNames}>
            {`${wordsFindedCounter} de ${wordsGoal}`}
        </div>
    );
}

const mapStateToProps = ({ wordReducer, gameOverReducer }: ApplicationState): StateProps => ({
    wordsFindedCounter: wordReducer.wordsFindedCounter,
    playing: gameOverReducer.playing,
    win: gameOverReducer.win
})
const mapDispatchToProps = (dispatch: Dispatch<GameOverActions>): DispatchProps => ({
    gameOver: (win: boolean) => { dispatch(gameOver(win)) }
})

export const WordsCounterComponent = connect(mapStateToProps, mapDispatchToProps)(WordsCounterConnected);
