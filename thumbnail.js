const thumbnails = document.querySelectorAll('.thumbnails img');
const dialog = document.getElementById('imageDialog');
const dialogImage = document.getElementById('dialogImage');
let images = [];
let currentIndex = 0;

// Fetch the JSON file and store the image list, then warm the cache for full-size images.
fetch('images.json')
  .then((response) => response.json())
  .then((data) => {
    images = data;
    queuePrefetch(data);
  });

function queuePrefetch(list) {
  const prefetch = () => {
    if (!('caches' in window)) return;
    caches.open('bw-fullsize-images').then((cache) => {
      const urls = list.map((img) => new URL(img, window.location.href).toString());
      cache.addAll(urls).catch(() => {
        // Cache API might fail on some hosts; ignore silently.
      });
    });
  };

  if ('requestIdleCallback' in window) {
    requestIdleCallback(prefetch, { timeout: 2000 });
  } else {
    setTimeout(prefetch, 500);
  }
}

// Open the dialog with the full-size image when a thumbnail is clicked
thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentIndex = index;
    const fullsizeSrc = thumbnail.dataset.fullsize || images[currentIndex];
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
  const fullsizeSrc = thumbnails[currentIndex].dataset.fullsize || images[currentIndex];
  dialogImage.src = fullsizeSrc;
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

// Event listener for keydown events to navigate with arrow keys
document.addEventListener('keydown', (event) => {
  if (dialog.open) { // Only listen if the dialog is open
    if (event.key === 'ArrowLeft') {
      updateImage(currentIndex - 1); // Left arrow - show previous image
    } else if (event.key === 'ArrowRight') {
      updateImage(currentIndex + 1); // Right arrow - show next image
    }
  }
});

// Close the dialog when clicking outside of the image
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});
