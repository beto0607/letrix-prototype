import React, { Dispatch } from "react";
import { connect } from "react-redux";

import { LetterComponent } from '../Letter/Letter';
import { Letter as LetterInterface, ApplicationState, AppActions } from "../../types/types";

import styles from '../Board/board.module.scss';
import { wordFinded, setInactiveLetter as setInactiveLetterAction } from "../../actions/actions";

interface StateProps {
    activeLetters: Array<LetterInterface>;
    words: Array<string>;
}
interface DispatchProps {
    wordFinded: (word: string) => void;
    setInactiveLetter: (letter: LetterInterface) => void;
}
type DockProps = StateProps & DispatchProps;

// export const DockConnected: React.FC<DockProps> = ({ activeLetters, words, wordFinded, setInactiveLetter }: DockProps) => {
export const DockConnected: React.FC<DockProps> = ({ activeLetters, words, wordFinded }: DockProps) => {
    const current_word = (activeLetters.map(l => l.letter) || []).join('');
    if (words.find(w => w === current_word)) {
        // activeLetters.forEach(l => setInactiveLetter(l));
        wordFinded(current_word);
    }
    return (
        <div className={styles['dock-wrapper']}>
            {activeLetters.map(e => <LetterComponent key={e.id} {...e} active={true} ignoreClick={true} />)}
        </div>
    )
};
const mapStateToProps = (state: ApplicationState): StateProps => ({
    activeLetters: state.letterReducer.activeLetters,
    words: state.wordReducer.words
})
const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({
    wordFinded: (word: string) => dispatch(wordFinded(word)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter))
})
export const DockComponent = connect(mapStateToProps, mapDispatchToProps)(DockConnected);