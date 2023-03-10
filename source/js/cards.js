import { getOfferType } from './util.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const setFeaturesList = (featuresList, features) => {
  if (features) {
    featuresList.style.display = 'block';
    featuresList.innerHTML = '';
    featuresList.innerHTML = features
      .map((feature) => `<li class="popup__feature popup__feature--${feature}"></li>`)
      .join('');
  } else {
    featuresList.style.display = 'none';
  }
};

const addPhotos = (photosBlock, photos) => {
  if (photos) {
    photosBlock.style.display = 'block';
    photosBlock.innerHTML = '';
    photosBlock.innerHTML = photos
      .map((photo) => `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`)
      .join('');
  } else {
    photosBlock.style.display = 'none';
  }
};

export const createCard = (offer, author) => {
  const card = cardTemplate.cloneNode(true);
  card.querySelector('.popup__title').textContent = offer.title;
  card.querySelector('.popup__text--address').textContent = offer.adress;
  card.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
  card.querySelector('.popup__type').textContent = getOfferType(offer.type);
  card.querySelector('.popup__text--capacity').textContent = `${offer.rooms} для ${offer.guests} гостей`;
  card.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  const featuresList = card.querySelector('.popup__features');
  setFeaturesList(featuresList, offer.features);

  card.querySelector('.popup__description').textContent = offer.description;

  const photosBlock = card.querySelector('.popup__photos');
  addPhotos(photosBlock, offer.photos);

  card.querySelector('.popup__avatar').setAttribute('src', `${author.avatar}`);

  return card;
};
