const URLS = {
  GET: 'https://27.javascript.pages.academy/keksobooking/data',
  POST: 'https://27.javascript.pages.academy/keksobooking',
};

export const getData = (onSuccess, onFail) => {
  fetch(URLS.GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      onFail(`При загрузке объявлений произошла ошибка: ${response.text}`);
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
    .catch(() => {
      onFail();
    });
};
