/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// State variables are the parts of your program that change over time.
// the x coordinates for each thing, thingG refers to the note G that is played etc.
// this is set to the window width/2 which gets the midpoint and then the +30 etc are setting the position, this is so that the blocks are all lined up next to eachother
let thingGX = window.innerWidth/2 -30;
let thingEX = window.innerWidth/2 +40;
let thingDX = window.innerWidth/2 +110;
let thingCX = window.innerWidth/2 +180;
let thing5X = window.innerWidth/2 -230;


// the Y coordinates for each thing
let thingGY = -140;
let thingEY = -140;
let thingDY = -140;
let thingCY = -140;
let thing5Y = -140;

// this will be set as true when the item needs to start falling but will start as false
let fallingG = false
let fallingE = false
let fallingD = false
let fallingC = false
let falling5 = false


// for the scoring. Variable starts at 0, then function update score which is added to the text in the CSS thingScore and updates the score shown
let score = 0;
function updateScore (){
    Util.thingScore.textContent = "Score: "+ score;
  }

let combo = 0;
let keysPressed = {}; // empty object for things pressed 
let chordPlayed = false; // will be used so that if chord has been played it will not be able to be replayed
let chord5CanPlay = false;

function chord (){ // this is needed so that the user will be required to hold down all three keys for the playcChord to be triggered
  if (chordPlayed === true) return;
  
  if (chord5CanPlay && keysPressed ['i'] && keysPressed['o'] && keysPressed ['p']) {// by adding falling5 into this the other blocks stopped falling if we hold down the chord because it now only happens if thing 5 is falling which it isnt once the chords are recognised for pressing once.
    chordPlayed = true; // this means that the chord will only be played once if it were to be held down
    playcChord();
}}

function hitNote (){
  combo += 1;
  if (speed === 2){
     score += combo;
  } else if (speed === 4){
    score += combo +=1}
  updateScore();
}


// this is the 'ground' so that the blocks will not fall off the screen
const groundY = window.innerHeight - 140; // 140 is the height of the blocks as the top left corner is the point its set, this means that when setting other positions in relation to the ground we will not need to -140 every time
const melody = ['e', 'd', 'c', 'd','e', 'e', 'e',
  'd', 'd', 'd', 'e', 'g', 'g',
  'e', 'd', 'c', 'd', 'e', 'e', 'e', 
  'e', 'd', 'd', 'e', 'd', 'c'
]
let index = 0 // this is what we will use to move through the melody array, starts at 0 so that z is called first
const harmony = ['z', 'y', 'y', 'z','y', 'y', 'y',
  'z', 'y', 'y', 'z', 'y', 'y',
  'z', 'y', 'y', 'z', 'y', 'y', 'y', 
  'z', 'y', 'y', 'z', 'y', 'y'
]


// this is used to trigger the array to move to the next thing when nextNote is called. If the array is currently on d for example than falling D becomes true, this means the blcok D will fall and then the user will be expected to click onto D to move to the next part of the array
function nextNote (){
  if (melody[index] === 'g') fallingG = true;
  if (melody[index] === 'e') fallingE = true;
  if (melody[index] === 'd') fallingD = true;
  if (melody[index] === 'c') fallingC = true;

  if(harmony[index] === 'z') {
    falling5 = true;
    chord5CanPlay = true;
    hitGround = false;
  }

  index += 1; // after the next block has fallen than the index will add one, this means the next time the nextNote function is called, the index will have added 1
}

let speed = 2 // this is allowing for the spacebar to adjust the speed
let hitGround = false; // this is for thing5, is tracking if the block has hit the ground yet

function wrongNote (){
  combo = 0; // streak is effectively lost here
 
  let currentSpeed = speed; // this means that if speed is faster because of space bar then it will still return to the current speed.
  speed =0; // this is freesing the falling while this happens
  document.body.style.backgroundColor = "#ea2828ff"; // makes background red
  Util.thingScore.style.fontWeight = 'bold'; // sets score text to be bold

  setTimeout(function() {
    speed = currentSpeed;
    document.body.style.backgroundColor = "#f7ddedff";
    Util.thingScore.style.fontWeight = 'normal';
    
  }, 2000);
};



// the below functions are for the sounds to play, I have set a variable for each sound within the function, this is so that each time playC4 for example, is called a new file will be created. This allows for the notes to play 'ontop' of eachother so that the next note comes as soon as the previous one starts playing
function playC4 (){
  if (fallingC || thingCY === groundY){
  const C4 = new Audio ('C4.mp3'); // linking C4 to the audio file
  C4.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);
    hitNote();
  
  updateScore (); // calling the update score so that the score actually updates when 1 is added to it
  fallingC = false; // means that the block stops falling 
  thingCY = -140; // resets the position of thingC to be just above the screen, insead of hiding and reappearing the element so its neater
  nextNote(); // calling the nextNote function to play so that the next block is triggered to fall allowing the user to click onto the next note
  // playHarmony();
} else {
  score -= 1;
  updateScore();
  wrongNote();
}}


