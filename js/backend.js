'use strict';

(function () {
  var URL = 'https://js.dump.academy/kekstagram';
  var xhr = new XMLHttpRequest();
  xhr.responseType = 'json';

  window.load = function (onLoad) {
    xhr.open('GET', URL + '/data');

    xhr.addEventListener('load', function () {
      window.photosArr = xhr.response;
      window.defaultArr = xhr.response;
      onLoad(xhr.response, xhr.response.length);
    });

    xhr.send();
  };

  var save = function (data, onLoad, onError) {
    var xhrUpload = new XMLHttpRequest();

    xhrUpload.addEventListener('load', function () {
      if (xhrUpload.status === 200) {
        onLoad(xhrUpload.response);
      } else {
        onError(xhrUpload.response);
      }
    });

    xhrUpload.addEventListener('error', function () {
      onError();
    });

    xhrUpload.open('POST', URL);
    xhrUpload.send(data);
  };

  window.backend = {
    load: window.load,
    save: save,
    xhr: xhr
  };

})();
