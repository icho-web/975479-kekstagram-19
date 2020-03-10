'use strict';

(function () {
  var MAX_LENGTH = 453;
  var MAX_PERCENT = 100;
  var MIN_LENGTH = 0;
  var dialogHandler = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  dialogHandler.addEventListener('mousedown', function (evt) {
    var startCoordsX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var x = startCoordsX - moveEvt.clientX;
      if (parseInt(dialogHandler.style.left, 10) > MAX_LENGTH) {
        x = 0;
        dialogHandler.style.left = MAX_LENGTH + 'px';
      } else if (parseInt(dialogHandler.style.left, 10) < MIN_LENGTH) {
        x = 0;
        dialogHandler.style.left = 0;
      }

      startCoordsX = moveEvt.clientX;
      dialogHandler.style.left = (dialogHandler.offsetLeft - x) + 'px';
      window.coordsX = ((parseInt(dialogHandler.style.left, 10) * MAX_PERCENT) / MAX_LENGTH) / MAX_PERCENT;
      window.utils.imgPreview.style.filter = window.getFilterValue(window.coordsX);
      effectLevelValue.value = window.getFieldsetInputValue(window.coordsX);
      effectLevelDepth.style.width = window.coordsX * MAX_PERCENT + '%';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
