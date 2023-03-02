export default class Service {
    
    #model = null
    #faceLandmarksDetection
    
    constructor({ faceLandmarksDetection }) {
        this.#faceLandmarksDetection = faceLandmarksDetection
    }

    async loadModel() {
        this.#model = await this.#faceLandmarksDetection.load(
            this.#faceLandmarksDetection.SupportedPackages.mediapipeFacemesh,
            { masxFaces: 1 }
        )
    }

    async handBlinked(video) {
        const predications = await this.#estimateFaces(video)
        console.log({predications})
        
    }

    #estimateFaces(video) {
        return this.#model.estimateFaces({
            input: video,
            returnTensors: false,
            flipHorizontal: true,
            predictIrises: true,
        })
    }
}