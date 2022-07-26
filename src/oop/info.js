export class Info {
    constructor(parent) {
        this._lives = 3;
        this._livesElement = document.querySelector(".info__lives__count");
        this.game = parent;
        this._livesElement.textContent = this._lives.toString();
    }
    get lives() {
        return this._lives;
    }
    set lives(value) {
        this._lives = value;
        this._livesElement.textContent = value.toString();
    }
}
//# sourceMappingURL=info.js.map