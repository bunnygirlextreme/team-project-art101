// Jaboticaba
// May 2025


// ------------------------------------------------------------------------------------------------------
// Global vars
// ------------------------------------------------------------------------------------------------------




let currentAudio = null;

var maxNumPopups = 10;



// ------------------------------------------------------------------------------------------------------
// Popup creation funcs (Not spawners)
// ------------------------------------------------------------------------------------------------------


// takes in an id string ex: 'popup2'
// opens it randomly on the page
function popupOpener(id = "popup", display = "block") {
  // prevents spawning if there are more than maxNumPopups visible
  if (popupCount() >= maxNumPopups) return;

  // obtains specific element id of the id taken as input
  // if there are multiple matching popups with the same id get one randomly
  const popup = RandElement(id);

  // if the popup doesn't exist return
  if (!popup) return;
  
  // if the isPopupBlocked function returns True indicating the popup is blocked the function returns
  if (isPopupBlocked(popup.id)) return;

  // gets the random x and y coords to display the popup using the bounds of the window subtracting some to add padding
  // math made using my references
  // used some stack overflow but mostly google ai prompt on google
  // https://stackoverflow.com/questions/17469152/how-can-i-contain-math-random-div-placement-within-window
  const maxX = document.body.scrollWidth - 400;
  const maxY = document.body.scrollHeight - 400;
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  // location of popup
  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;

  // displays the popup with the corresponding display type defaulting to block
  popup.style.display = display;

  console.log(popup.id);

  if (popup.id === 'popup-door') {
    playPopupSound(popup); //sound for the door pop-up
  }

}

function openHorizontalBorderPopup(display = "block") {
  // prevents spawning if there are more than maxNumPopups visible
  if (popupCount() >= maxNumPopups) return;

  // if there are multiple matching popups with the same id get one randomly
  const popup = RandElement('fixed-horizontal-popup');

  // if the popup doesn't exist return
  if (!popup) return;
  
  // if the isPopupBlocked function returns True indicating the popup is blocked the function returns
  if (isPopupBlocked(popup.id)) return;

  // Gets the maximum X coord for the spawning which is just checking where the bottom of the window is
  // subtracting the size of the popup as neccessary
  const maxX = window.innerWidth - popup.offsetWidth ;

  // Gets a random spot horizontally to spawn the pop up
  popup.style.left = `${Math.random() * maxX}px`;

  // displays the popup with the corresponding display type defaulting to block
  popup.style.display = display;
}

function openVerticalBorderPopup(display = "block") {
  // prevents spawning if there are more than maxNumPopups visible
  if (popupCount() >= maxNumPopups) return;

  // if there are multiple matching popups with the same id get one randomly
  const popup = RandElement('fixed-vertical-popup');

  // if the popup doesn't exist return
  if (!popup) return;
  
  // if the isPopupBlocked function returns True indicating the popup is blocked the function returns
  if (isPopupBlocked(popup.id)) return;
  
  // Gets the maximum Y coord for the spawning which is just checking where the bottom of thw window is
  // subtracting the size of the popup as neccessary
  const maxY = window.innerHeight -  popup.offsetHeight ;

  // Gets a random spot vertically to spawn the pop up
  popup.style.top = `${Math.random() * maxY}px`;

  // displays the popup with the corresponding display type defaulting to block
  popup.style.display = display;
}

// ------------------------------------------------------------------------------------------------------
// Helper funcs (use these in other funcs to simplify ur life)
// ------------------------------------------------------------------------------------------------------

