const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MAX_PRICE = 100000;

const minPrices = {
  palace: 10000,
  flat: 1000,
  house: 5000,
  bungalow: 0,
};

export const unavaliableCapacities = {
  1: [0, 1, 3],
  2: [0, 3],
  3: [3],
  100: [0, 1, 2],
};

const form = document.querySelector('.ad-form');
const titleInput = form.querySelector('#title');
const priceInput = form.querySelector('#price');
const typeSelect = form.querySelector('#type');
const timeinSelect = form.querySelector('#timein');
const timeoutSelect = form.querySelector('#timeout');
const roomNumberSelect = form.querySelector('#room_number');
const capacitySelect = form.querySelector('#capacity');

const onTitleBlur = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_LENGTH) {
    titleInput.setCustomValidity(`Минимальная длина заголовка: ${MIN_LENGTH} символов`);
  } else if (valueLength > MAX_LENGTH) {
    titleInput.setCustomValidity(`Максимальная длина заголовка: ${MAX_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const onPriceInput = () => {
  const price = priceInput.value;
  const type = typeSelect.value;
  const minPrice = minPrices[type];

  if (price < minPrice) {
    priceInput.setCustomValidity(`Стоимость должна быть не менее ${minPrice} руб.`);
  } else if (price > MAX_PRICE) {
    priceInput.setCustomValidity(`Стоимость не должна превышать ${MAX_PRICE} руб.`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
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

export const onRoomNumberChange = () => {
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

typeSelect.addEventListener('change', onTypeChange);
timeinSelect.addEventListener('change', onTimeinChange);
timeoutSelect.addEventListener('change', onTimeoutChange);
roomNumberSelect.addEventListener('change', onRoomNumberChange);
titleInput.addEventListener('blur', onTitleBlur);
priceInput.addEventListener('input', onPriceInput);
