import express from "express";
import * as path from "path";
import * as _ from "lodash";
import { clearWinDetails, getBalance, getBets, getCurrentBet, getDefaultReelStops, getNumOfReels, getPaylines, getPayout, getReels, getSymPerReel, getWinAmount, getWinDetails, setBalance, setCurrentBet, setWinAmount, setWinDetails } from "./Model";

const port = 3000;
const app = express();
const router = express.Router();
var bodyParser = require('body-parser');
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../public")));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/init', (req, res) => {
    res.setHeader("Content-Type", "application/json");
    const result = initResponse();
    res.send(JSON.stringify(result));
});

router.post('/spin', (req, res) => {
    req.body && req.body.currentBet && req.body.currentBet > 0 && setCurrentBet(req.body.currentBet);
    setBalance(getBalance() - getCurrentBet());
    setWinAmount(0);
    const result = spinResponse();
    res.send(JSON.stringify(result));
});

const initResponse = () => {
    let result = {
        balance: getBalance(),
        bets: getBets(),
        currentBet: getCurrentBet(),
        reels: getReels(),
        defaultReelStops: getDefaultReelStops()
    };
    return result;
};

const spinResponse = () => {
    let reelStops: number[] = [];
    let result = {
        balance: getBalance(),
        currentBet: getCurrentBet(),
        reelStops: reelStops,
        totalWin: getWinAmount(),
        wins: getWinDetails()
    };
    for (let i = 0; i < getNumOfReels(); i++) {
        const num = Math.floor(Math.random() * getReels()[i].length);
        reelStops.push(num);
    }
    result.reelStops = reelStops;
    result.totalWin = checkWin(reelStops);
    setBalance(getBalance() + result.totalWin);
    result.balance = getBalance();
    return result;
};

const checkWin = (reelStops: number[]) => {
    clearWinDetails();
    const reelGrid: number[][] = getReelGrid(reelStops);
    console.log(reelStops);
    calculateWins(reelGrid, reelStops);
    return getWinAmount();
}

const getReelGrid = (reelStops: number[]) => {
    let reelGrid: number[][] = [];
    const numOfReels = getNumOfReels();
    const reelSet: number[][] = getReels();
    for (let i = 0; i < numOfReels; i++) {
        let reel: number[] = [];
        for (let j: number = 0; j < getSymPerReel(); j++) {
            const pos: number = (reelStops[i] + j) > (reelSet[i].length - 1) ? (reelStops[i] + j - reelSet[i].length) : reelStops[i] + j;
            reel.push(reelSet[i][pos]);
        }
        reelGrid.push(reel);
        console.log(reel);
    }
    return reelGrid;
};

const calculateWins = (reelGrid: number[][], reelStops: number[]) => {
    const numOfReels = getNumOfReels();
    const paylines = getPaylines();
    let totalWin: number = 0;
    for (let i = 0; i < paylines.length; i++) {
        let symcount: number = 0;
        const payline = paylines[i];
        let j: number = 1;
    
        while (j < numOfReels && reelGrid[j][payline[j]] === reelGrid[j - 1][payline[j - 1]]) {
            symcount = ++j;
        }
    
        if (symcount > 2) {
            const symID: number = reelGrid[0][payline[0]];
            const paylineID: number = i;
            const payout = getPayout()[symID][symcount - 3];
            const win: number = getCurrentBet() * payout;
            totalWin += win;
            setWinDetails(paylineID, symID, symcount, win);
            console.log(`Payline ${paylineID}, symID: ${symID} x${symcount}, Win = ${win}`);
        }
    }    
    setWinAmount(totalWin);
};

app.use('/', router);
app.listen(port);
console.log(`Listening on port ${port}`);
