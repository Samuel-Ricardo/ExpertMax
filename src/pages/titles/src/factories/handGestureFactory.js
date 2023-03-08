import HandGestureController from "../controllers/handGestureController.js"
import HandGestureService from "../services/handGestureService.js"
import HandGestureView from "../views/handGestureView.js"

const [rootPath] = window.location.href.split('/pages/')
const handGestureFactory = {
    async initialize() {
        return HandGestureController.initialize({
            view: new HandGestureView(),
            service: new HandGestureService()
        })
    }
}
export default handGestureFactory;