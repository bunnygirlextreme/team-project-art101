// handles popup 2 for creature
function openPopup2() {
  document.getElementById("popup").style.display = "none";

  const popup = document.getElementById("popup");
  const popup2 = document.getElementById("popup2");

  popup2.style.top = popup.style.top;
  popup2.style.left = popup.style.left;

  popup2.style.display = "block";
}

// Closes all popups

function closeAll() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");
  const popup2 = document.getElementById("popup2");
  const popup3 = document.getElementById("popup3");

  if (popup) popup.style.display = "none";
  if (popup3) popup3.style.display = "none";

  if (popup2 && popup2.style.display !== "none") {
    const sound = new Audio('sounds/smited.mov');
    sound.play();

    $(popup2).fadeOut(2300, function () {
      
      if (overlay) overlay.style.display = "none";
    });
  } else {
    
    if (overlay) overlay.style.display = "none";
  }
}


  // Main popup maker

function openRandomPopup() {
  const overlay = document.getElementById("overlay");
  const popup = document.getElementById("popup");

  const maxX = window.innerWidth - 400;
  const maxY = window.innerHeight - 400;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  popup.style.left = `${randomX}px`;
  popup.style.top = `${randomY}px`;

  overlay.style.display = "block";
  popup.style.display = "block";
}


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
        closeAll();
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

// Squirrely Pop Up Functions/Handles (this could be simplified with jQuery but for now this is what I have done with vanilla JS)

function openPopup3() { // Shows popup at a random position
  const popup3 = document.getElementById("popup3");
  const closeBtn = document.querySelector(".close-btn");
  const photo = document.querySelector(".photo");

  const maxX = window.innerWidth - 320; // leaves some margin
  const maxY = window.innerHeight - 320;

  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  popup3.style.left = `${randomX}px`;
  popup3.style.top = `${randomY}px`;
  popup3.style.display = "block";

  photo.style.width = popup3.style.width;  // Match width of the popup(not needed unless you want to tbh)
  photo.style.height = popup3.style.height; // Match height of the popup (not needed unless you want the image to be the same as the pop up made)


  closeBtn.style.position = "absolute";
  closeBtn.style.top = "10px";
  closeBtn.style.right = "10px";
}

document.addEventListener("DOMContentLoaded", function () { // Move popup randomly when hovering over the image
  const photo = document.querySelector(".photo");
  const popup3 = document.getElementById("popup3");

  popup3.style.position = "absolute"; //size and position of pop-up (changing it within bounds of javascript in order to not change the css)
  popup3.style.width = "300px";
  popup3.style.height = "300px";

  $('.hover-trigger').on('mouseenter', function () { // Hover trigger (important for many of the pop-ups we are going to make)
    openPopup3();
  });

  document.querySelector(".close-btn").addEventListener("click", closeAll);

  
  photo.addEventListener("mouseover", function () { // Makes it so that when the mouse is hovered over, the pop-up appears randomly in page
    const maxX = window.innerWidth - popup3.offsetWidth;
    const maxY = window.innerHeight - popup3.offsetHeight;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    popup3.style.left = `${randomX}px`;
    popup3.style.top = `${randomY}px`;
  });
});



// ------------------------------------------------------




