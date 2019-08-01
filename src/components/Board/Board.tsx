import React, { Component } from "react";
import { DockComponent } from '../Dock/Dock';
import { LetterComponent } from '../Letter/Letter';
import { getLetters, shuffle } from '../../utils';
import style from './board.module.scss';
import { Letter, WordActions, ApplicationState } from "../../types/types";
import { Dispatch } from "redux";
import { setWordsToFind } from "../../actions/actions";
import { connect } from "react-redux";
import uuid from 'uuid';

const WIDTH = 5;
const HEIGHT = 5;

interface BoardState {
    index: number;
    chars: Array<string>;
    allLetters: Array<Letter>;
    letters: Array<Letter>;
    remainingLetters: Array<Letter>;
}
interface OwnProps {
    words: Array<string>;
}
interface StateProps {
    activeLetters: Array<Letter>;
    wordsFindedCounter: number;
}
interface DispatchProps {
    setWordsToFind: (words: Array<string>) => void;
}
type BoardProps = StateProps & DispatchProps & OwnProps
export class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        const { words, setWordsToFind } = props;
        setWordsToFind(words);
        const chars: Array<string> = getLetters(this.props.words);
        const allLetters: Array<Letter> = chars.map((c: string) => ({ letter: c, id: uuid.v1() }))
        const letters: Array<Letter> = shuffle(allLetters.slice(0, HEIGHT * WIDTH));
        const remainingLetters: Array<Letter> = allLetters.slice(HEIGHT * WIDTH);
        this.state = {
            chars,
            allLetters,
            letters,
            remainingLetters,
            index: HEIGHT * WIDTH
        }
    }
    componentDidUpdate(prevProps: BoardProps) {
        if (this.props.wordsFindedCounter !== prevProps.wordsFindedCounter) {
            console.log("ENCONTRASTE UNA NUEVA PALABRA!!!");
        }
    }
    render() {
        const { letters } = this.state;
        return (
            <div className={style['board-wrapper']}>
                <div className={style['letters-wrapper']}>
                    {letters.map((letter) =>
                        <LetterComponent key={letter.id} {...letter} />
                    )}
                </div>
                <DockComponent />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    activeLetters: state.letterReducer.activeLetters,
    wordsFindedCounter: state.wordReducer.wordsFindedCounter
})
const mapDispatchToProps = (dispatch: Dispatch<WordActions>): DispatchProps => ({
    setWordsToFind: (words: Array<string>) => dispatch(setWordsToFind(words))
});

export const BoardComponent = connect(mapStateToProps, mapDispatchToProps)(Board);