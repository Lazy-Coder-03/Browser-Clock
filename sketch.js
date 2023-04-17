var hr, mn, sec, mil;
var dig;
var count = 0;
var secunit;
var secten;
var minunit;
var minten;
var hrunit;
var hrten;
var hdiff;

var digsize

var cx, cy;
var d;
var secunitdig;
var sectendig;
var minunitdig;
var mintendig;
var hrunitdig;
var hrtendig;

var daytime;

let lastHour = -1;

var moonimg, sunimg;
function preload() {
  moonimg = loadImage("moon.jpg");
  sunimg = loadImage("sun.png");
  sound = loadSound("bell.mp3");
  tick = loadSound("tick-tock-15.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  //tick.setVolume(0.7)
  tick.loop()
  digsize=max(height/23,width/30)
  //let lastHour = -1;
  //playHourlySound();

  // secunitdig = new Digit(secunit, width-(cx-170) , height-hdiff);
  // sectendig  = new Digit(secten,  width-(cx-110), height-hdiff);
  // minunitdig = new Digit(minunit, width-(cx-30), height-hdiff);
  // mintendig  = new Digit(minten,  width-(cx+30), height-hdiff);
  // hrunitdig  = new Digit(hrunit,  width-(cx+110), height-hdiff);
  // hrtendig   = new Digit(hrten,   width-(cx+170), height-hdiff);
  // let hdiff=(1/5)*height;
}

function playHourlySound() {
  let currHour = hour();
  if (currHour !== lastHour) {
    // hour has changed, play the sound
    let numSoundsToPlay = currHour % 12 || 12;
    for (let i = 0; i < numSoundsToPlay; i++) {
      setTimeout(playSound, i * sound.duration() * 1000);
    }
    lastHour = currHour;
  }

  // schedule next check in one minute
  setTimeout(playHourlySound, 60 * 1000);
}

function playSound() {
  sound.play();
}

function windowResized() {
  createCanvas(windowWidth, windowHeight);
  
  digsize=min(height/23,width/30)

}

function draw() {
  //background("rgb(109,109,168)");
  //
  background("black");

  push();
  imageMode(CENTER);
  if (daytime) {
    image(sunimg, cx, cy + d / 4, d * 0.25, d * 0.25);
  } else {
    image(moonimg, cx, cy + d / 4, d * 0.25, d * 0.25);
  }
  pop();
  if (hour() >= 6 && hour() < 18) {
    daytime = true;
  } else {
    daytime = false;
  }
  //stroke(0)
  //line(0,height-hdiff,width,height-hdiff);
  //analogue part;
  hr = hour() % 12;
  mn = minute();
  sec = second();
  mil = millis();
  if (mn == 0) {
    playHourlySound();
  }
  d = min(width * (3 / 5), height * (3 / 5));
  noFill();
  stroke(255);
  let l = 3;
  cx = width / 2;
  cy = height / 2 - 50;
  ellipse(width / 2, height / 2 - 50, d + 3);
  for (let i = 0; i < 360; i += 30) {
    push();
    translate(cx, cy);
    let x = (d / 2) * cos(i);
    let y = (d / 2) * sin(i);
    let tx = x * 0.85;
    let ty = y * 0.85;
    textAlign(CENTER, CENTER);
    noStroke();
    fill("#7199E5");
    textSize(min(0.036 * width, 0.036 * height));
    //let k=floor(map(i,0,360,1,12))
    if (l == 0) l = 12;
    text(l, tx, ty);
    l = (l + 1) % 12;
    //line(x,y,x,y-15)
    stroke(255);
    fill(255);
    ellipse(x, y, 7);
    pop();
  }
  for (let i = 0; i < 360; i += 6) {
    push();
    stroke(255);
    fill(0);
    translate(cx, cy);
    let x = (d / 2) * cos(i);
    let y = (d / 2) * sin(i);
    ellipse(x, y, 3);
    pop();
  }

  //hr hand
  hrangle = map(hr, 0, 12, 0, 360);
  push();
  translate(cx, cy);
  rotate(hrangle);
  stroke(255, 220, 12);
  strokeWeight(3);
  line(0, 0, 0, -(d * 0.2));
  strokeWeight(1);
  stroke("black");
  line(3, 0, 3, -(d * 0.2));
  line(-3, 0, -3, -(d * 0.2));
  pop();
  fill(255);

  //mins hand
  minangle = map(mn, 0, 60, 0, 360);
  push();
  translate(cx, cy);
  rotate(minangle);
  stroke("violet");
  strokeWeight(2);
  line(0, 0, 0, -(d * 0.3));
  strokeWeight(1);
  stroke("black");
  line(2, 0, 2, -(d * 0.3));
  line(-2, 0, -2, -(d * 0.3));
  pop();

  //sec hands
  secangle = map(sec, 0, 60, 0, 360);
  push();
  translate(cx, cy);
  rotate(secangle);
  stroke("lime");
  line(0, 0, 0, -(d * 0.4));
  stroke("black");
  line(1, 0, 1, -(d * 0.4));
  line(-1, 0, -1, -(d * 0.4));
  pop();

  ellipse(cx, cy, 5);

  //digitAL part
  secunit = second() % 10;
  secten = floor(second() / 10);
  minunit = minute() % 10;
  minten = floor(minute() / 10);
  if (hour() == 22 || hour() == 10) {
    hrunit = 0;
    hrten = 1;
  } else if (hour() == 23 || hour() == 11) {
    hrunit = 1;
    hrten = 1;
  } else if (hour() == 12 || hour() == 0) {
    hrunit = 2;
    hrten = 1;
  } else {
    hrunit = hour() % 12;
    hrten = 0;
  }

  let hdiff = (1 / 5) * height;
  secunitdig = new Digit(secunit, width - (cx - 170), height - hdiff);
  sectendig = new Digit(secten, width - (cx - 110), height - hdiff);
  minunitdig = new Digit(minunit, width - (cx - 30), height - hdiff);
  mintendig = new Digit(minten, width - (cx + 30), height - hdiff);
  hrunitdig = new Digit(hrunit, width - (cx + 110), height - hdiff);
  hrtendig = new Digit(hrten, width - (cx + 170), height - hdiff);

  fill("white");
  stroke(0);

  secunitdig.display();
  sectendig.display();
  ellipse(cx + 70, height - hdiff + 20, 10, 10);
  ellipse(cx + 70, height - hdiff + 60, 10, 10);
  //  ellipse(width-180,height-40,10,10)
  //  ellipse(width-180,height-80,10,10)

  minunitdig.display();
  mintendig.display();
  ellipse(cx - 70, height - hdiff + 20, 10, 10);
  ellipse(cx - 70, height - hdiff + 60, 10, 10);
  //  ellipse(width-320,height-40,10,10)
  //  ellipse(width-320,height-80,10,10)

  hrunitdig.display();
  hrtendig.display();
  //fill(moonimg)

  //image(moonimg,cx+d/2,cy-d/2,d/4,d/4)
  //console.log(hour())
}
