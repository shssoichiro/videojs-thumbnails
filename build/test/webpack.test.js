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
  var spriteURL = options.spriteUrl.replace('%d', 1);
  var thumbnailClips = {
    0: {
      src: spriteURL,
      style: {
        left: thumbnailWidth / 2 * -1 + 'px',
        width: thumbsPerImage * thumbnailWidth + 'px',
        clip: 'rect(0,' + options.width + 'px,' + options.width + 'px, 0)'
      }
    }
  };

  while (currentTime <= videoTime) {
    currentTime += stepTime;
    thumbnailOffset = ++currentIteration * thumbnailWidth;
    var spriteNum = Math.floor(currentTime / (options.stepTime * thumbsPerImage)) + 1;
    var _spriteURL = options.spriteUrl.replace('%d', spriteNum);
    thumbnailClips[currentTime] = {
      src: _spriteURL,
      style: {
        left: (thumbnailWidth / 2 + thumbnailOffset) * -1 + 'px',
        clip: 'rect(0, ' + (thumbnailWidth + thumbnailOffset) + 'px,' + options.width + 'px, ' + thumbnailOffset + 'px)'
      }
    };
  }
  return thumbnailClips;
};

var initializeThumbnails = function initializeThumbnails(thumbnailsClips, player) {

  var thumbnailClips = _thumbnail_helpers2.default.createThumbnails({}, defaults, thumbnailsClips);
  var progressControl = player.controlBar.progressControl;
  var thumbnailImg = _thumbnail_helpers2.default.createThumbnailImg(thumbnailClips);
  var timelineTime = _thumbnail_helpers2.default.createThumbnailTime();
  var thumbnailArrowDown = _thumbnail_helpers2.default.createThumbnailArrowDown();
  var thumbnaislHolder = _thumbnail_helpers2.default.createThumbnaislHolder();

  thumbnaislHolder = _thumbnail_helpers2.default.mergeThumbnailElements(thumbnaislHolder, thumbnailImg, timelineTime, thumbnailArrowDown);
  _thumbnail_helpers2.default.hidePlayerOnHoverTime(progressControl);

  if (_global.window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    _thumbnail_helpers2.default.supportAndroidEvents();
  }

  _thumbnail_helpers2.default.createThumbnails(thumbnailImg.style, thumbnailClips['0'].style);

  _thumbnail_helpers2.default.centerThumbnailOverCursor(thumbnailImg);

  _thumbnail_helpers2.default.addThumbnailToPlayer(progressControl, thumbnaislHolder);

  _thumbnail_helpers2.default.updateOnHover(progressControl, thumbnaislHolder, thumbnailClips, timelineTime, thumbnailImg, player);

  _thumbnail_helpers2.default.updateOnHoverOut(progressControl, thumbnaislHolder, player);
};

