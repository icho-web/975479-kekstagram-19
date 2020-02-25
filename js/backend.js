'use strict';

(function () {
  window.backend = {
    load: window.load = function (onLoad) {
      var URL = 'https://js.dump.academy/kekstagram/data';
      var xhr = new XMLHttpRequest();
      xhr.responseType = 'json';

      xhr.open('GET', URL);

      xhr.addEventListener('load', function () {
        onLoad(xhr.response);
      });

      xhr.send();
    }
  };

})();
