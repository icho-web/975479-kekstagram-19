'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photos) {
    for (var i = 0; i < photos.length; i++) {
      var pictureElement = pictureTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(pictureElement);
      picturesElement.appendChild(fragment);
      pictureElement.querySelector('.picture__img').src = photos[i].url;
      pictureElement.querySelector('.picture__likes').textContent = photos[i].likes;
      pictureElement.querySelector('.picture__comments').textContent = photos[i].comments.length;
    }
  };

  window.backend.load(renderPhoto);
  window.generate = {
    renderPhoto: renderPhoto
  };
})();
