import { LetterActions, SET_ACTIVE_LETTER, SET_INACTIVE_LETTER, WORD_FINDED, WordActions, SET_WORDS_TO_FIND, LettersState, WordsState, GameplayState, GameOverAction, GAME_OVER_ACTION } from '../types/types';
import { combineReducers } from 'redux';
import { compareLetters } from '../utils';

//STATES
const initLettersState: LettersState = {
    activeLetters: []
};
const initWordsState: WordsState = {
    words: [],
    wordsFinded: [],
    wordsFindedCounter: 0
};
const initGameplayState: GameplayState = {
    playing: true,
    win: false
}
export const letterReducer = (state: LettersState = initLettersState, action: LetterActions): LettersState => {
    const { letter, id, type } = action;
    switch (type) {
        case SET_ACTIVE_LETTER:
            return {
                ...state,
                activeLetters: [
                    ...state.activeLetters,
                    { letter, id }
                ]
            };
        case SET_INACTIVE_LETTER:
            return {
                ...state,
                activeLetters: state.activeLetters.filter(al => !compareLetters(al, { letter, id }))
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
                // words: state.words.filter(w => w !== word),
                wordsFindedCounter: state.wordsFindedCounter + 1,
                wordsFinded: [...state.wordsFinded, word]
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
export const gameOverReducer = (state: GameplayState = initGameplayState, action: GameOverAction): GameplayState => {
    const { type } = action;
    switch (type) {
        case GAME_OVER_ACTION:
            return { ...state, win: action.win, playing: false };
        default:
            return state;
    }
}
export const rootReducer = combineReducers({
    letterReducer,
    wordReducer,
    gameOverReducer
})