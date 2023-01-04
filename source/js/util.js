const ROOM_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};

const ALERT_MESSAGE = 'Ошибка загрузки данных :(';

export const getOfferType = (roomKey) => Object.keys(ROOM_TYPES).find((key) => ROOM_TYPES[key] === roomKey);

export const isEscEvt = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

export const isEnterEvt = (evt) => evt.key === 'Enter';

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

const onPopupClick = () => {
  closePopup();
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvt(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

export const showAlert = () => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  errorMessage.querySelector('p').textContent = ALERT_MESSAGE;
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', closePopup);
};

export const debounce = (fn, wait) => {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, arguments), wait);
  };
};
