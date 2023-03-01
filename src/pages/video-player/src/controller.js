export default class Controller {
    #view
    #service

    constructor({view, service}) {
        this.#view = view
        this.#service = service
    }

    static async initialize(deps) {
        const controller = new Controller(deps);
        return controller.init();
    }

    async init() { console.log("init!!") }

    log(text) { this.#view.log(`Logger: ${text}`) }
}