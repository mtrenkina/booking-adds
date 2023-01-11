import debounce from 'lodash';
import { removeMapMarkers, renderCards } from './map.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const typeSelect = filterForm.querySelector('#housing-type');
const priceSelect = filterForm.querySelector('#housing-price');
const roomsSelect = filterForm.querySelector('#housing-rooms');
const guestsSelect = filterForm.querySelector('#housing-guests');
const featuresList = filterForm.querySelectorAll('.map__checkbox');

const checkType = (ad, element) => element.value === DEFAULT_VALUE || ad.offer.type === element.value;

const checkPrice = (ad, element) => {
  switch (element.value) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return ad.offer.price < LOW_PRICE;
    case 'middle':
      return ad.offer.price >= LOW_PRICE && ad.offer.price < HIGH_PRICE;
    case 'high':
      return ad.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
};

const checkRooms = (ad, element) => element.value === DEFAULT_VALUE || Number(element.value) === ad.offer.rooms;

const checkGuests = (ad, element) =>
  element.value === DEFAULT_VALUE ? true : parseInt(element.value, 10) <= ad.offer.guests;

const checkFeatures = (ad) =>
  Array.from(featuresList).every((feature) => {
    if (!feature.checked) {
      return true;
    }
    if (!ad.offer.features) {
      return false;
    }
    return ad.offer.features.includes(feature.value);
  });

export const getFilteredAds = (advertisements) => {
  const filteredAdvertisements = advertisements.filter(
    (advertisement) =>
      checkType(advertisement, typeSelect) &&
      checkPrice(advertisement, priceSelect) &&
      checkRooms(advertisement, roomsSelect) &&
      checkGuests(advertisement, guestsSelect) &&
      checkFeatures(advertisement)
  );
  return filteredAdvertisements;
};

const onFilterChange = (advertisements) => {
  const filteredAdds = getFilteredAds(advertisements).slice(0, 10);
  removeMapMarkers();
  renderCards(filteredAdds);
};

export const setFilterChange = (advertisements) => {
  filterForm.addEventListener('change', () => debounce(onFilterChange(advertisements), RERENDER_DELAY));
};
