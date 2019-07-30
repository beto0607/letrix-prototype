import React from "react";
import { connect } from "react-redux";

import { LetterComponent } from '../Letter/Letter';
import { Letter as LetterInterface, ApplicationState } from "../../types/types";

import styles from '../Board/board.module.scss';

export interface DockProps {
    letters: Array<LetterInterface>;
}

export const DockConnected: React.FC<DockProps> = ({ letters }: DockProps) => {
    return (
        <div className={styles['dock-wrapper']}>
            {letters.map(e => <LetterComponent key={`${e.x}_${e.y}`} {...e} />)}
        </div>
    )
};
const mapStateToProps = (state: ApplicationState, ownprops: any): DockProps => {
    return {
        ...ownprops,
        letters: state.active_letters
    }
};
export const DockComponent = connect(mapStateToProps)(DockConnected);