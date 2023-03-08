import { knowGestures, gestureStrings } from "../utils/gestures.js"

export default class HandGestureService {
  #gestureEstimator
  #handPoseDetection
  #handsVersion
  #detector = null

  constructor({ fingerpose, handPoseDetection, handsVersion }){
    this.#gestureEstimator = new fingerpose.GestureEstimator(knowGestures)
    this.#handPoseDetection = handPoseDetection 
    this.#handsVersion = handsVersion
  }

  async estimate(keypoints3D) {
    const predictions = this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      8 // 80% - percentage of confidence of gesture
    )
    return predictions.gestures;
  }




  #getLandMarksFromKeypoints(keypoints3D) {
    return keypoints3D.map(keypoint => [keypoint.x, keypoint.y, keypoint.z])
  }

  async estimateHands(video) {
    return this.#detector.estimateHands(video, {
      flipHorizontal: true,
    })
  }

  async initializeDetector() {
    if (this.#detector) return this.#detector;

    const detectorConfig = {
      runtime: 'mediapipe', // or tfjs
      solutionPath: `https://cdn.jsdelivr.net/npm/@mediapipe/hands@${this.#handsVersion}`,
      // full - Heavier and more accurate
      modelType: 'lite',
      maxHands: 2
    }

    this.#detector = await this.#handPoseDetection.createDetector(
      this.#handPoseDetection.SupportedModels.MediaPipeHands,
      detectorConfig
    );

    return this.#detector;
  }
}