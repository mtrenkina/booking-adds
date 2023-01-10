import { isEscEvt, isEnterEvt } from './util.js';

const body = document.querySelector('body');
const successMessage = body.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorMessage = body.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const closeMessage = (message) => {
  message.remove();
};

const onClick = (message) => (evt) => {
  evt.preventDefault();
  closeMessage(message);
};

const onMessageKeydown = (message) => (evt) => {
  if (isEscEvt(evt) || isEnterEvt(evt)) {
    evt.preventDefault();
    document.removeEventListener('keydown', onMessageKeydown(message));
    message.removeEventListener('click', onClick(message));
    closeMessage(message);
  }
  if (message === errorMessage) {
    errorButton.removeEventListener('click', onClick(errorMessage));
  }
};

const showMessage = (message) => {
  document.body.appendChild(message);
  message.style.zIndex = 1000;
  document.addEventListener('keydown', onMessageKeydown(message));
  message.addEventListener('click', onClick(message));
};

export const showSuccessMessage = () => {
  showMessage(successMessage);
};

export const showErrorMessage = () => {
  showMessage(errorMessage);
  errorButton.addEventListener('click', onClick(errorMessage));
};
