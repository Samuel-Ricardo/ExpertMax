export default class HandGestureService {
  #fingerpose
  #handPoseDetection
  #handsVersion
  constructor({ fingerpose, handPoseDetection, handsVersion }){
    this.#fingerpose = fingerpose 
    this.#handPoseDetection = handPoseDetection 
    this.#handsVersion = handsVersion
    }
}