'use strict';

(function () {
  var MIN_RANDOM_PHOTOS = 0;
  var MAX_RANDOM_PHOTOS = 10;
  var buttonRandom = document.querySelector('.img-filters__button--random');
  var buttonDiscussed = document.querySelector('.img-filters__button--discussed');
  var buttonReset = document.querySelector('.img-filters__button--reset');
  var form = document.querySelector('.img-filters__form');
  var formButtons = document.querySelectorAll('.img-filters__button');

  form.addEventListener('click', function (evt) {
    var target = evt.target;
    for (var i = 0; i < formButtons.length; i++) {
      formButtons[i].classList.remove('img-filters__button--active');
    }
    target.classList.add('img-filters__button--active');
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
    for (var i = 0; i < picture.length; i++) {
      picture[i].parentNode.removeChild(picture[i]);
    }
  };

  var buttons = {

    random: function () {
      removePhotos();
      shuffleArray(window.photosArr);
      window.generate.renderPhoto(window.photosArr.slice(MIN_RANDOM_PHOTOS, MAX_RANDOM_PHOTOS), window.photosArr.slice(MIN_RANDOM_PHOTOS, MAX_RANDOM_PHOTOS).length);
    },

    reset: function () {
      removePhotos();
      window.backend.load(window.generate.renderPhoto);
    },

    discussed: function () {
      removePhotos();
      var byComments = window.photosArr.slice(0);
      byComments.sort(function (a, b) {
        return b.comments.length - a.comments.length;
      });
      window.generate.renderPhoto(byComments, window.photosArr.length);
    }

  };

  buttonRandom.addEventListener('click', function () {
    window.debounce(buttons.random);
  });

  buttonReset.addEventListener('click', function () {
    window.debounce(buttons.reset);
  });

  buttonDiscussed.addEventListener('click', function () {
    window.debounce(buttons.discussed);
  });

})();
