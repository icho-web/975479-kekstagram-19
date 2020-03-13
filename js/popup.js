'use strict';

(function () {
  var picturesElement = document.querySelector('.pictures');
  var body = document.querySelector('.body');
  var imgUpload = document.querySelector('.img-upload__input');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var cancelImg = document.querySelector('.img-upload__cancel');
  var effectNone = document.querySelector('.effect__none');
  var imgEffectLevel = document.querySelector('.img-upload__effect-level');
  var textHashtags = document.querySelector('.text__hashtags');
  var textDescription = document.querySelector('.text__description');

  window.closeImg = function () {
    effectNone.checked = true;
    imgEffectLevel.style.display = 'none';
    imgUploadOverlay.classList.add('hidden');
    imgUpload.value = '';
    body.classList.remove('modal-open');
    window.utils.imgPreview.style.filter = 'none';
    textHashtags.value = '';
    textDescription.value = '';
    document.removeEventListener('keydown', function () {
    });
    document.removeEventListener('mousemove', window.onMouseMove);
    document.removeEventListener('mouseup', window.onMouseUp);
  };

  imgUpload.addEventListener('change', function () {
    imgUploadOverlay.classList.remove('hidden');
    body.classList.add('modal-open');
  });

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape' && (window.utils.textHashtags === document.activeElement || window.utils.textDescription === document.activeElement)) {
      evt.preventDefault();
    } else if (evt.key === 'Escape') {
      window.closeImg();
    }
  });

  cancelImg.addEventListener('click', function () {
    window.closeImg();
  });

  picturesElement.addEventListener('click', function (evt) {
    if (evt.target.tagName === 'IMG') {
      window.renderBigPicture(evt);
    }
  });

  picturesElement.addEventListener('keydown', function (evt) {
    if (evt.target.tagName === 'A' && evt.key === 'Enter') {
      window.renderBigPicture(evt);
    } else if (evt.key === 'Escape') {
      window.pictureCancel();
    }
  });

})();
