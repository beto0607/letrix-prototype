import React, { useState, Dispatch } from "react";
import styles from '../Board/board.module.scss';
import { Letter as LetterInterface, LetterActions } from "../../types/types";
import { connect } from "react-redux";
import { setActiveLetter as setActiveLetterAction, setInactiveLetter as setInactiveLetterAction } from '../../actions/actions';

interface StateProps {
}
interface OwnProps extends LetterInterface {
    active?: boolean;
    ignoreClick?: boolean;
}
interface DispatchProps {
    setActiveLetter: (letter: LetterInterface) => void;
    setInactiveLetter: (letter: LetterInterface) => void;
}
type LetterProps = StateProps & DispatchProps & OwnProps

export const LetterConnected: React.FC<LetterProps> = ({ letter, id, setActiveLetter, setInactiveLetter, active, ignoreClick }: LetterProps) => {
    const currentLetter: LetterInterface = { letter, id };
    const [active_state, setActive] = useState(active || false);
    const handleClick = () => {
        if (ignoreClick) { return; }
        if (active_state) {
            setInactiveLetter(currentLetter);
        } else {
            setActiveLetter(currentLetter);
        }
        setActive(!active_state)
    }
    return (
        <div onClick={handleClick} className={`${styles['letter']} ${active_state ? styles['active'] : ''}`}>
            {letter}
        </div>
    )
};
const mapDispatchToProps = (dispatch: Dispatch<LetterActions>): DispatchProps => ({
    setActiveLetter: (letter: LetterInterface) => dispatch(setActiveLetterAction(letter)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter)),
})
export const LetterComponent = connect(null, mapDispatchToProps)(LetterConnected);