'use strict';

(function () {
  var body = document.querySelector('.body');
  var imgUpload = document.querySelector('.img-upload__input');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var canselImg = document.querySelector('.img-upload__cancel');
  var picturesElement = document.querySelector('.pictures');

  var closeImg = function () {
    imgUploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    window.utils.imgPreview.style.transform = '';
  };

  imgUpload.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && (window.utils.textHashtags === document.activeElement || window.utils.textDescription === document.activeElement)) {
      evt.preventDefault();
    } else if (evt.key === 'Escape') {
      closeImg();
    }
  });

  canselImg.addEventListener('click', function () {
    closeImg();
  });

  picturesElement.addEventListener('click', function (evt) {
    var target = evt.target;
    window.renderBigPicture(target);
  });

  picturesElement.addEventListener('keydown', function (evt) {
    var target = evt.target.firstElementChild;
    if (evt.key === 'Enter') {
      evt.stopPropagation();
      window.renderBigPicture(target);
    } else if (evt.key === 'Escape') {
      window.pictureCancel();
    }
  });

})();
