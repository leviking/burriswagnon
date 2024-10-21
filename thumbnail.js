const thumbnails = document.querySelectorAll('.thumbnails img');
const dialog = document.getElementById('imageDialog');
const dialogImage = document.getElementById('dialogImage');
let images = [];
let currentIndex = 0;

// Fetch the JSON file and store the image list
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    images = data;
  });

// Open the dialog with the full-size image when a thumbnail is clicked
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index;
    const fullsizeSrc = images[currentIndex];
    dialogImage.src = fullsizeSrc;
    dialog.showModal();
  });
});

// Function to update the dialog image based on the next/previous image index
function updateImage(newIndex) {
  if (newIndex >= images.length) {
    newIndex = 0; // Loop back to the first image if going past the last image
  } else if (newIndex < 0) {
    newIndex = images.length - 1; // Loop to the last image if going before the first image
  }

  currentIndex = newIndex;
  dialogImage.src = images[currentIndex];
}

// Event listener to handle clicks on the dialog for navigation
dialog.addEventListener('click', (event) => {
  const dialogRect = dialog.getBoundingClientRect();
  const clickX = event.clientX - dialogRect.left;

  // Determine if the click was on the left or right side
  if (clickX < dialogRect.width / 2) {
    // Left side click - show previous image
    updateImage(currentIndex - 1);
  } else {
    // Right side click - show next image
    updateImage(currentIndex + 1);
  }
});

// Close the dialog when clicking outside of the image
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

