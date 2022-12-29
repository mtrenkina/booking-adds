const ROOM_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
const TIME_VARIABLES = ['12:00', '13:00', '14:00'];
const ROOM_EQUIPMENT = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

function getItemsList(arr) {
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
}

export function getRoomType() {
  const roomTypesKeys = Object.keys(ROOM_TYPES);
  return roomTypesKeys[getRandomInteger(0, roomTypesKeys.length - 1)];
}

export function getTimeVariable() {
  return TIME_VARIABLES[getRandomInteger(0, TIME_VARIABLES.length - 1)];
}

export function getEquipmentList() {
  const eqipmentList = getItemsList(ROOM_EQUIPMENT);
  return eqipmentList;
}

export function getPhotos() {
  const photosList = getItemsList(PHOTOS);
  return photosList;
}

export function getCoordinate(min, max) {
  return +(Math.random() * (max - min + 1) + min).toFixed(5);
}

export function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

//Returns element AND list of used numbers
export function getUniqueElement(usedNumbers, min, max) {
  let currentNumber = getRandomInteger(min, max);

  while (usedNumbers.includes(currentNumber)) {
    currentNumber = getRandomInteger(min, max);
  }
  usedNumbers.push(currentNumber);
  return [usedNumbers, currentNumber];
}

export function getOfferType(roomKey) {
  return Object.keys(ROOM_TYPES).find((key) => ROOM_TYPES[key] === roomKey);
}
