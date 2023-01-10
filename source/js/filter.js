import debounce from 'lodash';
import { removeMapMarkers, renderCards } from './map.js';

const RERENDER_DELAY = 500;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const form = document.querySelector('.ad-form');
const formReset = form.querySelector('.ad-form__reset');
const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.elements;
const typeSelect = filterForm.querySelector('#housing-type');
const priceSelect = filterForm.querySelector('#housing-price');
const roomsSelect = filterForm.querySelector('#housing-rooms');
const guestsSelect = filterForm.querySelector('#housing-guests');
const featuresList = filterForm.querySelectorAll('.map__checkbox');

export const resetFilters = () => {
  Array.from(filterElements).forEach((el) => {
    el.value = DEFAULT_VALUE;
  });
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  Array.from(checkedFeatures).forEach((feature) => {
    feature.checked = false;
  });
};

export const deactivateFilter = () => {
  resetFilters();
  filterForm.classList.add('.map__filters--disabled');

  Array.from(filterElements).forEach((filter) => {
    filter.setAttribute('disabled', '');
  });
};

export const activateFilter = () => {
  filterForm.classList.remove('.map__filters--disabled');

  Array.from(filterElements).forEach((filter) => {
    filter.removeAttribute('disabled', '');
  });
};

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
  filterForm.addEventListener('change', () => onFilterChange(advertisements));
};

formReset.addEventListener('click', resetFilters);
