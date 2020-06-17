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

var mapDialog = function () {
  var map = document.querySelector('.map');
  map.classList.remove('map--faded');
};

var author = function (index) {
  this.avatar = 'img/avatars/user0' + index + '.png';
};

var getPins = function (number) {
  return new Array(number).fill('').map(function (element, index) {
    return new pin(index + 1);
  });
};

function pin (number) {
  this.author = new author(number);
  this.location = new pinPosition();
  this.offer = new offer(this.location);
};

function getRandomValue(array) {
  return array[Math.floor(Math.random() * array.length)];
};

function getArrayWithRandomLength(array) {
  return shuffleArray(array).slice(0, getRandomValue(array.length));
};

function getRandomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

function offer (location) {
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
};

function pinPosition () {
  var pinsWrapper = document.querySelector('.map__pins');
  var pin = document.querySelector('.map__pin');
  LOCATION_X_MIN = pin.offsetWidth / 2;
  LOCATION_X_MAX = pinsWrapper.offsetWidth - (pin.offsetWidth / 2);
  this.x = getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
  this.y = getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
};

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
};

function renderPin(props) {
  var pinElement = cloneElements('#pin', '.map__pin');
  pinElement.querySelector('img').src = '';
  pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
  pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
  pinElement.querySelector('img').src = props.author.avatar;
  pinElement.querySelector('img').alt = props.offer.title;
  return pinElement;
};


function renderPins(pins) {
  var mapPinsElement = document.querySelector('.map__pins');
  var docFragment = document.createDocumentFragment();
  pins.forEach(function (element) {
    docFragment.appendChild(renderPin(element));
  });
  mapPinsElement.appendChild(docFragment);
};

var PINS = getPins(DATA_COUNT);
renderPins(PINS);
mapDialog();
