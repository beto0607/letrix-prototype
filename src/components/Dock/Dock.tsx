import React from "react";
import { Letter, LetterInterface } from '../Letter/Letter';

import styles from '../Board/board.module.scss';

export interface DockProps {
    letters: Array<LetterInterface>;
}

export const Dock: React.FC<DockProps> = ({ letters }: DockProps) => {
    console.log(letters);
    const handleClick = (letter: LetterInterface) => {
        console.log(letter);
    };
    return (
        <div className={styles['dock-wrapper']}>
            {letters.map(e => <Letter key={`${e.x}_${e.y}`} {...e} handleClick={handleClick} />)}
        </div>
    )
};