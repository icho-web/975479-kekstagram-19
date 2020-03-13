'use strict';

(function () {
  var form = document.querySelector('.img-upload__form');
  var main = document.querySelector('.main');
  var error = document.querySelector('#error')
    .content
    .querySelector('.error');

  var success = document.querySelector('#success')
    .content
    .querySelector('.success');

  var succesElement;
  var errorElement;
  var onCopySection = function (element, copy) {
    window.closeImg();
    element = copy.cloneNode(true);
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    main.appendChild(fragment);
  };

  var onButtonClick = function (section, button) {
    section.addEventListener('click', function (sectionEvt) {
      var target = sectionEvt.target;
      if (target.tagName === 'SECTION') {
        section.remove();
      } else if (target === button) {
        section.remove();
      }
    });

    window.addEventListener('keydown', function (sectionEvt) {
      if (sectionEvt.key === 'Escape') {
        section.remove();
      }
    });
  };

  form.addEventListener('submit', function (evt) {
    var data = new FormData(form);
    evt.preventDefault();

    var onSuccess = function () {
      onCopySection(succesElement, success);
      var successSection = document.querySelector('.success');
      var successButton = document.querySelector('.success__button');
      onButtonClick(successSection, successButton);
    };

    var onError = function () {
      window.closeImg();
      onCopySection(errorElement, error);
      var errorSection = document.querySelector('.error');
      var errorButton = document.querySelector('.error__button');

      onButtonClick(errorSection, errorButton);
    };


    window.backend.save(data, onSuccess, onError);
  });

})();
