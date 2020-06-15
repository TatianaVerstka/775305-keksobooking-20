'use strict';

var stateMap = document.querySelector('.map');
stateMap.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  return pinElement;
}
console.log(pinElement());

var fragment = document.createDocumentFragment();
fragment.appendChild(renderPin(wizards[i]));
similarListElement.appendChild(fragment);
