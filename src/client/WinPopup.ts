import * as PIXI from "pixi.js";
import Constant from "./Constants";
import { getWin, getWinDetails, winData } from "./Model";
import Resize from "./Resize";

export default class WinPopup extends Resize {
    private popupContainer: PIXI.Container;
    private game: PIXI.Application;
    private winValue: PIXI.Text;
    private payoutText: PIXI.Text;
    private winningSiren: PIXI.AnimatedSprite;
    private winningSirenIdle: PIXI.Sprite;
    private payoutDetails: string[] = [];
    private symbolName: string[] = ["hv1", "hv2", "hv3", "hv4", "lv1", "lv2", "lv3", "lv4"];

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

        const winValueStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 64,
            fill: '#FF5733',
            align: 'center'
        });
        this.winValue = new PIXI.Text("", winValueStyle);
        this.winValue.x = (Constant.GAME_WIDTH - this.winValue.width) / 2;
        this.winValue.y = 942;
        this.popupContainer.addChild(this.winValue);

        const payoutTextStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 50,
            fill: 'black',
            align: 'center',
        });
        this.payoutText = new PIXI.Text("", payoutTextStyle);
        this.payoutText.x = (Constant.GAME_WIDTH - this.payoutText.width) / 2;
        this.payoutText.y = 971;
        this.popupContainer.addChild(this.payoutText);

        this.createWinningSirenAnim();
    }

    private createWinningSirenAnim(): void {
        const sirenTexture: PIXI.Texture[] = [];
        for (let i: number = 1; i <= 7; i++) {
            sirenTexture.push(this.game.loader.resources!["winningSiren" + i].texture);
        }
        this.winningSiren = new PIXI.AnimatedSprite(sirenTexture);
        this.winningSiren.x = 650;
        this.winningSiren.y = 6;
        this.winningSiren.loop = true;
        this.winningSiren.animationSpeed = 0.20;
        this.winningSiren.visible = false;
        this.popupContainer.addChild(this.winningSiren);

        const sirenIdleTexture: PIXI.Texture = this.game.loader.resources!.winningSirenIdle.texture;
        this.winningSirenIdle = new PIXI.Sprite(sirenIdleTexture);
        this.winningSirenIdle.x = 650;
        this.winningSirenIdle.y = 6;
        this.popupContainer.addChild(this.winningSirenIdle);
    }

    public async showWin(): Promise<void> {
        this.winValue.text = Constant.WIN + String(getWin());
        this.winValue.x = (Constant.GAME_WIDTH - this.winValue.width) / 2;
        this.setPayoutTexts();
        this.showPayoutDetails(0);
        await new Promise((resolve, reject) => {
            this.winningSiren.visible = true;
            this.winningSiren.play();
            let loopCount = 0;
            this.winningSiren.onLoop = () => {
                loopCount++;
                if (loopCount === 4) {
                    this.winningSiren.stop();
                    this.winningSiren.visible = false;
                    resolve(true);
                }
            };
        });

    }

    private setPayoutTexts(): void {
        this.payoutDetails = [];
        const wins: winData[] = getWinDetails();
        wins.forEach(element => {
            this.payoutDetails.push(`- payline ${element.paylineID}, ${this.symbolName[element.symID]} x${element.symCount}, ${element.winAmount}`)
        });
    }

    private showPayoutDetails(index: number): void {
        if ((index > this.payoutDetails.length - 1) || this.payoutDetails.length === 0) {
            return;
        }
        this.payoutText.text = this.payoutText.text + "\n" + this.payoutDetails[index];
        this.payoutText.x = (Constant.GAME_WIDTH - this.payoutText.width) / 2;
        setTimeout(() => {
            this.showPayoutDetails(++index);
        }, 350);
    }

    public resetPayoutDetails(): void {
        this.winValue.text = "";
        this.payoutText.text = "";
        this.payoutDetails = [];
    }
    protected resize(): void {
        const scale: number = Math.min(window.innerWidth / Constant.GAME_WIDTH, window.innerHeight / Constant.GAME_HEIGHT);
        this.popupContainer.scale.set(scale);
        this.popupContainer.position.set(this.game.screen.width / 2, this.game.screen.height / 2);
    }
}