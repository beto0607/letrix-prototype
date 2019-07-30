import React, { Component } from "react";
import { Dock } from '../Dock/Dock';
import { Letter, LetterInterface } from '../Letter/Letter';
import { getLetters } from '../../utils';
import style from './board.module.scss';

const WIDTH = 5;
const HEIGHT = 5;

export interface BoardProps {
    words: Array<string>;
    handleWordFinded?: any;
}
interface BoardState {
    words: Array<string>;
    letters: Array<string>;
    pressed: Array<LetterInterface>;
}
export class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        const { words } = props;
        this.state = {
            letters: getLetters(words),
            words: words,
            pressed: []
        }
        this.handleLetterClick = this.handleLetterClick.bind(this);
    }
    handleLetterClick(letter: LetterInterface) {
        const { words, letters } = this.state;
        let { pressed } = this.state;
        const word: string = pressed.map(e => e.letter).join('');
        if (words.find(e => e === word)) {
            // letters.filter(e => {
            //     if (pressed.find(p => p.letter === e)) {
            //         pressed = pressed.filter(pp => e !== pp)
            //         return false;
            //     }
            //     return true;
            // })
            this.setState({
                ...this.state,

                words: this.state.words.filter(e => e !== word),
                pressed: []
            });
        } else {
            if (pressed.find((e) => (e.x === letter.x && e.y === letter.y && letter.letter === e.letter))) {
                this.setState({
                    ...this.state,
                    pressed: pressed.filter((e) => !(e.x === letter.x && e.y === letter.y && letter.letter === e.letter))
                });
            } else {
                this.setState({
                    ...this.state,
                    pressed: [...pressed, letter]
                });
            }
        }
    }
    render() {
        const { words, letters, pressed } = this.state;
        return (
            <div className={style['board-wrapper']}>
                <div className={style['letters-wrapper']}>
                    {letters.slice(0, HEIGHT * WIDTH).map((l, index) =>
                        <Letter key={`${index}`} letter={l} x={index} y={index} handleClick={this.handleLetterClick} />
                    )}
                </div>
                <Dock letters={pressed} words={words} handleLetterClick={this.handleLetterClick} />
            </div>
        )
    }

}
