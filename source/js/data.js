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
        onSuccess('Ваше объявление успешно размещено!');
      } else if (response.status >= 500 && response.status <= 505) {
        onFail('Не удалось получить данные с сервера. Попробуйте ещё раз!');
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз!');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз!');
    });
};
