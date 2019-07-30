
export function shuffle<T>(a: Array<T>): Array<T> {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export function getLetters(words: Array<string>): Array<string> {
    let ret: Array<string> = [];
    shuffle(words).forEach(word => {
        ret = [...ret, ...word.split('')];
    });
    return shuffle(ret);
}