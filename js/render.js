'use strict';

(function () {
  var PIN_COUNT = 5;

  function renderPin(props) {
    var pinElement = window.cloneElements('#pin', '.map__pin');
    pinElement.querySelector('img').src = '';
    pinElement.style.left = (props.location.x - pinElement.clientWidth / 2) + 'px';
    pinElement.style.top = (props.location.y - pinElement.clientHeight) + 'px';
    pinElement.querySelector('img').src = props.author.avatar;
    pinElement.querySelector('img').alt = props.offer.title;
    return pinElement;
  }

  window.render = function (data) {
    var takeNumber = data.length > PIN_COUNT ? PIN_COUNT : data.length;
    var mapPinsElement = document.querySelector('.map__pins');
    var docFragment = document.createDocumentFragment();

    for (var i = 0; i < takeNumber; i++) {
      docFragment.appendChild(renderPin(data[i]));
    }
    mapPinsElement.appendChild(docFragment);
  };
})();