// takes an id as input (string) 
// randomly chooses one of the ids matching the input and return its
function RandElement(id) {
  // creates array of all elements matching id
  // indexes array randomly and returns a random element of matching id
  const elements = Array.from(document.querySelectorAll(`[id="${id}"]`));

  // I had to ask wesbot for a little help here
  // essentially iterates through all the elements and filters out to return
  // all of them where dataset.active is not "true" indicating the popup is not
  // currently being displayed
  let unactiveElements = elements.filter(element => element.dataset.active !== "true");
 
  // if nothing is unactive and ready to be spawned return
  // (everything matching the input id is already displayed)
  if (unactiveElements.length === 0) return;

  // chooses an id index at random
  const randomIndex = Math.floor(Math.random() * unactiveElements.length);
  // indexes with random index to get the element/id that will be spawned
  const randomElement = unactiveElements[randomIndex];
  // set the dataset.active to true indicating the popup is being displayed
  randomElement.dataset.active = "true";
  // returns the element
  return randomElement;
}

// takes two ids and moves the id of the first one to match the second
// ex: matchPosition("popup2", "popup")
//      or matchPosition("popup2", this) to match selected popup to current location
function matchPosition(popup2, popup1) {
  const ref = popup1.parentElement;
  const move = document.getElementById(popup2);
  // returns if either reference or moving popup are Null
  if (!ref || !move) return;
  // sets location of moving popup equal to reference
  // makes it visible
  move.style.top = ref.style.top;
  move.style.left = ref.style.left;
  move.style.display = "block";
} 


// ------------------------------------------------------------------------------------------------------
// Specific effect funcs (ex: shrink button, captcha, etc)
// ------------------------------------------------------------------------------------------------------

// Captcha func
// takes in input val and checks if it matches "DVDirs"
// closes on success, writes try again in output id on failure
$("#captcha").click(function(){

    // get value of input field
    const input = $("#input").val();

    if (input != "DVDirs"){
        $("#output").html('<div class="text"><p>' + 'Try Again' +'</p></div>');
        $("#input").val("");
    } else {
        $("#input").val("");
        closeThis(this);
    }

});

// Shrink func
// shrinks id "closeBtn" as mouse gets closer
document.addEventListener("mousemove", function(e) {
    const btn = document.getElementById("closeBtn");
    
    // math I ripped off stack overflows and google ai
    // https://stackoverflow.com/questions/16949642/getboundingclientrect-but-relative-to-the-entire-document 
    // https://stackoverflow.com/questions/63553494/clientx-and-clienty-are-offset-from-reall-coordinates 

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    // how small or big button can get
    const minScale = 0.25;
    const maxScale = 1.5;
    // how far away the mouse has to be b4 button shrinks
    const threshold = 500; 

    let scale = maxScale;
    if (distance < threshold) {
        scale = minScale + ((distance / threshold) * (maxScale - minScale));
    }
    btn.style.transform = `scale(${scale})`;
});

// ------------------------------------------------------------------------------------------------------
// Close funcs
// ------------------------------------------------------------------------------------------------------

// A testing function that will not be used in the final site (I don't think)
// closes all popups of matching input id
// I reccomend closeAll('popup')
function closeAll(id) {
  // iterates through all popups matching the input id 
  const elements = document.querySelectorAll(`[id="${id}"]`);
  for (i = 0; i < elements.length; i++) {
    const popup = elements[i];
    // closes popup at index i
    // sets display to none making the popup not visible
    popup.style.display = "none";
    // sets flag for the popup to not be repeated
    // sets dataset.active to false indicating the popup isn't currently visible
    popup.dataset.active = "false";
    // resets Blocked to allow the popup to spawn
    resetBlocked();
}
} 

// closes popup matching id
function closeId(id) {
  // gets element using the id
  const element = document.getElementById(id);
  if (element) {
    // sets display to none making the popup not visible
    element.style.display = "none";
    // sets dataset.active to false indicating the popup isn't currently visible
    element.dataset.active = "false";
    // resets Blocked to allow the popup to spawn
    resetBlocked();
  }
}

