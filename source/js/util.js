const ROOM_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const TOKYO_CENTER = {
  lat: 35.69034,
  lng: 139.75175,
};

const ZOOM = 13;

export const getTokyoCenter = () => TOKYO_CENTER;

export const getDefaultZoom = () => ZOOM;

export const getOfferType = (roomKey) => Object.keys(ROOM_TYPES).find((key) => ROOM_TYPES[key] === roomKey);

export const isEscEvt = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isEnterEvt = (evt) => evt.key === 'Enter';
