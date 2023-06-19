import { posix } from "path";
import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getReels, getReelStops, getStartReelsStopping, setStartReelsStopping } from "./Model";

export default class Reel {
    private reelContainer: PIXI.Container;
    private symTextures: Array<PIXI.Texture> = [];
    private game: PIXI.Application;
    private ticker: PIXI.Ticker;
    private speed: number = 40;
    private currentPos: number = 0;
    private reel: number[] = [];

    constructor(game: PIXI.Application) {
        this.game = game;
        this.ticker = game.ticker;
        this.init();
    }

    private init(): void {
        this.reelContainer = new PIXI.Container();
        this.addSymbolsTexture();
    }

    private addSymbolsTexture(): void {
        for (let i = 0; i < Constant.SYMBOLS_COUNT; i++) {
            this.symTextures.push(this.game.loader.resources!["sym" + i].texture);
        }
    }

    public getReelContainer(): PIXI.Container {
        return this.reelContainer;
    }

    public showStaticReel(pos: number, reelID: number): void {
        this.reel = getReels()[reelID];
        const reelStartPos: number = pos === 0 ? this.reel.length - 1 : pos - 1;
        for (let i: number = 0; i < Constant.NUM_OF_ROWS; i++) {
            const reelPos: number = (reelStartPos + i) > (this.reel.length - 1) ? ((reelStartPos + i) - this.reel.length) : reelStartPos + i;
            const symbol: PIXI.Sprite = new PIXI.Sprite(this.symTextures[this.reel[reelPos]]);
            symbol.y = Constant.SYMBOL_HEIGHT * i;
            this.reelContainer.addChild(symbol);
        }
    }

    public removeReelSymbols(): void {
        this.reelContainer.removeChildren();
    }

    public spinStart(pos: number, reelID: number): Promise<void> {
        return new Promise<void>((resolve) => {
            this.reel = getReels()[reelID];
            this.currentPos = pos === 0 ? this.reel.length - 2 : pos === 1 ? this.reel.length - 1 : pos - 2;
            const symbol: PIXI.Sprite = new PIXI.Sprite(this.symTextures[this.reel[this.currentPos]]);
            symbol.y = -Constant.SYMBOL_HEIGHT;
            this.reelContainer.addChild(symbol);
            this.spin(reelID).then(() => {
                resolve();
            });
        });
    }

    private spin(reelID: number): Promise<void> {
        const reelStoppingPos: number = getReelStops()[reelID] === this.reel.length - 1 ? 0 : getReelStops()[reelID] + 1;
        let stoppingCouner: number = 0;
        return new Promise<void>((resolve) => {
            const tick = (): void => {
                this.reelContainer.children.forEach((sym: PIXI.Sprite, i: number) => {
                    if (getStartReelsStopping()) {
                        stoppingCouner === 0 && (this.currentPos = reelStoppingPos);
                        if (sym.y + this.speed >= Constant.SYMBOL_HEIGHT * Constant.NUM_OF_ROWS) {
                            if (stoppingCouner === Constant.NUM_OF_ROWS) {
                                this.ticker.remove(tick);
                                sym.y = Constant.SYMBOL_HEIGHT * Constant.NUM_OF_ROWS;
                                this.reelContainer.removeChild(sym);
                                this.removeReelSymbols();
                                this.showStaticReel(getReelStops()[reelID], reelID);
                                resolve();
                            } else {
                                sym.y = Constant.SYMBOL_HEIGHT * Constant.NUM_OF_ROWS;
                                this.reelContainer.removeChild(sym);
                                this.currentPos = this.currentPos === 0 ? this.reel.length - 1 : this.currentPos - 1;
                                const symbol: PIXI.Sprite = new PIXI.Sprite(this.symTextures[this.reel[this.currentPos]]);
                                symbol.y = -Constant.SYMBOL_HEIGHT;
                                this.reelContainer.addChildAt(symbol, 0);
                                stoppingCouner++;
                            }
                        } else {
                            sym.y += this.speed;
                        }
                    } else {
                        sym.y += this.speed;
                        if (sym.y > Constant.SYMBOL_HEIGHT * Constant.NUM_OF_ROWS) {
                            this.reelContainer.removeChild(sym);
                            this.currentPos = this.currentPos === 0 ? this.reel.length - 1 : this.currentPos - 1;
                            const symbol: PIXI.Sprite = new PIXI.Sprite(this.symTextures[this.reel[this.currentPos]]);
                            symbol.y = -Constant.SYMBOL_HEIGHT;
                            this.reelContainer.addChildAt(symbol, 0);
                        }
                    }
                })
            }
            this.ticker.add(tick);
        });
    }
}