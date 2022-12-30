const form = document.querySelector('.ad-form');
const priceInput = form.querySelector('#price');
const typeSelect = form.querySelector('#type');
const timeinSelect = form.querySelector('#timein');
const timeoutSelect = form.querySelector('#timeout');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');
const addressField = form.querySelector('#address');
const mapFilters = document.querySelector('.map__filters');
const formReset = form.querySelector('.ad-form__reset');

export const START_LATITUDE = 35.6804;
export const START_LONGITUDE = 139.769;
export const LOCATION_PRECISION = 5;

const minPrices = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

const unavaliableCapacities = {
  1: [0, 1, 3],
  2: [0, 3],
  3: [3],
  100: [0, 1, 2],
};

export const setAddress = (lat, long) => {
  const latitude = lat.toFixed(LOCATION_PRECISION);
  const longitude = long.toFixed(LOCATION_PRECISION);
  addressField.value = `${latitude} ${longitude}`;
};

const onTypeChange = () => {
  priceInput.min = minPrices[typeSelect.value];
  priceInput.placeholder = minPrices[typeSelect.value];
};

const onTimeinChange = () => {
  timeoutSelect.value = timeinSelect.value;
};

const onTimeoutChange = () => {
  timeinSelect.value = timeoutSelect.value;
};

const onRoomNumberChange = () => {
  const capacityOptions = [...capacitySelect.querySelectorAll('option')];
  const disableCapacity = unavaliableCapacities[roomNumberSelect.value];

  capacityOptions.forEach((option) => {
    option.disabled = false;
  });

  disableCapacity.forEach((option) => {
    capacityOptions[option].disabled = true;
  });

  switch (roomNumberSelect.value) {
    case '1':
      capacityOptions[2].selected = true;
      break;
    case '2':
      capacityOptions[1].selected = true;
      break;
    case '3':
      capacityOptions[0].selected = true;
      break;
    case '100':
      capacityOptions[3].selected = true;
      break;
  }
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
};

const onResetForm = () => {
  setAddress(START_LATITUDE, START_LONGITUDE);
  onRoomNumberChange();
};

typeSelect.addEventListener('change', onTypeChange);
timeinSelect.addEventListener('change', onTimeinChange);
timeoutSelect.addEventListener('change', onTimeoutChange);
roomNumberSelect.addEventListener('change', onRoomNumberChange);
formReset.addEventListener('click', onResetForm);
