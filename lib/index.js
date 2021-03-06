// Generated by CoffeeScript 1.3.3
var Frst, request;

request = require("request");

module.exports = Frst = (function() {

  Frst.prototype.access_token = null;

  Frst.prototype.host = "https://api.onfrst.com";

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
    access = this.access_token ? "access_token=" + this.access_token : "";
    if (this.debug) {
      console.log("fsrt-node: " + url);
    }
    if (!route.match(/^\//)) {
      route = "/" + route;
    }
    return "" + this.host + route + "?" + access;
  };

  Frst.prototype.remote = function(options, cb) {
    var data, url;
    if (!options.route) {
      throw new Error('remote must be called with a route');
    }
    url = this.url(options.route);
    data = {
      url: url,
      method: options.type,
      json: options.data
    };
    if (this.debug) {
      console.log('fsrt-node: remote', data);
    }
    return request(data, function(err, res, body) {
      if (err) {
        console.log("fsrt-node:", url, err);
      } else {
        try {
          body = JSON.parse(body);
        } catch (e) {
          console.log('fsrt-node: err parsing json body', err);
        }
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
