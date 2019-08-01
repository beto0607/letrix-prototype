import { LetterActions, SET_ACTIVE_LETTER, SET_INACTIVE_LETTER, WORD_FINDED, WordActions, SET_WORDS_TO_FIND, LettersState, WordsState } from '../types/types';
import { combineReducers } from 'redux';
import { compareLetters } from '../utils';

//STATES
const initLettersState: LettersState = {
    active_letters: []
};
const initWordsState: WordsState = {
    words: [],
    words_finded: []
};

export const letterReducer = (state: LettersState = initLettersState, action: LetterActions): LettersState => {
    const { letter, x, y, type } = action;
    switch (type) {
        case SET_ACTIVE_LETTER:
            return {
                ...state,
                active_letters: [
                    ...state.active_letters,
                    { letter: letter, x: x || -1, y: y || -1 }
                ]
            };
        case SET_INACTIVE_LETTER:
            return {
                ...state,
                active_letters: state.active_letters.filter(al => !compareLetters(al, { letter, x, y }))
            };
        default:
            return state;
    }
}
export const wordReducer = (state: WordsState = initWordsState, action: WordActions): WordsState => {
    switch (action.type) {
        case WORD_FINDED:
            const { word } = action;
            return {
                ...state,
                words: state.words.filter(w => w !== word),
                words_finded: [...state.words_finded, word]
            };
        case SET_WORDS_TO_FIND:
            return {
                ...state,
                words: action.words
            };
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    letterReducer,
    wordReducer
})