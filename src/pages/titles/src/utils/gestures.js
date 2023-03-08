const { GestureDescription, Finger, FingerCurl } = window.fp;

const ScrollDownGesture = new GestureDescription('scroll-down'); // ✊️
const ScrollUpGesture = new GestureDescription('scroll-up'); // 🖐


ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.HalfCurl, 1.0);
ScrollDownGesture.addCurl(Finger.Thumb, FingerCurl.NoCurl, 0.5);

for(let finger of [Finger.Index, Finger.Middle, Finger.Ring, Finger.Pinky]) {
    ScrollDownGesture.addCurl(finger, FingerCurl.FullCurl, 1.0);
    ScrollDownGesture.addCurl(finger, FingerCurl.NoCurl, 0.9);
}


for (let finger of Finger.all) {
    ScrollUpGesture.addCurl(finger, FingerCurl.NoCurl, 1.0)
}

const knowGestures = [ ScrollDownGesture, ScrollUpGesture ]

const gestureStrings = {
    'scroll-up': '🖐',
    'scroll-down': '✊️'
}

export { knowGestures, gestureStrings }