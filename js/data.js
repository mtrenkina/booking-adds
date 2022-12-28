import {
  getRandomInteger,
  getRoomType,
  getTimeVariable,
  getEquipmentList,
  getPhotos,
  getCoordinate,
  getUniqueElement,
} from './util.js';

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

export const advertisements = new Array(advertismentsCount)
  .fill(null)
  .map(() => createAdvertisement(avatarsList));
