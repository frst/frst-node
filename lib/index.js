// Generated by CoffeeScript 1.3.3
var Frst;

module.exports = Frst = (function() {

  Frst.prototype.access_token = null;

  Frst.prototype.host = "http://api.onfrst.com";

  Frst.prototype.debug = false;

  function Frst(options) {
    this.options = options;
    if (this.options) {
      if (this.options.access_token) {
        this.access_token = this.options.access_token;
      }
      if (this.options.host) {
        this.host = this.options.host;
      }
      if (this.options.debug) {
        this.debug = this.options.debug;
      }
    }
  }

  Frst.prototype.url = function(route) {
    var access;
    if (!route) {
      throw new Error("you must call `url` with a route");
    }
    access = this.access_token ? "access_token=" + this.access_token : void 0;
    if (this.debug) {
      console.log(url);
    }
    return "" + this.host + route + "?" + access;
  };

  Frst.prototype.remote = function(options, cb) {
    var data;
    if (!options.route) {
      throw new Error('remote must be called with a route');
    }
    data = {
      url: this.url(options.route),
      method: options.type,
      json: options.data
    };
    if (this.debug) {
      console.log('remote', data);
    }
    return request(data, function(err, res, body) {
      try {
        body = JSON.parse(body);
      } catch (e) {
        console.log('err parsing json body', err);
      }
      if (res.statusCode === 404) {
        err = body;
      }
      return cb(err, body);
    });
  };

  Frst.prototype.get = function(options, cb) {
    var route;
    if (typeof options === "string") {
      route = options;
      options = {
        route: route
      };
    }
    options.type = 'GET';
    return this.remote(options, cb);
  };

  Frst.prototype.put = function(options, cb) {
    options.type = 'PUT';
    return this.remote(options, cb);
  };

  Frst.prototype.post = function(route, data, cb) {
    var options;
    options = {
      type: 'POST',
      route: route,
      data: data
    };
    return this.remote(options, cb);
  };

  Frst.prototype.del = function(options, cb) {
    options.type = 'DELETE';
    return this.remote(options, cb);
  };

  return Frst;

})();