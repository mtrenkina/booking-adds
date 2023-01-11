import { getTokyoCenter } from './util.js';
import { sendData } from './data.js';
import { onRoomNumberChange, onTimeinChange, returnTypePlaceholder } from './validate.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { clearOutImages } from './photos.js';

const TOKYO_CENTER = getTokyoCenter();
const LOCATION_PRECISION = 5;
const DEFAULT_VALUE = 'any';

const form = document.querySelector('.ad-form');
const addressField = form.querySelector('#address');
const descriptionField = form.querySelector('#description');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const typeSelect = form.querySelector('#type');
const timeInSelect = form.querySelector('#timein');
const roomNumberSelect = form.querySelector('#room_number');
const features = form.querySelector('.features');
const featuresElements = features.elements;
const filterForm = document.querySelector('.map__filters');
const filters = filterForm.querySelectorAll('.map__filter');
const featuresFilters = filterForm.querySelectorAll('.map__features');

export const setAddress = (lat, long) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
};

export const resetFilters = () => {
  filters.forEach((el) => {
    el.value = DEFAULT_VALUE;
  });

  filterForm.querySelectorAll('.map__checkbox:checked').forEach((feature) => {
    feature.checked = false;
  });
};

export const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.setAttribute('disabled', 'disabled');
  });

  resetFilters();

  filterForm.classList.add('map__filters--disabled');
  filters.forEach((filter) => {
    filter.setAttribute('disabled', 'disabled');
  });
  featuresFilters.forEach((feature) => {
    feature.setAttribute('disabled', 'disabled');
  });
};

export const activateForm = () => {
  form.classList.remove('ad-form--disabled');

  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.removeAttribute('disabled');
  });

  filterForm.classList.remove('map__filters--disabled');
  filters.forEach((filter) => {
    filter.removeAttribute('disabled');
  });
  featuresFilters.forEach((feature) => {
    feature.removeAttribute('disabled');
  });

  onRoomNumberChange();
};

export const onFormReset = (cb) => {
  form.addEventListener('reset', (evt) => {
    evt.preventDefault();
    clearOutImages();
    setAddress(TOKYO_CENTER.lat, TOKYO_CENTER.lng);
    resetFilters();
    cb();
    titleInput.value = '';
    priceInput.value = '';
    typeSelect.value = 'flat';
    priceInput.placeholder = returnTypePlaceholder(typeSelect.value);
    timeInSelect.value = '12:00';
    roomNumberSelect.value = '1';
    Array.from(featuresElements).forEach((feature) => {
      feature.checked = false;
    });
    descriptionField.value = '';
    onRoomNumberChange();
    onTimeinChange();
  });
};

export const onFormSubmit = (cb) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        showSuccessMessage();
        form.reset(cb);
      },
      showErrorMessage,
      formData
    );
  });
};
