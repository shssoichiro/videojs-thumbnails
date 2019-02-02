/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _video = __webpack_require__(5);

var _video2 = _interopRequireDefault(_video);

var _thumbnail_helpers = __webpack_require__(3);

var _thumbnail_helpers2 = _interopRequireDefault(_thumbnail_helpers);

var _global = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Default options for the plugin.
var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = _video2.default.registerPlugin || _video2.default.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player.
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

var prepareThumbnailsClips = function prepareThumbnailsClips(videoTime, options) {

  var currentTime = 0;
  var currentIteration = 0;
  var thumbnailOffset = 0;
  var stepTime = options.stepTime;
  var thumbnailWidth = options.width;
  var thumbsPerImage = options.perImage;
  var initialSpriteUrl = options.spriteUrl.replace('%d', 1);
  var thumbnailClips = {
    0: {
      src: initialSpriteUrl,
      style: {
        left: thumbnailWidth / 2 * -1 + 'px',
        width: thumbsPerImage * thumbnailWidth + 'px',
        clip: 'rect(0,' + options.width + 'px,' + options.width + 'px, 0)'
      }
    }
  };

  while (currentTime <= videoTime) {
    currentTime += stepTime;
    thumbnailOffset = ++currentIteration % thumbsPerImage * thumbnailWidth;
    var spriteNum = Math.floor(currentTime / (stepTime * thumbsPerImage)) + 1;
    var spriteURL = options.spriteUrl.replace('%d', spriteNum);

    thumbnailClips[currentTime] = {
      src: spriteURL,
      style: {
        left: (thumbnailWidth / 2 + thumbnailOffset) * -1 + 'px',
        clip: 'rect(0, ' + (thumbnailWidth + thumbnailOffset) + 'px,' + options.width + 'px, ' + thumbnailOffset + 'px)'
      }
    };
  }
  return thumbnailClips;
};

var initializeThumbnails = function initializeThumbnails(player, options) {
  var thumbnailsClips = prepareThumbnailsClips(player.duration(), options);
  var thumbnailClips = _thumbnail_helpers2.default.createThumbnails({}, defaults, thumbnailsClips);
  var progressControl = player.controlBar.progressControl;
  var thumbnailImg = _thumbnail_helpers2.default.createThumbnailImg(thumbnailClips);
  var timelineTime = _thumbnail_helpers2.default.createThumbnailTime();
  var thumbnailArrowDown = _thumbnail_helpers2.default.createThumbnailArrowDown();
  var thumbnailsHolder = _thumbnail_helpers2.default.createThumbnaislHolder();

  thumbnailsHolder = _thumbnail_helpers2.default.mergeThumbnailElements(thumbnailsHolder, thumbnailImg, timelineTime, thumbnailArrowDown);
  _thumbnail_helpers2.default.hidePlayerOnHoverTime(progressControl);

  if (_global.window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    _thumbnail_helpers2.default.supportAndroidEvents();
  }

  _thumbnail_helpers2.default.createThumbnails(thumbnailImg.style, thumbnailClips['0'].style);

  _thumbnail_helpers2.default.centerThumbnailOverCursor(thumbnailImg);

  _thumbnail_helpers2.default.addThumbnailToPlayer(progressControl, thumbnailsHolder);

  _thumbnail_helpers2.default.updateOnHover(progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player);

  _thumbnail_helpers2.default.updateOnHoverOut(progressControl, thumbnailsHolder, player);
};

