'use strict';

(function () {
  var dialogHandler = document.querySelector('.effect-level__pin');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectLevelDepth = document.querySelector('.effect-level__depth');

  dialogHandler.addEventListener('mousedown', function (evt) {
    var startCoordsX = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var x = startCoordsX - moveEvt.clientX;
      if (startCoordsX > 624) {
        x = 0;
        dialogHandler.style.left = 454 + 'px';
      } else if (startCoordsX < 172) {
        x = 0;
        dialogHandler.style.left = 0;
      }

      startCoordsX = moveEvt.clientX;
      dialogHandler.style.left = (dialogHandler.offsetLeft - x) + 'px';
      window.coordsX = ((parseInt(dialogHandler.style.left, 10) * 100) / 454) / 100;
      window.utils.imgPreview.style.filter = window.getFilterValue(window.coordsX);
      effectLevelValue.value = window.getFieldsetInputValue(window.coordsX);
      effectLevelDepth.style.width = window.coordsX * 100 + '%';
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