// closes parent popup if you use this as parameter
function closeThis(element = this){
  // assumes the input is this and gets the corresponding parent element
  const id = element.parentElement;
  // sets display to none making the popup not visible
  id.style.display = "none";
  // sets dataset.active to false indicating the popup isn't currently visible
  id.dataset.active = "false";
  // resets Blocked to allow the popup to spawn
  resetBlocked();

  if (id.id === 'popup-door' && currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }
}

// fades out popup and plays sound
function plea(element){
    // assumes the input is this and gets the corresponding parent element
    const id = element.parentElement;
    // retrieves creates and plays the audio
    const sound = new Audio('sounds/smited.mov');
    sound.play();
    // fades out the popup with the specified timing
    $(id).fadeOut(2300, function () {
    });
    // resets Blocked to allow the popup to spawn
    resetBlocked();
}
// fades out popup and plays sound
function death(element){
    // assumes the input is this and gets the corresponding parent element
    const id = element.parentElement;
    // retrieves creates and plays the audio
    const sound = new Audio('sounds/death.mp3');
    sound.play();
    // fades out the popup with the specified timing
    $(id).fadeOut(2500, function () {
    });
    // resets Blocked to allow the popup to spawn
    resetBlocked();
}

//--------------------------------------------------------
// Sound for (Door Pop -Up)
//-----------------------------------------------------
function playPopupSound(popup) {
  if (popup.id === 'popup-door') {
    // If there's already an audio playing, stop it
    if (currentAudio) {
      currentAudio.pause(); // Stop the current audio
      currentAudio.currentTime = 0; // Reset the audio to the start
    }

    // Create and play the new audio
    currentAudio = new Audio('./sounds/doorknock.mp3');
    currentAudio.play()
      .catch(error => {
        console.log("Error playing sound:", error);
      });
      
  }
}




// ------------------------------------------------------------------------------------------------------
// Spawn popup funcs
// ------------------------------------------------------------------------------------------------------

// Random interval generator
function startRandomSpawner() {
  setInterval(() => {
    const delay = Math.random() *  100;//3000 + 1000;
    setTimeout(() => {
      roulette();
    }, delay);
  }, 2000);
}

function roulette(){
  // prevents spawning if there are more than maxNumPopups visible
  if (popupCount() >= maxNumPopups) return;

  const funcs = [
        () => popupOpener(),                       
        // () => openHorizontalBorderPopup(),        
       // () => openVerticalBorderPopup(), 
        () => popupOpener("popup-door"), 
        () => popupOpener("candy","flex"),
        () => popupOpener("story1"),
        () => popupOpener("mo1"),
        () => popupOpener("popup-doctor"),
        () => popupOpener("popup-cream"),
        () => popupOpener("popup-jackpot"),
        () => popupOpener("popup-creature"),
        () => popupOpener("popup-stocks"),
        () => popupOpener("popup-homealone"),
        () => popupOpener("popup-infomercial"),
        () => popupOpener("popup-baby"),
        () => popupOpener("popup-buff"),
        () => popupOpener("popup-dating"),
      //  () => nicePopupOpener(popupName, display type ex: flex,block,etc)  
      // make sure both args in parenthesis   
  ];

  // gets a random index corresponding to a function from the list of funcs above
  let index = Math.floor(Math.random() * 1000) % funcs.length;

  const doorPopupChance = 0.5; //made a low chance bc this shit was getting annoying
  if(index === 3){
    if (Math.random() < doorPopupChance ) {
        console.log("Door was Denied");
        return;
      }
    }
     
  // calls the corresponding function with the random index
  // the spawning function is called
  funcs[index]();
}



// Start spawning (comment out if you do not want random spawns)
// Wait 15 seconds before starting the popup spawner
// Commented out for testing purposes
setTimeout(() => {
  startRandomSpawner();
}, 15000); 



document.addEventListener("DOMContentLoaded", function () {
  // Get ALL elements with class .hover-trigger
  const hoverTriggers = document.querySelectorAll(".hover-trigger");

  hoverTriggers.forEach(function(trigger) {
    trigger.addEventListener("mouseenter", function () {
      roulette();
    });
  });
});

