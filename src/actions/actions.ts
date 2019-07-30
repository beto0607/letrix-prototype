import { Letter, LetterActions, SET_ACTIVE_LETTER, SET_INACTIVE_LETTER, WordActions, WORD_FINDED } from '../types/types';


export const setActiveLetter = ({ letter, x, y }: Letter): LetterActions => {
    return {
        type: SET_ACTIVE_LETTER,
        letter,
        x,
        y
    }
};

export const setInactiveLetter = ({ letter, x, y }: Letter): LetterActions => {
    return {
        type: SET_INACTIVE_LETTER,
        letter,
        x,
        y
    }
};

export const wordFinded = (word: string): WordActions => {
    return {
        type: WORD_FINDED,
        word
    };
}