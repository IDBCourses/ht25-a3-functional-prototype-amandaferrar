/*
 * IDB Programming: Code Playground
 *
 */

import * as Util from "./util.js";

// VARIABLES (NOT FIXED)
// the x coordinates for each thing, thingG refers to the note G that is played etc.
// this is set to the window width/2 which gets the midpoint and then the +30 etc are setting the position, this is so that the blocks are all lined up next to eachother
let thingGX = window.innerWidth/2 -30;
let thingEX = window.innerWidth/2 +40;
let thingDX = window.innerWidth/2 +110;
let thingCX = window.innerWidth/2 +180;
let thing5X = window.innerWidth/2 -230;
// the Y coordinates for each thing all set to be -140 meaning that they are sitting above the page
let thingGY = -140;
let thingEY = -140;
let thingDY = -140;
let thingCY = -140;
let thing5Y = -140;
// falling variables- these will be set as true when the item needs to start falling but will start as false as they arent falling yet.
let fallingG = false
let fallingE = false
let fallingD = false
let fallingC = false
let falling5 = false
// for the scoring- Variable starts at 0, then function update score which is added to the text in the CSS thingScore and updates the score shown
let score = 0;
// combo is being used to track a streak. If the player hits the 1st note correct it adds 1, second note adds 2 etc. this is to reward a streak.
let combo = 0;
let keysPressed = {}; // empty object for things pressed, when a key is pressed its added to the object. This allows for the chord being played to work.
let chordPlayed = false; // will be used so that if chord has been played it will not be able to be replayed
let chord5CanPlay = false; // is set to true when the z index is active, this means that the chord cannot be played unless the block is on the screen
let index = 0; // this is what we will use to move through the melody and harmony arrays, starts at 0 so that z is called first. the Arryas have been linked so that they are moving in time, this means that harmony notes fall as long as the melody is played.
let pointsAdded = 0; // this is going to be used when setting the text for how many points has been added to the screen. It is being set in the hitnote function.
let advancedSpeed = 4;  // this is when spacebar is held down so that the speed will go faster
let beginnerSpeed = 2; // this is what the speed will start as
let speed = beginnerSpeed; // this is allowing for the spacebar to adjust the speed, it starts as speed 2 and is changed to 4 when spacebar held down
let gameStarted = false; // this will be used in the start function so that the pointerdown only triggers the nextNote function once



// CONSTANT VARIABLES
// this is the 'ground' so that the blocks will not fall off the screen
const groundY = window.innerHeight - 140; // 140 is the height of the blocks as the top left corner is the point its set, this means that when setting other positions in relation to the ground we will not need to -140 every time



// CONSTANT ARRAYS
// the melody constant is the notes that will be played in the desired order
const melody = ['e', 'd', 'c', 'd','e', 'e', 'e',
  'd', 'd', 'd', 'e', 'g', 'g',
  'e', 'd', 'c', 'd', 'e', 'e', 'e', 
  'e', 'd', 'd', 'e', 'd', 'c'
]
// harmony array- the z notes in the array trigger the falling of the chord. The Y notes are used as a filler so that the timing matches with the melody array
const harmony = ['z', 'y', 'y', 'z','y', 'y', 'y',
  'z', 'y', 'y', 'z', 'y', 'y',
  'z', 'y', 'y', 'z', 'y', 'y', 'y', 
  'z', 'y', 'y', 'z', 'y', 'y'
]


// FUNCTIONS
// this function is showing the score in the top left corner, every time update score is called the score is reset to whatever value it holds
function updateScore (){
    Util.thingScore.textContent = "Score: "+ score;
  }

// chord function is needed so that the user will be required to hold down all three keys for the playcChord to be triggered
function chord (){ 
  if (chordPlayed === true) return; // this means that the chord play has already happened so stops it happening again
  
  if (chord5CanPlay && keysPressed ['i'] && keysPressed['o'] && keysPressed ['p']) {// by adding chord5CanPlay into this it stops the chord being played at the wrong time
    chordPlayed = true; // this then means that when the chord function is called again it will return and not run this bit of the code again
    playcChord();
}}

// the hitNote function sets the score by adding the combo. If the speed is 4 (the game is harder) than an extra point is added per note
function hitNote (){ // as you hit the note...
  combo += 1;
  if (speed === 2){
     pointsAdded= combo; // points added for that round is the combo
  } else if (speed === advancedSpeed){
    pointsAdded = combo +1} // add the combo to pointsAdded and add an extra 1 as a reward for going fast
  score += pointsAdded;  
  updateScore(); // this is called so that the change is actually visable on the screen
  // pointsAdded should now represent how many points has been added to the game that hit
}