// returns a bool depending on if the input popup id is currently being blocked
// I had wesbot help me here as well
function isPopupBlocked(popupId) {
  // gets the indec of the popup id from the Blockees arrat
  const index = Blockees.indexOf(popupId);
  // if the index is -1 indicating an error
  // meaning the popup id was not in the array it returns false
  // allowing the popup to be spawned
  if (index === -1) return false;

  // indexes the blockers array with the matching index from Blockees and ors it with an empty list ( I think because for iteration call below to loop through properly)
  const blockers = Blockers[index] || [];


  // iterates through return the corresponding bool to whether or not the popup is currently visible returning it to compute the bool if isBlocked
  const isBlocked = blockers.some(id => {
  const elements = document.querySelectorAll(`[id="${id}"]`);
  return Array.from(elements).some(element => {
    const style = window.getComputedStyle(element);
    return style.display !== "none";
  });
});


  return isBlocked;
}

// iterates through resetting dataset.active to false indicating the popup can be spawned
function resetBlocked() {
  Blockees.forEach(blockeeId => {
    if (!isPopupBlocked(blockeeId)) {
      const elements = document.querySelectorAll(`[id="${blockeeId}"]`);
      elements.forEach(el => el.dataset.active = "false");
    }
  });
}

// these work off index
// for example the first element of Blockers blocks everything in the first list of Blockees
const Blockees = ["story1", "mo1"]; 
const Blockers = [
  // Blocks "story1" from spawning
  ["story1","story2","story3","story4","story5","story6","story7","story8","story8","story10","story11","story12","story13","story14","story15","story16","story17"], 
   // Blocks mo1 from spawning
  ["mo2"]
  //,["popup_names"]                   
];

// returns how many total popups there are visible
function popupCount() {
  // initializes count to actively check each time
  count = 0;
  // array of all popup ids
    const popupIds = [
    "popup", 
    "fixed-horizontal-popup","fixed-vertical-popup",
    "story1","story2","story3","story4","story5","story6","story7","story8","story8","story10","story11","story12","story13","story14","story15","story16","story17", 
    "mo1","mo2",
    "popup-door",
    "cookie-consent",
    "candy", "c2",
    // Add more known popup IDs here
  ];
  // iterates through each id checking if display is none indicating it is visble
  // if it is visible (not not visible) adds to count
  popupIds.forEach(id => {
    const elements = document.querySelectorAll(`[id="${id}"]`);
    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.display !== "none") {
        count++;
      }
    });
  });
  // returns number of currently visible popups
  return count;
}

//----------------------------------------------------------------------------------------
// Fake Cookie Consent 
//----------------------------------------------------------------------------------------

//will reappear every few minutes

function acceptCookies() {
  const cookieBanner = document.getElementById("cookie-consent");
  if (cookieBanner) {
    cookieBanner.style.display = "none";
  }

  // Reappear after 15 seconds (change as desired)
  setTimeout(() => {
    showCookiePopup();
  }, 15000);
}
 

function showCookiePopup() {
  const cookieBanner = document.getElementById("cookie-consent");
  if (cookieBanner) {
    cookieBanner.style.display = "block";
  }
}

// Show cookie popup after 1 second on page load (this can change if it becomes too overloaded)
window.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    showCookiePopup();
  }, 1000);
})

//deny button now runs away :P

const denyBtn = document.getElementById("deny-btn");

denyBtn.addEventListener("mouseenter", () => {
  const parent = denyBtn.parentElement;
  const maxX = parent.offsetWidth - denyBtn.offsetWidth;
  const maxY = parent.offsetHeight - denyBtn.offsetHeight;

  const randX = Math.random() * maxX;
  const randY = Math.random() * maxY;

  denyBtn.style.position = "relative";
  denyBtn.style.left = `${randX}px`;
  denyBtn.style.top = `${randY}px`;
});


