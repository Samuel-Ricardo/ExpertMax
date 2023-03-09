export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')

    constructor() {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeitgt
    }

    clearCanvas() {
        this.#canvasContext.clearReact(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
    }

    drawResult(hands) {
        for (const {keypoints, handedness} of hands) {
            if(!keypoints) continue

            this.#canvasContext.fillStyle = handedness === 'left'? 'red' : 'green'
            this.#canvasContext.strokeStyle = "white"
            this.#canvasContext.lineWidth = 8
            this.#canvasContext.lineJoin = 'round'
        }
    }

    loop(fun) { requestAnimationFrame(fun) } //60fps

    scrollPage(top){
        scroll({
            top,
            behavior: 'smooth'
        })
    }
 }