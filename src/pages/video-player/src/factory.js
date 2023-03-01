import Camera from "../../../libs/shared/cam.js";
import { supportWorkerType } from "../../../libs/shared/utils.js";
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

async function getWorker(){
    if (supportWorkerType()) {  console.log("SUPORT")
    
        const worker = new Worker('./src/worker.js', {type: 'module'});
        return worker;
    }


    else { console.log("NOT SUPORT")

        const workerMock = {
            async postMessage(){},
            onmessage(msg) {}
        }
        return workerMock
    }
}

const worker = await getWorker();

const camera = await Camera.init();
const [rootPath] = window.location.href.split( '/pages/' );
const factory = {
    async initialize() {
        return Controller.initialize({
            view: new View({}),
            service: new Service({}),
            worker
        });        
    }
}

export default factory;