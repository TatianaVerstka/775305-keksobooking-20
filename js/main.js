'use strict';

var TITLES = [
  'Квартира-1',
  'Квартира-2',
  'Квартира-3',
  'Квартира-4',
  'Квартира-5',
  'Квартира-6',
  'Квартира-7',
  'Квартира-8'
];

var PRICES = [
  8000,
  6000,
  7500,
  3200,
  5500,
  9000,
  2500,
  9500
];

var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

var ROOMS = [
  1,
  2,
  3,
  4
];

var QUESTS = [
  1,
  2,
  3,
  4,
  5
];

var CHECKIN = [
  '12:00',
  '13:00',
  '14:00'
];

var CHECKOUT = [
  '12:00',
  '13:00',
  '14:00'
];

var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

var DESCRIPTION = [
  'Описание-1',
  'Описание-2',
  'Описание-3',
  'Описание-4',
  'Описание-5',
  'Описание-6',
  'Описание-7',
  'Описание-8',
];

var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var DATA_COUNT = 8;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 0;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;

var map = document.querySelector('.map');
var pin = document.querySelector('.map__pin');
var mainPin = document.querySelector('.map__pin--main');
var formPage = document.querySelector('.ad-form');
var inputFormPage = formPage.querySelectorAll('fieldset');
var inputType = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
var inputRooms = document.querySelector('#room_number');
var inputCapacity = document.querySelector('#capacity');
var inputAddress = document.querySelector('#address');
var inputTimeIn = document.querySelector('#timein');
var inputTimeOut = document.querySelector('#timeout');
var btnSend = formPage.querySelector('.ad-form__submit');
var btnReset = document.querySelector('.ad-form__reset');

var minValuePriceFlat = '1000';
var minValuePriceHouse = '5000';
var minValuePricePalace = '10000';

function defaultValueInput() {
  inputPrice.placeholder = minValuePriceFlat;
  inputCapacity.value = '1';
}

function addPriceAttribute(type) {
  inputPrice.setAttribute('min', type);
}

function inputDisabled(type) {
  for (var i = 0; i < inputFormPage.length; i++) {
    inputFormPage[i].disabled = type;
  }
}

function inactiveState() {
  inputDisabled(true);
  inputAddress.value = Math.round(parseFloat(mainPin.style.left) + (65 / 2)) + ', ' + Math.round((parseFloat(mainPin.style.top) + (65 / 2)));
}

function activeState() {
  map.classList.remove('map--faded');
  formPage.classList.remove('ad-form--disabled');
  inputDisabled(false);

  renderPins(PINS);

  if (mainPin) {
    inputAddress.value = Math.round(parseFloat(mainPin.style.left) + (65 / 2)) + ', ' + Math.round((parseFloat(mainPin.style.top) + (65 / 2 + 22)));
  } else {
    inputAddress.value = Math.round(parseFloat(mainPin.style.left) + (50 / 2)) + ', ' + Math.round((parseFloat(mainPin.style.top) + 70));
  }
}

function changeValueRooms() {
  if (inputRooms.value === '1') {
    inputCapacity.value = '1';
  } else if (inputRooms.value === '2') {
    inputCapacity.value = '2';
  } else if (inputRooms.value === '3') {
    inputCapacity.value = '3';

  } else {
    inputCapacity.value = '0';
  }
}

function changeValidationCapacity() {
  if (inputRooms.value !== inputCapacity.value) {
    if (inputRooms.value === '1') {
      inputCapacity.setCustomValidity('Выберите ' + inputRooms.value + ' гостя');
    } else if (inputRooms.value === '2' || inputRooms.value === '3') {
      inputCapacity.setCustomValidity('Выберите ' + inputRooms.value + ' гостей');
    } else if (inputRooms.value === '100') {
      inputCapacity.setCustomValidity('Выберите "Не для гостей"');
    }
  }
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

// Проверка на валидность
function formValidity() {
  var successMessageElement = cloneElements('#success', '.success');
  var errorMessageElement = cloneElements('#error', '.error');
  var main = document.querySelector('main');
  var forms = document.querySelectorAll('input[required]');
  var errorBtn = errorMessageElement.querySelector('.error__button');

  for (var i = 0; i < forms.length; i++) {
    var form = forms[i];
    if (!form.value) {
      console.log('error');
      main.appendChild(errorMessageElement);
    } else {
      main.appendChild(successMessageElement);
    }
  }

  errorBtn.addEventListener('click', function () {
    errorMessageElement.remove();
  })

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      errorMessageElement.remove();
      successMessageElement.remove();
    }
  })
}

