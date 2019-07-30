import React, { useState } from "react";
import styles from '../Board/board.module.scss';

export interface LetterInterface {
    letter: string;
    x: number;
    y: number;
}
export interface LetterProps extends LetterInterface {
    handleClick: any;
}

export const Letter: React.FC<LetterProps> = ({ letter, x, y, handleClick }: LetterProps) => {
    const [active, setActive] = useState(false);
    const selfHhandleClick = () => {
        setActive(!active)
        handleClick({ letter: letter, x: x, y: y });
    }
    return (
        <div onClick={selfHhandleClick} className={`${styles['letter']} ${active ? styles['active'] : ''}`}>
            {letter}
        </div>
    )
};