'use strict';

(function () {
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

  var LOCATION_X_MIN = 0;
  var LOCATION_X_MAX = 0;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  function Author(index) {
    this.avatar = 'img/avatars/user0' + index + '.png';
  }

  function PinPosition() {
    var pinsWrapper = document.querySelector('.map__pins');
    var mapPin = document.querySelector('.map__pin');
    LOCATION_X_MIN = mapPin.offsetWidth / 2;
    LOCATION_X_MAX = pinsWrapper.offsetWidth - (mapPin.offsetWidth / 2);
    this.x = window.getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
    this.y = window.getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);
  }

  function Offer(location) {
    this.title = window.getRandomValue(TITLES);
    this.address = location.x + ', ' + location.y;
    this.price = window.getRandomValue(PRICES);
    this.type = window.getRandomValue(TYPES);
    this.rooms = window.getRandomValue(ROOMS);
    this.guests = window.getRandomValue(QUESTS);
    this.checkin = window.getRandomValue(CHECKIN);
    this.checkout = window.getRandomValue(CHECKOUT);
    this.checkout = window.getRandomValue(CHECKOUT);
    this.features = window.getArrayWithRandomLength(FEATURES);
    this.description = window.getRandomValue(DESCRIPTION);
    this.photos = window.getArrayWithRandomLength(PHOTOS);
  }

  window.getPins = function (number) {
    return new Array(number).fill('').map(function (element, index) {
      return new Pin(index + 1);
    });
  };

  function Pin(number) {
    this.author = new Author(number);
    this.location = new PinPosition();
    this.offer = new Offer(this.location);
  }

  function renderPin(props) {
    var pinElement = window.cloneElements('#pin', '.map__pin');
    pinElement.querySelector('img').src = '';
    pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
    pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
    pinElement.querySelector('img').src = props.author.avatar;
    pinElement.querySelector('img').alt = props.offer.title;
    return pinElement;
  }

  window.removeMapPins = function () {
    var elsPins = document.querySelectorAll('.map__pin');
    elsPins.forEach(function (elPin) {
      if (!elPin.classList.contains('map__pin--main')) {
        elPin.remove();
      }
    });
  };

  window.renderPins = function (pins) {
    var mapPinsElement = document.querySelector('.map__pins');
    var docFragment = document.createDocumentFragment();
    pins.forEach(function (element) {
      docFragment.appendChild(renderPin(element));
    });
    mapPinsElement.appendChild(docFragment);
  };

})();
