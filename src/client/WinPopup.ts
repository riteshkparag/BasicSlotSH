import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getWin } from "./Model";
import Resize from "./Resize";

export default class WinPopup extends Resize {
    private popupContainer: PIXI.Container;
    private game: PIXI.Application;
    private winText: PIXI.Text;
    private winValue: PIXI.Text;
    private winningSiren: PIXI.AnimatedSprite;
    private winningSirenIdle: PIXI.Sprite;

    constructor(game: PIXI.Application) {
        super();
        this.game = game;
        this.init();
        this.resize();
    }

    private init(): void {
        this.popupContainer = new PIXI.Container();
        this.popupContainer.pivot.set(Constant.GAME_WIDTH / 2, Constant.GAME_HEIGHT / 2);
        this.game.stage.addChild(this.popupContainer);

        const winTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 64,
            fill: 'yellow',
            align: 'center',
        });
        this.winText = new PIXI.Text(Constant.WIN, winTextStyle);
        this.winText.x = (Constant.GAME_WIDTH - this.winText.width) / 2;
        this.winText.y = 1040;
        this.popupContainer.addChild(this.winText);

        const winValueStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 64,
            fill: 'yellow',
            align: 'center',
        });
        this.winValue = new PIXI.Text("", winValueStyle);
        this.winValue.x = (Constant.GAME_WIDTH - this.winValue.width) / 2;
        this.winValue.y = 1100;
        this.popupContainer.addChild(this.winValue);

        this.createWinningSirenAnim();
    }

    private createWinningSirenAnim(): void {
        const sirenTexture: PIXI.Texture[] = [];
        for (let i: number = 1; i <= 7; i++) {
            sirenTexture.push(this.game.loader.resources!["winningSiren" + i].texture);
        }
        this.winningSiren = new PIXI.AnimatedSprite(sirenTexture);
        this.winningSiren.x = 264;
        this.winningSiren.y = 0;
        this.winningSiren.loop = true;
        this.winningSiren.animationSpeed = 0.20;
        this.winningSiren.visible = false;
        this.popupContainer.addChild(this.winningSiren);
        
        const sirenIdleTexture: PIXI.Texture = this.game.loader.resources!.winningSirenIdle.texture;
        this.winningSirenIdle = new PIXI.Sprite(sirenIdleTexture);
        this.winningSirenIdle.x = 264;
        this.winningSirenIdle.y = 0;
        this.popupContainer.addChild(this.winningSirenIdle);
    }

    public async showWin(): Promise<void> {
        this.winValue.text = String(getWin());
        this.winValue.x = (Constant.GAME_WIDTH - this.winText.width) / 2;
        await new Promise((resolve, reject) => {
            this.winningSiren.visible = true;
            this.winningSiren.play();
            let loopCount = 0;
            this.winningSiren.onLoop  = () => {
                loopCount++;
                if (loopCount === 4) {
                    this.winningSiren.stop();
                    this.winningSiren.visible = false;
                    this.winValue.text = "";
                    resolve(true);
                }
            };
        });

    }

    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.popupContainer.scale.set(scale);
        this.popupContainer.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }
}