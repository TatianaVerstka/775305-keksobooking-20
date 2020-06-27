'use strict';

(function () {

  window.getAdressWithPin = function () {
    var PIN_MAIN_WIDTH = 65;
    var PIN_MAIN_HEIGHT = 65;
    var PIN_WIDTH = 50;
    var PIN_HEIGHT = 70;
    var formDisabled = document.querySelector('.ad-form--disabled');
    var inputAddress = document.querySelector('#address');
    var mainPin = document.querySelector('.map__pin--main');
    var pin = document.querySelector('.map__pin');

    if (formDisabled) {
      inputAddress.value = Math.round(parseFloat(mainPin.style.left) + (PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((parseFloat(mainPin.style.top) + (PIN_MAIN_HEIGHT / 2)));
    } else {
      if (mainPin) {
        inputAddress.value = Math.round(parseFloat(mainPin.style.left) + (PIN_MAIN_WIDTH / 2)) + ', ' + Math.round((parseFloat(mainPin.style.top) + (PIN_MAIN_HEIGHT / 2 + 22)));
      } else {
        inputAddress.value = Math.round(parseFloat(pin.style.left) + (PIN_WIDTH / 2)) + ', ' + Math.round((parseFloat(pin.style.top) + PIN_HEIGHT));
      }
    }
  };

  function shuffleArray (array) {
    var newArray = array.slice();
    for (var i = newArray.length - 1; i > 0; i--) {
      var j = getRandomValue(i);
      var temp = newArray[i];
      newArray[i] = newArray[j];
      newArray[j] = temp;
    }
    return newArray;
  };

  window.getRandomNumberInRange = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  window.cloneElements = function (templateSelector, elementSelector) {
    return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
  }

  window.getRandomValue = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  window.getArrayWithRandomLength = function (array) {
    return shuffleArray(array).slice(0, window.getRandomValue(array.length));
  }
})();
