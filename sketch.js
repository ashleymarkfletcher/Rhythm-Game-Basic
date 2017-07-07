
var mySound
var peakTimes = []
var currentBeats = []
var timeAhead = 3
var timeBehind = 1
var timelineHeight = 100
var beatLine = 150
var timelineBegin = 50
var timelineEnd = 450
var delay = 0.2
var score = 0
var timelineLength = timelineEnd - timelineBegin

var initThreshold = 0.8
var minThreshold = 0.22
var minPeaks = 300


function preload() {
  // mySound = loadSound('DK.mp3');
  mySound = loadSound('99.mp3');

}

function setup() {
  createCanvas(windowWidth, windowHeight);
  mySound.setVolume(1);
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

  var lineWant = map(beatLine, timelineBegin, timelineEnd, )
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
  console.log('peeee', peakTimes);
  mySound.play();
}

function checkBeats() {
  // get current track time
  var now = mySound.currentTime()
  // console.log('now = ', now);
  currentBeats = []
  // find if beats are after now
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

  var now = mySound.currentTime()

  currentBeats.forEach((beat) => {
    // scale 3 seconds to timeline
    var x = map(beat, now - timeBehind, now + timeAhead, timelineBegin, timelineEnd)

    ellipse(x ,timelineHeight, 20, 20)
    text(beat, x, timelineHeight)
  });
}

function checkHit() {

  var now = mySound.currentTime()

  currentBeats.forEach((beat) => {
    if (now >= beat-delay && now <= beat+delay) {
      console.log('hit that shit!');
      score++
    }
  });
}

function mousePressed() {
  // console.log('press!');
  checkHit()
}

// when window size changes update the canvas size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
