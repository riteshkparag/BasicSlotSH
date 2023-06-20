let reels: number[][] = [
    [1, 6, 6, 0, 0, 4, 0, 3, 4, 2, 1, 2, 7, 3, 4, 1, 7, 4, 6, 1],
    [0, 5, 6, 5, 4, 4, 7, 4, 4, 3, 6, 1, 4, 6, 0, 4, 5, 7, 6, 5],
    [4, 1, 6, 7, 2, 1, 5, 1, 1, 4, 2, 4, 0, 5, 2, 1, 3, 0, 5, 7],
    [1, 5, 2, 5, 7, 7, 2, 5, 7, 0, 4, 0, 5, 2, 5, 6, 1, 4, 2, 5],
    [6, 7, 1, 2, 3, 0, 2, 1, 1, 3, 3, 1, 5, 3, 0, 5, 0, 5, 3, 7]
];

const numOfReels: number = 5;

let balance: number = 99999;

let bets: number[] = [1, 2, 3, 4, 5];

let currentBet: number = 1;

let symbolsBaseWin: number[] = [100, 50, 30, 20, 10];

let defaultReelStops: number[] = [0, 0, 0, 0, 0]; // stops for init screen

let reelStops: number[] = [];

let win: number = 0;

export const resetData = (): void => {
    reelStops = [];
}

export const getReels = (): number[][] => reels;
export const getBalance = (): number => balance;
export const getBets = (): number[] => bets;
export const getCurrentBet = (): number => currentBet;
export const getSymbolsBaseWin = (): number[] => symbolsBaseWin;
export const getDefaultReelStops = (): number[] => defaultReelStops;
export const getReelStops = (): number[] => reelStops;
export const getWinAmount = (): number => win;
export const getNumOfReels = (): number => numOfReels;

export const setBalance = (val: number): void => {
    balance = val;
}
export const setCurrentBet = (val: number): void => {
    currentBet = val;
}
export const setReelStops = (val: number[]): void => {
    reelStops = val;
}
export const setWinAmount = (val: number): void => {
    win = val;
}
