import { showAlert } from './util.js';
import { URLS, getData } from './data.js';
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

const ALERT_MESSAGE = 'Ошибка загрузки данных.';
const MIN_ADDS_COUNT = 0;
const ADDS_COUNT = 10;

let newAdvertisements = [];

const setDefaults = () => {
  form.reset();
  mainMarkerDefaultPosition();
  onResetForm();
  renderCards(newAdvertisements);
  setAddress(DEFAULT_LAT, DEFAULT_LONG);
};

deactivateForm();
getData(
  URLS.GET,
  (advertisements) => {
    newAdvertisements = advertisements.slice(MIN_ADDS_COUNT, ADDS_COUNT);
    setUpMap(newAdvertisements);
    formReset.addEventListener('click', (evt) => {
      evt.preventDefault();
      setDefaults();
    });
  },
  showAlert(ALERT_MESSAGE)
);
activateForm();
