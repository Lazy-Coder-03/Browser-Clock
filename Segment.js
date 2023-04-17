class Segment{
  
  constructor(x_,y_,vert){
    this.x=x_
    this.y=y_
    this.vertical=vert
    this.on=true;

    
    
  }
  
  
  show(){
    if(this.on){
      push()
      translate(this.x,this.y);
      stroke(0);
      fill("white");
      rectMode(CENTER);
      if(this.vertical){
        
        rotate(90);
        
      }
      
      rect(0,0,30,7,3);
      pop();
      
      
    }
    
    
    
    
  }
  
  
  
  
}