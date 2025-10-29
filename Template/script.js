/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
// the x coordinates for each thing, thingG refers to the note G that is played etc.
let thingGX = window.innerWidth/2 +180;
let thingEX = window.innerWidth/2 +110;
let thingDX = window.innerWidth/2 +40;
let thingCX = window.innerWidth/2 -30;
let thing5X = window.innerWidth/2 -230;


// the Y coordinates for each thing
let thingGY = -140;
let thingEY = -140;
let thingDY = -140;
let thingCY = -140;
let thing5Y = -140;

// this will be set as true when the item needs to start falling 
let fallingG = false
let fallingE = false
let fallingD = false
let fallingC = false
let falling5 = false



// this is the 'ground' so that the blocks will not fall off the screen
const groundY = window.innerHeight - 140; // 140 is the height of the blocks as the top left corner is the point its set
const melody = ['5','e', 'd', 'c', 'd', 'e', 'e', 'e',
  '5','d', 'd', 'd', 'e', 'g', 'g',
  '5','e', 'd', 'c', 'd', 'e', 'e', 'e', 
  '5','e', 'd', 'd', 'e', 'd', 'c'
]
let melodyI = 0 // this is what we will use to move through the melody array


function nextNote (){
  if (melody[melodyI] === 'g') fallingG = true;
  if (melody[melodyI] === 'e') fallingE = true;
  if (melody[melodyI] === 'd') fallingD = true;
  if (melody[melodyI] === 'c') fallingC = true;
  if (melody[melodyI] === '5') falling5 = true;

  melodyI += 1;
  if (melodyI >= melody.length) 
    melodyI = 0;
}


// audio for the notes, each has a variable that is linked to the audio file, then the function calls the audio file to play
let C4= new Audio ('C4.mp3');
function playC4 (){
  C4.currentTime = 0; // this means that when the users press the key again the audio file restarts, saving users having to wait till its over before pressing again
  C4.play ();
  // setTimeout(() => {
  // Util.thingC.style.display = "none"}); // this is making the thing block hidden
  fallingC = false; // means that the block stops falling (even though it is now hidden) 
  // do we need above line then?
  thingCY = thingCY-window.innerHeight;
}

let D4= new Audio ('D4.mp3');
function playD4 (){
  D4.currentTime = 0; 
  D4.play ();
  // setTimeout(() => {
  // Util.thingD.style.display = "none"});
  fallingD = false;
  thingDY = thingDY- window.innerHeight;
}

let E4= new Audio ('E4.mp3');
function playE4 (){
  E4.currentTime = 0; 
  E4.play ();
  // setTimeout(() => {
  // Util.thingE.style.display = "none"});
  fallingE = false;
  thingEY = thingEY - window.innerHeight;
}

let G4= new Audio ('G4.mp3');
function playG4 (){
  G4.currentTime = 0; 
  G4.play ();
  // setTimeout(() => {
  // Util.thingG.style.display = "none"});
  fallingG = false;
  thingGY = thingGY - window.innerHeight;
}

let cChord= new Audio ('cChord.mp3');
function playcChord (){
  cChord.currentTime = 0; 
  cChord.play ();
  // setTimeout(() => {
  // Util.thing5.style.display = "none"});
  falling5 = false;
  thing5Y = thing5Y - window.innerHeight;
}





function start () {
  nextNote();
  }


// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  if (falling5){
    if (thing5Y < groundY) { // if the position of thing is above the ground
    thing5Y += 5;  // add 5px each loop
  } else {
    falling5= false; // otherwise stop falling
  }

  } else if (fallingC){
    if (thingCY < groundY){
      thingCY += 5;
    } else {
      fallingC = false;
    }
    
  } else if (fallingD){
    if (thingDY < groundY) {
      thingDY += 5;
    } else {
      fallingD = false;
    }

  } else if (fallingE){
    if (thingEY < groundY) {
      thingEY += 5;
    } else {
      fallingE = false;
    }

  } else if (fallingG){
    if (thingGY < groundY) {
      thingGY += 5;
    } else {
      fallingG = false;
    }
  }

  Util.setPositionPixels(thingGX, thingGY, Util.thingG);
  Util.setPositionPixels(thingEX, thingEY, Util.thingE);
  Util.setPositionPixels(thingDX, thingDY, Util.thingD);
  Util.setPositionPixels(thingCX, thingCY, Util.thingC);
  Util.setPositionPixels(thing5X, thing5Y, Util.thing5);


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
  document.addEventListener('pointerdown', start) // user clicks pointer down to start the first block falling is then triggered in start function
  document.body.style.backgroundColor = "#f7ddedff";
  document.addEventListener('keydown', function(event) { // setting what happens when different keys are pressed
    if (event.key === "z"){
      playcChord();
      nextNote();
  } else if (event.key === "c"){
      playC4();
      nextNote();
  } else if (event.key === "e"){
      playE4();
      nextNote();
  } else if (event.key === "d"){
      playD4();
      nextNote();
  } else if (event.key === "g"){
      playG4();
      nextNote();
  }
});



  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!
