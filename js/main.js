'use strict';

var DATA_COUNT = 8;

var map = document.querySelector('.map');
var mainPin = document.querySelector('.map__pin--main');

window.defaultValueInput();

mainPin.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        window.activeState();
        break;
    }
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    window.activeState();
  }
});

var PINS = window.getPins(DATA_COUNT);

window.inactiveState();

