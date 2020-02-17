'use strict';

var MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var NAMES = [
  'Сергей', 'Ирина', 'Илья', 'Вальдемар', 'Макс',
  'Антон', 'Евгения', 'Николай', 'Дед Мороз', 'Бренность Бытия',
  'Павел', 'Никита', 'Роман', 'Александр', 'Дмитрий',
  'Эдвард', 'Владимир', 'Степан', 'Юлия', 'Елена',
  'Ольга', 'Маша', 'Регина', 'Кристина', 'Мия'
];
var PHOTO_COUNT = 24;
var MAX_TAGS = 20;
var MAX_TAG_LENGTH = 20;
var MAX_COMMENT_LENGTH = 140;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 5;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var PIN_POSITION = 0.2;
var effectLevelValue = document.querySelector('.effect-level__value');
var picturesElement = document.querySelector('.pictures');
var body = document.querySelector('.body');
var imgUpload = document.querySelector('.img-upload__input');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var canselImg = document.querySelector('.img-upload__cancel');
var smallerImg = document.querySelector('.scale__control--smaller');
var biggerImg = document.querySelector('.scale__control--bigger');
var imgValue = document.querySelector('.scale__control--value');
var imgEffectLevel = document.querySelector('.img-upload__effect-level');
var imgPreview = document.querySelector('.img__preview');
var effectNone = document.querySelector('.effect-none');
var effectsList = document.querySelector('.effects__list');
var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');
var imgForm = document.querySelector('.img-upload__form');
var pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var closeImg = function () {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  imgPreview.style.transform = '';
};

var getRandomComment = function (comment) {
  return Math.floor(Math.random() * comment.length);
};

var generateRandomPhotos = function (count) {
  var photos = [];
  for (var i = 0; i < count; i++) {
    photos.push({
      avatar: 'img/avatar-' + getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
      message: MESSAGE[getRandomComment(MESSAGE)],
      name: NAMES[getRandomComment(NAMES)]
    }
    );
  }
  return photos;
};

var photosArr = generateRandomPhotos(PHOTO_COUNT);

var renderPhoto = function (photoRender) {
  for (var i = 0; i <= photoRender.length; i++) {
    var pictureElement = pictureTemplate.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(pictureElement);
    picturesElement.appendChild(fragment);
    pictureElement.querySelector('.picture__img').src = 'photos/' + (i + 1) + '.jpg';
    pictureElement.querySelector('.picture__likes').textContent = Math.round(getRandomValue(LIKES_MIN, LIKES_MAX));
    pictureElement.querySelector('.picture__comments').textContent = getRandomValue(COMMENTS_MIN, COMMENTS_MAX);
  }
};
renderPhoto(photosArr);

imgUpload.addEventListener('change', function () {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
});

document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape' && (textHashtags === document.activeElement || textDescription === document.activeElement)) {
    evt.preventDefault();
  } else if (evt.key === 'Escape') {
    closeImg();
  }
});

canselImg.addEventListener('click', function () {
  closeImg();
});

var getTransformImage = function (valueOfScale) {
  imgPreview.style.transform = 'scale(' + (valueOfScale) + ')';
};

var setControlValueInc = function (evt) {
  evt.preventDefault();
  switch (imgValue.value) {
    case '25%':
      imgValue.value = '50%';
      getTransformImage(0.5);
      break;
    case '50%':
      imgValue.value = '75%';
      getTransformImage(0.75);
      break;
    case '75%':
      imgValue.value = '100%';
      getTransformImage(1);
      break;
  }
};

var setControlValueDec = function (evt) {
  evt.preventDefault();
  switch (imgValue.value) {
    case '50%':
      imgValue.value = '25%';
      getTransformImage(0.25);
      break;
    case '75%':
      imgValue.value = '50%';
      getTransformImage(0.5);
      break;
    case '100%':
      imgValue.value = '75%';
      getTransformImage(0.75);
      break;
  }
};

biggerImg.addEventListener('click', setControlValueInc);
smallerImg.addEventListener('click', setControlValueDec);

var PREVIEW_CLASS_BEGIN = 'effects__preview--';

