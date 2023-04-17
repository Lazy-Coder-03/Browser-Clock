class Digit {

  constructor(num_, x_, y_) {
    this.num = num_;
    this.x = x_;
    this.y = y_;
    this.segments = [];



    //A 0
    this.segments[0] = new Segment(this.x, this.y, false);
    //B 1
    this.segments[1] = new Segment(this.x + 20, this.y + 20, true);
    //C 2
    this.segments[2] = new Segment(this.x + 20, this.y + 20*3, true);
    //D 3
    this.segments[3] = new Segment(this.x, this.y + 20*4, false);
    //E 4
    this.segments[4] = new Segment(this.x - 20, this.y + 20*3, true);
    //F 5
    this.segments[5] = new Segment(this.x - 20, this.y + 20, true);
    //G 6
    this.segments[6] = new Segment(this.x, this.y + 20*2, false);


    //For zero
    if (this.num == 0) {
      this.segments[6].on = false;
    }
    //for one
    else if (this.num == 1) {
      this.segments[0].on = false;
      this.segments[3].on = false;
      this.segments[4].on = false;
      this.segments[5].on = false;
      this.segments[6].on = false;
    }
    //for 2
    else if (this.num == 2) {
      this.segments[2].on = false;
      this.segments[5].on = false;
    }
    //for 3
    else if (this.num == 3) {
      this.segments[4].on = false;
      this.segments[5].on = false;
    }
    //for 4
    else if (this.num == 4) {
      this.segments[0].on = false;
      this.segments[3].on = false;
      this.segments[4].on = false;
    }
    //for 5
    else if (this.num == 5) {
      this.segments[1].on = false;
      this.segments[4].on = false;
    }
    //for 6
    else if (this.num == 6) {
      this.segments[1].on = false;
    }

    //for 7
    else if (this.num == 7) {
      this.segments[3].on = false;
      this.segments[4].on = false;
      this.segments[5].on = false;
      this.segments[6].on = false;
    }
    //for 8
    else if (this.num == 8) {
      for (let i = 0; i < 7; i++) {
        this.segments[i].on = true;
      }
    }
    // for 9
    else if (this.num == 9) {
      this.segments[4].on = false;

    }





  }

  display() {

    for (let i = 0; i < this.segments.length; i++) {
      this.segments[i].show();
    }

  }



}