var onPlayerReady = function onPlayerReady(player, options) {
  if (player.duration()) {
    initializeThumbnails(player, options);
  }
  player.on('loadedmetadata', function () {
    initializeThumbnails(player, options);
  });
};
/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function thumbnails
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */
var thumbnails = function thumbnails(options) {
  var _this = this;

  this.ready(function () {
    onPlayerReady(_this, _video2.default.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('thumbnails', thumbnails);

// Include the version number.
thumbnails.VERSION = '__VERSION__';

exports.default = thumbnails;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _index = __webpack_require__(1);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

QUnit.module("webpack require"); /**
                                  * webpack test 
                                  */

QUnit.test("videojs-thumbnails should be requireable via webpack", function (assert) {
  assert.ok(_index2.default, "videojs-thumbnails is required properly");
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _global = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ThumbnailHelpers = function () {
  function ThumbnailHelpers() {
    _classCallCheck(this, ThumbnailHelpers);
  }

  _createClass(ThumbnailHelpers, null, [{
    key: 'hidePlayerOnHoverTime',
    value: function hidePlayerOnHoverTime(progressControl) {
      var mouseTime = progressControl.el_.getElementsByClassName('vjs-mouse-display')[0];

      mouseTime.style.display = 'none';
    }
  }, {
    key: 'createThumbnails',
    value: function createThumbnails() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      var thumbnailClip = args.shift() || {};

      Object.keys(args).map(function (i) {
        var singleThumbnail = args[i];

        Object.keys(singleThumbnail).map(function (property) {
          if (singleThumbnail.hasOwnProperty(property)) {
            if (_typeof(singleThumbnail[property]) === 'object') {
              thumbnailClip[property] = ThumbnailHelpers.createThumbnails(thumbnailClip[property], singleThumbnail[property]);
            } else {
              thumbnailClip[property] = singleThumbnail[property];
            }
          }
          return thumbnailClip;
        });
        return thumbnailClip;
      });
      return thumbnailClip;
    }
  }, {
    key: 'getComputedStyle',
    value: function getComputedStyle(thumbnailContent, pseudo) {
      return function (prop) {
        if (_global.window.getComputedStyle) {
          return _global.window.getComputedStyle(thumbnailContent, pseudo)[prop];
        }
        return thumbnailContent.currentStyle[prop];
      };
    }
  }, {
    key: 'getVisibleWidth',
    value: function getVisibleWidth(thumbnailContent, width) {
      if (width) {
        return parseFloat(width);
      }

      var clip = ThumbnailHelpers.getComputedStyle(thumbnailContent)('clip');

      if (clip !== 'auto' && clip !== 'inherit') {
        clip = clip.split(/(?:\(|\))/)[1].split(/(?:,| )/);
        if (clip.length === 4) {
          return parseFloat(clip[1]) - parseFloat(clip[3]);
        }
      }
      return 0;
    }
  }, {
    key: 'getScrollOffset',
    value: function getScrollOffset() {
      if (_global.window.pageXOffset) {
        return {
          x: _global.window.pageXOffset,
          y: _global.window.pageYOffset
        };
      }
      return {
        x: _global.document.documentElement.scrollLeft,
        y: _global.document.documentElement.scrollTop
      };
    }
  }, {
    key: 'supportAndroidEvents',
    value: function supportAndroidEvents(player) {
      // Android doesn't support :active and :hover on non-anchor and non-button elements
      // so, we need to fake the :active selector for thumbnails to show up.
      var progressControl = player.controlBar.progressControl;

      var addFakeActive = function addFakeActive() {
        progressControl.addClass('fake-active');
      };

      var removeFakeActive = function removeFakeActive() {
        progressControl.removeClass('fake-active');
      };

      progressControl.on('touchstart', addFakeActive);
      progressControl.on('touchend', removeFakeActive);
      progressControl.on('touchcancel', removeFakeActive);
    }
  }, {
    key: 'createThumbnaislHolder',
    value: function createThumbnaislHolder() {
      var wrap = _global.document.createElement('div');

      wrap.className = 'vjs-thumbnail-holder';
      return wrap;
    }
  }, {
    key: 'createThumbnailImg',
    value: function createThumbnailImg(thumbnailClips) {
      var thumbnailImg = _global.document.createElement('img');

      thumbnailImg.src = thumbnailClips['0'].src;
      thumbnailImg.className = 'vjs-thumbnail-img';
      return thumbnailImg;
    }
  }, {
    key: 'createThumbnailTime',
    value: function createThumbnailTime() {
      var time = _global.document.createElement('div');

      time.className = 'vjs-thumbnail-time';
      time.id = 'vjs-time';
      return time;
    }
  }, {
    key: 'createThumbnailArrowDown',
    value: function createThumbnailArrowDown() {
      var arrow = _global.document.createElement('div');

      arrow.className = 'vjs-thumbnail-arrow';
      arrow.id = 'vjs-arrow';
      return arrow;
    }
  }, {
    key: 'mergeThumbnailElements',
    value: function mergeThumbnailElements(thumbnailsHolder, thumbnailImg, timelineTime, thumbnailArrowDown) {

      thumbnailsHolder.appendChild(thumbnailImg);
      thumbnailsHolder.appendChild(timelineTime);
      thumbnailsHolder.appendChild(thumbnailArrowDown);
      return thumbnailsHolder;
    }
  }, {
    key: 'centerThumbnailOverCursor',
    value: function centerThumbnailOverCursor(thumbnailImg) {
      // center the thumbnail over the cursor if an offset wasn't provided
      if (!thumbnailImg.style.left && !thumbnailImg.style.right) {
        thumbnailImg.onload = function () {
          var thumbnailWidth = { width: -(thumbnailImg.naturalWidth / 2) };

          thumbnailImg.style.left = thumbnailWidth + 'px';
        };
      }
    }
  }, {
    key: 'getVideoDuration',
    value: function getVideoDuration(player) {
      var duration = player.duration();

      player.on('durationchange', function () {
        duration = player.duration();
      });
      return duration;
    }
  }, {
    key: 'addThumbnailToPlayer',
    value: function addThumbnailToPlayer(progressControl, thumbnailsHolder) {
      progressControl.el().appendChild(thumbnailsHolder);
    }
  }, {
    key: 'findMouseLeftOffset',
    value: function findMouseLeftOffset(pageMousePositionX, progressControl, pageXOffset, event) {
      // find the page offset of the mouse
      var leftOffset = pageMousePositionX || event.clientX + _global.document.body.scrollLeft + _global.document.documentElement.scrollLeft;

      // subtract the page offset of the positioned offset parent
      leftOffset -= progressControl.el().getBoundingClientRect().left + pageXOffset;
      return leftOffset;
    }
  }, {
    key: 'getMouseVideoTime',
    value: function getMouseVideoTime(mouseLeftOffset, progressControl, duration) {
      return Math.floor((mouseLeftOffset - progressControl.el().offsetLeft) / progressControl.width() * duration);
    }
  }, {
    key: 'updateThumbnailTime',
    value: function updateThumbnailTime(timelineTime, progressControl) {
      timelineTime.innerHTML = progressControl.seekBar.mouseTimeDisplay.el_.innerText;
    }
  }, {
    key: 'getPageMousePositionX',
    value: function getPageMousePositionX(event) {
      var pageMouseOffsetX = event.pageX;

      if (event.changedTouches) {
        pageMouseOffsetX = event.changedTouches[0].pageX;
      }
      return pageMouseOffsetX;
    }
  }, {
    key: 'keepThumbnailInsidePlayer',
    value: function keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progresBarRightOffset) {

      var width = ThumbnailHelpers.getVisibleWidth(thumbnailImg, activeThumbnail.width || thumbnailClips[0].width);

      var halfWidth = width / 2;

      // make sure that the thumbnail doesn't fall off the right side of
      // the left side of the player
      if (mouseLeftOffset + halfWidth > progresBarRightOffset) {
        mouseLeftOffset -= mouseLeftOffset + halfWidth - progresBarRightOffset;
      } else if (mouseLeftOffset < halfWidth) {
        mouseLeftOffset = halfWidth;
      }
      return mouseLeftOffset;
    }
  }, {
    key: 'updateThumbnailLeftStyle',
    value: function updateThumbnailLeftStyle(mouseLeftOffset, thumbnailsHolder) {
      var leftValue = { mouseLeftOffset: mouseLeftOffset };

      thumbnailsHolder.style.left = leftValue.mouseLeftOffset + 'px';
    }
  }, {
    key: 'getActiveThumbnail',
    value: function getActiveThumbnail(thumbnailClips, mouseTime) {
      var activeClip = 0;

      for (var clipNumber in thumbnailClips) {
        if (mouseTime > clipNumber) {
          activeClip = Math.max(activeClip, clipNumber);
        }
      }
      return thumbnailClips[activeClip];
    }
  }, {
    key: 'updateThumbnailSrc',
    value: function updateThumbnailSrc(activeThumbnail, thumbnailImg) {
      if (activeThumbnail.src && thumbnailImg.src !== activeThumbnail.src) {
        thumbnailImg.src = activeThumbnail.src;
      }
    }
  }, {
    key: 'updateThumbnailStyle',
    value: function updateThumbnailStyle(activeThumbnail, thumbnailImg) {
      if (activeThumbnail.style && thumbnailImg.style !== activeThumbnail.style) {
        ThumbnailHelpers.createThumbnails(thumbnailImg.style, activeThumbnail.style);
      }
    }
  }, {
    key: 'moveListener',
    value: function moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg) {
      var pageXOffset = ThumbnailHelpers.getScrollOffset().x;
      var progressBarPosition = progressControl.el().getBoundingClientRect();

      var progressBarRightOffset = (progressBarPosition.width || progressBarPosition.right) + pageXOffset;

      var pageMousePositionX = ThumbnailHelpers.getPageMousePositionX(event);

      var mouseLeftOffset = ThumbnailHelpers.findMouseLeftOffset(pageMousePositionX, progressControl, pageXOffset, event);

      var mouseTime = ThumbnailHelpers.parseDisplayTime(timelineTime.innerText);

      var activeThumbnail = ThumbnailHelpers.getActiveThumbnail(thumbnailClips, mouseTime);

      ThumbnailHelpers.updateThumbnailTime(timelineTime, progressControl);

      ThumbnailHelpers.updateThumbnailSrc(activeThumbnail, thumbnailImg);

      ThumbnailHelpers.updateThumbnailStyle(activeThumbnail, thumbnailImg);

      mouseLeftOffset = ThumbnailHelpers.keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progressBarRightOffset);

      ThumbnailHelpers.updateThumbnailLeftStyle(mouseLeftOffset, thumbnailsHolder);
    }
  }, {
    key: 'updateOnHover',
    value: function updateOnHover(progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player) {

      // update the thumbnail while hovering
      progressControl.on('mousemove', function (event) {
        ThumbnailHelpers.moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player);
      });
      progressControl.on('touchmove', function (event) {
        ThumbnailHelpers.moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg);
      });
    }
  }, {
    key: 'hideThumbnail',
    value: function hideThumbnail(thumbnailsHolder) {
      thumbnailsHolder.style.left = '-1000px';
    }
  }, {
    key: 'updateOnHoverOut',
    value: function updateOnHoverOut(progressControl, thumbnailsHolder, player) {

      // move the placeholder out of the way when not hovering
      progressControl.on('mouseout', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      progressControl.on('touchcancel', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      progressControl.on('touchend', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
      player.on('userinactive', function (event) {
        ThumbnailHelpers.hideThumbnail(thumbnailsHolder);
      });
    }
  }, {
    key: 'parseDisplayTime',
    value: function parseDisplayTime(time) {
      var parts = time.split(':');
      var seconds = 0;
      var factor = 1;

      while (true) {
        if (parts.length === 0) {
          break;
        }

        var part = parts.pop();

        seconds += part * factor;
        factor *= 60;
      }
      return seconds;
    }
  }]);

  return ThumbnailHelpers;
}();

exports.default = ThumbnailHelpers;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = videojs;

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZjNmM2U1OGY4MzJiYzEwYjZkOWMiLCJ3ZWJwYWNrOi8vLy4vfi9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9kaXN0L3Rlc3Qvd2VicGFjay5zdGFydC5qcyIsIndlYnBhY2s6Ly8vLi9zcmMvanMvdGh1bWJuYWlsX2hlbHBlcnMuanMiLCJ3ZWJwYWNrOi8vLyh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJ2aWRlb2pzXCIiXSwibmFtZXMiOlsiZGVmYXVsdHMiLCJyZWdpc3RlclBsdWdpbiIsInZpZGVvanMiLCJwbHVnaW4iLCJwcmVwYXJlVGh1bWJuYWlsc0NsaXBzIiwidmlkZW9UaW1lIiwib3B0aW9ucyIsImN1cnJlbnRUaW1lIiwiY3VycmVudEl0ZXJhdGlvbiIsInRodW1ibmFpbE9mZnNldCIsInN0ZXBUaW1lIiwidGh1bWJuYWlsV2lkdGgiLCJ3aWR0aCIsInRodW1ic1BlckltYWdlIiwicGVySW1hZ2UiLCJpbml0aWFsU3ByaXRlVXJsIiwic3ByaXRlVXJsIiwicmVwbGFjZSIsInRodW1ibmFpbENsaXBzIiwic3JjIiwic3R5bGUiLCJsZWZ0IiwiY2xpcCIsInNwcml0ZU51bSIsIk1hdGgiLCJmbG9vciIsInNwcml0ZVVSTCIsImluaXRpYWxpemVUaHVtYm5haWxzIiwicGxheWVyIiwidGh1bWJuYWlsc0NsaXBzIiwiZHVyYXRpb24iLCJUaHVtYm5haWxIZWxwZXJzIiwiY3JlYXRlVGh1bWJuYWlscyIsInByb2dyZXNzQ29udHJvbCIsImNvbnRyb2xCYXIiLCJ0aHVtYm5haWxJbWciLCJjcmVhdGVUaHVtYm5haWxJbWciLCJ0aW1lbGluZVRpbWUiLCJjcmVhdGVUaHVtYm5haWxUaW1lIiwidGh1bWJuYWlsQXJyb3dEb3duIiwiY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duIiwidGh1bWJuYWlsc0hvbGRlciIsImNyZWF0ZVRodW1ibmFpc2xIb2xkZXIiLCJtZXJnZVRodW1ibmFpbEVsZW1lbnRzIiwiaGlkZVBsYXllck9uSG92ZXJUaW1lIiwid2luZG93IiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidG9Mb3dlckNhc2UiLCJpbmRleE9mIiwic3VwcG9ydEFuZHJvaWRFdmVudHMiLCJjZW50ZXJUaHVtYm5haWxPdmVyQ3Vyc29yIiwiYWRkVGh1bWJuYWlsVG9QbGF5ZXIiLCJ1cGRhdGVPbkhvdmVyIiwidXBkYXRlT25Ib3Zlck91dCIsIm9uUGxheWVyUmVhZHkiLCJvbiIsInRodW1ibmFpbHMiLCJyZWFkeSIsIm1lcmdlT3B0aW9ucyIsIlZFUlNJT04iLCJRVW5pdCIsIm1vZHVsZSIsInRlc3QiLCJhc3NlcnQiLCJvayIsInBrZyIsIm1vdXNlVGltZSIsImVsXyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkaXNwbGF5IiwiYXJncyIsInRodW1ibmFpbENsaXAiLCJzaGlmdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwic2luZ2xlVGh1bWJuYWlsIiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInRodW1ibmFpbENvbnRlbnQiLCJwc2V1ZG8iLCJwcm9wIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsInBhcnNlRmxvYXQiLCJzcGxpdCIsImxlbmd0aCIsInBhZ2VYT2Zmc2V0IiwieCIsInkiLCJwYWdlWU9mZnNldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImFkZEZha2VBY3RpdmUiLCJhZGRDbGFzcyIsInJlbW92ZUZha2VBY3RpdmUiLCJyZW1vdmVDbGFzcyIsIndyYXAiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidGltZSIsImlkIiwiYXJyb3ciLCJhcHBlbmRDaGlsZCIsInJpZ2h0Iiwib25sb2FkIiwibmF0dXJhbFdpZHRoIiwiZWwiLCJwYWdlTW91c2VQb3NpdGlvblgiLCJldmVudCIsImxlZnRPZmZzZXQiLCJjbGllbnRYIiwiYm9keSIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIm1vdXNlTGVmdE9mZnNldCIsIm9mZnNldExlZnQiLCJpbm5lckhUTUwiLCJzZWVrQmFyIiwibW91c2VUaW1lRGlzcGxheSIsImlubmVyVGV4dCIsInBhZ2VNb3VzZU9mZnNldFgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwiYWN0aXZlVGh1bWJuYWlsIiwicHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0IiwiZ2V0VmlzaWJsZVdpZHRoIiwiaGFsZldpZHRoIiwibGVmdFZhbHVlIiwiYWN0aXZlQ2xpcCIsImNsaXBOdW1iZXIiLCJtYXgiLCJnZXRTY3JvbGxPZmZzZXQiLCJwcm9ncmVzc0JhclBvc2l0aW9uIiwicHJvZ3Jlc3NCYXJSaWdodE9mZnNldCIsImdldFBhZ2VNb3VzZVBvc2l0aW9uWCIsImZpbmRNb3VzZUxlZnRPZmZzZXQiLCJwYXJzZURpc3BsYXlUaW1lIiwiZ2V0QWN0aXZlVGh1bWJuYWlsIiwidXBkYXRlVGh1bWJuYWlsVGltZSIsInVwZGF0ZVRodW1ibmFpbFNyYyIsInVwZGF0ZVRodW1ibmFpbFN0eWxlIiwia2VlcFRodW1ibmFpbEluc2lkZVBsYXllciIsInVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZSIsIm1vdmVMaXN0ZW5lciIsImhpZGVUaHVtYm5haWwiLCJwYXJ0cyIsInNlY29uZHMiLCJmYWN0b3IiLCJwYXJ0IiwicG9wIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEy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QyxRQUFRN0MsS0FBS2pCLEtBQUwsQ0FBVyxHQUFYLENBQWQ7QUFDQSxVQUFJK0QsVUFBVSxDQUFkO0FBQ0EsVUFBSUMsU0FBUyxDQUFiOztBQUVBLGFBQU8sSUFBUCxFQUFhO0FBQ1gsWUFBSUYsTUFBTTdELE1BQU4sS0FBaUIsQ0FBckIsRUFBd0I7QUFDdEI7QUFDRDs7QUFFRCxZQUFNZ0UsT0FBT0gsTUFBTUksR0FBTixFQUFiOztBQUVBSCxtQkFBV0UsT0FBT0QsTUFBbEI7QUFDQUEsa0JBQVUsRUFBVjtBQUNEO0FBQ0QsYUFBT0QsT0FBUDtBQUNEOzs7Ozs7a0JBaFZrQnZILGdCOzs7Ozs7QUNGckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkEseUIiLCJmaWxlIjoid2VicGFjay50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBmM2YzZTU4ZjgzMmJjMTBiNmQ5YyIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsb2JhbC93aW5kb3cuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHZpZGVvanMgZnJvbSAndmlkZW8uanMnO1xuaW1wb3J0IFRodW1ibmFpbEhlbHBlcnMgZnJvbSAnLi90aHVtYm5haWxfaGVscGVycy5qcyc7XG5pbXBvcnQge3dpbmRvd30gZnJvbSAnZ2xvYmFsJztcblxuLy8gRGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGx1Z2luLlxuY29uc3QgZGVmYXVsdHMgPSB7fTtcblxuLy8gQ3Jvc3MtY29tcGF0aWJpbGl0eSBmb3IgVmlkZW8uanMgNSBhbmQgNi5cbmNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gdmlkZW9qcy5yZWdpc3RlclBsdWdpbiB8fCB2aWRlb2pzLnBsdWdpbjtcbi8vIGNvbnN0IGRvbSA9IHZpZGVvanMuZG9tIHx8IHZpZGVvanM7XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeS5cbiAqXG4gKiBUaGlzIGlzIGEgZ3JlYXQgcGxhY2UgZm9yIHlvdXIgcGx1Z2luIHRvIGluaXRpYWxpemUgaXRzZWxmLiBXaGVuIHRoaXNcbiAqIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHBsYXllciB3aWxsIGhhdmUgaXRzIERPTSBhbmQgY2hpbGQgY29tcG9uZW50c1xuICogaW4gcGxhY2UuXG4gKlxuICogQGZ1bmN0aW9uIG9uUGxheWVyUmVhZHlcbiAqIEBwYXJhbSAgICB7UGxheWVyfSBwbGF5ZXJcbiAqICAgICAgICAgICBBIFZpZGVvLmpzIHBsYXllci5cbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cbiAqL1xuXG5jb25zdCBwcmVwYXJlVGh1bWJuYWlsc0NsaXBzID0gKHZpZGVvVGltZSwgb3B0aW9ucykgPT4ge1xuXG4gIGxldCBjdXJyZW50VGltZSA9IDA7XG4gIGxldCBjdXJyZW50SXRlcmF0aW9uID0gMDtcbiAgbGV0IHRodW1ibmFpbE9mZnNldCA9IDA7XG4gIGNvbnN0IHN0ZXBUaW1lID0gb3B0aW9ucy5zdGVwVGltZTtcbiAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSBvcHRpb25zLndpZHRoO1xuICBjb25zdCB0aHVtYnNQZXJJbWFnZSA9IG9wdGlvbnMucGVySW1hZ2U7XG4gIGNvbnN0IGluaXRpYWxTcHJpdGVVcmwgPSBvcHRpb25zLnNwcml0ZVVybC5yZXBsYWNlKCclZCcsIDEpO1xuICBjb25zdCB0aHVtYm5haWxDbGlwcyA9IHtcbiAgICAwOiB7XG4gICAgICBzcmM6IGluaXRpYWxTcHJpdGVVcmwsXG4gICAgICBzdHlsZToge1xuICAgICAgICBsZWZ0OiAodGh1bWJuYWlsV2lkdGggLyAyICogLTEpICsgJ3B4JyxcbiAgICAgICAgd2lkdGg6ICh0aHVtYnNQZXJJbWFnZSAqIHRodW1ibmFpbFdpZHRoKSArICdweCcsXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsJyArIG9wdGlvbnMud2lkdGggKyAncHgsJyArIG9wdGlvbnMud2lkdGggKyAncHgsIDApJ1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB3aGlsZSAoY3VycmVudFRpbWUgPD0gdmlkZW9UaW1lKSB7XG4gICAgY3VycmVudFRpbWUgKz0gc3RlcFRpbWU7XG4gICAgdGh1bWJuYWlsT2Zmc2V0ID0gKCsrY3VycmVudEl0ZXJhdGlvbiAlIHRodW1ic1BlckltYWdlKSAqIHRodW1ibmFpbFdpZHRoO1xuICAgIGNvbnN0IHNwcml0ZU51bSA9IE1hdGguZmxvb3IoY3VycmVudFRpbWUgLyAoc3RlcFRpbWUgKiB0aHVtYnNQZXJJbWFnZSkpICsgMTtcbiAgICBjb25zdCBzcHJpdGVVUkwgPSBvcHRpb25zLnNwcml0ZVVybC5yZXBsYWNlKCclZCcsIHNwcml0ZU51bSk7XG5cbiAgICB0aHVtYm5haWxDbGlwc1tjdXJyZW50VGltZV0gPSB7XG4gICAgICBzcmM6IHNwcml0ZVVSTCxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGxlZnQ6ICgodGh1bWJuYWlsV2lkdGggLyAyICsgdGh1bWJuYWlsT2Zmc2V0KSAqIC0xKSArICdweCcsXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsICcgKyAodGh1bWJuYWlsV2lkdGggKyB0aHVtYm5haWxPZmZzZXQpICsgJ3B4LCcgK1xuICAgICAgICAgICAgICBvcHRpb25zLndpZHRoICsgJ3B4LCAnICsgdGh1bWJuYWlsT2Zmc2V0ICsgJ3B4KSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybiB0aHVtYm5haWxDbGlwcztcbn07XG5cbmNvbnN0IGluaXRpYWxpemVUaHVtYm5haWxzID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xuICBjb25zdCB0aHVtYm5haWxzQ2xpcHMgPSBwcmVwYXJlVGh1bWJuYWlsc0NsaXBzKHBsYXllci5kdXJhdGlvbigpLCBvcHRpb25zKTtcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHMoe30sIGRlZmF1bHRzLCB0aHVtYm5haWxzQ2xpcHMpO1xuICBjb25zdCBwcm9ncmVzc0NvbnRyb2wgPSBwbGF5ZXIuY29udHJvbEJhci5wcm9ncmVzc0NvbnRyb2w7XG4gIGNvbnN0IHRodW1ibmFpbEltZyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKTtcbiAgY29uc3QgdGltZWxpbmVUaW1lID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxUaW1lKCk7XG4gIGNvbnN0IHRodW1ibmFpbEFycm93RG93biA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duKCk7XG4gIGxldCB0aHVtYm5haWxzSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haXNsSG9sZGVyKCk7XG5cbiAgdGh1bWJuYWlsc0hvbGRlciA9IFRodW1ibmFpbEhlbHBlcnMubWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKTtcbiAgVGh1bWJuYWlsSGVscGVycy5oaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKTtcblxuICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgVGh1bWJuYWlsSGVscGVycy5zdXBwb3J0QW5kcm9pZEV2ZW50cygpO1xuICB9XG5cbiAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWycwJ10uc3R5bGUpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuYWRkVGh1bWJuYWlsVG9QbGF5ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG5cbiAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG59O1xuXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xuICBpZiAocGxheWVyLmR1cmF0aW9uKCkpIHtcbiAgICBpbml0aWFsaXplVGh1bWJuYWlscyhwbGF5ZXIsIG9wdGlvbnMpO1xuICB9XG4gIHBsYXllci5vbignbG9hZGVkbWV0YWRhdGEnLCAoKCkgPT4ge1xuICAgIGluaXRpYWxpemVUaHVtYm5haWxzKHBsYXllciwgb3B0aW9ucyk7XG4gIH0pKTtcbn07XG4vKipcbiAqIEEgdmlkZW8uanMgcGx1Z2luLlxuICpcbiAqIEluIHRoZSBwbHVnaW4gZnVuY3Rpb24sIHRoZSB2YWx1ZSBvZiBgdGhpc2AgaXMgYSB2aWRlby5qcyBgUGxheWVyYFxuICogaW5zdGFuY2UuIFlvdSBjYW5ub3QgcmVseSBvbiB0aGUgcGxheWVyIGJlaW5nIGluIGEgXCJyZWFkeVwiIHN0YXRlIGhlcmUsXG4gKiBkZXBlbmRpbmcgb24gaG93IHRoZSBwbHVnaW4gaXMgaW52b2tlZC4gVGhpcyBtYXkgb3IgbWF5IG5vdCBiZSBpbXBvcnRhbnRcbiAqIHRvIHlvdTsgaWYgbm90LCByZW1vdmUgdGhlIHdhaXQgZm9yIFwicmVhZHlcIiFcbiAqXG4gKiBAZnVuY3Rpb24gdGh1bWJuYWlsc1xuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxuICovXG5jb25zdCB0aHVtYm5haWxzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICBvblBsYXllclJlYWR5KHRoaXMsIHZpZGVvanMubWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKSk7XG4gIH0pO1xufTtcblxuLy8gUmVnaXN0ZXIgdGhlIHBsdWdpbiB3aXRoIHZpZGVvLmpzLlxucmVnaXN0ZXJQbHVnaW4oJ3RodW1ibmFpbHMnLCB0aHVtYm5haWxzKTtcblxuLy8gSW5jbHVkZSB0aGUgdmVyc2lvbiBudW1iZXIuXG50aHVtYm5haWxzLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5leHBvcnQgZGVmYXVsdCB0aHVtYm5haWxzO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL2luZGV4LmpzIiwiLyoqXG4gKiB3ZWJwYWNrIHRlc3QgXG4gKi9cbmltcG9ydCBwa2cgZnJvbSBcIi4uLy4uL3NyYy9qcy9pbmRleC5qc1wiO1xuXG5RVW5pdC5tb2R1bGUoXCJ3ZWJwYWNrIHJlcXVpcmVcIik7XG5RVW5pdC50ZXN0KFwidmlkZW9qcy10aHVtYm5haWxzIHNob3VsZCBiZSByZXF1aXJlYWJsZSB2aWEgd2VicGFja1wiLCAoYXNzZXJ0KSA9PiB7XG4gIGFzc2VydC5vayhwa2csIFwidmlkZW9qcy10aHVtYm5haWxzIGlzIHJlcXVpcmVkIHByb3Blcmx5XCIpO1xufSk7XG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vZGlzdC90ZXN0L3dlYnBhY2suc3RhcnQuanMiLCJpbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gJ2dsb2JhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRodW1ibmFpbEhlbHBlcnMge1xuXG4gIHN0YXRpYyBoaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKSB7XG4gICAgY29uc3QgbW91c2VUaW1lID0gcHJvZ3Jlc3NDb250cm9sLmVsXy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtbW91c2UtZGlzcGxheScpWzBdO1xuXG4gICAgbW91c2VUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlscyguLi5hcmdzKSB7XG4gICAgY29uc3QgdGh1bWJuYWlsQ2xpcCA9IGFyZ3Muc2hpZnQoKSB8fCB7fTtcblxuICAgIE9iamVjdC5rZXlzKGFyZ3MpLm1hcCgoaSkgPT4ge1xuICAgICAgY29uc3Qgc2luZ2xlVGh1bWJuYWlsID0gYXJnc1tpXTtcblxuICAgICAgT2JqZWN0LmtleXMoc2luZ2xlVGh1bWJuYWlsKS5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGlmIChzaW5nbGVUaHVtYm5haWwuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHModGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pIHtcbiAgICByZXR1cm4gKHByb3ApID0+IHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKVtwcm9wXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aHVtYm5haWxDb250ZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldFZpc2libGVXaWR0aCh0aHVtYm5haWxDb250ZW50LCB3aWR0aCkge1xuICAgIGlmICh3aWR0aCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQod2lkdGgpO1xuICAgIH1cblxuICAgIGxldCBjbGlwID0gVGh1bWJuYWlsSGVscGVycy5nZXRDb21wdXRlZFN0eWxlKHRodW1ibmFpbENvbnRlbnQpKCdjbGlwJyk7XG5cbiAgICBpZiAoY2xpcCAhPT0gJ2F1dG8nICYmIGNsaXAgIT09ICdpbmhlcml0Jykge1xuICAgICAgY2xpcCA9IGNsaXAuc3BsaXQoLyg/OlxcKHxcXCkpLylbMV0uc3BsaXQoLyg/Oix8ICkvKTtcbiAgICAgIGlmIChjbGlwLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gKHBhcnNlRmxvYXQoY2xpcFsxXSkgLSBwYXJzZUZsb2F0KGNsaXBbM10pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2Nyb2xsT2Zmc2V0KCkge1xuICAgIGlmICh3aW5kb3cucGFnZVhPZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICB5OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBzdXBwb3J0QW5kcm9pZEV2ZW50cyhwbGF5ZXIpIHtcbiAgICAvLyBBbmRyb2lkIGRvZXNuJ3Qgc3VwcG9ydCA6YWN0aXZlIGFuZCA6aG92ZXIgb24gbm9uLWFuY2hvciBhbmQgbm9uLWJ1dHRvbiBlbGVtZW50c1xuICAgIC8vIHNvLCB3ZSBuZWVkIHRvIGZha2UgdGhlIDphY3RpdmUgc2VsZWN0b3IgZm9yIHRodW1ibmFpbHMgdG8gc2hvdyB1cC5cbiAgICBjb25zdCBwcm9ncmVzc0NvbnRyb2wgPSBwbGF5ZXIuY29udHJvbEJhci5wcm9ncmVzc0NvbnRyb2w7XG5cbiAgICBjb25zdCBhZGRGYWtlQWN0aXZlID0gKCkgPT4ge1xuICAgICAgcHJvZ3Jlc3NDb250cm9sLmFkZENsYXNzKCdmYWtlLWFjdGl2ZScpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVGYWtlQWN0aXZlID0gKCkgPT4ge1xuICAgICAgcHJvZ3Jlc3NDb250cm9sLnJlbW92ZUNsYXNzKCdmYWtlLWFjdGl2ZScpO1xuICAgIH07XG5cbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoc3RhcnQnLCBhZGRGYWtlQWN0aXZlKTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGNhbmNlbCcsIHJlbW92ZUZha2VBY3RpdmUpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpc2xIb2xkZXIoKSB7XG4gICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgd3JhcC5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1ob2xkZXInO1xuICAgIHJldHVybiB3cmFwO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcykge1xuICAgIGNvbnN0IHRodW1ibmFpbEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgdGh1bWJuYWlsSW1nLnNyYyA9IHRodW1ibmFpbENsaXBzWycwJ10uc3JjO1xuICAgIHRodW1ibmFpbEltZy5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1pbWcnO1xuICAgIHJldHVybiB0aHVtYm5haWxJbWc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsVGltZSgpIHtcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aW1lLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLXRpbWUnO1xuICAgIHRpbWUuaWQgPSAndmpzLXRpbWUnO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpIHtcbiAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYXJyb3cuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtYXJyb3cnO1xuICAgIGFycm93LmlkID0gJ3Zqcy1hcnJvdyc7XG4gICAgcmV0dXJuIGFycm93O1xuICB9XG5cbiAgc3RhdGljIG1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bikge1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xuICAgIHRodW1ibmFpbHNIb2xkZXIuYXBwZW5kQ2hpbGQodGltZWxpbmVUaW1lKTtcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEFycm93RG93bik7XG4gICAgcmV0dXJuIHRodW1ibmFpbHNIb2xkZXI7XG4gIH1cblxuICBzdGF0aWMgY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpIHtcbiAgICAvLyBjZW50ZXIgdGhlIHRodW1ibmFpbCBvdmVyIHRoZSBjdXJzb3IgaWYgYW4gb2Zmc2V0IHdhc24ndCBwcm92aWRlZFxuICAgIGlmICghdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgJiYgIXRodW1ibmFpbEltZy5zdHlsZS5yaWdodCkge1xuICAgICAgdGh1bWJuYWlsSW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSB7IHdpZHRoOiAtKHRodW1ibmFpbEltZy5uYXR1cmFsV2lkdGggLyAyKSB9O1xuXG4gICAgICAgIHRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ID0gYCR7dGh1bWJuYWlsV2lkdGh9cHhgO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpIHtcbiAgICBsZXQgZHVyYXRpb24gPSBwbGF5ZXIuZHVyYXRpb24oKTtcblxuICAgIHBsYXllci5vbignZHVyYXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBwcm9ncmVzc0NvbnRyb2wuZWwoKS5hcHBlbmRDaGlsZCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCwgcHJvZ3Jlc3NDb250cm9sLCBwYWdlWE9mZnNldCwgZXZlbnQpIHtcbiAgICAvLyBmaW5kIHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgbW91c2VcbiAgICBsZXQgbGVmdE9mZnNldCA9IHBhZ2VNb3VzZVBvc2l0aW9uWCB8fCAoZXZlbnQuY2xpZW50WCArXG4gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCk7XG5cbiAgICAvLyBzdWJ0cmFjdCB0aGUgcGFnZSBvZmZzZXQgb2YgdGhlIHBvc2l0aW9uZWQgb2Zmc2V0IHBhcmVudFxuICAgIGxlZnRPZmZzZXQgLT0gcHJvZ3Jlc3NDb250cm9sLmVsKCkuXG4gICAgICAgICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgcGFnZVhPZmZzZXQ7XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LCBwcm9ncmVzc0NvbnRyb2wsIGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKG1vdXNlTGVmdE9mZnNldCAtIHByb2dyZXNzQ29udHJvbC5lbCgpLm9mZnNldExlZnQpIC9cbiAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLndpZHRoKCkgKiBkdXJhdGlvbik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCkge1xuICAgIHRpbWVsaW5lVGltZS5pbm5lckhUTUwgPSAocHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIubW91c2VUaW1lRGlzcGxheS5lbF8uaW5uZXJUZXh0KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRQYWdlTW91c2VQb3NpdGlvblgoZXZlbnQpIHtcbiAgICBsZXQgcGFnZU1vdXNlT2Zmc2V0WCA9IGV2ZW50LnBhZ2VYO1xuXG4gICAgaWYgKGV2ZW50LmNoYW5nZWRUb3VjaGVzKSB7XG4gICAgICBwYWdlTW91c2VPZmZzZXRYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVg7XG4gICAgfVxuICAgIHJldHVybiBwYWdlTW91c2VPZmZzZXRYO1xuICB9XG5cbiAgc3RhdGljIGtlZXBUaHVtYm5haWxJbnNpZGVQbGF5ZXIodGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYm5haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUxlZnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNCYXJSaWdodE9mZnNldCkge1xuXG4gICAgY29uc3Qgd2lkdGggPSBUaHVtYm5haWxIZWxwZXJzLmdldFZpc2libGVXaWR0aCh0aHVtYm5haWxJbWcsIGFjdGl2ZVRodW1ibmFpbC53aWR0aCB8fFxuICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHNbMF0ud2lkdGgpO1xuXG4gICAgY29uc3QgaGFsZldpZHRoID0gd2lkdGggLyAyO1xuXG4gICAgLy8gbWFrZSBzdXJlIHRoYXQgdGhlIHRodW1ibmFpbCBkb2Vzbid0IGZhbGwgb2ZmIHRoZSByaWdodCBzaWRlIG9mXG4gICAgLy8gdGhlIGxlZnQgc2lkZSBvZiB0aGUgcGxheWVyXG4gICAgaWYgKChtb3VzZUxlZnRPZmZzZXQgKyBoYWxmV2lkdGgpID4gcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KSB7XG4gICAgICBtb3VzZUxlZnRPZmZzZXQgLT0gKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgLSBwcm9ncmVzQmFyUmlnaHRPZmZzZXQ7XG4gICAgfSBlbHNlIGlmIChtb3VzZUxlZnRPZmZzZXQgPCBoYWxmV2lkdGgpIHtcbiAgICAgIG1vdXNlTGVmdE9mZnNldCA9IGhhbGZXaWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIG1vdXNlTGVmdE9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUobW91c2VMZWZ0T2Zmc2V0LCB0aHVtYm5haWxzSG9sZGVyKSB7XG4gICAgY29uc3QgbGVmdFZhbHVlID0geyBtb3VzZUxlZnRPZmZzZXQgfTtcblxuICAgIHRodW1ibmFpbHNIb2xkZXIuc3R5bGUubGVmdCA9IGAke2xlZnRWYWx1ZS5tb3VzZUxlZnRPZmZzZXR9cHhgO1xuICB9XG5cbiAgc3RhdGljIGdldEFjdGl2ZVRodW1ibmFpbCh0aHVtYm5haWxDbGlwcywgbW91c2VUaW1lKSB7XG4gICAgbGV0IGFjdGl2ZUNsaXAgPSAwO1xuXG4gICAgZm9yIChjb25zdCBjbGlwTnVtYmVyIGluIHRodW1ibmFpbENsaXBzKSB7XG4gICAgICBpZiAobW91c2VUaW1lID4gY2xpcE51bWJlcikge1xuICAgICAgICBhY3RpdmVDbGlwID0gTWF0aC5tYXgoYWN0aXZlQ2xpcCwgY2xpcE51bWJlcik7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aHVtYm5haWxDbGlwc1thY3RpdmVDbGlwXTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcbiAgICBpZiAoYWN0aXZlVGh1bWJuYWlsLnNyYyAmJiB0aHVtYm5haWxJbWcuc3JjICE9PSBhY3RpdmVUaHVtYm5haWwuc3JjKSB7XG4gICAgICB0aHVtYm5haWxJbWcuc3JjID0gYWN0aXZlVGh1bWJuYWlsLnNyYztcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpIHtcbiAgICBpZiAoYWN0aXZlVGh1bWJuYWlsLnN0eWxlICYmIHRodW1ibmFpbEltZy5zdHlsZSAhPT0gYWN0aXZlVGh1bWJuYWlsLnN0eWxlKSB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHModGh1bWJuYWlsSW1nLnN0eWxlLCBhY3RpdmVUaHVtYm5haWwuc3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBtb3ZlTGlzdGVuZXIoZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZykge1xuICAgIGNvbnN0IHBhZ2VYT2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5nZXRTY3JvbGxPZmZzZXQoKS54O1xuICAgIGNvbnN0IHByb2dyZXNzQmFyUG9zaXRpb24gPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHByb2dyZXNzQmFyUmlnaHRPZmZzZXQgPSAocHJvZ3Jlc3NCYXJQb3NpdGlvbi53aWR0aCB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0JhclBvc2l0aW9uLnJpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0O1xuXG4gICAgY29uc3QgcGFnZU1vdXNlUG9zaXRpb25YID0gVGh1bWJuYWlsSGVscGVycy5nZXRQYWdlTW91c2VQb3NpdGlvblgoZXZlbnQpO1xuXG4gICAgbGV0IG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZmluZE1vdXNlTGVmdE9mZnNldChwYWdlTW91c2VQb3NpdGlvblgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50KTtcblxuICAgIGNvbnN0IG1vdXNlVGltZSA9IFRodW1ibmFpbEhlbHBlcnMucGFyc2VEaXNwbGF5VGltZSh0aW1lbGluZVRpbWUuaW5uZXJUZXh0KTtcblxuICAgIGNvbnN0IGFjdGl2ZVRodW1ibmFpbCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlVGltZSk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFRpbWUodGltZWxpbmVUaW1lLCBwcm9ncmVzc0NvbnRyb2wpO1xuXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxTcmMoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xuXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxTdHlsZShhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZyk7XG5cbiAgICBtb3VzZUxlZnRPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmtlZXBUaHVtYm5haWxJbnNpZGVQbGF5ZXIodGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZUxlZnRPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0JhclJpZ2h0T2Zmc2V0KTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsTGVmdFN0eWxlKG1vdXNlTGVmdE9mZnNldCwgdGh1bWJuYWlsc0hvbGRlcik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKSB7XG5cbiAgICAvLyB1cGRhdGUgdGhlIHRodW1ibmFpbCB3aGlsZSBob3ZlcmluZ1xuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2Vtb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLm1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG4gICAgfSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaG1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBoaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICB0aHVtYm5haWxzSG9sZGVyLnN0eWxlLmxlZnQgPSAnLTEwMDBweCc7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlT25Ib3Zlck91dChwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIsIHBsYXllcikge1xuXG4gICAgLy8gbW92ZSB0aGUgcGxhY2Vob2xkZXIgb3V0IG9mIHRoZSB3YXkgd2hlbiBub3QgaG92ZXJpbmdcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ21vdXNlb3V0JywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGNhbmNlbCcsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hlbmQnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIub24oJ3VzZXJpbmFjdGl2ZScsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIHBhcnNlRGlzcGxheVRpbWUodGltZSkge1xuICAgIGNvbnN0IHBhcnRzID0gdGltZS5zcGxpdCgnOicpO1xuICAgIGxldCBzZWNvbmRzID0gMDtcbiAgICBsZXQgZmFjdG9yID0gMTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICBpZiAocGFydHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYXJ0ID0gcGFydHMucG9wKCk7XG5cbiAgICAgIHNlY29uZHMgKz0gcGFydCAqIGZhY3RvcjtcbiAgICAgIGZhY3RvciAqPSA2MDtcbiAgICB9XG4gICAgcmV0dXJuIHNlY29uZHM7XG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL3NyYy9qcy90aHVtYm5haWxfaGVscGVycy5qcyIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLGV2YWwpKFwidGhpc1wiKTtcclxufSBjYXRjaChlKSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiB0aGUgd2luZG93IHJlZmVyZW5jZSBpcyBhdmFpbGFibGVcclxuXHRpZih0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKVxyXG5cdFx0ZyA9IHdpbmRvdztcclxufVxyXG5cclxuLy8gZyBjYW4gc3RpbGwgYmUgdW5kZWZpbmVkLCBidXQgbm90aGluZyB0byBkbyBhYm91dCBpdC4uLlxyXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xyXG4vLyBlYXNpZXIgdG8gaGFuZGxlIHRoaXMgY2FzZS4gaWYoIWdsb2JhbCkgeyAuLi59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGc7XHJcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vICh3ZWJwYWNrKS9idWlsZGluL2dsb2JhbC5qc1xuLy8gbW9kdWxlIGlkID0gNFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJtb2R1bGUuZXhwb3J0cyA9IHZpZGVvanM7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gZXh0ZXJuYWwgXCJ2aWRlb2pzXCJcbi8vIG1vZHVsZSBpZCA9IDVcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==