var Effect = {
  chrome: {
    NAME: 'chrome',
    ATTRIBUTE: 'grayscale',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  sepia: {
    NAME: 'sepia',
    ATTRIBUTE: 'sepia',
    MIN_VALUE: 0,
    MAX_VALUE: 1,
    UNIT: ''
  },
  marvin: {
    NAME: 'marvin',
    ATTRIBUTE: 'invert',
    MIN_VALUE: 0,
    MAX_VALUE: 100,
    UNIT: '%'
  },
  phobos: {
    NAME: 'phobos',
    ATTRIBUTE: 'blur',
    MIN_VALUE: 0,
    MAX_VALUE: 3,
    UNIT: 'px'
  },
  heat: {
    NAME: 'heat',
    ATTRIBUTE: 'brightness',
    MIN_VALUE: 1,
    MAX_VALUE: 3,
    UNIT: ''
  },
  none: {
    NAME: 'none'
  }
};

var currentEffect = '';

var compileEffectStyle = function (elem, value) {
  return elem.ATTRIBUTE + '(' + (elem.MIN_VALUE + value * (elem.MAX_VALUE - elem.MIN_VALUE)) + elem.UNIT + ')';
};

var compileEffectValue = function (elem, value) {
  return (elem.MIN_VALUE + value * (elem.MAX_VALUE - elem.MIN_VALUE)) * 100;
};

var getFilterValue = function (value) {
  var result;
  switch (currentEffect) {
    case PREVIEW_CLASS_BEGIN + Effect.chrome.NAME:
      result = compileEffectStyle(Effect.chrome, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.sepia.NAME:
      result = compileEffectStyle(Effect.sepia, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.marvin.NAME:
      result = compileEffectStyle(Effect.marvin, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.phobos.NAME:
      result = compileEffectStyle(Effect.phobos, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.heat.NAME:
      result = compileEffectStyle(Effect.heat, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.none.NAME:
      result = '';
      break;
  }
  return result;
};

var getFieldsetInputValue = function (value) {
  var result;
  switch (currentEffect) {
    case PREVIEW_CLASS_BEGIN + Effect.chrome.NAME:
      result = compileEffectValue(Effect.chrome, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.sepia.NAME:
      result = compileEffectValue(Effect.sepia, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.marvin.NAME:
      result = compileEffectValue(Effect.marvin, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.phobos.NAME:
      result = compileEffectValue(Effect.phobos, value);
      break;
    case PREVIEW_CLASS_BEGIN + Effect.heat.NAME:
      result = compileEffectValue(Effect.heat, value);
      break;
  }
  return result;
};

imgEffectLevel.style.display = 'none';
effectsList.addEventListener('click', function (evt) {
  var target = evt.target;
  imgPreview.classList.remove(
      'effects__preview--chrome',
      'effects__preview--sepia',
      'effects__preview--marvin',
      'effects__preview--phobos',
      'effects__preview--heat',
      'effects__preview--none');
  if (effectNone.checked) {
    imgEffectLevel.style.display = 'none';
    imgPreview.style = 'none';
    effectLevelValue.value = 'none';
  } else if (target.tagName !== 'UL' && target.tagName !== 'SPAN' && target.tagName !== 'LABEL' && target.tagName !== 'LI') {
    imgEffectLevel.style.display = 'block';
    imgPreview.classList.add(PREVIEW_CLASS_BEGIN + target.value);
    currentEffect = PREVIEW_CLASS_BEGIN + target.value;
    imgPreview.style.filter = getFilterValue(PIN_POSITION);
    effectLevelValue.value = getFieldsetInputValue(PIN_POSITION);
  }
});

var tagsArr = '';
var findDuplicate = function (elem, i, array) {
  return array.lastIndexOf(elem) === i;
};

imgForm.addEventListener('input', function () {
  tagsArr = textHashtags.value.split(' ');
  for (var i = 0; i < tagsArr.length; i++) {
    if (textHashtags.value === '') {
      textHashtags.setCustomValidity('');
    } else if (!(/^#/).test(tagsArr[i])) {
      textHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
    } else if (!(/^#[а-яА-ЯёЁa-zA-Z0-9]+$/).test(tagsArr[i])) {
      textHashtags.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д');
    } else if (tagsArr[i].length > MAX_TAG_LENGTH) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега ' + MAX_TAG_LENGTH + ' символов, включая решётку');
    } else if (!(tagsArr.length <= MAX_TAGS)) {
      textHashtags.setCustomValidity('Нельзя указать больше ' + MAX_TAGS + ' хэш-тегов');
    } else if (tagsArr.every(findDuplicate) !== true) {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды. (#ХэшТег и #хэштег считаются одним и тем же тегом)');
    } else if (textDescription.value === '') {
      textHashtags.setCustomValidity('');
    } else if (!(textDescription.value.length <= MAX_COMMENT_LENGTH)) {
      textHashtags.setCustomValidity('Длина комментария не может составлять больше ' + MAX_COMMENT_LENGTH + ' символов');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
});

