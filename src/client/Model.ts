let balance: number = 0;
let bets: number[] = [];
let currentBet: number = 0;
let reels: number[][] = [];
let reelStops: number[] = [0, 0, 0, 0, 0];
let win: number = 0;
let startReelsStopping: boolean = false;
type winData = {
    paylineID: number,
    symID: number,
    symCount: number,
    winAmount: number
}
let wins: winData[] = [];

export const getBalance = (): number => balance;
export const getBets = (): number[] => bets;
export const getCurrentBet = (): number => currentBet;
export const getReels = (): number[][] => reels;
export const getReelStops = (): number[] => reelStops;
export const getWin = (): number => win;
export const getStartReelsStopping = (): boolean => startReelsStopping;
export const getWinDetails = (): winData[] => wins;

export const setBalance = (val: number): void => {
    balance = val;
}
export const setBets = (val: number[]): void => {
    bets = val;
}
export const setCurrentBet = (val: number): void => {
    currentBet = val;
}
export const setReels = (value: number[][]): void => {
    reels = value;
};
export const setReelStops = (value: number[]): void => {
    reelStops = value;
};
export const setWin = (value: number): void => {
    win = value;
};
export const setStartReelsStopping = (value: boolean): void => {
    startReelsStopping = value;
};
export const setWinDetails = (value: winData[]): void => {
    wins = value;
};