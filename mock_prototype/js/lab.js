// Jaboticaba
// May 2025


// ------------------------------------------------------------------------------------------------------
// Popup creation funcs (Not spawners)
// ------------------------------------------------------------------------------------------------------

function openRandomPopup() {

  const popup = RandElement('popup');

  const maxX = window.innerWidth - 400;
  const maxY = window.innerHeight - 400;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;


  popup.style.display = "block";
}

function openSpecificPopup(id) {

  const popup = document.getElementById(id);

  const maxX = window.innerWidth - 400;
  const maxY = window.innerHeight - 400;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;


  popup.style.display = "block";
}

// ------------------------------------------------------------------------------------------------------
// Helper funcs (use these in other funcs to simplify ur life)
// ------------------------------------------------------------------------------------------------------



// takes an id as input (string) 
// randomly chooses one of the ids matching the input and return its
function RandElement(id) {
  const elements = document.querySelectorAll(`[id="${id}"]`);
  const randomIndex = Math.floor(Math.random() * elements.length);
  const randomElement = elements[randomIndex];
  return randomElement;
}

// takes two ids and moves the id of the first one to match the second
// ex: matchPosition("popup2", "popup");
function matchPosition(popup2, popup1) {
  const ref = popup1.parentElement;
  const move = document.getElementById(popup2);
  if (!ref || !move) return;

  move.style.top = ref.style.top;
  move.style.left = ref.style.left;
  move.style.display = "block";
}

// ------------------------------------------------------------------------------------------------------
// Specific effect funcs (ex: shrink button, captcha, etc)
// ------------------------------------------------------------------------------------------------------



// Captcha func

// click listener for button
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
document.addEventListener("mousemove", function(e) {
    const btn = document.getElementById("closeBtn");
    

    const rect = btn.getBoundingClientRect();
    const btnCenterX = rect.left + rect.width / 2;
    const btnCenterY = rect.top + rect.height / 2;

    const dx = e.clientX - btnCenterX;
    const dy = e.clientY - btnCenterY;

    const distance = Math.sqrt(dx * dx + dy * dy);

    const minScale = 0.25;
    const maxScale = 1.5;
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


function closeAll(id) {
 
  const elements = document.querySelectorAll(`[id="${id}"]`);

  for (i = 0; i < elements.length; i++) {
    popup = elements[i];
    popup.style.display = "none";
}
  
}


function closeCurrent(element) {

  id = element.parentElement

  id.style.display = "none";

}



// ------------------------------------------------------------------------------------------------------
// Spawn popup funcs
// ------------------------------------------------------------------------------------------------------

// Random interval generator
function startRandomSpawner() {
  setInterval(() => {
    const delay = Math.random() * 3000 + 1000; 
    setTimeout(openRandomPopup, delay);
  }, 2000);
}


// Start spawning (comment out if you do not want random spawns)
startRandomSpawner();

document.addEventListener("DOMContentLoaded", function () {

  // Hover trigger element
  const hoverTrigger = document.querySelector(".hover-trigger");

  if (hoverTrigger) {
    hoverTrigger.addEventListener("mouseenter", function () {
      openRandomPopup();
    });
  } 
});