// nextNote function is used to trigger the array to move to the next thing when nextNote is called. If the array is currently on d for example than falling D becomes true, this means the block D will fall and then the user will be expected to click onto D to move to the next part of the array
function nextNote (){
  if (melody[index] === 'g') fallingG = true; // if we are on the g part of the array then fallingG is true and block will start falling
  if (melody[index] === 'e') fallingE = true;
  if (melody[index] === 'd') fallingD = true;
  if (melody[index] === 'c') fallingC = true;

  if(harmony[index] === 'z') { // if we are on part z of the array (this is the chord) then ...
    falling5 = true; // meaning the block falls
    chord5CanPlay = true; // allows for the chord letters to be pressed by the user as they were blocked before
  }
  index += 1; // after the next block has fallen than the index will add one, this means the next time the nextNote function is called, the index will have added 1
}

// wrongNote function is triggered when user presses the wrong note or presses the note at the wrong time (when the block is not falling)
function wrongNote (){
  combo = 0; // streak is effectively lost here as its reset to 0
  let currentSpeed = speed; // this sets the speed as whatever it was previously
  speed =0; // this is freesing the falling while this happens
  document.body.style.backgroundColor = "#ea2828ff"; // makes background red
  Util.thingScore.style.fontWeight = 'bold'; // sets score text to be bold

  setTimeout(function() {
    speed = currentSpeed; // this means that the speed returns to whatever it was before be it the advanced speed or normal speed
    document.body.style.backgroundColor = "#f7ddedff"; // returns to background colour
    Util.thingScore.style.fontWeight = 'normal'; // no longer bold
    
  }, 2000); // after a 2 second delay
};


// the below functions are for the sounds to play, I have set a constant variable for each sound within the function, this is so that each time playC4 for example, is called a new file will be created. This allows for the notes to play 'ontop' of eachother so that the next note comes as soon as the previous one starts playing
function playC4 (){
  if (fallingC || thingCY === groundY){ // if the block is falling or the thing is on the floor (meaning you cant play the note if the block is not visible as then its the wrong time)
  const C4 = new Audio ('C4.mp3'); // linking C4 to the audio file. Constant as it will not change
  C4.play (); // makes the audio file play
  // by this point we know that the user has clicked onto the note at the right time
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)"; // sets background colour to green as note is correct
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff"; // background returns to nearwhite
    }, 600); // after 0.6 secs
  hitNote(); // hitNote is called, this is adjusting the points in relation to combo if there is a streak and speed getting more points
  fallingC = false; // means that the block stops falling as the user has hit the note
  thingCY = -140; // resets the position of thingC to be just above the screen, insead of hiding and reappearing the element so its neater
  nextNote(); // calling the nextNote function to play so that the next block is triggered to fall allowing the user to click onto the next note
} else { // this will be called if its not falling and is not on the ground so basically if the user clicks c at the wrong time
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
  fallingD = false;
  thingDY = - 140;
  nextNote();
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
  fallingG = false;
  thingGY = - 140;
  nextNote();
} else {
  score -=1;
  updateScore();
  wrongNote();
}}


