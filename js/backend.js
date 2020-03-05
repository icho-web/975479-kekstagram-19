'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram/data';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  window.load = function (onLoad) {
    xhr.open('GET', URL);

    xhr.addEventListener('load', function () {
      window.photosArr = xhr.response;
      window.defaultArr = xhr.response;
      onLoad(xhr.response, xhr.response.length);
    });

    xhr.send();
  };

  window.backend = {
    load: window.load,
    xhr: xhr
  };

})();
