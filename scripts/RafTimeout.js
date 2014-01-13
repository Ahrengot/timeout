(function() {
  "use strict";
  var RafInterval, RafTimeout, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  RafTimeout = (function() {
    function RafTimeout(cb, delay, args, context) {
      this.cb = cb;
      this.delay = delay;
      this.args = args;
      this.context = context;
      this.tick = __bind(this.tick, this);
      this.startTime = new Date().getTime();
      this.lastUpdate = this.startTime;
      if (!this.setAnimFrame()) {
        return console.error("Browser doesn't support RequestAnimationFrame");
      }
      this.tick();
    }

    RafTimeout.prototype.setAnimFrame = function() {
      var i, prefixes;
      this.reqAnimFrame = window.requestAnimationFrame;
      this.cancelAnimFrame = window.cancelAnimationFrame;
      prefixes = ["ms", "moz", "webkit", "o"];
      i = prefixes.length;
      while (i-- > -1 && !this.reqAnimFrame) {
        this.reqAnimFrame = window["" + prefixes[i] + "RequestAnimationFrame"];
        this.cancelAnimFrame = window["" + prefixes[i] + "CancelAnimationFrame"] || window["" + prefixes[i] + "CancelRequestAnimationFrame"];
      }
      if (this.reqAnimFrame) {
        return true;
      } else {
        return false;
      }
    };

    RafTimeout.prototype.tick = function() {
      this.lastUpdate = new Date().getTime();
      this.time = this.lastUpdate - this.startTime;
      if (this.time < this.delay) {
        return this.reqAnimFrame.call(window, this.tick);
      } else {
        return this.cb.apply(this.context, this.args);
      }
    };

    return RafTimeout;

  })();

  RafInterval = (function(_super) {
    __extends(RafInterval, _super);

    function RafInterval() {
      _ref = RafInterval.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    RafInterval.prototype.tick = function() {
      return console.error("RafInterval is not yet implemented.");
    };

    return RafInterval;

  })(RafTimeout);

  window.timeout = function(callback, delay, args, context) {
    if (delay == null) {
      delay = 1000;
    }
    if (args == null) {
      args = [];
    }
    if (context == null) {
      context = this;
    }
    return new RafTimeout(callback, delay, args, context);
  };

  window.interval = function(callback, delay, args, context) {
    if (delay == null) {
      delay = 1000;
    }
    if (args == null) {
      args = [];
    }
    if (context == null) {
      context = this;
    }
    return new RafInterval(callback, delay, args, context);
  };

}).call(this);
