'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var renderPhoto = function (photos) {
    photos.forEach(function (item) {
      var pictureElement = pictureTemplate.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(pictureElement);
      picturesElement.appendChild(fragment);
      pictureElement.querySelector('.picture__img').src = item.url;
      pictureElement.querySelector('.picture__likes').textContent = item.likes;
      pictureElement.querySelector('.picture__comments').textContent = item.comments.length;
    });
  };

  window.backend.load(renderPhoto);
  window.generate = {
    renderPhoto: renderPhoto
  };

})();
