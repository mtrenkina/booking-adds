import { getData } from './data.js';
import { deactivateForm, activateForm, onFormReset, onFormSubmit } from './form.js';
import { setUpMap, renderCards, mainMarkerDefaultPosition } from './map.js';
import { setFilterChange } from './filter.js';
import { showAlert } from './messages.js';

const MIN_ADDS_COUNT = 0;
const ADDS_COUNT = 10;

let newAdvertisements = [];

deactivateForm();

getData((advertisements) => {
  setFilterChange(advertisements);
  newAdvertisements = advertisements.slice(MIN_ADDS_COUNT, ADDS_COUNT);
  setUpMap(newAdvertisements);
  renderCards(newAdvertisements);
  onFormSubmit(mainMarkerDefaultPosition);
  onFormReset(mainMarkerDefaultPosition);
  activateForm();
}, showAlert);
