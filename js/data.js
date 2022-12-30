import {
  getRandomInteger,
  getRoomType,
  getTimeVariable,
  getEquipmentList,
  getPhotos,
  getCoordinate,
  getUniqueElement,
} from './util.js';

export const URLS = {
  GET: 'https://22.javascript.pages.academy/keksobooking/data',
  POST: 'https://22.javascript.pages.academy/keksobooking',
};

const advertismentsCount = 10;
const avatarsList = [];

const createAdvertisement = (usedAvatars) => {
  const uniqueElement = getUniqueElement(usedAvatars, 0, 9);
  const coordinateX = getCoordinate(35.65, 35.7);
  const coordinateY = getCoordinate(139.7, 139.8);
  usedAvatars = usedAvatars.concat(uniqueElement[0]);

  return {
    author: {
      avatar: `../img/avatars/user0${uniqueElement[1]}.png`,
    },
    location: {
      x: coordinateX,
      y: coordinateY,
    },
    offer: {
      tittle: 'Заголовок',
      adress: [coordinateX, coordinateY],
      price: getRandomInteger(1000, 10000),
      type: getRoomType(),
      rooms: getRandomInteger(1, 5),
      guests: getRandomInteger(1, 20),
      checkin: getTimeVariable(),
      checkout: getTimeVariable(),
      features: getEquipmentList(),
      description: 'Описание помещения',
      photos: getPhotos(),
    },
  };
};

export const advertisements = new Array(advertismentsCount).fill(null).map(() => createAdvertisement(avatarsList));

export const getData = (onSuccess, onFail) => {
  fetch(URLS.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onFail(`При загрузке данных произошла ошибка: ${response.text}`);
    })
    .then(onSuccess)
    .catch(onFail);
};

export const sendData = (onSuccess, onFail, body) => {
  fetch(URLS.POST, {
    method: 'POST',
    body,
  })
    .then((response) => {
      if (response.ok) {
        return onSuccess();
      }
      onFail();
    })
    .catch(onFail);
};
