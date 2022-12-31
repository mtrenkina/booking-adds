const ROOM_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
const TIME_VARIABLES = ['12:00', '13:00', '14:00'];
const ROOM_EQUIPMENT = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

export const getRandomInteger = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

//Returns element AND list of used numbers
export const getUniqueElement = (usedNumbers, min, max) => {
  let currentNumber = getRandomInteger(min, max);

  while (usedNumbers.includes(currentNumber)) {
    currentNumber = getRandomInteger(min, max);
  }
  usedNumbers.push(currentNumber);
  return [usedNumbers, currentNumber];
};

const getItemsList = (arr) => {
  const quantity = getRandomInteger(1, arr.length);

  let usedItems = [];

  const list = new Array(quantity).fill(null).map((el) => {
    const currentItem = getUniqueElement(usedItems, 0, arr.length - 1);
    const currentNumber = currentItem[1];
    const usedNumbers = currentItem[0];
    el = arr[currentNumber];
    usedItems = usedItems.concat(usedNumbers);
    return el;
  });

  return list;
};

export const getRoomType = () => {
  const roomTypesKeys = Object.keys(ROOM_TYPES);
  return roomTypesKeys[getRandomInteger(0, roomTypesKeys.length - 1)];
};

export const getTimeVariable = () => TIME_VARIABLES[getRandomInteger(0, TIME_VARIABLES.length - 1)];

export const getEquipmentList = () => {
  const eqipmentList = getItemsList(ROOM_EQUIPMENT);
  return eqipmentList;
};

export const getPhotos = () => {
  const photosList = getItemsList(PHOTOS);
  return photosList;
};

export const getCoordinate = (min, max) => +(Math.random() * (max - min + 1) + min).toFixed(5);

export const getOfferType = (roomKey) => Object.keys(ROOM_TYPES).find((key) => ROOM_TYPES[key] === roomKey);

export const isEscEvt = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isEnterEvt = (evt) => evt.key === 'Enter';

const onPopupClick;
const onPopupEscKeydown;

const closePopup = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('keydown', onPopupClick);
};

onPopupClick = () => {
  closePopup();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvt(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

export const showAlert = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', closePopup);
};
