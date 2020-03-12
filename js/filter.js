'use strict';

(function () {
  var PREVIEW_CLASS_BEGIN = 'effects__preview--';
  var dialogHandler = document.querySelector('.effect-level__pin');
  var effectLevelDepth = document.querySelector('.effect-level__depth');
  var effectLevelValue = document.querySelector('.effect-level__value');
  var effectsList = document.querySelector('.effects__list');
  var imgEffectLevel = document.querySelector('.img-upload__effect-level');
  var effectNone = document.querySelector('.effect__none');
  var imgValue = document.querySelector('.scale__control--value');

  var Effects = {
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
      case PREVIEW_CLASS_BEGIN + Effects.chrome.NAME:
        result = compileEffectStyle(Effects.chrome, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.sepia.NAME:
        result = compileEffectStyle(Effects.sepia, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.marvin.NAME:
        result = compileEffectStyle(Effects.marvin, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.phobos.NAME:
        result = compileEffectStyle(Effects.phobos, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.heat.NAME:
        result = compileEffectStyle(Effects.heat, value);
        break;
      case Effects.none.NAME:
        result = Effects.none.NAME;
        break;
    }
    return result;
  };

  window.getFieldsetInputValue = function (value) {
    var result;
    switch (currentEffect) {
      case PREVIEW_CLASS_BEGIN + Effects.chrome.NAME:
        result = compileEffectValue(Effects.chrome, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.sepia.NAME:
        result = compileEffectValue(Effects.sepia, value);
        break;
      case PREVIEW_CLASS_BEGIN + Effects.marvin.NAME:
        result = compileEffectValue(Effects.marvin, value) / 100;
        break;
      case PREVIEW_CLASS_BEGIN + Effects.phobos.NAME:
        result = compileEffectValue(Effects.phobos, value) / 3;
        break;
      case PREVIEW_CLASS_BEGIN + Effects.heat.NAME:
        result = compileEffectValue(Effects.heat, value) / 3;
        break;
    }
    return result;
  };

  imgEffectLevel.style.display = 'none';
  effectsList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (currentEffect) {
      window.utils.imgPreview.classList.remove(currentEffect);
    }
    if (effectNone.checked) {
      imgEffectLevel.style.display = 'none';
      window.utils.imgPreview.style = 'none';
      imgValue.value = '100%';
      effectLevelValue.value = '';
    } else if (target.tagName !== 'UL' && target.tagName !== 'SPAN' && target.tagName !== 'LABEL' && target.tagName !== 'LI') {
      imgValue.value = '100%';
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
