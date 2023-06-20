export default class Resize{
    constructor() {
        this.bindEvents();
    }

    protected bindEvents(): void {
        window.addEventListener("resize", this.resize.bind(this));
    }

    protected resize(): void {
        // Added resize code in children classes
    }
}