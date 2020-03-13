'use strict';

(function () {
  var smallerImg = document.querySelector('.scale__control--smaller');
  var biggerImg = document.querySelector('.scale__control--bigger');
  var imgValue = document.querySelector('.scale__control--value');

  var getTransformImage = function (valueOfScale) {
    window.utils.imgPreview.style.transform = 'scale(' + (valueOfScale) + ')';
  };

  var onControlValueInc = function (evt) {
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

  var onControlValueDec = function (evt) {
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

  biggerImg.addEventListener('click', onControlValueInc);
  smallerImg.addEventListener('click', onControlValueDec);
})();