var onPlayerReady = function onPlayerReady(player, options) {
  player.on('loadedmetadata', function () {
    var thumbnailsClips = prepareThumbnailsClips(player.duration(), options);

    initializeThumbnails(thumbnailsClips, player);
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
      timelineTime.innerHTML = progressControl.seekBar.mouseTimeDisplay.el_.attributes['data-current-time'].value;
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
    value: function moveListener(event, progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player) {

      var duration = ThumbnailHelpers.getVideoDuration(player);
      var pageXOffset = ThumbnailHelpers.getScrollOffset().x;
      var progresBarPosition = progressControl.el().getBoundingClientRect();

      var progresBarRightOffset = (progresBarPosition.width || progresBarPosition.right) + pageXOffset;

      var pageMousePositionX = ThumbnailHelpers.getPageMousePositionX(event);

      var mouseLeftOffset = ThumbnailHelpers.findMouseLeftOffset(pageMousePositionX, progressControl, pageXOffset, event);

      var mouseTime = ThumbnailHelpers.getMouseVideoTime(mouseLeftOffset, progressControl, duration);

      var activeThumbnail = ThumbnailHelpers.getActiveThumbnail(thumbnailClips, mouseTime);

      ThumbnailHelpers.updateThumbnailTime(timelineTime, progressControl);

      ThumbnailHelpers.updateThumbnailSrc(activeThumbnail, thumbnailImg);

      ThumbnailHelpers.updateThumbnailStyle(activeThumbnail, thumbnailImg);

      mouseLeftOffset = ThumbnailHelpers.keepThumbnailInsidePlayer(thumbnailImg, activeThumbnail, thumbnailClips, mouseLeftOffset, progresBarRightOffset);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgZWVhOWZlNjZkYmE5ZGJlMzY0MzYiLCJ3ZWJwYWNrOi8vLy4vfi9nbG9iYWwvd2luZG93LmpzIiwid2VicGFjazovLy8uL3NyYy9qcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9idWlsZC90ZXN0L3dlYnBhY2suc3RhcnQuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzL3RodW1ibmFpbF9oZWxwZXJzLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwidmlkZW9qc1wiIl0sIm5hbWVzIjpbImRlZmF1bHRzIiwicmVnaXN0ZXJQbHVnaW4iLCJ2aWRlb2pzIiwicGx1Z2luIiwicHJlcGFyZVRodW1ibmFpbHNDbGlwcyIsInZpZGVvVGltZSIsIm9wdGlvbnMiLCJjdXJyZW50VGltZSIsImN1cnJlbnRJdGVyYXRpb24iLCJ0aHVtYm5haWxPZmZzZXQiLCJzdGVwVGltZSIsInRodW1ibmFpbFdpZHRoIiwid2lkdGgiLCJ0aHVtYnNQZXJJbWFnZSIsInBlckltYWdlIiwic3ByaXRlVVJMIiwic3ByaXRlVXJsIiwicmVwbGFjZSIsInRodW1ibmFpbENsaXBzIiwic3JjIiwic3R5bGUiLCJsZWZ0IiwiY2xpcCIsInNwcml0ZU51bSIsIk1hdGgiLCJmbG9vciIsImluaXRpYWxpemVUaHVtYm5haWxzIiwidGh1bWJuYWlsc0NsaXBzIiwicGxheWVyIiwiVGh1bWJuYWlsSGVscGVycyIsImNyZWF0ZVRodW1ibmFpbHMiLCJwcm9ncmVzc0NvbnRyb2wiLCJjb250cm9sQmFyIiwidGh1bWJuYWlsSW1nIiwiY3JlYXRlVGh1bWJuYWlsSW1nIiwidGltZWxpbmVUaW1lIiwiY3JlYXRlVGh1bWJuYWlsVGltZSIsInRodW1ibmFpbEFycm93RG93biIsImNyZWF0ZVRodW1ibmFpbEFycm93RG93biIsInRodW1ibmFpc2xIb2xkZXIiLCJjcmVhdGVUaHVtYm5haXNsSG9sZGVyIiwibWVyZ2VUaHVtYm5haWxFbGVtZW50cyIsImhpZGVQbGF5ZXJPbkhvdmVyVGltZSIsIndpbmRvdyIsIm5hdmlnYXRvciIsInVzZXJBZ2VudCIsInRvTG93ZXJDYXNlIiwiaW5kZXhPZiIsInN1cHBvcnRBbmRyb2lkRXZlbnRzIiwiY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvciIsImFkZFRodW1ibmFpbFRvUGxheWVyIiwidXBkYXRlT25Ib3ZlciIsInVwZGF0ZU9uSG92ZXJPdXQiLCJvblBsYXllclJlYWR5Iiwib24iLCJkdXJhdGlvbiIsInRodW1ibmFpbHMiLCJyZWFkeSIsIm1lcmdlT3B0aW9ucyIsIlZFUlNJT04iLCJRVW5pdCIsIm1vZHVsZSIsInRlc3QiLCJhc3NlcnQiLCJvayIsInBrZyIsIm1vdXNlVGltZSIsImVsXyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJkaXNwbGF5IiwiYXJncyIsInRodW1ibmFpbENsaXAiLCJzaGlmdCIsIk9iamVjdCIsImtleXMiLCJtYXAiLCJpIiwic2luZ2xlVGh1bWJuYWlsIiwicHJvcGVydHkiLCJoYXNPd25Qcm9wZXJ0eSIsInRodW1ibmFpbENvbnRlbnQiLCJwc2V1ZG8iLCJwcm9wIiwiZ2V0Q29tcHV0ZWRTdHlsZSIsImN1cnJlbnRTdHlsZSIsInBhcnNlRmxvYXQiLCJzcGxpdCIsImxlbmd0aCIsInBhZ2VYT2Zmc2V0IiwieCIsInkiLCJwYWdlWU9mZnNldCIsImRvY3VtZW50IiwiZG9jdW1lbnRFbGVtZW50Iiwic2Nyb2xsTGVmdCIsInNjcm9sbFRvcCIsImFkZEZha2VBY3RpdmUiLCJhZGRDbGFzcyIsInJlbW92ZUZha2VBY3RpdmUiLCJyZW1vdmVDbGFzcyIsIndyYXAiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NOYW1lIiwidGltZSIsImlkIiwiYXJyb3ciLCJ0aHVtYm5haWxzSG9sZGVyIiwiYXBwZW5kQ2hpbGQiLCJyaWdodCIsIm9ubG9hZCIsIm5hdHVyYWxXaWR0aCIsImVsIiwicGFnZU1vdXNlUG9zaXRpb25YIiwiZXZlbnQiLCJsZWZ0T2Zmc2V0IiwiY2xpZW50WCIsImJvZHkiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJtb3VzZUxlZnRPZmZzZXQiLCJvZmZzZXRMZWZ0IiwiaW5uZXJIVE1MIiwic2Vla0JhciIsIm1vdXNlVGltZURpc3BsYXkiLCJhdHRyaWJ1dGVzIiwidmFsdWUiLCJwYWdlTW91c2VPZmZzZXRYIiwicGFnZVgiLCJjaGFuZ2VkVG91Y2hlcyIsImFjdGl2ZVRodW1ibmFpbCIsInByb2dyZXNCYXJSaWdodE9mZnNldCIsImdldFZpc2libGVXaWR0aCIsImhhbGZXaWR0aCIsImxlZnRWYWx1ZSIsImFjdGl2ZUNsaXAiLCJjbGlwTnVtYmVyIiwibWF4IiwiZ2V0VmlkZW9EdXJhdGlvbiIsImdldFNjcm9sbE9mZnNldCIsInByb2dyZXNCYXJQb3NpdGlvbiIsImdldFBhZ2VNb3VzZVBvc2l0aW9uWCIsImZpbmRNb3VzZUxlZnRPZmZzZXQiLCJnZXRNb3VzZVZpZGVvVGltZSIsImdldEFjdGl2ZVRodW1ibmFpbCIsInVwZGF0ZVRodW1ibmFpbFRpbWUiLCJ1cGRhdGVUaHVtYm5haWxTcmMiLCJ1cGRhdGVUaHVtYm5haWxTdHlsZSIsImtlZXBUaHVtYm5haWxJbnNpZGVQbGF5ZXIiLCJ1cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUiLCJtb3ZlTGlzdGVuZXIiLCJoaWRlVGh1bWJuYWlsIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLG1EQUEyQyxjQUFjOztBQUV6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLG1DQUEyQiwwQkFBMEIsRUFBRTtBQUN2RCx5Q0FBaUMsZUFBZTtBQUNo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ckI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDRDQUE0Qzs7QUFFNUM7Ozs7Ozs7QUNwQkEseUIiLCJmaWxlIjoid2VicGFjay50ZXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gaWRlbnRpdHkgZnVuY3Rpb24gZm9yIGNhbGxpbmcgaGFybW9ueSBpbXBvcnRzIHdpdGggdGhlIGNvcnJlY3QgY29udGV4dFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHtcbiBcdFx0XHRcdGNvbmZpZ3VyYWJsZTogZmFsc2UsXG4gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuIFx0XHRcdFx0Z2V0OiBnZXR0ZXJcbiBcdFx0XHR9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAyKTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyB3ZWJwYWNrL2Jvb3RzdHJhcCBlZWE5ZmU2NmRiYTlkYmUzNjQzNiIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi9+L2dsb2JhbC93aW5kb3cuanNcbi8vIG1vZHVsZSBpZCA9IDBcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiaW1wb3J0IHZpZGVvanMgZnJvbSAndmlkZW8uanMnO1xuaW1wb3J0IFRodW1ibmFpbEhlbHBlcnMgZnJvbSAnLi90aHVtYm5haWxfaGVscGVycy5qcyc7XG5pbXBvcnQge3dpbmRvd30gZnJvbSAnZ2xvYmFsJztcblxuLy8gRGVmYXVsdCBvcHRpb25zIGZvciB0aGUgcGx1Z2luLlxuY29uc3QgZGVmYXVsdHMgPSB7fTtcblxuLy8gQ3Jvc3MtY29tcGF0aWJpbGl0eSBmb3IgVmlkZW8uanMgNSBhbmQgNi5cbmNvbnN0IHJlZ2lzdGVyUGx1Z2luID0gdmlkZW9qcy5yZWdpc3RlclBsdWdpbiB8fCB2aWRlb2pzLnBsdWdpbjtcbi8vIGNvbnN0IGRvbSA9IHZpZGVvanMuZG9tIHx8IHZpZGVvanM7XG5cbi8qKlxuICogRnVuY3Rpb24gdG8gaW52b2tlIHdoZW4gdGhlIHBsYXllciBpcyByZWFkeS5cbiAqXG4gKiBUaGlzIGlzIGEgZ3JlYXQgcGxhY2UgZm9yIHlvdXIgcGx1Z2luIHRvIGluaXRpYWxpemUgaXRzZWxmLiBXaGVuIHRoaXNcbiAqIGZ1bmN0aW9uIGlzIGNhbGxlZCwgdGhlIHBsYXllciB3aWxsIGhhdmUgaXRzIERPTSBhbmQgY2hpbGQgY29tcG9uZW50c1xuICogaW4gcGxhY2UuXG4gKlxuICogQGZ1bmN0aW9uIG9uUGxheWVyUmVhZHlcbiAqIEBwYXJhbSAgICB7UGxheWVyfSBwbGF5ZXJcbiAqICAgICAgICAgICBBIFZpZGVvLmpzIHBsYXllci5cbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cbiAqL1xuXG5jb25zdCBwcmVwYXJlVGh1bWJuYWlsc0NsaXBzID0gKHZpZGVvVGltZSwgb3B0aW9ucykgPT4ge1xuXG4gIGxldCBjdXJyZW50VGltZSA9IDA7XG4gIGxldCBjdXJyZW50SXRlcmF0aW9uID0gMDtcbiAgbGV0IHRodW1ibmFpbE9mZnNldCA9IDA7XG4gIGNvbnN0IHN0ZXBUaW1lID0gb3B0aW9ucy5zdGVwVGltZTtcbiAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSBvcHRpb25zLndpZHRoO1xuICBjb25zdCB0aHVtYnNQZXJJbWFnZSA9IG9wdGlvbnMucGVySW1hZ2U7XG4gIGNvbnN0IHNwcml0ZVVSTCA9IG9wdGlvbnMuc3ByaXRlVXJsLnJlcGxhY2UoJyVkJywgMSk7XG4gIGNvbnN0IHRodW1ibmFpbENsaXBzID0ge1xuICAgIDA6IHtcbiAgICAgIHNyYzogc3ByaXRlVVJMLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgbGVmdDogKHRodW1ibmFpbFdpZHRoIC8gMiAqIC0xKSArICdweCcsXG4gICAgICAgIHdpZHRoOiAodGh1bWJzUGVySW1hZ2UgKiB0aHVtYm5haWxXaWR0aCkgKyAncHgnLFxuICAgICAgICBjbGlwOiAncmVjdCgwLCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCAwKSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHZpZGVvVGltZSkge1xuICAgIGN1cnJlbnRUaW1lICs9IHN0ZXBUaW1lO1xuICAgIHRodW1ibmFpbE9mZnNldCA9ICsrY3VycmVudEl0ZXJhdGlvbiAqIHRodW1ibmFpbFdpZHRoO1xuICAgIGNvbnN0IHNwcml0ZU51bSA9IE1hdGguZmxvb3IoY3VycmVudFRpbWUgLyAob3B0aW9ucy5zdGVwVGltZSAqIHRodW1ic1BlckltYWdlKSkgKyAxO1xuICAgIGNvbnN0IHNwcml0ZVVSTCA9IG9wdGlvbnMuc3ByaXRlVXJsLnJlcGxhY2UoJyVkJywgc3ByaXRlTnVtKTtcbiAgICB0aHVtYm5haWxDbGlwc1tjdXJyZW50VGltZV0gPSB7XG4gICAgICBzcmM6IHNwcml0ZVVSTCxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGxlZnQ6ICgodGh1bWJuYWlsV2lkdGggLyAyICsgdGh1bWJuYWlsT2Zmc2V0KSAqIC0xKSArICdweCcsXG4gICAgICAgIGNsaXA6ICdyZWN0KDAsICcgKyAodGh1bWJuYWlsV2lkdGggKyB0aHVtYm5haWxPZmZzZXQpICsgJ3B4LCcgK1xuICAgICAgICAgICAgICBvcHRpb25zLndpZHRoICsgJ3B4LCAnICsgdGh1bWJuYWlsT2Zmc2V0ICsgJ3B4KSdcbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIHJldHVybiB0aHVtYm5haWxDbGlwcztcbn07XG5cbmNvbnN0IGluaXRpYWxpemVUaHVtYm5haWxzID0gKHRodW1ibmFpbHNDbGlwcywgcGxheWVyKSA9PiB7XG5cbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHMoe30sIGRlZmF1bHRzLCB0aHVtYm5haWxzQ2xpcHMpO1xuICBjb25zdCBwcm9ncmVzc0NvbnRyb2wgPSBwbGF5ZXIuY29udHJvbEJhci5wcm9ncmVzc0NvbnRyb2w7XG4gIGNvbnN0IHRodW1ibmFpbEltZyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKTtcbiAgY29uc3QgdGltZWxpbmVUaW1lID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxUaW1lKCk7XG4gIGNvbnN0IHRodW1ibmFpbEFycm93RG93biA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duKCk7XG4gIGxldCB0aHVtYm5haXNsSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haXNsSG9sZGVyKCk7XG5cbiAgdGh1bWJuYWlzbEhvbGRlciA9IFRodW1ibmFpbEhlbHBlcnMubWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haXNsSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKTtcbiAgVGh1bWJuYWlsSGVscGVycy5oaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKTtcblxuICBpZiAod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgVGh1bWJuYWlsSGVscGVycy5zdXBwb3J0QW5kcm9pZEV2ZW50cygpO1xuICB9XG5cbiAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWycwJ10uc3R5bGUpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuYWRkVGh1bWJuYWlsVG9QbGF5ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpc2xIb2xkZXIpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlzbEhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG5cbiAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haXNsSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG59O1xuXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xuICBwbGF5ZXIub24oJ2xvYWRlZG1ldGFkYXRhJywgKCgpID0+IHtcbiAgICBjb25zdCB0aHVtYm5haWxzQ2xpcHMgPSBwcmVwYXJlVGh1bWJuYWlsc0NsaXBzKHBsYXllci5kdXJhdGlvbigpLCBvcHRpb25zKTtcblxuICAgIGluaXRpYWxpemVUaHVtYm5haWxzKHRodW1ibmFpbHNDbGlwcywgcGxheWVyKTtcbiAgfSkpO1xufTtcbi8qKlxuICogQSB2aWRlby5qcyBwbHVnaW4uXG4gKlxuICogSW4gdGhlIHBsdWdpbiBmdW5jdGlvbiwgdGhlIHZhbHVlIG9mIGB0aGlzYCBpcyBhIHZpZGVvLmpzIGBQbGF5ZXJgXG4gKiBpbnN0YW5jZS4gWW91IGNhbm5vdCByZWx5IG9uIHRoZSBwbGF5ZXIgYmVpbmcgaW4gYSBcInJlYWR5XCIgc3RhdGUgaGVyZSxcbiAqIGRlcGVuZGluZyBvbiBob3cgdGhlIHBsdWdpbiBpcyBpbnZva2VkLiBUaGlzIG1heSBvciBtYXkgbm90IGJlIGltcG9ydGFudFxuICogdG8geW91OyBpZiBub3QsIHJlbW92ZSB0aGUgd2FpdCBmb3IgXCJyZWFkeVwiIVxuICpcbiAqIEBmdW5jdGlvbiB0aHVtYm5haWxzXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXG4gKiAgICAgICAgICAgQW4gb2JqZWN0IG9mIG9wdGlvbnMgbGVmdCB0byB0aGUgcGx1Z2luIGF1dGhvciB0byBkZWZpbmUuXG4gKi9cbmNvbnN0IHRodW1ibmFpbHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMucmVhZHkoKCkgPT4ge1xuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcbiAgfSk7XG59O1xuXG4vLyBSZWdpc3RlciB0aGUgcGx1Z2luIHdpdGggdmlkZW8uanMuXG5yZWdpc3RlclBsdWdpbigndGh1bWJuYWlscycsIHRodW1ibmFpbHMpO1xuXG4vLyBJbmNsdWRlIHRoZSB2ZXJzaW9uIG51bWJlci5cbnRodW1ibmFpbHMuVkVSU0lPTiA9ICdfX1ZFUlNJT05fXyc7XG5cbmV4cG9ydCBkZWZhdWx0IHRodW1ibmFpbHM7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9zcmMvanMvaW5kZXguanMiLCIvKipcbiAqIHdlYnBhY2sgdGVzdCBcbiAqL1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vc3JjL2pzL2luZGV4LmpzXCI7XG5cblFVbml0Lm1vZHVsZShcIndlYnBhY2sgcmVxdWlyZVwiKTtcblFVbml0LnRlc3QoXCJ2aWRlb2pzLXRodW1ibmFpbHMgc2hvdWxkIGJlIHJlcXVpcmVhYmxlIHZpYSB3ZWJwYWNrXCIsIChhc3NlcnQpID0+IHtcbiAgYXNzZXJ0Lm9rKHBrZywgXCJ2aWRlb2pzLXRodW1ibmFpbHMgaXMgcmVxdWlyZWQgcHJvcGVybHlcIik7XG59KTtcblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9idWlsZC90ZXN0L3dlYnBhY2suc3RhcnQuanMiLCJpbXBvcnQge2RvY3VtZW50LCB3aW5kb3d9IGZyb20gJ2dsb2JhbCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFRodW1ibmFpbEhlbHBlcnMge1xuXG4gIHN0YXRpYyBoaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKSB7XG4gICAgY29uc3QgbW91c2VUaW1lID0gcHJvZ3Jlc3NDb250cm9sLmVsXy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtbW91c2UtZGlzcGxheScpWzBdO1xuXG4gICAgbW91c2VUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlscyguLi5hcmdzKSB7XG4gICAgY29uc3QgdGh1bWJuYWlsQ2xpcCA9IGFyZ3Muc2hpZnQoKSB8fCB7fTtcblxuICAgIE9iamVjdC5rZXlzKGFyZ3MpLm1hcCgoaSkgPT4ge1xuICAgICAgY29uc3Qgc2luZ2xlVGh1bWJuYWlsID0gYXJnc1tpXTtcblxuICAgICAgT2JqZWN0LmtleXMoc2luZ2xlVGh1bWJuYWlsKS5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGlmIChzaW5nbGVUaHVtYm5haWwuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHModGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pIHtcbiAgICByZXR1cm4gKHByb3ApID0+IHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKVtwcm9wXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aHVtYm5haWxDb250ZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldFZpc2libGVXaWR0aCh0aHVtYm5haWxDb250ZW50LCB3aWR0aCkge1xuICAgIGlmICh3aWR0aCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQod2lkdGgpO1xuICAgIH1cblxuICAgIGxldCBjbGlwID0gVGh1bWJuYWlsSGVscGVycy5nZXRDb21wdXRlZFN0eWxlKHRodW1ibmFpbENvbnRlbnQpKCdjbGlwJyk7XG5cbiAgICBpZiAoY2xpcCAhPT0gJ2F1dG8nICYmIGNsaXAgIT09ICdpbmhlcml0Jykge1xuICAgICAgY2xpcCA9IGNsaXAuc3BsaXQoLyg/OlxcKHxcXCkpLylbMV0uc3BsaXQoLyg/Oix8ICkvKTtcbiAgICAgIGlmIChjbGlwLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gKHBhcnNlRmxvYXQoY2xpcFsxXSkgLSBwYXJzZUZsb2F0KGNsaXBbM10pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2Nyb2xsT2Zmc2V0KCkge1xuICAgIGlmICh3aW5kb3cucGFnZVhPZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IHdpbmRvdy5wYWdlWE9mZnNldCxcbiAgICAgICAgeTogd2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeDogZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICB5OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBzdXBwb3J0QW5kcm9pZEV2ZW50cyhwbGF5ZXIpIHtcbiAgICAvLyBBbmRyb2lkIGRvZXNuJ3Qgc3VwcG9ydCA6YWN0aXZlIGFuZCA6aG92ZXIgb24gbm9uLWFuY2hvciBhbmQgbm9uLWJ1dHRvbiBlbGVtZW50c1xuICAgIC8vIHNvLCB3ZSBuZWVkIHRvIGZha2UgdGhlIDphY3RpdmUgc2VsZWN0b3IgZm9yIHRodW1ibmFpbHMgdG8gc2hvdyB1cC5cbiAgICBjb25zdCBwcm9ncmVzc0NvbnRyb2wgPSBwbGF5ZXIuY29udHJvbEJhci5wcm9ncmVzc0NvbnRyb2w7XG5cbiAgICBjb25zdCBhZGRGYWtlQWN0aXZlID0gKCkgPT4ge1xuICAgICAgcHJvZ3Jlc3NDb250cm9sLmFkZENsYXNzKCdmYWtlLWFjdGl2ZScpO1xuICAgIH07XG5cbiAgICBjb25zdCByZW1vdmVGYWtlQWN0aXZlID0gKCkgPT4ge1xuICAgICAgcHJvZ3Jlc3NDb250cm9sLnJlbW92ZUNsYXNzKCdmYWtlLWFjdGl2ZScpO1xuICAgIH07XG5cbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoc3RhcnQnLCBhZGRGYWtlQWN0aXZlKTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGNhbmNlbCcsIHJlbW92ZUZha2VBY3RpdmUpO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpc2xIb2xkZXIoKSB7XG4gICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgd3JhcC5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1ob2xkZXInO1xuICAgIHJldHVybiB3cmFwO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcykge1xuICAgIGNvbnN0IHRodW1ibmFpbEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgdGh1bWJuYWlsSW1nLnNyYyA9IHRodW1ibmFpbENsaXBzWycwJ10uc3JjO1xuICAgIHRodW1ibmFpbEltZy5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1pbWcnO1xuICAgIHJldHVybiB0aHVtYm5haWxJbWc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsVGltZSgpIHtcbiAgICBjb25zdCB0aW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB0aW1lLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLXRpbWUnO1xuICAgIHRpbWUuaWQgPSAndmpzLXRpbWUnO1xuICAgIHJldHVybiB0aW1lO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpIHtcbiAgICBjb25zdCBhcnJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYXJyb3cuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtYXJyb3cnO1xuICAgIGFycm93LmlkID0gJ3Zqcy1hcnJvdyc7XG4gICAgcmV0dXJuIGFycm93O1xuICB9XG5cbiAgc3RhdGljIG1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bikge1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xuICAgIHRodW1ibmFpbHNIb2xkZXIuYXBwZW5kQ2hpbGQodGltZWxpbmVUaW1lKTtcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEFycm93RG93bik7XG4gICAgcmV0dXJuIHRodW1ibmFpbHNIb2xkZXI7XG4gIH1cblxuICBzdGF0aWMgY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpIHtcbiAgICAvLyBjZW50ZXIgdGhlIHRodW1ibmFpbCBvdmVyIHRoZSBjdXJzb3IgaWYgYW4gb2Zmc2V0IHdhc24ndCBwcm92aWRlZFxuICAgIGlmICghdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgJiYgIXRodW1ibmFpbEltZy5zdHlsZS5yaWdodCkge1xuICAgICAgdGh1bWJuYWlsSW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSB7IHdpZHRoOiAtKHRodW1ibmFpbEltZy5uYXR1cmFsV2lkdGggLyAyKSB9O1xuXG4gICAgICAgIHRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ID0gYCR7dGh1bWJuYWlsV2lkdGh9cHhgO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpIHtcbiAgICBsZXQgZHVyYXRpb24gPSBwbGF5ZXIuZHVyYXRpb24oKTtcblxuICAgIHBsYXllci5vbignZHVyYXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBwcm9ncmVzc0NvbnRyb2wuZWwoKS5hcHBlbmRDaGlsZCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCwgcHJvZ3Jlc3NDb250cm9sLCBwYWdlWE9mZnNldCwgZXZlbnQpIHtcbiAgICAvLyBmaW5kIHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgbW91c2VcbiAgICBsZXQgbGVmdE9mZnNldCA9IHBhZ2VNb3VzZVBvc2l0aW9uWCB8fCAoZXZlbnQuY2xpZW50WCArXG4gICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgKyBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCk7XG5cbiAgICAvLyBzdWJ0cmFjdCB0aGUgcGFnZSBvZmZzZXQgb2YgdGhlIHBvc2l0aW9uZWQgb2Zmc2V0IHBhcmVudFxuICAgIGxlZnRPZmZzZXQgLT0gcHJvZ3Jlc3NDb250cm9sLmVsKCkuXG4gICAgICAgICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0ICsgcGFnZVhPZmZzZXQ7XG4gICAgcmV0dXJuIGxlZnRPZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LCBwcm9ncmVzc0NvbnRyb2wsIGR1cmF0aW9uKSB7XG4gICAgcmV0dXJuIE1hdGguZmxvb3IoKG1vdXNlTGVmdE9mZnNldCAtIHByb2dyZXNzQ29udHJvbC5lbCgpLm9mZnNldExlZnQpIC9cbiAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLndpZHRoKCkgKiBkdXJhdGlvbik7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCkge1xuICAgIHRpbWVsaW5lVGltZS5pbm5lckhUTUwgPSAocHJvZ3Jlc3NDb250cm9sLnNlZWtCYXIubW91c2VUaW1lRGlzcGxheS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxfLmF0dHJpYnV0ZXNbJ2RhdGEtY3VycmVudC10aW1lJ10udmFsdWUpO1xuICB9XG5cbiAgc3RhdGljIGdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCkge1xuICAgIGxldCBwYWdlTW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVg7XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VNb3VzZU9mZnNldFg7XG4gIH1cblxuICBzdGF0aWMga2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KSB7XG5cbiAgICBjb25zdCB3aWR0aCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbEltZywgYWN0aXZlVGh1bWJuYWlsLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwc1swXS53aWR0aCk7XG5cbiAgICBjb25zdCBoYWxmV2lkdGggPSB3aWR0aCAvIDI7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgdGh1bWJuYWlsIGRvZXNuJ3QgZmFsbCBvZmYgdGhlIHJpZ2h0IHNpZGUgb2ZcbiAgICAvLyB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbGF5ZXJcbiAgICBpZiAoKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgPiBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcbiAgICAgIG1vdXNlTGVmdE9mZnNldCAtPSAobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSAtIHByb2dyZXNCYXJSaWdodE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKG1vdXNlTGVmdE9mZnNldCA8IGhhbGZXaWR0aCkge1xuICAgICAgbW91c2VMZWZ0T2Zmc2V0ID0gaGFsZldpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gbW91c2VMZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBjb25zdCBsZWZ0VmFsdWUgPSB7IG1vdXNlTGVmdE9mZnNldCB9O1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFZhbHVlLm1vdXNlTGVmdE9mZnNldH1weGA7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLCBtb3VzZVRpbWUpIHtcbiAgICBsZXQgYWN0aXZlQ2xpcCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGNsaXBOdW1iZXIgaW4gdGh1bWJuYWlsQ2xpcHMpIHtcbiAgICAgIGlmIChtb3VzZVRpbWUgPiBjbGlwTnVtYmVyKSB7XG4gICAgICAgIGFjdGl2ZUNsaXAgPSBNYXRoLm1heChhY3RpdmVDbGlwLCBjbGlwTnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXBzW2FjdGl2ZUNsaXBdO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3JjICYmIHRodW1ibmFpbEltZy5zcmMgIT09IGFjdGl2ZVRodW1ibmFpbC5zcmMpIHtcbiAgICAgIHRodW1ibmFpbEltZy5zcmMgPSBhY3RpdmVUaHVtYm5haWwuc3JjO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTdHlsZShhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3R5bGUgJiYgdGh1bWJuYWlsSW1nLnN0eWxlICE9PSBhY3RpdmVUaHVtYm5haWwuc3R5bGUpIHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsIGFjdGl2ZVRodW1ibmFpbC5zdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgIHBsYXllcikge1xuXG4gICAgY29uc3QgZHVyYXRpb24gPSBUaHVtYm5haWxIZWxwZXJzLmdldFZpZGVvRHVyYXRpb24ocGxheWVyKTtcbiAgICBjb25zdCBwYWdlWE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0U2Nyb2xsT2Zmc2V0KCkueDtcbiAgICBjb25zdCBwcm9ncmVzQmFyUG9zaXRpb24gPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBnZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcblxuICAgIGNvbnN0IHByb2dyZXNCYXJSaWdodE9mZnNldCA9IChwcm9ncmVzQmFyUG9zaXRpb24ud2lkdGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclBvc2l0aW9uLnJpZ2h0KSArXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0O1xuXG4gICAgY29uc3QgcGFnZU1vdXNlUG9zaXRpb25YID0gVGh1bWJuYWlsSGVscGVycy5nZXRQYWdlTW91c2VQb3NpdGlvblgoZXZlbnQpO1xuXG4gICAgbGV0IG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZmluZE1vdXNlTGVmdE9mZnNldChwYWdlTW91c2VQb3NpdGlvblgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZW50KTtcblxuICAgIGNvbnN0IG1vdXNlVGltZSA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0TW91c2VWaWRlb1RpbWUobW91c2VMZWZ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHVyYXRpb24pO1xuXG4gICAgY29uc3QgYWN0aXZlVGh1bWJuYWlsID0gVGh1bWJuYWlsSGVscGVycy5nZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VUaW1lKTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZyk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcblxuICAgIG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMua2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYm5haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNCYXJSaWdodE9mZnNldCk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9uSG92ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgIHBsYXllcikge1xuXG4gICAgLy8gdXBkYXRlIHRoZSB0aHVtYm5haWwgd2hpbGUgaG92ZXJpbmdcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xuICAgIH0pO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLm1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKSB7XG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9uSG92ZXJPdXQocHJvZ3Jlc3NDb250cm9sLCB0aHVtYm5haWxzSG9sZGVyLCBwbGF5ZXIpIHtcblxuICAgIC8vIG1vdmUgdGhlIHBsYWNlaG9sZGVyIG91dCBvZiB0aGUgd2F5IHdoZW4gbm90IGhvdmVyaW5nXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCdtb3VzZW91dCcsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hjYW5jZWwnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gICAgcGxheWVyLm9uKCd1c2VyaW5hY3RpdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vc3JjL2pzL3RodW1ibmFpbF9oZWxwZXJzLmpzIiwidmFyIGc7XHJcblxyXG4vLyBUaGlzIHdvcmtzIGluIG5vbi1zdHJpY3QgbW9kZVxyXG5nID0gKGZ1bmN0aW9uKCkge1xyXG5cdHJldHVybiB0aGlzO1xyXG59KSgpO1xyXG5cclxudHJ5IHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIGV2YWwgaXMgYWxsb3dlZCAoc2VlIENTUClcclxuXHRnID0gZyB8fCBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCkgfHwgKDEsZXZhbCkoXCJ0aGlzXCIpO1xyXG59IGNhdGNoKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmKHR5cGVvZiB3aW5kb3cgPT09IFwib2JqZWN0XCIpXHJcblx0XHRnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuXG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gKHdlYnBhY2spL2J1aWxkaW4vZ2xvYmFsLmpzXG4vLyBtb2R1bGUgaWQgPSA0XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsIm1vZHVsZS5leHBvcnRzID0gdmlkZW9qcztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyBleHRlcm5hbCBcInZpZGVvanNcIlxuLy8gbW9kdWxlIGlkID0gNVxuLy8gbW9kdWxlIGNodW5rcyA9IDAiXSwic291cmNlUm9vdCI6IiJ9