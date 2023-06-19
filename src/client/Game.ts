import * as PIXI from "pixi.js";
import * as _ from "lodash";
import Resize from "./Resize";
import Background from "./Background";
import Loader from "./Loader";
import { getBalance, getCurrentBet, getReelStops, getWin, setBalance } from "./Model";
import ReelsContainer from "./ReelsContainer";
import ServerComms from "./ServerComms";
import ConsolePanel from "./ConsolePanel";
import WinPopup from "./WinPopup";
import Constant from "./Constants";

export default class Game extends Resize {
    public game: PIXI.Application;
    private consolePanel: ConsolePanel;
    private serverComms: ServerComms;
    private reelsContainer: ReelsContainer;
    private winPopup: WinPopup;

    constructor() {
        super();
        this.game = new PIXI.Application({ width: Constant.GAME_WIDTH, height: Constant.GAME_HEIGHT });
        // @ts-ignore
        globalThis.__PIXI_APP__ = this.game; // For using PIXIJS dev tools
        window.document.body.appendChild(this.game.view);
        this.loadAssets();
        this.resize();
    }

    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.game.renderer.resize(Constant.GAME_WIDTH * scale, Constant.GAME_HEIGHT * scale);
    }

    private loadAssets(): void {
        new Loader(this.game, this.initRequest.bind(this));
    }

    private initRequest(): void {
        this.initialiseServerComms();
        this.serverComms.sendInitReq().then(() => {
            console.log(getReelStops());
            this.init();
        });
    }

    private init(): void {
        this.iniitaliseBackground();
        this.initialiseSpinBtn();
        this.initialiseReels();
        this.initialiseWinPopup();
    }

    private iniitaliseBackground(): void {
        new Background(this.game);
    }

    private initialiseSpinBtn(): void {
        this.consolePanel = new ConsolePanel(this.game, this.onSpinClicked.bind(this));
    }

    private initialiseServerComms(): void {
        this.serverComms = new ServerComms();
    }

    private initialiseReels(): void {
        this.reelsContainer = new ReelsContainer(this.game);
    }

    private initialiseWinPopup(): void {
        this.winPopup = new WinPopup(this.game);
    }

    private onSpinClicked(): void {
        this.consolePanel.disableSpinBtn();
        this.consolePanel.playLeverAnim(() => {
            setBalance(getBalance() - getCurrentBet());
            this.consolePanel.updateBalance();
            this.serverComms.sendSpinReq().then(() => {
                this.reelsContainer.updateReels().then(() => {
                    this.consolePanel.updateBalance();
                    getWin() > 0 ? this.showWin() : setTimeout(() => {
                        this.consolePanel.enableSpinBtn();
                    }, 500);
                });
            });
        });
    }

    private showWin(): void {
        this.winPopup.showWin().then(() => {
            this.consolePanel.enableSpinBtn();
        });
    }
}