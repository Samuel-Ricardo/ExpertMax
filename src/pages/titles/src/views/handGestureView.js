export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')

    constructor() {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeitgt
    }

    clear() {
        this.#canvasContext.clearReact(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
    }

    loop(fun) { requestAnimationFrame(fun) } //60fps

    scrollPage(top){
        scroll({
            top,
            behavior: 'smooth'
        })
    }
 }