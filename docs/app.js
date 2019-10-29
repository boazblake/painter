(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/button.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button() {
  return {
    view: function view(_ref) {
      var _ref$attrs = _ref.attrs,
          classList = _ref$attrs.classList,
          action = _ref$attrs.action,
          label = _ref$attrs.label;
      return (0, _mithril2.default)("button.btn." + classList, { onclick: action }, label);
    }
  };
};

exports.default = Button;
});

;require.register("components/canvas.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Canvas = function Canvas() {
  return {
    oncreate: function oncreate(_ref) {
      var dom = _ref.dom,
          _ref$attrs = _ref.attrs,
          ctx = _ref$attrs.ctx,
          mdl = _ref$attrs.mdl;

      var newCtx = dom.getContext("2d");
      ctx && newCtx.putImageData(ctx, 0, 0);
    },
    view: function view(_ref2) {
      var _ref2$attrs = _ref2.attrs,
          classList = _ref2$attrs.classList,
          id = _ref2$attrs.id;
      return (0, _mithril2.default)("canvas." + classList, { id: id });
    }
  };
};

exports.default = Canvas;
});

;require.register("components/navbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _button = require("./button.js");

var _button2 = _interopRequireDefault(_button);

var _model = require("../model");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Navbar = function Navbar() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;

      return (0, _mithril2.default)("nav.navbar", _mithril2.default.route.get() == "/easel" ? mdl.artworks.map(_model.isEmpty) && (0, _mithril2.default)(_button2.default, {
        mdl: mdl,
        classList: "navBtn",
        action: function action() {
          mdl.preventUpdate(false);
          _mithril2.default.route.set("/print");
        },
        label: "View Gallery"
      }) : (0, _mithril2.default)(_button2.default, {
        mdl: mdl,
        classList: "navBtn",
        action: function action() {
          mdl.preventUpdate(true);
          _mithril2.default.route.set("/easel");
        },
        label: "Commision New Painting"
      }));
    }
  };
};

exports.default = Navbar;
});

;require.register("components/toolbar.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _button = require("./button.js");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EaselTools = function EaselTools() {
  return {
    view: function view(_ref) {
      var mdl = _ref.attrs.mdl;
      return (0, _mithril2.default)("aside.navbar", (0, _mithril2.default)(_button2.default, {
        mdl: mdl,
        classList: "toolBtn",
        action: function action() {
          mdl.preventUpdate(true);
          _mithril2.default.route.set("/easel");
        },
        label: "New Painting"
      }), (0, _mithril2.default)(_button2.default, {
        mdl: mdl,
        classList: "toolBtn",
        action: function action() {
          mdl.preventUpdate(false);

          mdl.orientation.includes("portrait") ? mdl.orientation = "animated.rollAround.landscape" : mdl.orientation = "animated.rollAround.portrait";
        },
        label: mdl.orientation.includes("portrait") ? "landscape" : "portrait"
      }));
    }
  };
};

var GalleryTools = function GalleryTools() {
  return {
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;

      return (0, _mithril2.default)("aside.navbar", mdl.canvas() !== null && [(0, _mithril2.default)(_button2.default, {
        mdl: mdl,
        classList: "toolBtn",
        action: function action(e) {
          e.redraw = false;
          var a = document.createElement("a");
          a.href = mdl.dom().toDataURL("image/png");
          a.download = "image_name.jpg";
          a.style.display = "none";
          document.body.appendChild(a);
          a.click();
          a.remove();
        },
        download: "" + mdl.canvas(),
        label: "Download"
      })]);
    }
  };
};

var Toolbar = function Toolbar() {
  return {
    view: function view(_ref3) {
      var mdl = _ref3.attrs.mdl;
      return _mithril2.default.route.get() == "/easel" ? (0, _mithril2.default)(EaselTools, { mdl: mdl }) : (0, _mithril2.default)(GalleryTools, { mdl: mdl });
    }
  };
};

exports.default = Toolbar;
});

