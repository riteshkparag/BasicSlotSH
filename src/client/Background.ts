import * as PIXI from 'pixi.js';
import Constant from './Constants';
import Resize from './Resize';

export default class Background extends Resize {
    private game: PIXI.Application;
    private bgContainer: PIXI.Container;
    private background: PIXI.Sprite;

    constructor(game: PIXI.Application) {
        super();
        this.game = game;
        this.init();
        this.resize();
    }

    private init(): void {
        this.bgContainer = new PIXI.Container();
        this.game.stage.addChild(this.bgContainer);

        const bgTexture = this.game.loader.resources!.background.texture;
        this.background = new PIXI.Sprite(bgTexture);
        this.bgContainer.addChild(this.background);
        this.background.position.set(-744, -824);
    }

    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.bgContainer.scale.set(scale);
        this.bgContainer.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }
}