
let mySound
let peakTimes = []
let currentBeats = []
let score = 0

// define parameters for the timeline
const timeAhead = 3
const timeBehind = 1
const timelineHeight = 100
const beatLine = 150
const timelineBegin = 50
const timelineEnd = 450
const delay = 0.2
const timelineLength = timelineEnd - timelineBegin

// define a beat
const initThreshold = 0.8
const minThreshold = 0.22
const minPeaks = 300

// load the song before starting
function preload() {
  mySound = loadSound('DK.mp3');
  // mySound = loadSound('99.mp3');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound.setVolume(1);

  // find the beats in the song
  mySound.processPeaks(peaks, initThreshold, minThreshold, minPeaks)
}

function draw() {
  background(84, 90, 104);
  // find current beats
  checkBeats()

  // draw the current beats on the timeline
  drawBeats()

  // begin
  line(timelineBegin, timelineHeight-50, timelineBegin, timelineHeight+50)

  const lineWant = map(beatLine, timelineBegin, timelineEnd, )
  // beat
  line(beatLine, timelineHeight-50, beatLine, timelineHeight+50)
  // end
  line(timelineEnd, timelineHeight-50, timelineEnd, timelineHeight+50)

  // show score
  text("score: " + score, 300, 300)
  text("now: " + mySound.currentTime(), beatLine, 50)
}

function peaks(peaksArray) {
  console.log('peak!', peaksArray);
  peakTimes = peaksArray
  mySound.play();
}

function checkBeats() {
  // get current track time
  var now = mySound.currentTime()
  // console.log('now = ', now);
  currentBeats = []

  // find if beats are after now
  // for loop to break out early
  for (var i = 0; i < peakTimes.length; i++) {
    if (peakTimes[i] > now - timeBehind && peakTimes[i] <= now + timeAhead) {
      currentBeats.push(peakTimes[i])
    } else if (peakTimes[i] > now + timeAhead) {
      // console.log('too far ahead');
      break
    }
  }
  // console.log('current beats',currentBeats );
}

function drawBeats() {

  const now = mySound.currentTime()

  currentBeats.forEach((beat) => {
    // scale 3 seconds to timeline
    const x = map(beat, now - timeBehind, now + timeAhead, timelineBegin, timelineEnd)

    ellipse(x ,timelineHeight, 20, 20)
    text(beat, x, timelineHeight)
  });
}

function checkHit() {

  const now = mySound.currentTime()

  // if a click is within a beat +1
  currentBeats.forEach((beat) => {
    if (now >= beat-delay && now <= beat+delay) {
      console.log('hit that shit!');
      score++
    }
  })
}

function mousePressed() {
  checkHit()
}

// when window size changes update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
