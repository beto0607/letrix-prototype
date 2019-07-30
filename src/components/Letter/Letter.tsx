import React, { useState } from "react";
import styles from '../Board/board.module.scss';
import { Letter as LetterInterface } from "../../types/types";
import { connect } from "react-redux";
import { setActiveLetter, setInactiveLetter } from '../../actions/actions';


export interface LetterProps extends LetterInterface {
    setActiveLetter: any;
    setInactiveLetter: any;
}

export const LetterConnected: React.FC<LetterProps> = ({ letter, x, y, setActiveLetter, setInactiveLetter }: LetterProps) => {
    const [active, setActive] = useState(false);
    const selfHhandleClick = () => {
        if (active) {
            setInactiveLetter({ letter: letter, x: x, y: y });
        } else {
            setActiveLetter({ letter: letter, x: x, y: y });
        }
        setActive(!active)
    }
    return (
        <div onClick={selfHhandleClick} className={`${styles['letter']} ${active ? styles['active'] : ''}`}>
            {letter}
        </div>
    )
};
function mapDispatchToProps(dispatch: any) {
    return {
        setActiveLetter: (letter: LetterInterface) => dispatch(setActiveLetter(letter)),
        setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetter(letter)),
    };
}

export const LetterComponent = connect(null, mapDispatchToProps)(LetterConnected);