import React, { useState, Dispatch } from "react";
import styles from '../Board/board.module.scss';
import { Letter as LetterInterface, LetterActions, LettersState } from "../../types/types";
import { connect } from "react-redux";
import { setActiveLetter as setActiveLetterAction, setInactiveLetter as setInactiveLetterAction } from '../../actions/actions';
import { compareLetters } from "../../utils";

interface StateProps {
    active_letters: Array<LetterInterface>;
}
interface OwnProps extends LetterInterface {
    active?: boolean;
}
interface DispatchProps {
    setActiveLetter: (letter: LetterInterface) => void;
    setInactiveLetter: (letter: LetterInterface) => void;
}
type LetterProps = StateProps & DispatchProps & OwnProps

export const LetterConnected: React.FC<LetterProps> = ({ active_letters, letter, x, y, setActiveLetter, setInactiveLetter, active }: LetterProps) => {
    const is_in_active: boolean = !!(active_letters || []).find(l => compareLetters(l, { letter, x, y }));
    const [active_state, setActive] = useState(active || is_in_active);
    const handleClick = () => {
        if (active_state) {
            setInactiveLetter({ letter, x, y });
        } else {
            setActiveLetter({ letter, x, y });
        }
        setActive(!active_state)
    }
    return (
        <div onClick={handleClick} className={`${styles['letter']} ${active_state ? styles['active'] : ''}`}>
            {letter}
        </div>
    )
};
const mapStateToProps = ({ active_letters = [] }: LettersState): StateProps => ({ active_letters });
const mapDispatchToProps = (dispatch: Dispatch<LetterActions>): DispatchProps => ({
    setActiveLetter: (letter: LetterInterface) => dispatch(setActiveLetterAction(letter)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter)),
})
export const LetterComponent = connect(mapStateToProps, mapDispatchToProps)(LetterConnected);