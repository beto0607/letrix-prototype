import React from "react";
import { Letter, LetterInterface } from '../Letter/Letter';

import styles from '../Board/board.module.scss';

export interface DockProps {
    letters: Array<LetterInterface>;
    words: Array<string>;
    handleLetterClick: any;
}

export const Dock: React.FC<DockProps> = ({ letters, words, handleLetterClick }: DockProps) => {
    const handleClick = (letter: LetterInterface) => {
        handleLetterClick(letter);
    };

    return (
        <div className={styles['dock-wrapper']}>
            {letters.map(e => <Letter key={`${e.x}_${e.y}`} {...e} handleClick={handleClick} />)}
        </div>
    )
};