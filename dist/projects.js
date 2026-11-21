// The full photograph remains available as a normal link without JavaScript.
const projectPhotos = [...document.querySelectorAll('[data-photo]')];
const photoViewer = document.querySelector('#project-viewer');
let activePhoto = 0;
let returnFocus;
function showProjectPhoto(index) {
  activePhoto = (index + projectPhotos.length) % projectPhotos.length;
  const link = projectPhotos[activePhoto];
  const caption = link.closest('figure').querySelector('figcaption').textContent;
  const fullImage = document.querySelector('#photo-full');
  fullImage.src = link.href;
  fullImage.alt = caption;
  document.querySelector('#photo-caption').textContent = caption;
  document.querySelector('#photo-count').textContent = `${activePhoto + 1} / ${projectPhotos.length}`;
}
if (photoViewer && typeof photoViewer.showModal === 'function') {
  projectPhotos.forEach((link, index) => link.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    returnFocus = link;
    showProjectPhoto(index);
    photoViewer.showModal();
  }));
  document.querySelector('.photo-close').addEventListener('click', () => photoViewer.close());
  document.querySelector('.photo-previous').addEventListener('click', () => showProjectPhoto(activePhoto - 1));
  document.querySelector('.photo-next').addEventListener('click', () => showProjectPhoto(activePhoto + 1));
  photoViewer.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft') {event.preventDefault(); showProjectPhoto(activePhoto - 1);}
    if (event.key === 'ArrowRight') {event.preventDefault(); showProjectPhoto(activePhoto + 1);}
  });
  photoViewer.addEventListener('click', event => {
    if (event.target !== photoViewer) return;
    const bounds = photoViewer.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) photoViewer.close();
  });
  photoViewer.addEventListener('close', () => returnFocus?.focus({preventScroll: true}));
}
document.querySelectorAll('.trailer-inquiry').forEach(link => link.addEventListener('click', () => {
  // Keep the service card order and form option mapping unchanged.
  document.querySelector('#service').selectedIndex = 5;
}));
