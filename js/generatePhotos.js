'use strict';

(function () {
  var PHOTO_COUNT = 24;
  var MIN_COMMENTS = 1;
  var MAX_COMMENTS = 5;
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photos) {
    for (var i = 0; i <= PHOTO_COUNT; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(pictureElement);
      picturesElement.appendChild(fragment);
      pictureElement.querySelector('.picture__img').src = photos[i].url;
      pictureElement.querySelector('.picture__likes').textContent = photos[i].likes;
      pictureElement.querySelector('.picture__comments').textContent = window.utils.getRandomValue(MIN_COMMENTS, MAX_COMMENTS);
    }
  };

  window.backend.load(renderPhoto);
})();
