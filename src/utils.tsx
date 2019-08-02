import { Letter } from "./types/types";

export function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}
export function getRandomItem<T>(a: Array<T>): T {
    return a[Math.floor(Math.random() * a.length)];
}

export function getLetters(words: Array<string>, shuffleResult: boolean = false): Array<string> {
    let ret: Array<string> = [];
    shuffle(words).forEach(word => {
        ret = [...ret, ...word.split('')];
    });
    return shuffleResult ? shuffle(ret) : ret;
}

export const compareLetters = (a: Letter, b: Letter): boolean => (a.id === b.id);
