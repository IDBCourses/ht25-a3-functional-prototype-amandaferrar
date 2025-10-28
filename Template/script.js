/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
// the x coordinates for each thing
let thing1RHX = window.innerWidth/2 +180;
let thing2RHX = window.innerWidth/2 +110;
let thing3RHX = window.innerWidth/2 +40;
let thing4RHX = window.innerWidth/2 -30;
let thing5LHX = window.innerWidth/2 -230;


// the Y coordinates for each thing
let thing1RHY = -140;
let thing2RHY = -140;
let thing3RHY = -140;
let thing4RHY = -140;
let thing5LHY = -140;

// this will be set as true when the item needs to start falling 
let falling1 = false
let falling2 = false
let falling3 = false
let falling4 = false
let falling5 = false





function start () {
  falling5 = true;
  }






// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  if (falling5){
    thing5LHY += 5;
  }

  Util.setPositionPixels(thing1RHX, thing1RHY, Util.thing1RH);
  Util.setPositionPixels(thing2RHX, thing2RHY, Util.thing2RH);
  Util.setPositionPixels(thing3RHX, thing3RHY, Util.thing3RH);
  Util.setPositionPixels(thing4RHX, thing4RHY, Util.thing4RH);
  Util.setPositionPixels(thing5LHX, thing5LHY, Util.thing5LH);


  // if (falling5) falling ();

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // Put your event listener code here
  document.addEventListener('pointerdown', start)
  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
