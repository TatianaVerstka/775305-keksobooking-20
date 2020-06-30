'use strict';

(function () {
  function renderPin(props) {
    var pinElement = window.cloneElements('#pin', '.map__pin');
    pinElement.querySelector('img').src = '';
    pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
    pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
    pinElement.querySelector('img').src = props.author.avatar;
    pinElement.querySelector('img').alt = props.offer.title;
    return pinElement;
  }

  function onSuccess(response) {
    var mapPinsElement = document.querySelector('.map__pins');
    var docFragment = document.createDocumentFragment();

    for (var i = 0; i < response.length; i++) {
      docFragment.appendChild(renderPin(response[i]));
    }
    mapPinsElement.appendChild(docFragment);
  }

  window.removeMapPins = function () {
    var elsPins = document.querySelectorAll('.map__pin');
    elsPins.forEach(function (elPin) {
      if (!elPin.classList.contains('map__pin--main')) {
        elPin.remove();
      }
    });
  };

  window.renderPins = function () {
    window.load(onSuccess);
  };

})();
