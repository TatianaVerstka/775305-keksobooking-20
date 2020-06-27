'use strict';

var DATA_COUNT = 8;
var mainPin = document.querySelector('.map__pin--main');
var map = document.querySelector('.map');
var formPage = document.querySelector('.ad-form');
var inputFormPage = formPage.querySelectorAll('fieldset');

function inputDisabled(type) {
  for (var i = 0; i < inputFormPage.length; i++) {
    inputFormPage[i].disabled = type;
  }
}

function inactiveState() {
  inputDisabled(true);
  window.getAdressWithPin();
};

function activeState() {
  map.classList.remove('map--faded');
  formPage.classList.remove('ad-form--disabled');
  inputDisabled(false);

  window.renderPins(PINS);
  window.getAdressWithPin();
};

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

