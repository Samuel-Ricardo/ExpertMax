export default class HandGestureView {

    #handsCanvas = document.querySelector('#hands')
    #canvasContext = this.#handsCanvas.getContext('2d')
    #fingerLookupIndexes

    constructor({fingerLookupIndexes}) {
        this.#handsCanvas.width = globalThis.screen.availWidth
        this.#handsCanvas.height = globalThis.screen.availHeight

        this.#fingerLookupIndexes = fingerLookupIndexes
    }

    clearCanvas() {
        this.#canvasContext.clearRect(0, 0, this.#handsCanvas.width, this.#handsCanvas.height)
    }

    drawnResult(hands) {
        for (const {keypoints, handedness} of hands) {
            if(!keypoints) continue

            this.#canvasContext.fillStyle = handedness === "Left"? "red" : "rgb(44, 212, 103)"
            this.#canvasContext.strokeStyle = "black"
            this.#canvasContext.lineWidth = 8
            this.#canvasContext.lineJoin = "round"

            //juntas dos dedos
            this.#drawnJoients(keypoints)
            this.#drawnFingersAndHoverElements(keypoints)
        }
    }

    #drawnJoients(keypoints) {
        for (const {x, y} of keypoints){
            this.#canvasContext.beginPath()

            const newX = x - 1;
            const newY = y - 1;
            const radius = 5;
            const startAngle = 0;
            const endAngle = 2*Math.PI;

            this.#canvasContext.arc(newX, newY, radius, startAngle, endAngle)
            this.#canvasContext.fill()
        }
    }

    #drawnFingersAndHoverElements(keypoints){
        const fingers = Object.keys(this.#fingerLookupIndexes) 

        for (const finger of fingers) {
            const points = this.#fingerLookupIndexes[finger].map(index => keypoints[index])

            const region = new Path2D()
            // [0] hand palm
            const [{x, y}] = points
            region.moveTo(x,y)

            for(const point of points) region.lineTo(point.x, point.y)

            this.#canvasContext.stroke(region)
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