inputTimeIn.addEventListener('change', function () {
  changeValueTime();
})

mainPin.addEventListener('mousedown', function (evt) {
  if (typeof evt === 'object') {
    switch (evt.button) {
      case 0:
        activeState();
        break;
    }
  }
})

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    activeState();
  }
})

inputType.addEventListener('input', function () {
  changeValuePrice();
})

inputRooms.addEventListener('input', function () {
  changeValueRooms();
})

inputCapacity.addEventListener('change', function () {
  changeValidationCapacity();
})

btnSend.addEventListener('click', function (evt) {
  evt.preventDefault();
  formValidity();
})

btnReset.addEventListener('click', function (evt) {
  evt.preventDefault();
  map.classList.add('map--faded');
  formPage.classList.add('ad-form--disabled');
  inactiveState();
  removePins();
  var inputs = document.querySelectorAll('input:not(#address)');
  var selects = document.querySelectorAll('select');
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].value  = '';
  }
})


var Author = function (index) {
  this.avatar = 'img/avatars/user0' + index + '.png';
};

var getPins = function (number) {
  return new Array(number).fill('').map(function (element, index) {
    return new Pin(index + 1);
  });
};

function Pin(number) {
  this.author = new Author(number);
  this.location = new PinPosition();
  this.offer = new Offer(this.location);
}


function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function getArrayWithRandomLength(array) {
  return shuffleArray(array).slice(0, getRandomValue(array.length));
}

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function Offer(location) {
  this.title = getRandomValue(TITLES);
  this.address = location.x + ', ' + location.y;
  this.price = getRandomValue(PRICES);
  this.type = getRandomValue(TYPES);
  this.rooms = getRandomValue(ROOMS);
  this.guests = getRandomValue(QUESTS);
  this.checkin = getRandomValue(CHECKIN);
  this.checkout = getRandomValue(CHECKOUT);
  this.checkout = getRandomValue(CHECKOUT);
  this.features = getArrayWithRandomLength(FEATURES);
  this.description = getRandomValue(DESCRIPTION);
  this.photos = getArrayWithRandomLength(PHOTOS);
}

function PinPosition() {
  var pinsWrapper = document.querySelector('.map__pins');
  var mapPin = document.querySelector('.map__pin');
  LOCATION_X_MIN = mapPin.offsetWidth / 2;
  LOCATION_X_MAX = pinsWrapper.offsetWidth - (mapPin.offsetWidth / 2);
  this.x = getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
  this.y = getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
}

var shuffleArray = function (array) {
  var newArray = array.slice();
  for (var i = newArray.length - 1; i > 0; i--) {
    var j = getRandomValue(i);
    var temp = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = temp;
  }
  return newArray;
};

function cloneElements(templateSelector, elementSelector) {
  return document.querySelector(templateSelector).content.querySelector(elementSelector).cloneNode(true);
}

function renderPin(props) {
  var pinElement = cloneElements('#pin', '.map__pin');
  pinElement.querySelector('img').src = '';
  pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
  pinElement.querySelector('img').src = props.author.avatar;
  pinElement.querySelector('img').alt = props.offer.title;
  return pinElement;
}


function renderPins(pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var docFragment = document.createDocumentFragment();
  pins.forEach(function (element) {
    docFragment.appendChild(renderPin(element));
  });
  mapPinsElement.appendChild(docFragment);
}

var PINS = getPins(DATA_COUNT);

function removePins() {
  PINS.splice(1, 8);
  return PINS;
}

inactiveState();
defaultValueInput();