;require.register("initialize.js", function(exports, require, module) {
"use strict";

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _model = require("./model.js");

var _model2 = _interopRequireDefault(_model);

var _navbar = require("./components/navbar");

var _navbar2 = _interopRequireDefault(_navbar);

var _toolbar = require("./components/toolbar");

var _toolbar2 = _interopRequireDefault(_toolbar);

var _easel = require("./pages/easel.js");

var _easel2 = _interopRequireDefault(_easel);

var _gallery = require("./pages/gallery.js");

var _gallery2 = _interopRequireDefault(_gallery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Main = function Main() {
  return { view: function view(_ref) {
      var children = _ref.children;
      return (0, _mithril2.default)("section.main", children);
    } };
};

var Layout = function Layout() {
  return {
    view: function view(_ref2) {
      var children = _ref2.children,
          mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(".app", [(0, _mithril2.default)(_navbar2.default, { mdl: mdl }), (0, _mithril2.default)(Main, { mdl: mdl }, children), (0, _mithril2.default)(_toolbar2.default, { mdl: mdl })]);
    }
  };
};

var routes = function routes(mdl) {
  return {
    "/easel": {
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_easel2.default, { mdl: mdl, key: Date.now() }));
      }
    },
    "/gallery": {
      onmatch: function onmatch() {
        if (mdl.artworks().length == 0) return _mithril2.default.route.set("/easel");
      },
      render: function render() {
        return (0, _mithril2.default)(Layout, { mdl: mdl }, (0, _mithril2.default)(_gallery2.default, { mdl: mdl }));
      }
    }
  };
};

document.addEventListener("DOMContentLoaded", function () {
  var root = document.body;
  _mithril2.default.route(root, "/gallery", routes(_model2.default));
});
});

;require.register("model.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isEmpty = exports.range = exports.getHue = exports.getHeight = exports.getWidth = exports.getRotation = exports.getPosition = exports.rest = exports.last = exports.log = undefined;

var _mithrilStream = require("mithril-stream");

var _mithrilStream2 = _interopRequireDefault(_mithrilStream);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var WIDTH = (0, _mithrilStream2.default)(600);
var HEIGHT = (0, _mithrilStream2.default)(600);

var getDpr = function getDpr(size) {
  return size * window.devicePixelRatio || 1;
};

var log = exports.log = function log(m) {
  return function (v) {
    console.log(m, v);
    return v;
  };
};

var rand = function rand(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};
var last = exports.last = function last(xs) {
  return xs[xs.length - 1];
};
var rest = exports.rest = function rest(_ref) {
  var _ref2 = _toArray(_ref),
      head = _ref2[0],
      rest = _ref2.slice(1);

  return rest;
};

var getPosition = exports.getPosition = function getPosition(mdl) {
  return {
    x: rand(0, mdl.width()),
    y: rand(0, mdl.height())
  };
};
var getRotation = exports.getRotation = function getRotation() {
  return rand(0, 360);
};
var getWidth = exports.getWidth = function getWidth(mdl) {
  return rand(0, mdl.width());
};
var getHeight = exports.getHeight = function getHeight(mdl) {
  return rand(0, mdl.height());
};
var getHue = exports.getHue = function getHue() {
  return rand(0, 999);
};
var range = exports.range = function range(size) {
  return [].concat(_toConsumableArray(Array(size).keys()));
};

var isEmpty = exports.isEmpty = function isEmpty(xs) {
  return xs.length == 0;
};

var saveArt = function saveArt(mdl, art) {
  var image = { id: mdl.artworks().length, art: art };
  mdl.artworks.map(function (xs) {
    return xs.push(image);
  });
};

var shapes = ["circle", "square", "triangle"];

var Model = {
  count: (0, _mithrilStream2.default)(rand(30, 70)),
  preventUpdate: (0, _mithrilStream2.default)(true),
  shapes: shapes,
  width: (0, _mithrilStream2.default)(600),
  height: (0, _mithrilStream2.default)(600),
  artworks: (0, _mithrilStream2.default)([]),
  canvas: (0, _mithrilStream2.default)(null),
  ctx: (0, _mithrilStream2.default)(null),
  dom: (0, _mithrilStream2.default)(null),
  saveArt: saveArt,
  log: log,
  orientation: "portrait"
};
exports.default = Model;
});

;require.register("pages/easel.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _canvas = require("../components/canvas.js");

var _canvas2 = _interopRequireDefault(_canvas);

var _paint = require("../paint.js");

var _paint2 = _interopRequireDefault(_paint);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Easel = function Easel() {
  return {
    oninit: function oninit(_ref) {
      var mdl = _ref.attrs.mdl;

      if (mdl.preventUpdate()) {
        var dom = document.createElement("canvas");
        var ctx = dom.getContext("2d");
        ctx.imageSmoothingQuality = "high";
        ctx.filter = "brightness(0.8)";
        ctx.scale(0.8, 0.8);
        (0, _paint2.default)({ ctx: ctx, mdl: mdl });
        var image = ctx.getImageData(0, 0, mdl.width(), mdl.height());
        mdl.canvas(image);
        mdl.ctx(ctx);
        mdl.dom(dom);
        mdl.saveArt(mdl, image);
      }
    },
    view: function view(_ref2) {
      var mdl = _ref2.attrs.mdl;
      return (0, _mithril2.default)(".easel", (0, _mithril2.default)(_canvas2.default, {
        id: "canvas",
        mdl: mdl,
        classList: mdl.orientation,
        ctx: mdl.canvas()
      }));
    }
  };
};

exports.default = Easel;
});

