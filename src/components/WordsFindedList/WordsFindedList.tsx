import React from "react";
import { connect } from "react-redux";
import { ApplicationState, WordListItem } from "../../types/types";
import styles from './wordsfindedlist.module.scss';

interface OwnProps {
}
interface StateProps {
    wordsFinded: Array<string>;
    words: Array<string>;
}
interface DispatchProps {
}
type WordsFindedListProps = OwnProps & StateProps & DispatchProps;
const WordListItemComponent: React.FC<WordListItem> = ({ word, finded }: WordListItem) => (
    <li className={styles[finded ? 'finded' : 'hidden']}>
        {word}
    </li>
)
const WordsFindedListConnected: React.FC<WordsFindedListProps> = ({ words, wordsFinded }: WordsFindedListProps) => {
    const wordsListItems: Array<WordListItem> = words.map(w => ({
        word: w,
        finded: !!wordsFinded.find(wf => wf === w)
    }));
    return (
        <div className={styles['words-list-container']}>
            <h3>Listado:</h3>
            <ul className={styles['words-list']}>
                {wordsListItems.map((wli, index) => (<WordListItemComponent key={index + '_' + wli.word} {...wli} />))}
            </ul>
        </div>
    );
}

const mapStateToProps = ({ wordReducer }: ApplicationState): StateProps => ({
    wordsFinded: wordReducer.wordsFinded,
    words: wordReducer.words
})

export const WordsFindedList = connect(mapStateToProps)(WordsFindedListConnected);