function playD4 (){
  if (fallingD || thingDY === groundY){
  const D4= new Audio ('D4.mp3');
  D4.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);

  hitNote();
  updateScore ();
  fallingD = false;
  thingDY = - 140;
  nextNote();
  //playHarmony();
} else {
  score -= 1;
  updateScore();
  wrongNote();
}}


function playE4 (){
  if (fallingE || thingEY === groundY){
  const E4= new Audio ('E4.mp3');
  E4.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);
  hitNote();
  updateScore ();
  fallingE = false;
  thingEY = - 140;
  nextNote();
} else {
  score -= 1;
  updateScore();
  wrongNote();
}}


function playG4 (){
  if (fallingG || thingGY === groundY){
  const G4= new Audio ('G4.mp3');
  G4.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);
  hitNote();
  updateScore ();
  fallingG = false;
  thingGY = - 140;
  nextNote();
} else {
  score -=1;
  updateScore();
  wrongNote();
}}


// here we have set the variable to cChord first so that there is only 1 cChord, this means that the chord can only be played once at a time so stops issues with multiple chord presses being allowed

function playcChord (){
  if (chord5CanPlay || thing5Y === groundY){
    const cChord= new Audio ('chord3.mp3');
    cChord.preload = 'auto'; // this is to remove the delay when key pressed and sound plays for the first time
    cChord.loop = false; // this means the chord should keep playing as long as it is held down in a loop
  cChord.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);
  hitNote();
  updateScore ();
  hitGround = true;
  falling5 = false;
  chord5CanPlay = false;
  thing5Y = -140
} else {
  score -= 1;
  updateScore();
  wrongNote();
  }}




// when pointerdown starts the game the next note is called making the first block fall
function start () {
  nextNote();

  setTimeout(() => {
   document.getElementById("message1").style.display = "none";
   document.getElementById("message2").style.display = "none";
   document.getElementById("message3").style.display = "none";
   document.getElementById("message4").style.display = "none";

   document.getElementById("thing1RH").style.display = "flex";
   document.getElementById("thing2RH").style.display = "flex";
   document.getElementById("thing3RH").style.display = "flex";
   document.getElementById("thing4RH").style.display = "flex";
   document.getElementById("thing5LH").style.display = "flex";
   document.getElementById("thingScore").style.display = "flex";

   }, ); 
  }




// Code that runs over and over again
function loop() {

  if (falling5){
    if (thing5Y < groundY) { // if the position of thing is above the ground
    thing5Y += speed;  // add 3px each loop
  } else {
    thing5Y = groundY; // otherwise stop falling
    if (!hitGround){
    score -= 2;
    updateScore ();
    hitGround = true;
    
  } 
  falling5 = false;
}}

  if (fallingC){
    if (thingCY < groundY){ // if it has not yet touched the ground
      thingCY += speed; // make it fall
    } else { // so if it has touched the ground
      score -= 2; // -2 from score
      updateScore ();
      fallingC = false; // stop falling
      
    }}
    
  if (fallingD){
    if (thingDY < groundY) {
      thingDY += speed;
    } else {
      score -= 2;
      updateScore ();
      fallingD = false;
      
      
    }}

  if (fallingE){
    if (thingEY < groundY) {
      thingEY += speed;
    } else {
      score -= 2;
      updateScore ();
      fallingE = false;
      
      
    }}

  if (fallingG){
    if (thingGY < groundY) {
      thingGY += speed;
    } else {
      score -= 2;
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
  // the above is setting the text in the blocks that are falling

  // Put your event listener code here
  document.addEventListener('pointerdown', start) // user clicks pointer down to start the first block falling is then triggered in start function
  document.body.style.backgroundColor = "#f7ddedff";


  document.addEventListener('keydown', function(event) { // setting what happens when different keys are pressed
   keysPressed[event.key] = true; // this marks the key as being pressed down in keys pressed and adds to object
   chord(); // chord function makes sound play but only if falling remains true and all three keys are held down
   if (event.key === "c"){
      playC4();
      
      
  } else if (event.key === "e"){
      playE4();
      
      
  } else if (event.key === "d"){
      playD4();
      
  } else if (event.key === "g"){
      playG4();
         
  } else if (event.key === " "){
    speed = 4

  } else if (event.key === "i" ||event.key === "o"||event.key === "p") {

  } else {
    score -=1;
    updateScore();
    wrongNote(); 
  }
});

document.addEventListener('keyup', function(event){
  keysPressed[event.key] = false; // this is releasing the pressed down state so that the key in question is no longer being held down, is held up. removes from object.
  
  if (event.key === 'i' || event.key === 'o' || event.key === 'p'){
  chordPlayed = false; // resets here so that the chord would hypothetically be able to be replayed
  playcChordcChord.pause ();
  }

 if (event.key === " "){
  speed = 2; // making the falling speed so therefore the game speed faster if the space key is eld down
 }
});

 document.getElementById("thing1RH").style.display = "none";
 document.getElementById("thing2RH").style.display = "none";
 document.getElementById("thing3RH").style.display = "none";
 document.getElementById("thing4RH").style.display = "none";
 document.getElementById("thing5LH").style.display = "none";
 document.getElementById("thingScore").style.display = "none";




  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!






