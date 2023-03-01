import Camera from "../../../libs/shared/cam.js";
import Controller from "./controller.js";
import Service from "./service.js";
import View from "./view.js";

const [rootPath] = window.location.href.split( '/pages/' );
const factory = {
    async initialize() {
        
        const camera = await Camera.init();

        return Controller.initialize({
            view: new View({}),
            service: new Service({}),
        });        
    }
}

export default factory;