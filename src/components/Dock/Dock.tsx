import React, { Dispatch } from "react";
import { connect } from "react-redux";

import { LetterComponent } from '../Letter/Letter';
import { Letter as LetterInterface, ApplicationState, WordActions } from "../../types/types";

import styles from '../Board/board.module.scss';
import { wordFinded } from "../../actions/actions";

export interface DockProps {
    letters: Array<LetterInterface>;
    words: Array<string>;
    wordFinded: any;
}
export const DockConnected: React.FC<DockProps> = ({ letters, words, wordFinded }: DockProps) => {
    const current_word = letters.map(l => l.letter).join('');
    if (words.find(w => w === current_word)) {
        wordFinded(current_word);
    }
    return (
        <div className={styles['dock-wrapper']}>
            {letters.map(e => <LetterComponent key={`${e.x}_${e.y}`} {...e} />)}
        </div>
    )
};
const mapStateToProps = (state: ApplicationState, ownprops: any): DockProps => ({
    ...ownprops,
    letters: state.active_letters,
    words: state.words
})
const mapDispatchToProps = (dispatch: Dispatch<WordActions>, ownprops: any): DockProps => ({
    ...ownprops,
    wordFinded: (word: string) => dispatch(wordFinded(word))
})
export const DockComponent = connect(mapStateToProps, mapDispatchToProps)(DockConnected);