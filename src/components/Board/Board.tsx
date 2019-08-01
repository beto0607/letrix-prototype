import React, { Component } from "react";
import { DockComponent } from '../Dock/Dock';
import { LetterComponent } from '../Letter/Letter';
import { getLetters, shuffle } from '../../utils';
import style from './board.module.scss';
import { Letter, ApplicationState, AppActions } from "../../types/types";
import { Dispatch } from "redux";
import { setWordsToFind, setInactiveLetter as setInactiveLetterAction } from "../../actions/actions";
import { connect } from "react-redux";
import uuid from 'uuid';

const WIDTH = 5;
const HEIGHT = 5;

interface BoardState {
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
    setInactiveLetter: (letter: Letter) => void;
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
            remainingLetters
        }
    }
    componentDidUpdate(prevProps: BoardProps) {
        if (this.props.wordsFindedCounter !== prevProps.wordsFindedCounter) {
            console.log("ENCONTRASTE UNA NUEVA PALABRA!!!");
            const { letters, remainingLetters } = this.state;
            const { activeLetters, setInactiveLetter } = this.props;
            const lettersWithActiveRemoved = letters.filter((l) => !(activeLetters.find(al => al.id === l.id)))
            const newLetters = shuffle(remainingLetters.slice(0, activeLetters.length));
            this.setState({
                ...this.state,
                letters: [...lettersWithActiveRemoved, ...newLetters],
                remainingLetters: remainingLetters.slice(activeLetters.length)
            })
            activeLetters.forEach(l => setInactiveLetter(l));
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
const mapDispatchToProps = (dispatch: Dispatch<AppActions>): DispatchProps => ({
    setWordsToFind: (words: Array<string>) => dispatch(setWordsToFind(words)),
    setInactiveLetter: (letter: Letter) => dispatch(setInactiveLetterAction(letter))
});

export const BoardComponent = connect(mapStateToProps, mapDispatchToProps)(Board);