'use strict';

(function () {
  var body = document.querySelector('.body');
  var imgUpload = document.querySelector('.img-upload__input');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var canselImg = document.querySelector('.img-upload__cancel');

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
})();
