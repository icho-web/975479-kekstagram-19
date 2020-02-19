'use strict';

(function () {
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');
  var imgPreview = document.querySelector('.img__preview');

  var getRandomValue = function (min, max) {
    return Math.round(Math.random() * (max - min) + min);
  };

  var getRandomComment = function (comment) {
    return Math.floor(Math.random() * comment.length);
  };

  window.utils = {
    imgPreview: imgPreview,
    textDescription: textDescription,
    textHashtags: textHashtags,
    getRandomValue: getRandomValue,
    getRandomComment: getRandomComment
  };
})();
