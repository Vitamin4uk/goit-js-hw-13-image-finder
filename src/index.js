import './sass/main.scss';
import ImagesApiService from './js/apiService';
import getRefs from './js/getRefs';
import imageCardTpl from './templates/imageCard.hbs';

const refs = getRefs();
const imagesApiService = new ImagesApiService();

refs.form.addEventListener('submit', onFormSubmit);
refs.btn.addEventListener('click', onBtnClick);

function onFormSubmit(e) {
  e.preventDefault();
  refs.gallery.innerHTML = '';
  imagesApiService.query = e.currentTarget.elements.query.value;
  renderGalleryImages();
}

function onBtnClick(e) {
  imagesApiService.incrementPage();
  renderGalleryImages();
}

function renderGalleryImages() {
  const lastElOfGallery = refs.gallery.lastElementChild;
  imagesApiService.fetchImages().then(images => {
    const imagesMarkup = imageCardTpl(images);
    refs.gallery.insertAdjacentHTML('beforeend', imagesMarkup);
    refs.btn.classList.remove('is-hidden');
    if (lastElOfGallery) {
      scrollToTop(lastElOfGallery);
    }
  });
}

function scrollToTop(el) {
  const firstElOfNextPage = el.nextElementSibling;
  firstElOfNextPage.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
}
