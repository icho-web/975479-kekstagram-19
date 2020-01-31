'use strict';

var picturesElement = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture')
.content
.querySelector('.picture');
var getRandomValue = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var getRandomComment = function (comment) {
  return Math.floor(Math.random() * comment.length);
};
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
var COMMENTS =
  {
    avatar: 'img/avatar-' + getRandomValue(1, 6) + '.svg',
    message: MESSAGE[getRandomComment(MESSAGE)],
    name: NAMES[getRandomComment(NAMES)],
  };

for (var i = 1; i <= 25; i++) {
  var pictureElement = pictureTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  fragment.appendChild(pictureElement);
  pictureElement.querySelector('.picture__img').src = 'photos/' + i + '.jpg';
  pictureElement.querySelector('.picture__likes').textContent = Math.round(getRandomValue(15, 200));
  pictureElement.querySelector('.picture__comments').textContent = getRandomValue(1, 5);
  picturesElement.appendChild(fragment);
}
