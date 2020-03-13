'use strict';

(function () {
  var MAX_TAGS = 5;
  var MAX_TAG_LENGTH = 20;
  var MAX_COMMENT_LENGTH = 140;
  var imgForm = document.querySelector('.img-upload__form');

  var tagsArr = '';
  var findDuplicate = function (elem, i, array) {
    return array.lastIndexOf(elem) === i;
  };

  imgForm.addEventListener('input', function () {
    tagsArr = window.utils.textHashtags.value.toLowerCase().split(' ');
    tagsArr.forEach(function (item) {
      if (window.utils.textHashtags.value === '') {
        window.utils.textHashtags.setCustomValidity('');
      } else if (!(/^#/).test(item)) {
        window.utils.textHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
      } else if (!(/^#[а-яА-ЯёЁa-zA-Z0-9]+$/).test(item)) {
        window.utils.textHashtags.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д');
      } else if (item.length > MAX_TAG_LENGTH) {
        window.utils.textHashtags.setCustomValidity('Максимальная длина одного хэш-тега ' + MAX_TAG_LENGTH + ' символов, включая решётку');
      } else if (!(tagsArr.length <= MAX_TAGS)) {
        window.utils.textHashtags.setCustomValidity('Нельзя указать больше ' + MAX_TAGS + ' хэш-тегов');
      } else if (tagsArr.every(findDuplicate) !== true) {
        window.utils.textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. (#ХэшТег и #хэштег считаются одним и тем же тегом)');
      } else if (window.utils.textDescription.value === '') {
        window.utils.textHashtags.setCustomValidity('');
      } else if (!(window.utils.textDescription.value.length <= MAX_COMMENT_LENGTH)) {
        window.utils.textHashtags.setCustomValidity('Длина комментария не может составлять больше ' + MAX_COMMENT_LENGTH + ' символов');
      } else {
        window.utils.textHashtags.setCustomValidity('');
      }
    });
  });

})();
