import './cards.js';
import './data.js';
import './filter.js';
import './validate.js';
import './form.js';
import './map.js';
import './messages.js';
import './photos.js';

import { showAlert } from './util.js';
import { getData } from './data.js';
import {
  DEFAULT_LAT,
  DEFAULT_LONG,
  form,
  formReset,
  deactivateForm,
  activateForm,
  setAddress,
  onResetForm,
} from './form.js';
import { setUpMap, renderCards, mainMarkerDefaultPosition } from './map.js';
import { activateFilter, deactivateFilter } from './filter.js';
import { DEFAULT_AVATAR, DEFAULT_PHOTO, previewAvatar, previewPhoto, clearOutImage } from './photos.js';

const MIN_ADDS_COUNT = 0;
const ADDS_COUNT = 10;

let newAdvertisements = [];

const setDefaults = () => {
  form.reset();
  clearOutImage(previewAvatar, DEFAULT_AVATAR);
  clearOutImage(previewPhoto, DEFAULT_PHOTO);
  mainMarkerDefaultPosition();
  onResetForm();
  renderCards(newAdvertisements);
  setAddress(DEFAULT_LAT, DEFAULT_LONG);
  deactivateFilter();
  activateFilter();
};

deactivateForm();

getData(
  (advertisements) => {
    newAdvertisements = advertisements.slice(MIN_ADDS_COUNT, ADDS_COUNT);
    setUpMap(newAdvertisements);
    activateForm();
    formReset.addEventListener('click', (evt) => {
      evt.preventDefault();
      setDefaults();
    });
  },
  showAlert
);

