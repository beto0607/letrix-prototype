import React, { Dispatch } from "react";
import { connect } from "react-redux";

import { LetterComponent } from '../Letter/Letter';
import { Letter as LetterInterface, ApplicationState, WordActions, AppActions } from "../../types/types";

import styles from '../Board/board.module.scss';
import { wordFinded, setInactiveLetter as setInactiveLetterAction } from "../../actions/actions";

interface StateProps {
    letters: Array<LetterInterface>;
    words: Array<string>;
}
interface DispatchProps {
    wordFinded: (word: string) => void;
    setInactiveLetter: (letter: LetterInterface) => void;
}
type DockProps = StateProps & DispatchProps

export const DockConnected: React.FC<DockProps> = ({ letters, words, wordFinded, setInactiveLetter }: DockProps) => {
    const current_word = (letters.map(l => l.letter) || []).join('');
    if (words.find(w => w === current_word)) {
        letters.forEach(l => setInactiveLetter(l));
        wordFinded(current_word);
    }
    return (
        <div className={styles['dock-wrapper']}>
            {letters.map(e => <LetterComponent key={`${e.x}_${e.y}`} {...e} active={true} />)}
        </div>
    )
};
const mapStateToProps = (state: ApplicationState): StateProps => ({
    letters: state.letterReducer.active_letters,
    words: state.wordReducer.words
})
const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({
    wordFinded: (word: string) => dispatch(wordFinded(word)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter))
})
export const DockComponent = connect(mapStateToProps, mapDispatchToProps)(DockConnected);