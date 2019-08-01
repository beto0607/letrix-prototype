import { ApplicationState, LetterActions, SET_ACTIVE_LETTER, SET_INACTIVE_LETTER, WORD_FINDED, WordActions, SET_WORDS_TO_FIND } from '../types/types';

// Initial state
const initState: ApplicationState = {
    words: [],
    words_finded: [],
    active_letters: []
};
export const letterReducer = (state: ApplicationState = initState, action: LetterActions): ApplicationState => {
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
                active_letters: state.active_letters.filter(al => !(al.letter === letter && al.y === y && al.x === x))
            };
        default:
            return state;
    }
}
export const wordReducer = (state: ApplicationState = initState, action: WordActions): ApplicationState => {
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