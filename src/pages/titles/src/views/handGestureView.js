export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')

    constructor() {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeight
    }

    clearCanvas() {
        this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
    }

    drawnResult(hands) {
        for (const {keypoints, handedness} of hands) {
            if(!keypoints) continue

            this.#canvasContext.fillStyle = handedness === "Left"? "red" : "green"
            this.#canvasContext.strokeStyle = "white"
            this.#canvasContext.lineWidth = 8
            this.#canvasContext.lineJoin = "round"

            //juntas
            this.#drawnJoients(keypoints)
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