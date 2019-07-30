import React, { Component, useState } from "react";
import { Dock } from '../Dock/Dock';
import { Letter, LetterInterface } from '../Letter/Letter';

import style from './board.module.scss';

const WIDTH = 5;
const HEIGHT = 5;

export interface BoardProps {
    words: Array<string>;
}
interface BoardState {
    letters: Array<string>;
    pressed: Array<LetterInterface>;
}
function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function getLetters(words: Array<string>, quantity: number): Array<string> {
    let ret: Array<string> = [];
    let letters_counter = 0;
    while (letters_counter < quantity) {
        let word: string = words[Math.floor((Math.random() * words.length))];
        ret = [...ret, ...word.split('')];
        letters_counter += word.length;
    }
    return shuffle(ret.slice(0, quantity));
}
export class Board extends Component<BoardProps, BoardState> {
    constructor(props: BoardProps) {
        super(props)
        const { words } = props;
        this.state = {
            letters: getLetters(words, WIDTH * HEIGHT),
            pressed: []
        }
        this.handleLetterClick = this.handleLetterClick.bind(this);
    }
    handleLetterClick(letter: LetterInterface) {
        const { pressed } = this.state;
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
    render() {
        const { letters, pressed } = this.state;
        return (
            <div className={style['board-wrapper']}>
                <div className={style['letters-wrapper']}>
                    {letters.map((l, index) =>
                        <Letter key={`${index}`} letter={l} x={index} y={index} handleClick={this.handleLetterClick} />
                    )}
                </div>
                <Dock letters={pressed} />
            </div>
        )
    }

}
// export const Board: React.FC<BoardProps> = ({ words }) => {
//     const letters: Array<string> = getLetters(words, WIDTH * HEIGHT);
//     const [pressed, setPressed] = useState<Array<LetterInterface>>([]);
//     const handleClick = (letter: LetterInterface) => {
//         if (pressed.find((e) => (e.x === letter.x && e.y === letter.y && letter.letter === e.letter))) {
//             setPressed(pressed.filter((e) => !(e.x === letter.x && e.y === letter.y && letter.letter === e.letter)));
//         } else {
//             setPressed([...pressed, letter]);
//         }
//     }
//     return (
//         <div className={style['board-wrapper']}>
//             <div className={style['letters-wrapper']}>
//                 {letters.map((l, index) =>
//                     <Letter key={`${index}`} letter={l} x={index} y={index} handleClick={handleClick} />
//                 )}
//             </div>
//             <Dock letters={pressed} />
//         </div>
//     )
// };