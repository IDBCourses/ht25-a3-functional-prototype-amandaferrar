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



// this is the 'ground' so that the blocks will not fall off the screen
const groundY = window.innerHeight - 140; // 140 is the height of the blocks

// audio for the notes, each has a variable that is linked to the audio file, then the function calls the audio file to play
let C4= new Audio ('C4.mp3');
function playC4 (){
  C4.play ();
  setTimeout(() => {
  Util.thingG.style.display = "none"});
  falling1 = false;
}

let D4= new Audio ('D4.mp3');
function playD4 (){
  D4.play ();
  setTimeout(() => {
  Util.thingE.style.display = "none"});
  falling2 = false;
  falling1 = true;
}

let E4= new Audio ('E4.mp3');
function playE4 (){
  E4.play ();
  setTimeout(() => {
  Util.thingD.style.display = "none"});
  falling3 = false;
  falling2 = true;
}

let G4= new Audio ('G4.mp3');
function playG4 (){
  G4.play ();
  setTimeout(() => {
  Util.thingC.style.display = "none"});
  falling4 = false;
  falling3 = true;
}

let cChord= new Audio ('cChord.mp3');
function playcChord (){
  cChord.play ();
  setTimeout(() => {
  Util.thing5.style.display = "none"});
  falling5 = false;
  falling4 = true;
}




function start () {
  falling5 = true;
  }






// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  if (falling5){
    if (thing5LHY < groundY) { // if the position of thing is above the ground
    thing5LHY += 5;  // add 5px each loop
  } else {
    falling5= false;
  }

  } else if (falling4){
    if (thing4RHY < groundY){
      thing4RHY += 5;
    } else {
      falling4 = false;
    }
    
  } else if (falling3){
    if (thing3RHY < groundY) {
      thing3RHY += 5;
    } else {
      falling3 = false;
    }

  } else if (falling2){
    if (thing2RHY < groundY) {
      thing2RHY += 5;
    } else {
      falling2 = true;
    }

  } else if (falling1){
    if (thing1RHY < groundY) {
      thing1RHY += 5;
    } else {
      falling1 = true;
    }
  }

  Util.setPositionPixels(thing1RHX, thing1RHY, Util.thingG);
  Util.setPositionPixels(thing2RHX, thing2RHY, Util.thingE);
  Util.setPositionPixels(thing3RHX, thing3RHY, Util.thingD);
  Util.setPositionPixels(thing4RHX, thing4RHY, Util.thingC);
  Util.setPositionPixels(thing5LHX, thing5LHY, Util.thing5);


  // if (falling5) falling ();

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  
  Util.thingG.textContent = "G";
  Util.thingE.textContent = "E";
  Util.thingD.textContent = "D";
  Util.thingC.textContent = "C";
  Util.thing5.textContent = "C E G";

  // Put your event listener code here
  document.addEventListener('pointerdown', start)

  document.addEventListener('keydown', function(event) {
    if (event.key === "z"){
      playcChord();

  } else if (event.key === "c"){
    playC4();
  } else if (event.key === "e"){
    playE4();
  } else if (event.key === "d"){
    playD4();
  } else if (event.key === "g"){
    playG4();
  }
});



  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
