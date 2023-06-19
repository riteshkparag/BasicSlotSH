import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getBalance } from "./Model";
import Resize from "./Resize";

export default class ConsolePanel extends Resize {
    private game: PIXI.Application;
    private btnContainer: PIXI.Container;
    private btn: PIXI.AnimatedSprite;
    private btnTexture: PIXI.Texture[] = [];
    private arrowLight: PIXI.AnimatedSprite;
    private arrowTexture: PIXI.Texture[] = [];
    private balanceText: PIXI.Text;
    private balanceValue: PIXI.Text;
    private onClick: () => void;

    constructor(game: PIXI.Application, callback: () => void) {
        super();
        this.game = game;
        this.onClick = callback;
        this.init();
        this.resize();
    }

    private init(): void {
        this.btnContainer = new PIXI.Container();
        this.btnContainer.pivot.set(Constant.GAME_WIDTH / 2, Constant.GAME_HEIGHT / 2);
        this.game.stage.addChild(this.btnContainer);
        this.createBalanceText();
        this.createSpinLever();
        this.createArrowLight();
        this.bindBtnEvents();
    }

    private createBalanceText(): void {
        const balanceTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fill: 'yellow',
            align: 'center',
        });
        this.balanceText = new PIXI.Text(Constant.BALANCE, balanceTextStyle);
        this.balanceText.x = 4;
        this.balanceText.y = 4;
        this.btnContainer.addChild(this.balanceText);

        const balanceValueStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fill: 'yellow',
            align: 'center',
        });
        this.balanceValue = new PIXI.Text(String(getBalance()), balanceValueStyle);
        this.balanceValue.x = 4;
        this.balanceValue.y = 50;
        this.btnContainer.addChild(this.balanceValue);
    }

    public updateBalance(): void {
        this.balanceValue.text = String(getBalance());
    }

    private createSpinLever(): void {
        for (let i: number = 1; i <= 10; i++) {
            this.btnTexture.push(this.game.loader.resources!["spinLever" + i].texture);
        }
        this.btn = new PIXI.AnimatedSprite(this.btnTexture);
        this.btn.x = 670;
        this.btn.y = 340;
        this.btn.loop = false;
        this.btn.animationSpeed = 0.25;
        this.btn.interactive = true;
        this.btn.buttonMode = true;
        this.btnContainer.addChild(this.btn);
    }

    private createArrowLight(): void {
        for (let i: number = 1; i <= 5; i++) {
            this.arrowTexture.push(this.game.loader.resources!["lightArrow" + i].texture);
        }
        this.arrowLight = new PIXI.AnimatedSprite(this.arrowTexture);
        this.arrowLight.x = 624;
        this.arrowLight.y = 520;
        this.arrowLight.loop = true;
        this.arrowLight.animationSpeed = 0.20;
        this.arrowLight.play();
        this.btnContainer.addChild(this.arrowLight);
    }

    private bindBtnEvents(): void {
        this.btn.addListener("click", this.onClick);
        this.btn.addListener("touchend", this.onClick);
    }

    public enableSpinBtn(): void {
        this.btn.gotoAndStop(0);
        this.btn.interactive = true;
        this.arrowLight.play();
    }

    public disableSpinBtn(): void {
        this.btn.interactive = false;
    }

    public playLeverAnim(callback: () => void): void {
        this.btn.play();
        this.btn.onComplete = () => {
            console.log("lever down");
            this.arrowLight.stop();
            callback();
        };
    }

    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.btnContainer.scale.set(scale);
        this.btnContainer.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }

}