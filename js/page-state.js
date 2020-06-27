'use strict';

(function () {
  var formPage = document.querySelector('.ad-form');
  var inputFormPage = formPage.querySelectorAll('fieldset');

  function inputDisabled(type) {
    for (var i = 0; i < inputFormPage.length; i++) {
      inputFormPage[i].disabled = type;
    }
  }

  window.inactiveState = function () {
    inputDisabled(true);
    window.getAdressWithPin();
  }

  window.activeState = function() {
    map.classList.remove('map--faded');
    formPage.classList.remove('ad-form--disabled');
    inputDisabled(false);

    window.renderPins(PINS);
    window.getAdressWithPin();
  }
})()
