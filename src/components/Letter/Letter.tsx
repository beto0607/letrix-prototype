import React, { useState, Dispatch } from "react";
import styles from '../Board/board.module.scss';
import { Letter as LetterInterface, LetterActions } from "../../types/types";
import { connect } from "react-redux";
import { setActiveLetter as setActiveLetterAction, setInactiveLetter as setInactiveLetterAction } from '../../actions/actions';


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
const mapDispatchToProps = (dispatch: Dispatch<LetterActions>, ownprops: any): LetterProps => ({
    ...ownprops,
    setActiveLetter: (letter: LetterInterface) => dispatch(setActiveLetterAction(letter)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter)),
})
export const LetterComponent = connect(null, mapDispatchToProps)(LetterConnected);