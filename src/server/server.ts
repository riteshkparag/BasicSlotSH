import express from "express";
import * as path from "path";
import * as _ from "lodash";
import { getBalance, getBets, getCurrentBet, getDefaultReelStops, getNumOfReels, getReels, getSymbolsBaseWin, getWinAmount, setBalance, setCurrentBet, setWinAmount } from "./Model";

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
        win: getWinAmount()
    };
    for (let i = 0; i < getNumOfReels(); i++) {
        const num = Math.floor(Math.random() * getReels()[i].length);
        reelStops.push(num);
    }
    result.reelStops = reelStops;
    result.win = checkWin(reelStops);
    setBalance(getBalance() + result.win);
    result.balance = getBalance();
    return result;
};

const checkWin = (reelStops: number[]) => {
    const reelGrid: number[] = [];
    reelStops.forEach((stop, i) => {
        reelGrid.push(getReels()[i][stop]);
    })
    const winSym: number[] = _.sortedUniq(reelGrid);
    winSym.length === 1 ? setWinAmount(getCurrentBet() * getSymbolsBaseWin()[winSym[0]]) : setWinAmount(0);
    return getWinAmount();
}

app.use('/', router);
app.listen(port);
console.log(`Listening on port ${port}`);
