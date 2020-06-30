'use strict';

(function () {
  window.load = function (onSuccess) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      onSuccess(xhr.response);
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
