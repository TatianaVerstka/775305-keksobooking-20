'use strict';

(function () {
  window.load = function (onSuccess, onError) {
    var statusCode = {
      OK: 200
    };
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
