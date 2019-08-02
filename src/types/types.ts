import { rootReducer } from "../reducers/reducers";

export interface Letter {
    letter: string;
    id: string;
}
// STORE
export interface WordsState {
    words: Array<string>;
    wordsFinded: Array<string>;
    wordsFindedCounter: number;
}
export interface LettersState {
    activeLetters: Array<Letter>;
}
export interface GameplayState{
    playing: boolean;
    win: boolean;
}
// export type ApplicationState = WordsState & LettersState;
export type ApplicationState = ReturnType<typeof rootReducer>


// ACTIONS
// LETTERS ACTIONS
export const SET_ACTIVE_LETTER = "SET_ACTIVE_LETTER";
export type SET_ACTIVE_LETTER = typeof SET_ACTIVE_LETTER;
export interface SetActiveLetterAction extends Letter {
    type: typeof SET_ACTIVE_LETTER;
}

export const SET_INACTIVE_LETTER = "SET_INACTIVE_LETTER";
export type SET_INACTIVE_LETTER = typeof SET_INACTIVE_LETTER;
export interface SetInactiveLetterAction extends Letter {
    type: typeof SET_INACTIVE_LETTER;
}
export type LetterActions = SetInactiveLetterAction | SetActiveLetterAction;

// WORDS ACTIONS
export const WORD_FINDED = "WORD_FINDED";
export type WORD_FINDED = typeof WORD_FINDED;

export interface WordFindedAction {
    type: typeof WORD_FINDED;
    word: string;
}
export const SET_WORDS_TO_FIND = "SET_WORDS_TO_FIND";
export type SET_WORDS_TO_FIND = typeof SET_WORDS_TO_FIND;

export interface SetWordsToFindAction {
    type: typeof SET_WORDS_TO_FIND;
    words: Array<string>;
}

export type WordActions = WordFindedAction | SetWordsToFindAction;
// WIN-LOSE ACTIONS
export const WIN_ACTION = "WIN_ACTION";
export type WIN_ACTION = typeof WIN_ACTION;
export interface WinAction {
    type: typeof WIN_ACTION;
}

export const LOSE_ACTION = "LOSE_ACTION";
export type LOSE_ACTION = typeof LOSE_ACTION;
export interface LoseAction {
    type: typeof LOSE_ACTION;
}
export type WinLoseActions = WinAction | LoseAction;


export type AppActions = LetterActions | WordActions | WinLoseActions;