'use strict';

(function () {
  var STATUS_OK = 200;
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
      if (xhrUpload.status === STATUS_OK) {
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