;require.register("pages/gallery.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mithril = require("mithril");

var _mithril2 = _interopRequireDefault(_mithril);

var _canvas = require("../components/canvas");

var _canvas2 = _interopRequireDefault(_canvas);

var _button = require("../components/button");

var _button2 = _interopRequireDefault(_button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Modal = function Modal(_ref) {
  var close = _ref.attrs.close;

  return {
    view: function view(_ref2) {
      var children = _ref2.children,
          close = _ref2.attrs.close;
      return (0, _mithril2.default)(".modalBackground", {
        onclick: function onclick() {
          return close();
        }
      }, (0, _mithril2.default)(".modal", children));
    }
  };
};

var resetModal = function resetModal(_ref3) {
  var mdl = _ref3.attrs.mdl;
  return mdl.canvas(null);
};

var Gallery = function Gallery() {
  return {
    show: false,
    close: function close(state) {
      return state.show = !state.show;
    },
    oninit: resetModal,
    view: function view(_ref4) {
      var state = _ref4.state,
          mdl = _ref4.attrs.mdl;

      return [(0, _mithril2.default)(".gallery", mdl.artworks().map(function (_ref5) {
        var art = _ref5.art;

        return (0, _mithril2.default)(_button2.default, {
          classList: "paintBtn",
          action: function action(e) {
            var dom = e.target;
            var ctx = dom.getContext("2d");
            ctx.filter = "brightness(1)";
            var image = ctx.getImageData(0, 0, mdl.width(), mdl.height());
            mdl.canvas(image);
            mdl.dom(dom);
            state.close(state);
          },
          label: (0, _mithril2.default)(_canvas2.default, { mdl: mdl, ctx: art, classList: "canvas" })
        });
      })), state.show && (0, _mithril2.default)(Modal, {
        close: function close() {
          resetModal({ attrs: { mdl: mdl } });
          state.close(state);
        }
      }, (0, _mithril2.default)(_canvas2.default, {
        ctx: mdl.canvas(),
        classList: "canvas"
      }))];
    }
  };
};

exports.default = Gallery;
});

;require.register("paint.js", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _model = require("./model");

// hsla(hue, saturation, lightness, alpha)
// hue	0-360
// saturation	0-100%
// lightness	0-50-100%
// alpha	0.0-1.0
var hsla = function hsla(h, s, l, a) {
  return "hsla(" + h + ", " + s + ", " + l + ", " + a + ")";
};

var drawSquare = function drawSquare(ctx, position, rotation, width, height, hue) {
  // console.log("square", position, rotation, width, height)
  var color = hsla(hue, "60%", "50%", 0.75);
  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(position.x, position.y);
  ctx.rotate(rotation);
  ctx.fillRect(-width / 2, -height / 2, width, height);
  ctx.restore();
};

var drawTriangle = function drawTriangle(ctx, position, rotation, width, height, hue) {
  // console.log("triangle", position, rotation, width, height)
  var color = hsla(hue, "60%", "50%", 0.75);

  ctx.save();
  ctx.fillStyle = color;
  ctx.translate(position.x, position.y);
  ctx.rotate(rotation);

  ctx.beginPath();
  ctx.moveTo(width, 0);
  ctx.lineTo(0, -width / 4);
  ctx.lineTo(0, width / 4);
  ctx.closePath();

  ctx.fill();
  ctx.restore();
};

var createArt = function createArt(ctx, mdl) {
  return function (shape) {
    if (shape == "triangle") return drawTriangle(ctx, (0, _model.getPosition)(mdl), (0, _model.getRotation)(), (0, _model.getWidth)(mdl), (0, _model.getHeight)(mdl), (0, _model.getHue)());
    if (shape == "square") return drawSquare(ctx, (0, _model.getPosition)(mdl), (0, _model.getRotation)(), (0, _model.getWidth)(mdl), (0, _model.getHeight)(mdl), (0, _model.getHue)());
  };
};

var getShape = function getShape(mdl) {
  return mdl.shapes[Math.floor(Math.random() * mdl.shapes.length)];
};

var Paint = function Paint(_ref) {
  var ctx = _ref.ctx,
      mdl = _ref.mdl;
  return (0, _model.range)(mdl.count()).map(function (_) {
    return getShape(mdl);
  }).map(createArt(ctx, mdl));
};

exports.default = Paint;
});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map