// Jaboticaba
// May 2025


// ------------------------------------------------------------------------------------------------------
// Popup creation funcs (Not spawners)
// ------------------------------------------------------------------------------------------------------

function openRandomPopup() {

  // returns a random element from all the elements with id 'popup'
  const popup = RandElement('popup');

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

  // displays popup
  popup.style.display = "block";
}

// takes in an id string ex: 'popup2'
// opens it randomly on the page
function openSpecificPopup(id) {
  // obtains specific element id of the id taken as input
  const popup = document.getElementById(id);
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

  // displays popup
  popup.style.display = "block";
}

// ------------------------------------------------------------------------------------------------------
// Helper funcs (use these in other funcs to simplify ur life)
// ------------------------------------------------------------------------------------------------------

// takes an id as input (string) 
// randomly chooses one of the ids matching the input and return its
function RandElement(id) {
  // creates array of all elements matching id
  // indexes array randomly and returns a random element of matching id
  const elements = document.querySelectorAll(`[id="${id}"]`);
  const randomIndex = Math.floor(Math.random() * elements.length);
  const randomElement = elements[randomIndex];
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
        closeCurrent(this);
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

// closes all popups of matching input id
// I reccomend closeAll('popup')
function closeAll(id) {
  // iterates through all popups matching the input id 
  const elements = document.querySelectorAll(`[id="${id}"]`);
  for (i = 0; i < elements.length; i++) {
    popup = elements[i];
    // closes popup at index i
    popup.style.display = "none";
} 
}

// closes popup matching element
// I recommend using closeCurrent(this)
function closeCurrent(element) {
  const id = element.parentElement
  id.style.display = "none";
}

// ------------------------------------------------------------------------------------------------------
// Spawn popup funcs
// ------------------------------------------------------------------------------------------------------

// Random interval generator
// 
function startRandomSpawner() {
  setInterval(() => {
    // how long to wait before spawning
    const delay = Math.random() * 3000 + 1000; 
    setTimeout(openRandomPopup, delay);
  }, 2000);
}


// Start spawning (comment out if you do not want random spawns)
startRandomSpawner();


document.addEventListener("DOMContentLoaded", function () {
  // Get ALL elements with class .hover-trigger
  const hoverTriggers = document.querySelectorAll(".hover-trigger");

  hoverTriggers.forEach(function(trigger) {
    trigger.addEventListener("mouseenter", function () {
      openRandomPopup();
    });
  });
});

