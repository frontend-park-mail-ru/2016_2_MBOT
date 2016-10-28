(function () {

  class Model {

    constructor(attributes) {
      if (attributes) {
        this.attributes = Object.assign({}, this.defaults, this._clean(attributes));
      }
    }

    get baseUrl() {
      return 'https://tron-09-2016.herokuapp.com/api';
    }

    get defaults() {
      return {};
    }

    _clean(attributes) {
      Object.keys(attributes).forEach(key => {
        if (attributes[key] === undefined) {
          delete attributes[key];
        }

        if (typeof attributes[key] === 'object' && attributes[key] !== null) {
          this._clean(attributes[key]);
        }
      });

      return attributes;
    }

    send(method, data, url) {
      //const url = this.url(data.id);
      console.log(data);
      return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.setRequestHeader('Content-type', 'application/json');

        xhr.onreadystatechange = function () {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
              resolve(xhr.responseText);
            } else {
              console.log(xhr.getAllResponseHeaders());
              reject({code: xhr.status, text: xhr.responseText});
            }
          }
        };
        console.log(JSON.stringify(data));
        xhr.send(JSON.stringify(data));
      });
    }

  }

  //export
  window.Model = Model;

})();
