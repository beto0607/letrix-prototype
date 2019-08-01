import React from "react";
import { connect } from "react-redux";
import { ApplicationState } from "../../types/types";
import styles from './wordscounter.module.scss';
interface OwnProps {
    wordsGoal: number;
}
interface StateProps {
    wordsFindedCounter: number;
}
interface DispatchProps {
}

type WordsCounterProps = OwnProps & StateProps & DispatchProps;
const WordsCounterConnected: React.FC<WordsCounterProps> = ({ wordsFindedCounter, wordsGoal }: WordsCounterProps) => {
    return (
        <div className={styles['words-counter-wrapper']}>
            {wordsFindedCounter} de {wordsGoal}
        </div>
    );
}

const mapStateToProps = ({ wordReducer }: ApplicationState): StateProps => ({
    wordsFindedCounter: wordReducer.wordsFindedCounter
})
// const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({})

export const WordsCounterComponent = connect(mapStateToProps)(WordsCounterConnected);
