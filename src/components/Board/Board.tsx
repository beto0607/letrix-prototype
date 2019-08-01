import React, { Component } from "react";
import { DockComponent } from '../Dock/Dock';
import { LetterComponent } from '../Letter/Letter';
import { getLetters } from '../../utils';
import style from './board.module.scss';
import { Letter, WordActions, ApplicationState } from "../../types/types";
import { Dispatch } from "redux";
import { setWordsToFind } from "../../actions/actions";
import { connect } from "react-redux";

const WIDTH = 5;
const HEIGHT = 5;

interface BoardState {
    chars: Array<string>;
    letters: Array<Letter>;
}
interface OwnProps {
    words: Array<string>;
}
interface StateProps {
    active_letters: Array<Letter>;
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
        const chars = getLetters(words);
        this.state = {
            chars,
            letters: chars.slice(0, HEIGHT * WIDTH).map((letter, index) => ({ letter, x: (index % WIDTH), y: (Math.floor(index / WIDTH)) }))
        }
    }
    render() {
        const { letters } = this.state;
        return (
            <div className={style['board-wrapper']}>
                <div className={style['letters-wrapper']}>
                    {letters.map((letter) =>
                        <LetterComponent key={`${letter.x}_${letter.y}`} {...letter} />
                    )}
                </div>
                <DockComponent />
            </div>
        )
    }
}

const mapStateToProps = (state: ApplicationState): StateProps => ({
    active_letters: state.letterReducer.active_letters
})
const mapDispatchToProps = (dispatch: Dispatch<WordActions>): DispatchProps => ({
    setWordsToFind: (words: Array<string>) => dispatch(setWordsToFind(words))
});

export const BoardComponent = connect(mapStateToProps, mapDispatchToProps)(Board);