'use strict';

(function () {
  var selectHousingType = document.querySelector('#housing-type');

  var typePin = {
    onTypeChange: function (type) {}
  }

  selectHousingType.addEventListener('change', function() {
    var newType = selectHousingType.value;
    typePin.onTypeChange(newType);
  });

  window.type = type;
  return window.type;
})();
