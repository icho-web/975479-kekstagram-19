'use strict';

(function () {
  var commentsLoader = document.querySelector('.social__comments-loader');
  var bigPicture = document.querySelector('.big-picture');
  var bigPictureImg = document.querySelector('.big-picture__img img');
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var comments = document.querySelector('.social__comments');
  var socialText = document.querySelector('.social__text');
  var socialPictures = document.querySelector('.social__comment .social__picture');
  var commentsCount = document.querySelector('.social__comment-count');
  var comment = document.querySelector('.social__comment');
  var likes = document.querySelector('.likes-count');
  var description = document.querySelector('.social__caption');
  var picturesElement = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture')
    .content
    .querySelector('.picture');

  var picturesCount = 5;

  var render = function (count, item) {
    for (var i = 0; i < count; i++) {
      socialPictures.src = item.comments[i].avatar;
      socialText.textContent = item.comments[i].message;
      commentsCount.textContent = i + 1 + ' из ' + item.comments.length + ' комментариев';
      var message = comment.cloneNode(true);
      var fragment = document.createDocumentFragment();
      fragment.appendChild(message);
      comments.appendChild(fragment);
    }
  };

  window.renderBigPicture = function (evt) {
    var target = evt.target;
    if (target.tagName === 'A') {
      target = evt.target.firstElementChild;
    } else if (target.tagName === 'IMG') {
      target = evt.target;
    }
    var index = target.src.match(/\d+.jpg/);
    var indexPhoto = parseInt(index[0].match(/\d+/)[0], 10);
    document.body.classList.add('modal-open');
    window.photo = window.defaultArr[indexPhoto - 1];
    comments.innerHTML = '';
    bigPicture.classList.remove('hidden');
    bigPictureImg.src = window.photo.url;
    description.textContent = window.photo.description;
    likes.textContent = window.photo.likes;

    if (picturesCount < window.photo.comments.length) {
      render(picturesCount, window.photo);
    } else {
      picturesCount = window.photo.comments.length;
      render(picturesCount, window.photo);
      commentsLoader.classList.add('hidden');
    }
  };

  commentsLoader.addEventListener('click', function () {
    comments.innerHTML = '';
    var length = window.photo.comments.length - picturesCount;
    if (length > 5) {
      picturesCount = picturesCount + 5;
    } else {
      picturesCount = window.photo.comments.length;
      commentsLoader.classList.add('hidden');
    }
    render(picturesCount, window.photo);
  });

  window.pictureCancel = function () {
    picturesCount = 5;
    bigPicture.classList.add('hidden');
    commentsLoader.classList.remove('hidden');
    document.body.classList.remove('modal-open');
  };

  bigPictureCancel.addEventListener('click', window.pictureCancel);

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
