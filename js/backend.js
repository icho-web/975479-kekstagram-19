'use strict';

(function () {
  var filterButtons = document.querySelector('.img-filters');

  window.load = function (onLoad) {
    var URL = 'https://js.dump.academy/kekstagram/data';
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      window.photosArr = xhr.response;
      onLoad(xhr.response, xhr.response.length);
      filterButtons.classList.remove('img-filters--inactive');
    });

    xhr.send();
  };

  window.backend = {
    load: window.load
  };

})();
