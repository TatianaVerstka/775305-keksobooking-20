'use strict';

(function () {
  function renderPopup(el) {
    var popupElement = window.cloneElements('#card', '.popup');
    var offerType = el.offer.type;
    var newType = '';

    if (offerType === 'flat') {
      newType = 'Квaртира';
    } else if (offerType === 'bungalo') {
      newType = 'Бунгало';
    } else if (offerType === 'house') {
      newType = 'Дом';
    } else {
      newType = 'Дворец';
    }

    var photo = popupElement.querySelector('.popup__photo');

    for (var i = 0; i < el.offer.photos.length; i++) {
      photo.src = el.offer.photos[i];
    }

    popupElement.querySelector('.popup__title').textContent = el.offer.title;
    popupElement.querySelector('.popup__text--address').textContent = el.offer.address;
    popupElement.querySelector('.popup__text--price').textContent = el.offer.price + '₽/ночь';
    popupElement.querySelector('.popup__type').textContent = newType;
    popupElement.querySelector('.popup__text--capacity').textContent = el.offer.rooms + ' комнаты для ' + el.offer.guests + ' гостей';
    popupElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + el.offer.checkin + ', выезд до ' + el.offer.checkout;
    popupElement.querySelector('.popup__features').textContent = el.offer.features;
    popupElement.querySelector('.popup__features').style = 'word-break: break-all';
    popupElement.querySelector('.popup__description').textContent = el.offer.description;
    popupElement.querySelector('.popup__avatar').src = el.author.avatar;
    return popupElement;
  }

  window.popup = function (data) {
    var mapPopupElement = document.querySelector('.map');
    var popupFragment = document.createDocumentFragment();

    // for (var i = 0; i < data.length; i++) {
    //   popupFragment.appendChild(renderPopup(data[i]));
    // }
    popupFragment.appendChild(renderPopup(data[0]));
    var filterContainer = document.querySelector('.map__filters-container');
    mapPopupElement.insertBefore(popupFragment, filterContainer);
  };
})();
