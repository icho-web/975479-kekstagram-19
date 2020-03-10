'use strict';

(function () {
  var dialogHandler = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectsList = document.querySelector('.effects__list');
  var imgEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectNone = document.querySelector('.effect__none');

  var PREVIEW_CLASS_BEGIN = 'effects__preview--';

  var Effect = {
    chrome: {
      NAME: 'chrome',
      ATTRIBUTE: 'grayscale',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    sepia: {
      NAME: 'sepia',
      ATTRIBUTE: 'sepia',
      MIN_VALUE: 0,
      MAX_VALUE: 1,
      UNIT: ''
    },
    marvin: {
      NAME: 'marvin',
      ATTRIBUTE: 'invert',
      MIN_VALUE: 0,
      MAX_VALUE: 100,
      UNIT: '%'
    },
    phobos: {
      NAME: 'phobos',
      ATTRIBUTE: 'blur',
      MIN_VALUE: 0,
      MAX_VALUE: 3,
      UNIT: 'px'
    },
    heat: {
      NAME: 'heat',
      ATTRIBUTE: 'brightness',
      MIN_VALUE: 1,
      MAX_VALUE: 3,
      UNIT: ''
    },
    none: {
      NAME: 'none'
    }
  };

  var currentEffect = '';

  var compileEffectStyle = function (elem, value) {
    return elem.ATTRIBUTE + '(' + (elem.MIN_VALUE + value * (elem.MAX_VALUE - elem.MIN_VALUE)) + elem.UNIT + ')';
  };

  var compileEffectValue = function (elem, value) {
    return (elem.MIN_VALUE + value * (elem.MAX_VALUE - elem.MIN_VALUE)) * 100;
  };

  window.getFilterValue = function (value) {
    var result;
    switch (currentEffect) {
      case PREVIEW_CLASS_BEGIN + Effect.chrome.NAME:
        result = compileEffectStyle(Effect.chrome, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.sepia.NAME:
        result = compileEffectStyle(Effect.sepia, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.marvin.NAME:
        result = compileEffectStyle(Effect.marvin, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.phobos.NAME:
        result = compileEffectStyle(Effect.phobos, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.heat.NAME:
        result = compileEffectStyle(Effect.heat, value);
        break;
      case Effect.none.NAME:
        result = Effect.none.NAME;
        break;
    }
    return result;
  };

  window.getFieldsetInputValue = function (value) {
    var result;
    switch (currentEffect) {
      case PREVIEW_CLASS_BEGIN + Effect.chrome.NAME:
        result = compileEffectValue(Effect.chrome, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.sepia.NAME:
        result = compileEffectValue(Effect.sepia, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.marvin.NAME:
        result = compileEffectValue(Effect.marvin, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.phobos.NAME:
        result = compileEffectValue(Effect.phobos, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effect.heat.NAME:
        result = compileEffectValue(Effect.heat, value);
        break;
    }
    return result;
  };

  imgEffectLevel.style.display = 'none';
  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;
    window.utils.imgPreview.classList.remove(
        'effects__preview--chrome',
        'effects__preview--sepia',
        'effects__preview--marvin',
        'effects__preview--phobos',
        'effects__preview--heat',
        'effects__preview--none');
    if (effectNone.checked) {
      imgEffectLevel.style.display = 'none';
      window.utils.imgPreview.style = 'none';
      effectLevelValue.value = '';
    } else if (target.tagName !== 'UL' && target.tagName !== 'SPAN' && target.tagName !== 'LABEL' && target.tagName !== 'LI') {
      dialogHandler.style.left = '100%';
      effectLevelValue.value = 100;
      effectLevelDepth.style.width = '100%';
      imgEffectLevel.style.display = 'block';
      window.utils.imgPreview.classList.add(PREVIEW_CLASS_BEGIN + target.value);
      currentEffect = PREVIEW_CLASS_BEGIN + target.value;
      window.utils.imgPreview.style = window.getFilterValue(1);
    }
  });
})();
