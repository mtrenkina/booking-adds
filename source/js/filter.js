import debounce from 'lodash';
import { removeMapMarkers, renderCards } from './map.js';

const RERENDER_DELAY = 5000;
const DEFAULT_VALUE = 'any';
const LOW_PRICE = 10000;
const HIGH_PRICE = 50000;

const filterForm = document.querySelector('.map__filters');
const filterElements = filterForm.elements;
const typeSelect = filterForm.querySelector('#housing-type');
const priceSelect = filterForm.querySelector('#housing-price');
const roomsSelect = filterForm.querySelector('#housing-rooms');
const guestsSelect = filterForm.querySelector('#housing-guests');

export const resetFilters = () => {
  [...filterElements].forEach((el) => {el.value = DEFAULT_VALUE;});
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  [...checkedFeatures].forEach((feature) => {feature.checked = false;});
};

export const deactivateFilter = () => {
  resetFilters();
  filterForm.classList.add('.map__filters--disabled');
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].setAttribute('disabled', '');
  }
};

export const activateFilter = () => {
  filterForm.classList.remove('.map__filters--disabled');
  for (let i = 0; i < filterElements.length; i++) {
    filterElements[i].removeAttribute('disabled');
  }
};

const checkType = (advertisement, element) => element.value === DEFAULT_VALUE || advertisement.offer.type === element.value;

const checkPrice = (advertisement, element) => {
  switch (element.value) {
    case DEFAULT_VALUE:
      return true;
    case 'low':
      return advertisement.offer.price < LOW_PRICE;
    case 'middle':
      return advertisement.offer.price >= LOW_PRICE && advertisement.offer.price < HIGH_PRICE;
    case 'high':
      return advertisement.offer.price >= HIGH_PRICE;
    default:
      return false;
  }
};

const checkRooms = (advertisement, element) => element.value === DEFAULT_VALUE || Number(element.value) === advertisement.offer.rooms;

const checkGuests = (advertisement, element) => element.value === DEFAULT_VALUE ? true : parseInt(element.value, 10) <= advertisement.offer.guests;

const checkFeatures = (advertisement) => {
  const checkedFeatures = filterForm.querySelectorAll('.map__checkbox:checked');
  let count = 0;

  checkedFeatures.forEach((feature) => {
    if (advertisement.offer.features.includes(feature.value)) {
      count++;
    }
  });
  return count === checkedFeatures.length;
};

export const getFilteredAds = (advertisements) => {
  const filteredAdvertisements = advertisements.filter((advertisement) => (
    checkType(advertisement, typeSelect) &&
      checkPrice(advertisement, priceSelect) &&
      checkRooms(advertisement, roomsSelect) &&
      checkGuests(advertisement, guestsSelect) &&
      checkFeatures(advertisement)
  ));
  return filteredAdvertisements;
};

const onFilterChange = (advertisements) => debounce((evt) => {
  evt.preventDefault();
  const filteredAdds = getFilteredAds(advertisements);
  removeMapMarkers();
  renderCards(filteredAdds);
}, RERENDER_DELAY);

export const setFilterChange = (advertisements) => {
  filterForm.addEventListener('change', onFilterChange(advertisements));
};
