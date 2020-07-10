'use strict';

(function () {
  var selectHousingType = document.querySelector('#housing-type');

  var typePin = {
    onTypeChange: function () {}
  };

  selectHousingType.addEventListener('change', function () {
    var newType = selectHousingType.value;
    typePin.onTypeChange(newType);
  });

  window.typePin = typePin;
  return window.typePin;
})();
