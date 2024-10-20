const thumbnails = document.querySelectorAll('.thumbnails img');
const dialog = document.getElementById('imageDialog');
const dialogImage = document.getElementById('dialogImage');

// Open the dialog with the full-size image when a thumbnail is clicked
thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener('click', () => {
    const fullsizeSrc = thumbnail.getAttribute('data-fullsize');
    dialogImage.src = fullsizeSrc;
    dialog.showModal();
  });
});

// Close the dialog when clicking outside of the image
dialog.addEventListener('click', (event) => {
  if (event.target === dialog) {
    dialog.close();
  }
});

