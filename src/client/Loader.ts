import * as PIXI from "pixi.js";
import Resize from "./Resize";

export default class Loader extends Resize{
    public loader: PIXI.Loader;
    private game: PIXI.Application;
    private loadingText: PIXI.Text;
    private loadingContainer: PIXI.Container;
    constructor (game: PIXI.Application, onAssetsLoaded: () => void) {
        super();
        this.loader = game.loader;
        this.game = game;
        this.startLoading(onAssetsLoaded);
        this.loadingContainer = new PIXI.Container();
        this.game.stage.addChild(this.loadingContainer);
        this.initLoaderText();
        this.resize();
    }

    /**
     * To start loading
     */
    private startLoading(onAssetsLoaded: () => void): void {
        this.addAssetsToLoader();
        this.loader.load(() => {
            onAssetsLoaded();
        });
    }
    /**
     * Init loading progress text
     */
    private initLoaderText(): void {
        const loadingTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 56,
            fill: 'yellow',
            align: 'center',
            "stroke": "#000000",
            "strokeThickness": 5
        });
        this.loadingText = new PIXI.Text("", loadingTextStyle);
        this.loadingContainer.addChild(this.loadingText);
        
        this.indicateLoadingProgress();
    }
    /**
     * To start showing loading progress
     */
    private indicateLoadingProgress(): void {
        this.loader.onProgress.add(() => {
            this.loadingText.text = "LOADING: " + String(Math.floor(this.loader.progress)) + "%";
            this.loadingText.x = -this.loadingText.width/2;
            this.loadingText.y = -this.loadingText.height/2;
            this.resize();
        });
        this.loader.onComplete.add(() => {
            this.loadingText.text = "LOADING: 100%";
            this.loadingText.visible = false;
        });
    }
    /**
     * To add assets to load
     */
    private addAssetsToLoader(): void {
        this.loader.add("background", "./images/slot_machine_background.png");
        this.loader.add("sym0", "./images/hv1_symbol.png");
        this.loader.add("sym1", "./images/hv2_symbol.png");
        this.loader.add("sym2", "./images/hv3_symbol.png");
        this.loader.add("sym3", "./images/hv4_symbol.png");
        this.loader.add("sym4", "./images/lv1_symbol.png");
        this.loader.add("sym5", "./images/lv2_symbol.png");
        this.loader.add("sym6", "./images/lv3_symbol.png");
        this.loader.add("sym7", "./images/lv4_symbol.png");
        this.loader.add("spin_button", "./images/spin_button.png");
        this.loader.add("spinLever1", "./images/hand_lever_frame_1.png");
        this.loader.add("spinLever2", "./images/hand_lever_frame_2.png");
        this.loader.add("spinLever3", "./images/hand_lever_frame_3.png");
        this.loader.add("spinLever4", "./images/hand_lever_frame_4.png");
        this.loader.add("spinLever5", "./images/hand_lever_frame_5.png");
        this.loader.add("spinLever6", "./images/hand_lever_frame_6.png");
        this.loader.add("spinLever7", "./images/hand_lever_frame_7.png");
        this.loader.add("spinLever8", "./images/hand_lever_frame_8.png");
        this.loader.add("spinLever9", "./images/hand_lever_frame_9.png");
        this.loader.add("spinLever10", "./images/hand_lever_frame_10.png");
        this.loader.add("lightArrow1", "./images/lights_arrows_frame_1.png");
        this.loader.add("lightArrow2", "./images/lights_arrows_frame_2.png");
        this.loader.add("lightArrow3", "./images/lights_arrows_frame_3.png");
        this.loader.add("lightArrow4", "./images/lights_arrows_frame_4.png");
        this.loader.add("lightArrow5", "./images/lights_arrows_frame_5.png");
        this.loader.add("winningSirenIdle", "./images/winning_siren_light_idle.png");
        this.loader.add("winningSiren1", "./images/winning_siren_light_frame_1.png");
        this.loader.add("winningSiren2", "./images/winning_siren_light_frame_2.png");
        this.loader.add("winningSiren3", "./images/winning_siren_light_frame_3.png");
        this.loader.add("winningSiren4", "./images/winning_siren_light_frame_4.png");
        this.loader.add("winningSiren5", "./images/winning_siren_light_frame_5.png");
        this.loader.add("winningSiren6", "./images/winning_siren_light_frame_6.png");
        this.loader.add("winningSiren7", "./images/winning_siren_light_frame_7.png");
    }
    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / 1520, window.innerHeight / 1920);
        this.loadingContainer.scale.set(scale);
        this.loadingContainer.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }
}