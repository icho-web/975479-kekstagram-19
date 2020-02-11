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
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var COMMENTS_MIN = 1;
var COMMENTS_MAX = 5;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;
var IMG_DEFAULT_SCALE = 100;
var PIN_POSITION = 20;
var CHROME = 'effects__preview--chrome';
var SEPIA = 'effects__preview--sepia';
var MARVIN = 'effects__preview--marvin';
var PHOBOS = 'effects__preview--phobos';
var HEAT = 'effects__preview--heat';
var picturesElement = document.querySelector('.pictures');
var body = document.querySelector('.body');
var imgUpload = document.querySelector('.img-upload__input');
var imgUploadOverlay = document.querySelector('.img-upload__overlay');
var canselImg = document.querySelector('.img-upload__cancel');
var smallerImg = document.querySelector('.scale__control--smaller');
var biggerImg = document.querySelector('.scale__control--bigger');
var imgValue = document.querySelector('.scale__control--value');
var imgPreview = document.querySelector('.img__preview');
var effectsItem = document.querySelectorAll('.effects__item');
var effectsRadio = document.querySelectorAll('.effects__radio');
var effectPin = document.querySelector('.effect-level__pin');
var effectsLevel = document.querySelector('.effect-level__value');
var effectsDepth = document.querySelector('.effect-level__depth');
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
  IMG_DEFAULT_SCALE = 100;
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

smallerImg.addEventListener('click', function () {
  if (IMG_DEFAULT_SCALE > 25) {
    IMG_DEFAULT_SCALE = IMG_DEFAULT_SCALE - 25;
    imgPreview.style.transform = 'scale' + '(' + IMG_DEFAULT_SCALE * 0.01 + ')';
    imgValue.value = IMG_DEFAULT_SCALE + '%';
  }
});

biggerImg.addEventListener('click', function () {
  if (IMG_DEFAULT_SCALE < 100) {
    IMG_DEFAULT_SCALE = IMG_DEFAULT_SCALE + 25;
    imgPreview.style.transform = 'scale' + '(' + IMG_DEFAULT_SCALE * 0.01 + ')';
    imgValue.value = IMG_DEFAULT_SCALE + '%';
  }
});

var radioCheck = function (effect, number) {
  if (effectsRadio[number].checked === true) {
    imgPreview.classList.add(effect);
  } else {
    imgPreview.classList.remove(CHROME);
    imgPreview.classList.remove(SEPIA);
    imgPreview.classList.remove(MARVIN);
    imgPreview.classList.remove(PHOBOS);
    imgPreview.classList.remove(HEAT);
  }
};

var effectsLevelValue = function (effect) {
  effectPin.addEventListener('mouseup', function () {
    effectPin.style.left = PIN_POSITION + '%';
    effectsLevel.value = PIN_POSITION;
    effectsDepth.style.width = PIN_POSITION + '%';
    imgPreview.style.filter = effect;
  });
};

effectsItem[0].addEventListener('click', function () {
  imgPreview.style.filter = '';
  radioCheck('img__preview', 0);
  effectsLevelValue('');
});
effectsItem[1].addEventListener('click', function () {
  var chromeEffect = 'grayscale' + '(' + PIN_POSITION * (1 / 100) + ')';
  imgPreview.style.filter = chromeEffect;
  radioCheck(CHROME, 1);
  effectsLevelValue(chromeEffect);
});
effectsItem[2].addEventListener('click', function () {
  var sepiaEffect = 'sepia' + '(' + PIN_POSITION * (1 / 100) + ')';
  imgPreview.style.filter = sepiaEffect;
  radioCheck(SEPIA, 2);
  effectsLevelValue(sepiaEffect);
});
effectsItem[3].addEventListener('click', function () {
  var marvinEffect = 'invert' + '(' + PIN_POSITION + '%' + ')';
  imgPreview.style.filter = marvinEffect;
  radioCheck(MARVIN, 3);
  effectsLevelValue(marvinEffect);
});
effectsItem[4].addEventListener('click', function () {
  var blurEffect = 'blur' + '(' + PIN_POSITION * (3 / 100) + 'px' + ')';
  imgPreview.style.filter = blurEffect;
  radioCheck(PHOBOS, 4);
  effectsLevelValue(blurEffect);
});
effectsItem[5].addEventListener('click', function () {
  var heatEffect = 'brightness' + '(' + PIN_POSITION * (3 / 100) + ')';
  imgPreview.style.filter = heatEffect;
  radioCheck(HEAT, 5);
  effectsLevelValue(heatEffect);
});

var tagsArr = '';

imgForm.addEventListener('input', function () {
  tagsArr = textHashtags.value.split(' ');
  for (var i = 0; i < tagsArr.length; i++) {
    if (textHashtags.value === '') {
      textHashtags.setCustomValidity('');
    } else if (!(/^#/).test(tagsArr[i])) {
      textHashtags.setCustomValidity('Хэш-тег начинается с символа # (решётка)');
    } else if (!(/^#[а-яА-ЯёЁa-zA-Z0-9]+$/).test(tagsArr[i])) {
      textHashtags.setCustomValidity('Строка после решётки должна состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т.п.), символы пунктуации (тире, дефис, запятая и т.п.), эмодзи и т.д');
    } else if (tagsArr[i].length > 20) {
      textHashtags.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая решётку');
    } else if (!(tagsArr.length <= 5)) {
      textHashtags.setCustomValidity('Нельзя указать больше пяти хэш-тегов');
    } else {
      textHashtags.setCustomValidity('');
    }
  }
  if (textDescription.value === '') {
    textHashtags.setCustomValidity('');
  } else if (!(textDescription.value.length <= 140)) {
    textHashtags.setCustomValidity('Длина комментария не может составлять больше 140 символов');
  } else {
    textHashtags.setCustomValidity('');
  }
});

