export interface Letter {
    letter: string;
    x: number;
    y: number;
}
// STORE
export interface ApplicationState {
    words: Array<string>;
    words_finded: Array<string>;
    active_letters: Array<Letter>;
}

// ACTIONS

export const SET_ACTIVE_LETTER = "SET_ACTIVE_LETTER";
export type SET_ACTIVE_LETTER = typeof SET_ACTIVE_LETTER;
export interface SetActiveLetterAction {
    type: typeof SET_ACTIVE_LETTER;
    letter: string;
    x?: number;
    y?: number;
}

export const SET_INACTIVE_LETTER = "SET_INACTIVE_LETTER";
export type SET_INACTIVE_LETTER = typeof SET_INACTIVE_LETTER;
export interface SetInactiveLetterAction {
    type: typeof SET_INACTIVE_LETTER;
    letter: string;
    x?: number;
    y?: number;
}
export type LetterActions = SetInactiveLetterAction | SetActiveLetterAction;


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

export type AppActions = LetterActions | WordActions;