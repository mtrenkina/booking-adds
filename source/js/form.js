import { sendData } from './data.js';
import {
  titleInput,
  priceInput,
  typeSelect,
  timeinSelect,
  roomNumberSelect,
  onRoomNumberChange,
  onTimeinChange,
  minPrices,
} from './validate.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

export const DEFAULT_LAT = 35.6804;
export const DEFAULT_LONG = 139.769;
export const LOCATION_PRECISION = 5;

export const form = document.querySelector('.ad-form');
export const formReset = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');
const descriptionField = form.querySelector('#description');
const mapFilters = document.querySelector('.map__filters');
const features = form.querySelector('.features');
const featuresElements = features.elements;

export const setAddress = (lat, long) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
};

export const deactivateForm = () => {
  form.classList.add('ad-form--disabled');
  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.classList.add('disabled');
  });

  mapFilters.classList.add('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.add('disabled');
  });
  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.add('disabled');
  });
};

export const activateForm = () => {
  form.classList.remove('ad-form--disabled');

  form.querySelectorAll('fieldset').forEach((fieldset) => {
    fieldset.classList.remove('disabled');
  });

  mapFilters.classList.remove('map__filters--disabled');
  mapFilters.querySelectorAll('.map__filter').forEach((filter) => {
    filter.classList.remove('disabled');
  });
  mapFilters.querySelectorAll('.map__features').forEach((feature) => {
    feature.classList.remove('disabled');
  });
  onRoomNumberChange();
};

export const onResetForm = () => {
  setAddress(DEFAULT_LAT, DEFAULT_LONG);
  titleInput.value = '';
  priceInput.value = '';
  typeSelect.value = 'flat';
  priceInput.placeholder = minPrices[typeSelect.value];
  timeinSelect.value = '12:00';
  roomNumberSelect.value = '1';
  [...featuresElements].forEach((feature) => {
    feature.checked = false;
  });
  descriptionField.value = '';
  onRoomNumberChange();
  onTimeinChange();
};

export const onSubmitForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        showSuccessMessage();
        onResetForm();
      },
      showErrorMessage,
      formData
    );
  });
};
