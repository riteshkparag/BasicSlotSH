import { resolve } from "path";
import { getCurrentBet, setBalance, setBets, setCurrentBet, setReels, setReelStops, setWin, setWinDetails } from "./Model";

export default class ServerComms {
    public async sendInitReq(): Promise<void> {
        const port = 3000;
        const result = await fetch(`http://localhost:${port}/init`);
        const data = await result.json();
        console.log(data);
        this.parseInitResponse(data);
    }

    public async sendSpinReq(): Promise<void> {
        const port = 3000;
        const result = await fetch(`http://localhost:${port}/spin`, {
            method: "POST",
            body: JSON.stringify({
                currentBet: getCurrentBet()
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
        const data = await result.json();
        console.log(data);
        this.parseSpinResponse(data);
    }

    private parseInitResponse(data: InitData): void {
        setBalance(data.balance);
        setBets(data.bets);
        setCurrentBet(data.currentBet);
        setReels(data.reels);
        setReelStops(data.defaultReelStops);
    }

    private parseSpinResponse(data: SpinData): void {
        setBalance(data.balance);
        setCurrentBet(data.currentBet);
        setReelStops(data.reelStops);
        setWin(data.win);
        setWinDetails(data.winDetails);
    }
}

interface InitData {
    balance: number,
    bets: number[],
    currentBet: number,
    reels: number[][],
    defaultReelStops: number[]
}

type winData = {
    paylineID: number,
    symID: number,
    symCount: number,
    winAmount: number
}
interface SpinData {
    balance: number,
    currentBet: number,
    reelStops: number[];
    win: number;
    winDetails: winData[];
}