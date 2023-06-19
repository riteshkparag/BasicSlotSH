import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getReels, getReelStops, setStartReelsStopping } from "./Model";
import Reel from "./Reel";
import Resize from "./Resize";

export default class ReelsContainer extends Resize {
    private reelsPanel: PIXI.Container;
    private reelsContainer: PIXI.Container;
    private reelBG: PIXI.Sprite;
    private reels: Array<Reel> = [];
    private symTextures: Array<PIXI.Texture> = [];
    private game: PIXI.Application;
    private reelStops: number[] = [];

    constructor(game: PIXI.Application) {
        super();
        this.game = game;
        this.init();
        this.resize();
    }

    private init(): void {
        this.reelsPanel = new PIXI.Container();
        this.reelsPanel.pivot.set(Constant.GAME_WIDTH / 2, Constant.GAME_HEIGHT / 2);
        this.game.stage.addChild(this.reelsPanel);

        this.reelsContainer = new PIXI.Container();
        this.reelsPanel.addChild(this.reelsContainer);
        this.reelsContainer.x = Constant.REELS_PANEL_OFFSET_X
        this.reelsContainer.y = Constant.REELS_PANEL_OFFSET_Y

        // const reelMask: PIXI.Graphics = new PIXI.Graphics();
        // reelMask.beginFill(0x000000, 0.5);
        // reelMask.drawRect(0, 54, 405, 213);
        // reelMask.endFill();
        // this.reelsContainer.addChild(reelMask);
        // this.reelsContainer.mask = reelMask;

        const reelBGTexture = this.game.loader.resources!.reel.texture;
        this.reelBG = new PIXI.Sprite(reelBGTexture);
        this.reelBG.y = 54;
        this.reelsContainer.addChild(this.reelBG);


        for (let i: number = 0; i < Constant.NUM_OF_REELS; i++) {
            const reel: Reel = new Reel(this.game);
            this.reels.push(reel);
            reel.getReelContainer().x = Constant.REELS_OFFSET_X + ((Constant.SYMBOL_WIDTH + Constant.REELS_GAP) * i);
            this.reelsContainer.addChild(reel.getReelContainer());
        }
        this.setReelStops();
    }

    private setReelStops(): void {
        const reels: number[][] = getReels();
        this.reelStops = [...getReelStops()];

        this.reelStops.forEach((pos: number, i: number) => {
            this.reels[i].showStaticReel(pos, i);
        });
    }

    public async updateReels(): Promise<void> {
        const startTIme = Date.now();
        console.log("Start Spin");
        const spinStartPromises: Array<Promise<void>> = this.reels.map((reel: Reel, i: number): Promise<void> => {
            return new Promise<void>((resolve) => {
                const startDelay: number = 250 * i;
                setTimeout(() => {
                    console.log("reel: ", i);
                    reel.spinStart(this.reelStops[i], i).then(() => {
                        resolve();
                    });
                    if (i === this.reels.length - 1) {
                        setTimeout(() => {
                            setStartReelsStopping(true);
                            this.reelStops = [...getReelStops()];
                        }, 500)
                    }
                }, startDelay + 16);
            });
        });
        await Promise.all(spinStartPromises);
        const endTime = Date.now();
        const totalTime = endTime - startTIme;
        console.log("Spinning Done: ", totalTime);
        setStartReelsStopping(false);
    }

    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.reelsPanel.scale.set(scale);
        this.reelsPanel.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }
}