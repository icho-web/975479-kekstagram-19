'use strict';

(function () {
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
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var generateRandomPhotos = function (count) {
    var photos = [];
    for (var i = 0; i < count; i++) {
      photos.push({
        avatar: 'img/avatar-' + window.utils.getRandomValue(AVATAR_MIN, AVATAR_MAX) + '.svg',
        message: MESSAGE[window.utils.getRandomComment(MESSAGE)],
        name: NAMES[window.utils.getRandomComment(NAMES)]
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
      pictureElement.querySelector('.picture__likes').textContent = Math.round(window.utils.getRandomValue(LIKES_MIN, LIKES_MAX));
      pictureElement.querySelector('.picture__comments').textContent = window.utils.getRandomValue(COMMENTS_MIN, COMMENTS_MAX);
    }
  };
  renderPhoto(photosArr);
})();
