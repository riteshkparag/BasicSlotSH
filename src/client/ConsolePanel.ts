import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getBalance } from "./Model";
import Resize from "./Resize";

export default class ConsolePanel extends Resize {
    private game: PIXI.Application;
    private btnContainer: PIXI.Container;
    private lever: PIXI.AnimatedSprite;
    private spinBtn: PIXI.Sprite;
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
            fill: '#FF5733',
            align: 'center'
        });
        this.balanceText = new PIXI.Text(Constant.BALANCE, balanceTextStyle);
        this.balanceText.x = 4;
        this.balanceText.y = 4;
        this.btnContainer.addChild(this.balanceText);

        const balanceValueStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 42,
            fill: '#FF5733',
            align: 'center'
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
        this.lever = new PIXI.AnimatedSprite(this.btnTexture);

        this.lever.x = 970;
        this.lever.y = 1450;
        this.lever.scale.set(0.6);
        this.lever.loop = false;
        this.lever.animationSpeed = 0.25;
        this.btnContainer.addChild(this.lever);

        const spinBtnTexture = this.game.loader.resources!.spin_button.texture;
        this.spinBtn = new PIXI.Sprite(spinBtnTexture);
        this.spinBtn.x = 635;
        this.spinBtn.y = 1500;

        
        this.spinBtn.interactive = true;
        this.spinBtn.buttonMode = true;
        this.btnContainer.addChild(this.spinBtn);
    }

    private createArrowLight(): void {
        for (let i: number = 1; i <= 5; i++) {
            this.arrowTexture.push(this.game.loader.resources!["lightArrow" + i].texture);
        }
        this.arrowLight = new PIXI.AnimatedSprite(this.arrowTexture);
        this.arrowLight.x = 920;
        this.arrowLight.y = 1530;
        this.arrowLight.loop = true;
        this.arrowLight.animationSpeed = 0.20;
        this.arrowLight.play();
        this.btnContainer.addChild(this.arrowLight);
    }

    private bindBtnEvents(): void {
        this.spinBtn.addListener("click", this.onClick);
        this.spinBtn.addListener("touchend", this.onClick);
    }

    public enableSpinBtn(): void {
        this.lever.gotoAndStop(0);
        this.arrowLight.play();
        this.spinBtn.interactive = true;
    }

    public disableSpinBtn(): void {
        this.spinBtn.interactive = false;
    }

    public playLeverAnim(callback: () => void): void {
        this.lever.play();
        this.lever.onComplete = () => {
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