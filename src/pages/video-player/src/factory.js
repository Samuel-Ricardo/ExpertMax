import Camera from "../../../libs/shared/cam.js";
import { supportWorkerType } from "../../../libs/shared/utils.js";
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

async function getWorker(){
    if (supportWorkerType()) {  console.log("Initializing esm Workers")
    
        const worker = new Worker('./src/worker.js', {type: 'module'});
        return worker;
    }
    
        
    console.warn("Your Browser doesn't support esm modules on webworkers!")
    console.warn("Importing libraries...")

   // await import "https://unpkg.com/@tensorflow/tfjs-core@2.4.0/dist/tf-core.js"
   // await import "https://unpkg.com/@tensorflow/tfjs-converter@2.4.0/dist/tf-converter.js"
   // await import "https://unpkg.com/@tensorflow/tfjs-backend-webgl@2.4.0/dist/tf-backend-webgl.js"
   // await import "https://unpkg.com/@tensorflow-models/face-landmarks-detection@0.0.1/dist/face-landmarks-detection.js"

    console.warn(`using worker mock instead!`)
    const service = new Service({faceLandmarksDetection: window.faceLandmarksDetection})

    const workerMock = {
        async postMessage(video){
            const blinked = await service.handBlinked(video)
            if(!blinked) return;

            workerMock.onmessage({ data: {blinked} })
        },
        //override by controller
        onmessage(msg) {}
    }

    console.log("Loading TF Model...")
        await service.loadModel()
    console.log("TF Loaded...")
    
    setTimeout(() => worker.onmessage({data: READY}), 750);

    return workerMock
}

const view = new View()

const [rootPath] = window.location.href.split( '/pages/' );
view.setVideoSrc(`${rootPath}/assets/video.mp4`)

const worker = await getWorker();

const camera = await Camera.init();

const factory = {
    async initialize() {
        return Controller.initialize({
            view,
            worker,
            camera,
        });        
    }
}

export default factory;
