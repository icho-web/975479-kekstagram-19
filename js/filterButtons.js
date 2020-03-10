'use strict';

(function () {
  var MIN_RANDOM_PHOTOS = 0;
  var MAX_RANDOM_PHOTOS = 10;
  var form = document.querySelector('.img-filters__form');
  var formButtons = document.querySelectorAll('.img-filters__button');
  var filterButtons = document.querySelector('.img-filters');

  window.backend.xhr.addEventListener('load', function () {
    filterButtons.classList.remove('img-filters--inactive');
  });

  var shuffleArray = function (array) {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  };

  var removePhotos = function () {
    var picture = document.querySelectorAll('.picture');
    picture.forEach(function (item) {
      item.parentNode.removeChild(item);
    });
  };

  var getRandomPhotos = function () {
    removePhotos();
    shuffleArray(window.photosArr);
    window.generate.renderPhoto(window.photosArr.slice(MIN_RANDOM_PHOTOS, MAX_RANDOM_PHOTOS), window.photosArr.slice(MIN_RANDOM_PHOTOS, MAX_RANDOM_PHOTOS).length);
  };

  var getResetPhotos = function () {
    removePhotos();
    window.generate.renderPhoto(window.defaultArr);
  };

  var getDiscussedPhotos = function () {
    removePhotos();
    var byComments = window.photosArr.slice(0);
    byComments.sort(function (a, b) {
      return b.comments.length - a.comments.length;
    });
    window.generate.renderPhoto(byComments, window.photosArr.length);
  };

  var target;
  form.addEventListener('click', function (evt) {
    target = evt.target;
    changeFilterSort();
    for (var i = 0; i < formButtons.length; i++) {
      formButtons[i].classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
  });

  var changeFilterSort = function () {
    switch (target.id) {
      case 'filter-default':
        window.debounce(getResetPhotos);
        break;
      case 'filter-random':
        window.debounce(getRandomPhotos);
        break;
      case 'filter-discussed':
        window.debounce(getDiscussedPhotos);
        break;
    }
  };

})();
