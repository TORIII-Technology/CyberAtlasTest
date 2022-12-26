import React from "react";
import { ReactP5Wrapper } from "react-p5-wrapper";


function sketch(p) {
  let particles = [];
  let r, theta;
  let globStep = 0.0025;

  p.setup = function() {
    p.createCanvas(window.innerWidth, window.innerHeight);
    for(let n = 0; n < 250; n++){
      r = p.max(p.windowWidth/2, p.windowHeight/2);
      theta = p.random() * p.TAU;
      particles.push(new makeParticle(r, theta));
    }
  }

  p.draw = function() {
    p.background(0);
    p.translate(window.innerWidth/2+p.random(-2,2)*0,window.innerHeight/2+p.random(-2,2)*0);
    p.stroke(255);
    p.strokeWeight(2);
    
    for(let n = 0; n < 250; n++){
      particles[n].move();
      particles[n].display();
    }
    
    globStep = p.lerp(globStep, .0025, .1);
  }

  function makeParticle(rad, ang){
    this.rad = rad;
    this.ang = ang;
    
    this.t = p.random();
    this.step = .0025;
    
    this.weight = p.random(8);
    this.transp = p.random(200,255);
    // this.stroke = (p.random(255),p.random(255),p.random(255), this.transp);

    
    this.leng = p.random(250);
    
    this.move = function(){
      this.step = p.lerp(this.step, globStep, .01);
      this.t += this.step;
      if(this.t>1){
        this.t = .15;
      }
    }
    
    this.display = function(){
      let x = this.rad*p.cos(this.ang)*this.t*this.t;
      let y = this.rad*p.sin(this.ang)*this.t*this.t;
      
      let x2 = (this.rad-this.leng*this.t)*p.cos(this.ang)*this.t*this.t;
      let y2 = (this.rad-this.leng*this.t)*p.sin(this.ang)*this.t*this.t;
      
      p.strokeWeight(this.weight);
      
      let beginT = p.map(this.t, .15, .3, 0, 1);
      p.stroke(255*beginT+50, this.transp);
      p.line(x, y, x2, y2);
    }
  }
}

export default function PFive() {
  return (
    <ReactP5Wrapper sketch={sketch} overflow="clip"/>
  );
}