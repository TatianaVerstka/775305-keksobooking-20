'use strict';

(function () {
  var response = [];

  function filterPins(data) {
    var selectHousingType = document.getElementById('housing-type');
    window.render(data);
    selectHousingType.addEventListener('input', function () {
      var valueHousingType = selectHousingType.value;

      if (valueHousingType !== 'any') {
        window.render(data.slice().
        filter(function (value) {
          return value.offer.type === valueHousingType;
        }));
      } else {
        window.render(data);
      }
    });
  }

  function onSuccess(data) {
    response = data;
    filterPins(response);
    window.popup(response);
  }

  function onError(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
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
    window.load(onSuccess, onError);
  };

})();
