export default class HandGestureService {
  #gestureStrings
  #knowGestures
  #gestureEstimator
  #handPoseDetection
  #handsVersion
  #detector = null

  constructor({ 
    fingerpose,
    handPoseDetection, 
    handsVersion, 
    knowGestures, 
    gestureStrings
   }){
    this.#knowGestures = knowGestures
    this.#gestureStrings = gestureStrings
    this.#gestureEstimator = new fingerpose.GestureEstimator(this.#knowGestures)
    this.#handPoseDetection = handPoseDetection 
    this.#handsVersion = handsVersion
  }

  async estimate(keypoints3D) {
    const predictions = this.#gestureEstimator.estimate(
      this.#getLandMarksFromKeypoints(keypoints3D),
      9 // 90% - percentage of confidence of gesture
    )
    return predictions.gestures;
  }


  //async iterator - while i read, i return a response 
  async * detectGesture(predictions){
    for (const hand of predictions){
      if(!hand.keypoints3D) continue;

      const gesture = await this.estimate(hand.keypoints3D)
      if(!gesture.length) continue;


      const result = gesture.reduce( (previous, current) => (previous.score > current.score)? previous : current)

      const {x,y} = hand.keypoints.find(keypoint => keypoint.name === 'index_finger_tip')
      yield { event: result.name, x, y } //return result and later continue the 'for'
      console.log(this.#gestureStrings[result.name])
    }
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