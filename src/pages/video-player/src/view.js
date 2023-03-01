export default class View {

    #btnInit = document.querySelector("#init");
    #statusElement = document.querySelector("#status");

    constructor({}) {}

    enableButton() { this.#btnInit.disabled = false; }

    configureOnBtnClick(fun) { this.#btnInit.addEventListener('click', fun) }

    log(text) { this.#statusElement.innerHTML = text }

}