import { sendData } from './data.js';
import { onRoomNumberChange } from './validate.js';
import { resetFilters } from './filter.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';

export const DEFAULT_LAT = 35.6804;
export const DEFAULT_LONG = 139.769;
export const LOCATION_PRECISION = 5;

export const form = document.querySelector('.ad-form');
export const formReset = form.querySelector('.ad-form__reset');
const addressField = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');

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
  onRoomNumberChange();
  resetFilters();
};

const onSubmitForm = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(
      () => {
        showSuccessMessage();
        onResetForm();
      },
      showErrorMessage(),
      formData);
  });
};

formReset.addEventListener('click', onResetForm);
form.addEventListener('submit', onSubmitForm);
