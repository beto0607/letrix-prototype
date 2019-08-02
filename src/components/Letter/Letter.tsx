import React, { useState, Dispatch } from "react";
import styles from '../Board/board.module.scss';
import { Letter as LetterInterface, LetterActions, ApplicationState, GameplayState } from "../../types/types";
import { connect } from "react-redux";
import { setActiveLetter as setActiveLetterAction, setInactiveLetter as setInactiveLetterAction } from '../../actions/actions';

interface StateProps extends GameplayState {
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

export const LetterConnected: React.FC<LetterProps> = ({ letter, id, setActiveLetter, setInactiveLetter, active, ignoreClick, playing, win }: LetterProps) => {
    const currentLetter: LetterInterface = { letter, id };
    const [active_state, setActive] = useState(active || false);
    const handleClick = () => {
        if (ignoreClick || !playing) { return; }
        if (active_state) {
            setInactiveLetter(currentLetter);
        } else {
            setActiveLetter(currentLetter);
        }
        setActive(!active_state)
    }
    const classNames = `${styles['letter']} ${active_state ? styles['active'] : ''} ${playing ? '' : styles[win ? 'game-won' : 'game-lost']}`;
    return (
        <div onClick={handleClick} className={classNames}>
            {letter}
        </div>
    )
};
const mapStateToProps = ({ gameOverReducer }: ApplicationState): StateProps => ({
    playing: gameOverReducer.playing,
    win: gameOverReducer.win
})
const mapDispatchToProps = (dispatch: Dispatch<LetterActions>): DispatchProps => ({
    setActiveLetter: (letter: LetterInterface) => dispatch(setActiveLetterAction(letter)),
    setInactiveLetter: (letter: LetterInterface) => dispatch(setInactiveLetterAction(letter)),
})
export const LetterComponent = connect(mapStateToProps, mapDispatchToProps)(LetterConnected);