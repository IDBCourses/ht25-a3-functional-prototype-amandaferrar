/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
// the x coordinates for each thing, thingG refers to the note G that is played etc.
let thingGX = window.innerWidth/2 +30;
let thingEX = window.innerWidth/2 -40;
let thingDX = window.innerWidth/2 -110;
let thingCX = window.innerWidth/2 -180;
let thing5X = window.innerWidth/2 +230;


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

let score = 0;
function updateScore (){
    Util.thingScore.textContent = "Score: "+ score;
  }

let keysPressed = {};
let chordPlayed = false;

function chord (){
  if (falling5 && keysPressed ['i'] && keysPressed['o'] && keysPressed ['p']) // by adding falling5 into this the other blocks stopped falling if we hold down the chord because it now only happens if thing 5 is falling which it isnt once the chords are recognised for pressing once.
    playcChord();
  chordPlayed = true; // this means that the chord will only be played once if it were to be held down
}


// this is the 'ground' so that the blocks will not fall off the screen
const groundY = window.innerHeight - 140; // 140 is the height of the blocks as the top left corner is the point its set
const melody = ['z','e', 'd', 'c', 'd', 'e', 'e', 'e',
  'z','d', 'd', 'd', 'e', 'g', 'g',
  'z','e', 'd', 'c', 'd', 'e', 'e', 'e', 
  'z','e', 'd', 'd', 'e', 'd', 'c'
]
let melodyI = 0 // this is what we will use to move through the melody array


function nextNote (){
  if (melody[melodyI] === 'g') fallingG = true;
  if (melody[melodyI] === 'e') fallingE = true;
  if (melody[melodyI] === 'd') fallingD = true;
  if (melody[melodyI] === 'c') fallingC = true;
  if (melody[melodyI] === 'z') falling5 = true;

  melodyI += 1;
}


// audio for the notes, each has a variable that is linked to the audio file, then the function calls the audio file to play

function playC4 (){
  const C4 = new Audio ('C4.mp3');
  //C4.currentTime = 0; // this means that when the users press the key again the audio file restarts, saving users having to wait till its over before pressing again
  C4.play ();
  score += 1;
  updateScore ();
  // setTimeout(() => {
  // Util.thingC.style.display = "none"}); // this is making the thing block hidden
  fallingC = false; // means that the block stops falling (even though it is now hidden) 
  // do we need above line then?
  thingCY = -140;
  nextNote();
}


function playD4 (){
  //D4.currentTime = 0; 
  const D4= new Audio ('D4.mp3');
  D4.play ();
  score += 1;
  updateScore ();
  // setTimeout(() => {
  // Util.thingD.style.display = "none"});
  fallingD = false;
  thingDY = - 140;
  nextNote();
}


function playE4 (){
  const E4= new Audio ('E4.mp3');
  E4.play ();
  score += 1;
  updateScore ();
  // setTimeout(() => {
  // Util.thingE.style.display = "none"});
  fallingE = false;
  thingEY = - 140;
  nextNote();
}


function playG4 (){
  const G4= new Audio ('G4.mp3');
  G4.play ();
  score += 1;
  updateScore ();
  // setTimeout(() => {
  // Util.thingG.style.display = "none"});
  fallingG = false;
  thingGY = - 140;
  nextNote();
}

let cChord= new Audio ('cChord.mp3');
function playcChord (){
  cChord.play ();
  score += 1;
  updateScore ();
  falling5 = false;
  nextNote();
  thing5Y = -140
}





function start () {
  setTimeout (function() {
    nextNote();
  }, 1000);
  }


// Settings variables should contain all of the "fixed" parts of your programs

// Code that runs over and over again
function loop() {

  if (falling5){
    if (thing5Y < groundY) { // if the position of thing is above the ground
    thing5Y += 5;  // add 5px each loop
  } else if (thing5Y > groundY){
    thing5Y = groundY // otherwise stop falling
    score -= 1;
    updateScore ();
  }
    
  }

  if (fallingC){
    if (thingCY < groundY){
      thingCY += 5;
    } else {
      score -= 1;
      updateScore ();
      fallingC = false;
      
      
    }}
    
  if (fallingD){
    if (thingDY < groundY) {
      thingDY += 5;
    } else {
      score -= 1;
      updateScore ();
      fallingD = false;
      
      
    }}

  if (fallingE){
    if (thingEY < groundY) {
      thingEY += 5;
    } else {
      score -= 1;
      updateScore ();
      fallingE = false;
      
      
    }}

  if (fallingG){
    if (thingGY < groundY) {
      thingGY += 5;
    } else {
      score -= 1;
      updateScore ();
      fallingG = false;
      
      
    }}
  

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
  Util.thing5.textContent = "I O P";
  

  // Put your event listener code here
  document.addEventListener('pointerdown', start) // user clicks pointer down to start the first block falling is then triggered in start function
  document.body.style.backgroundColor = "#f7ddedff";



  document.addEventListener('keydown', function(event) { // setting what happens when different keys are pressed
   keysPressed[event.key] = true;
   chord();
   if (event.key === "c"){
      playC4();
      
      
  } else if (event.key === "e"){
      playE4();
      
      
  } else if (event.key === "d"){
      playD4();
      
  } else if (event.key === "g"){
      playG4();
      
      
  }
});

document.addEventListener('keyup', function(event){
  keysPressed[event.key] = false;
  chordPlayed = false;
});



  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!






