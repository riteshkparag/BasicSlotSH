import * as PIXI from "pixi.js";

export default class Loader {
    public loader: PIXI.Loader;

    constructor (game: PIXI.Application, onAssetsLoaded: () => void) {
        this.loader = game.loader;
        this.addAssetsToLoader();
        this.loader.load(() => {
            onAssetsLoaded();
        });
    }

    private addAssetsToLoader(): void {
        this.loader.add("background", "./images/slot_machine_background.png");
        this.loader.add("reel", "./images/slot_machine_reels.png");
        this.loader.add("sym0", "./images/icon_1.png");
        this.loader.add("sym1", "./images/icon_2.png");
        this.loader.add("sym2", "./images/icon_3.png");
        this.loader.add("sym3", "./images/icon_4.png");
        this.loader.add("sym4", "./images/icon_5.png");
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
}