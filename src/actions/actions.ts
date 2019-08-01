import { Letter, LetterActions, SET_ACTIVE_LETTER, SET_INACTIVE_LETTER, WordActions, WORD_FINDED, SetWordsToFindAction, SET_WORDS_TO_FIND } from '../types/types';


export const setActiveLetter = ({ letter, id }: Letter): LetterActions => ({
    type: SET_ACTIVE_LETTER,
    letter,
    id
});

export const setInactiveLetter = ({ letter, id }: Letter): LetterActions => ({
    type: SET_INACTIVE_LETTER,
    letter,
    id
});

export const wordFinded = (word: string): WordActions => ({
    type: WORD_FINDED,
    word
});

export const setWordsToFind = (words: Array<string>): SetWordsToFindAction => ({
    type: SET_WORDS_TO_FIND,
    words
});