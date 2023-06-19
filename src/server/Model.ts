let reels: number[][] = [
    [4, 1, 3, 4, 0, 2, 3, 4, 3, 2, 4, 2, 4, 3, 0, 3, 1, 2, 4, 1],
    [4, 1, 3, 4, 0, 2, 3, 4, 3, 2, 4, 2, 4, 3, 0, 3, 1, 2, 4, 1],
    [4, 1, 3, 4, 0, 2, 3, 4, 3, 2, 4, 2, 4, 3, 0, 3, 1, 2, 4, 1]
];

let balance: number = 99999;

let bets: number[] = [1, 2, 3, 4, 5];

let currentBet: number = 1;

let symbolsBaseWin: number[] = [100, 50, 30, 20, 10];

let defaultReelStops: number[] = [2, 5, 7]; // Non winnng stops for init screen

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