// function for the chord slightly different as instead of checking against falling5 we are checking chord5CanPlay, this is to stop a potential double press happening where the chord can be played more than once.
function playcChord (){
  if (chord5CanPlay || thing5Y === groundY){
  const cChord= new Audio ('chord3.mp3');
  cChord.play ();
  document.body.style.backgroundColor= "rgba(123, 250, 138, 1)";
    setTimeout(() => {
      document.body.style.backgroundColor = "#cef7c2ff";
    }, 600);
  hitNote();
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
  if (gameStarted === false){ // only runs nextNote once
    nextNote();
    gameStarted = true;} // so that this wont run again

  setTimeout(() => {
    // the messages are sert to none meaning they are removed
   document.getElementById("message1").style.display = "none"; 
   document.getElementById("message2").style.display = "none";
   document.getElementById("message3").style.display = "none";
   document.getElementById("message4").style.display = "none";

   // the things are set to flex meaning that they become visable
   document.getElementById("thing1RH").style.display = "flex";
   document.getElementById("thing2RH").style.display = "flex";
   document.getElementById("thing3RH").style.display = "flex";
   document.getElementById("thing4RH").style.display = "flex";
   document.getElementById("thing5LH").style.display = "flex";
   document.getElementById("thingScore").style.display = "flex";

   }, 0); 

  }




// Loop function - code that runs over and over again
function loop() {

  if (falling5){ // if falling5 is true
    if (thing5Y < groundY) { // if the position of thing is above the ground
    thing5Y += speed;  // add 3px each loop
  } else { // so it has touched the ground
    combo = 0; // resets the streak
    score -= 2; // lose 2 from the score
    updateScore ();
    wrongNote (); // calls wrong note as its late
    falling5 = false; // stops falling
  } 
  
}

  if (fallingC){
    if (thingCY < groundY){ // if it has not yet touched the ground
      thingCY += speed; // make it fall
    } else { // so if it has touched the ground
      combo = 0;
      score -= 2; // -2 from score
      updateScore ();
      wrongNote ();
      fallingC = false; // stop falling
      
    }}
    
  if (fallingD){
    if (thingDY < groundY) {
      thingDY += speed;
    } else {
      combo = 0;
      score -= 2;
      updateScore ();
      wrongNote ();
      fallingD = false;
      
      
    }}

  if (fallingE){
    if (thingEY < groundY) {
      thingEY += speed;
    } else {
      combo = 0;
      score -= 2;
      updateScore ();
      wrongNote();
      fallingE = false;
      
      
    }}

  if (fallingG){
    if (thingGY < groundY) {
      thingGY += speed;
    } else {
      combo = 0;
      score -= 2;
      updateScore ();
      wrongNote ();
      fallingG = false;
      
      
    }}
  
    // here we are setting the blocks positions
  Util.setPositionPixels(thingGX, thingGY, Util.thingG);
  Util.setPositionPixels(thingEX, thingEY, Util.thingE);
  Util.setPositionPixels(thingDX, thingDY, Util.thingD);
  Util.setPositionPixels(thingCX, thingCY, Util.thingC);
  Util.setPositionPixels(thing5X, thing5Y, Util.thing5);

  window.requestAnimationFrame(loop);
}

// Setup is run once, at the start of the program. It sets everything up for us!
function setup() {
  // setting the letters that will display into the falling blocks
  Util.thingG.textContent = "G";
  Util.thingE.textContent = "E";
  Util.thingD.textContent = "D";
  Util.thingC.textContent = "C";
  Util.thing5.textContent = "I O P";
  // setting background colour
  document.body.style.backgroundColor = "#f7ddedff";

  // event listener code
  document.addEventListener('pointerdown', start) // user clicks pointer down to start the first block falling is then triggered in start function
  document.addEventListener('keydown', function(event) { // setting what happens when different keys are pressed
   keysPressed[event.key] = true; // this marks the key as being pressed down in keys pressed and adds to object
   chord(); // chord function makes sound play but only if falling remains true and all three keys are held down
   if (event.key === "c"){ // if user presses onto the c key
      playC4(); // then C4 function is called
  } else if (event.key === "e"){
      playE4();
  } else if (event.key === "d"){
      playD4();
  } else if (event.key === "g"){
      playG4(); 
  } else if (event.key === " "){ // if the spacebar is pressed
    speed = advancedSpeed // then the speed will become advanced speed (it will be faster)
  } else if (event.key === "i" ||event.key === "o"||event.key === "p") { // these are added in here but nothing is set to happen when they are pressed, this is because in the chord functin its set that if these are pressed the chord will play etc.
  // by having this empty area it means that the score will not -1 when these iop keys are pressed
  } else { // if any other key on the keyboard is pressed
    score -=1; // lose 1 point
    updateScore();
    wrongNote(); // wrong note is triggered
  }
});

document.addEventListener('keyup', function(event){ // when the key is released
  keysPressed[event.key] = false; // this is releasing the pressed down state so that the key in question is no longer being held down, is held up. removes from object.
  if (event.key === 'i' || event.key === 'o' || event.key === 'p'){ // when these keys are released
  chordPlayed = false; // resets here so that the chord would hypothetically be able to be replayed but only if it is on the screen
  }

 if (event.key === " "){ // if space bar is released
  speed = beginnerSpeed; // making the falling speed so therefore the game speed faster if the space key is held down
 }
});

 // in the initial setup the blocks are not visable, they will become visible when pointerdown trigers start
 document.getElementById("thing1RH").style.display = "none";
 document.getElementById("thing2RH").style.display = "none";
 document.getElementById("thing3RH").style.display = "none";
 document.getElementById("thing4RH").style.display = "none";
 document.getElementById("thing5LH").style.display = "none";
 document.getElementById("thingScore").style.display = "none";



  window.requestAnimationFrame(loop);
}

setup(); // Always remember to call setup()!






