'use strict';

(function () {
  var map = document.querySelector('.map');
  var inputPrice = document.querySelector('#price');
  var inputTimeIn = document.querySelector('#timein');
  var inputTimeOut = document.querySelector('#timeout');
  var btnReset = document.querySelector('.ad-form__reset');
  var formPage = document.querySelector('.ad-form');
  var submitBtn = formPage.querySelector('.ad-form__submit');
  var inputType = document.querySelector('#type');

  var minValuePriceFlat = '1000';
  var minValuePriceHouse = '5000';
  var minValuePricePalace = '10000';

  var roomsCapacityMap = {
    '1': {
      'guests': ['1'],
      'errorText': '1 комната для 1 гостя'
    },
    '2': {
      'guests': ['1', '2'],
      'errorText': '2 комнаты для 1 или 2 гостей'
    },
    '3': {
      'guests': ['1', '2', '3'],
      'errorText': '3 комнаты для 1, 2 или 3 гостей'
    },
    '100': {
      'guests': ['0'],
      'errorText': '100 комнат не для гостей'
    },
  };

  function addPriceAttribute(type) {
    inputPrice.setAttribute('min', type);
  }

  function changeValuePrice() {
    if (inputType.value === 'bungalo') {
      addPriceAttribute('0');
      inputPrice.placeholder = '0';
    } else if (inputType.value === 'flat') {
      addPriceAttribute(minValuePriceFlat);
      inputPrice.placeholder = minValuePriceFlat;
    } else if (inputType.value === 'house') {
      addPriceAttribute(minValuePriceHouse);
      inputPrice.placeholder = minValuePriceHouse;
    } else {
      addPriceAttribute(minValuePricePalace);
      inputPrice.placeholder = minValuePricePalace;
    }
  }

  function changeValueTime() {
    inputTimeOut.value = inputTimeIn.value;
  }

  function validateRoomsNumbers() {
    var roomsSelect = document.querySelector('[name="rooms"]');
    var rooms = roomsSelect.value;
    var guests = document.querySelector('[name="capacity"]').value;
    roomsSelect.setCustomValidity(roomsCapacityMap[rooms].guests.includes(guests) ? '' : roomsCapacityMap[rooms].errorText);
  }

  function onSubmitButtonClick() {
    validateRoomsNumbers();
  }

  window.defaultValueInput = function () {
    inputPrice.placeholder = minValuePriceFlat;
  };

  inputTimeIn.addEventListener('change', function () {
    changeValueTime();
  });

  inputType.addEventListener('input', function () {
    changeValuePrice();
  });

  submitBtn.addEventListener('click', onSubmitButtonClick);

  btnReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    map.classList.add('map--faded');
    formPage.classList.add('ad-form--disabled');
    inactiveState();
    window.removeMapPins();
    var inputs = document.querySelectorAll('input:not(#address)');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].value = '';
    };
  });
})()
