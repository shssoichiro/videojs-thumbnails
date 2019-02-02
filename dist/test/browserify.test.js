(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _index = require(3);

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

QUnit.module("browserify require"); /**
                                     * browserify test 
                                     */

QUnit.test("videojs-thumbnails should be requireable via browserify", function (assert) {
  assert.ok(_index2.default, "videojs-thumbnails is required properly");
});

},{"3":3}],2:[function(require,module,exports){
(function (global){
var win;

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

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],3:[function(require,module,exports){
(function (global){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

var _thumbnail_helpers = require(4);

var _thumbnail_helpers2 = _interopRequireDefault(_thumbnail_helpers);

var _global = require(2);

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
thumbnails.VERSION = '1.0.2';

exports.default = thumbnails;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"2":2,"4":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _global = require(2);

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

},{"2":2}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L3Rlc3QvYnJvd3NlcmlmeS5zdGFydC5qcyIsIm5vZGVfbW9kdWxlcy9nbG9iYWwvd2luZG93LmpzIiwic3JjL2pzL2luZGV4LmpzIiwic3JjL2pzL3RodW1ibmFpbF9oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUNHQTs7Ozs7O0FBRUEsTUFBTSxNQUFOLENBQWEsb0JBQWIsRSxDQUxBOzs7O0FBTUEsTUFBTSxJQUFOLENBQVcseURBQVgsRUFBc0UsVUFBQyxNQUFELEVBQVk7QUFDaEYsU0FBTyxFQUFQLENBQVUsZUFBVixFQUFlLHlDQUFmO0FBQ0QsQ0FGRDs7OztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDYkE7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7QUFDQSxJQUFNLFdBQVcsRUFBakI7O0FBRUE7QUFDQSxJQUFNLGlCQUFpQixnQkFBUSxjQUFSLElBQTBCLGdCQUFRLE1BQXpEO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7O0FBY0EsSUFBTSx5QkFBeUIsU0FBekIsc0JBQXlCLENBQUMsU0FBRCxFQUFZLE9BQVosRUFBd0I7O0FBRXJELE1BQUksY0FBYyxDQUFsQjtBQUNBLE1BQUksbUJBQW1CLENBQXZCO0FBQ0EsTUFBSSxrQkFBa0IsQ0FBdEI7QUFDQSxNQUFNLFdBQVcsUUFBUSxRQUF6QjtBQUNBLE1BQU0saUJBQWlCLFFBQVEsS0FBL0I7QUFDQSxNQUFNLGlCQUFpQixRQUFRLFFBQS9CO0FBQ0EsTUFBTSxtQkFBbUIsUUFBUSxTQUFSLENBQWtCLE9BQWxCLENBQTBCLElBQTFCLEVBQWdDLENBQWhDLENBQXpCO0FBQ0EsTUFBTSxpQkFBaUI7QUFDckIsT0FBRztBQUNELFdBQUssZ0JBREo7QUFFRCxhQUFPO0FBQ0wsY0FBTyxpQkFB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Qyx5QkFBaUIsYUFBakIsQ0FBK0IsZ0JBQS9CO0FBQ0QsT0FGRDtBQUdEOzs7cUNBRXVCLEksRUFBTTtBQUM1QixVQUFNLFFBQVEsS0FBSyxLQUFMLENBQVcsR0FBWCxDQUFkO0FBQ0EsVUFBSSxVQUFVLENBQWQ7QUFDQSxVQUFJLFNBQVMsQ0FBYjs7QUFFQSxhQUFPLElBQVAsRUFBYTtBQUNYLFlBQUksTUFBTSxNQUFOLEtBQWlCLENBQXJCLEVBQXdCO0FBQ3RCO0FBQ0Q7O0FBRUQsWUFBTSxPQUFPLE1BQU0sR0FBTixFQUFiOztBQUVBLG1CQUFXLE9BQU8sTUFBbEI7QUFDQSxrQkFBVSxFQUFWO0FBQ0Q7QUFDRCxhQUFPLE9BQVA7QUFDRDs7Ozs7O2tCQWhWa0IsZ0IiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCIvKipcbiAqIGJyb3dzZXJpZnkgdGVzdCBcbiAqL1xuaW1wb3J0IHBrZyBmcm9tIFwiLi4vLi4vc3JjL2pzL2luZGV4LmpzXCI7XG5cblFVbml0Lm1vZHVsZShcImJyb3dzZXJpZnkgcmVxdWlyZVwiKTtcblFVbml0LnRlc3QoXCJ2aWRlb2pzLXRodW1ibmFpbHMgc2hvdWxkIGJlIHJlcXVpcmVhYmxlIHZpYSBicm93c2VyaWZ5XCIsIChhc3NlcnQpID0+IHtcbiAgYXNzZXJ0Lm9rKHBrZywgXCJ2aWRlb2pzLXRodW1ibmFpbHMgaXMgcmVxdWlyZWQgcHJvcGVybHlcIik7XG59KTsiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsImltcG9ydCB2aWRlb2pzIGZyb20gJ3ZpZGVvLmpzJztcbmltcG9ydCBUaHVtYm5haWxIZWxwZXJzIGZyb20gJy4vdGh1bWJuYWlsX2hlbHBlcnMuanMnO1xuaW1wb3J0IHt3aW5kb3d9IGZyb20gJ2dsb2JhbCc7XG5cbi8vIERlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbmNvbnN0IGRlZmF1bHRzID0ge307XG5cbi8vIENyb3NzLWNvbXBhdGliaWxpdHkgZm9yIFZpZGVvLmpzIDUgYW5kIDYuXG5jb25zdCByZWdpc3RlclBsdWdpbiA9IHZpZGVvanMucmVnaXN0ZXJQbHVnaW4gfHwgdmlkZW9qcy5wbHVnaW47XG4vLyBjb25zdCBkb20gPSB2aWRlb2pzLmRvbSB8fCB2aWRlb2pzO1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHkuXG4gKlxuICogVGhpcyBpcyBhIGdyZWF0IHBsYWNlIGZvciB5b3VyIHBsdWdpbiB0byBpbml0aWFsaXplIGl0c2VsZi4gV2hlbiB0aGlzXG4gKiBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSBwbGF5ZXIgd2lsbCBoYXZlIGl0cyBET00gYW5kIGNoaWxkIGNvbXBvbmVudHNcbiAqIGluIHBsYWNlLlxuICpcbiAqIEBmdW5jdGlvbiBvblBsYXllclJlYWR5XG4gKiBAcGFyYW0gICAge1BsYXllcn0gcGxheWVyXG4gKiAgICAgICAgICAgQSBWaWRlby5qcyBwbGF5ZXIuXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXG4gKiAgICAgICAgICAgQW4gb2JqZWN0IG9mIG9wdGlvbnMgbGVmdCB0byB0aGUgcGx1Z2luIGF1dGhvciB0byBkZWZpbmUuXG4gKi9cblxuY29uc3QgcHJlcGFyZVRodW1ibmFpbHNDbGlwcyA9ICh2aWRlb1RpbWUsIG9wdGlvbnMpID0+IHtcblxuICBsZXQgY3VycmVudFRpbWUgPSAwO1xuICBsZXQgY3VycmVudEl0ZXJhdGlvbiA9IDA7XG4gIGxldCB0aHVtYm5haWxPZmZzZXQgPSAwO1xuICBjb25zdCBzdGVwVGltZSA9IG9wdGlvbnMuc3RlcFRpbWU7XG4gIGNvbnN0IHRodW1ibmFpbFdpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgY29uc3QgdGh1bWJzUGVySW1hZ2UgPSBvcHRpb25zLnBlckltYWdlO1xuICBjb25zdCBpbml0aWFsU3ByaXRlVXJsID0gb3B0aW9ucy5zcHJpdGVVcmwucmVwbGFjZSgnJWQnLCAxKTtcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSB7XG4gICAgMDoge1xuICAgICAgc3JjOiBpbml0aWFsU3ByaXRlVXJsLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgbGVmdDogKHRodW1ibmFpbFdpZHRoIC8gMiAqIC0xKSArICdweCcsXG4gICAgICAgIHdpZHRoOiAodGh1bWJzUGVySW1hZ2UgKiB0aHVtYm5haWxXaWR0aCkgKyAncHgnLFxuICAgICAgICBjbGlwOiAncmVjdCgwLCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCAwKSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHZpZGVvVGltZSkge1xuICAgIGN1cnJlbnRUaW1lICs9IHN0ZXBUaW1lO1xuICAgIHRodW1ibmFpbE9mZnNldCA9ICgrK2N1cnJlbnRJdGVyYXRpb24gJSB0aHVtYnNQZXJJbWFnZSkgKiB0aHVtYm5haWxXaWR0aDtcbiAgICBjb25zdCBzcHJpdGVOdW0gPSBNYXRoLmZsb29yKGN1cnJlbnRUaW1lIC8gKHN0ZXBUaW1lICogdGh1bWJzUGVySW1hZ2UpKSArIDE7XG4gICAgY29uc3Qgc3ByaXRlVVJMID0gb3B0aW9ucy5zcHJpdGVVcmwucmVwbGFjZSgnJWQnLCBzcHJpdGVOdW0pO1xuXG4gICAgdGh1bWJuYWlsQ2xpcHNbY3VycmVudFRpbWVdID0ge1xuICAgICAgc3JjOiBzcHJpdGVVUkwsXG4gICAgICBzdHlsZToge1xuICAgICAgICBsZWZ0OiAoKHRodW1ibmFpbFdpZHRoIC8gMiArIHRodW1ibmFpbE9mZnNldCkgKiAtMSkgKyAncHgnLFxuICAgICAgICBjbGlwOiAncmVjdCgwLCAnICsgKHRodW1ibmFpbFdpZHRoICsgdGh1bWJuYWlsT2Zmc2V0KSArICdweCwnICtcbiAgICAgICAgICAgICAgb3B0aW9ucy53aWR0aCArICdweCwgJyArIHRodW1ibmFpbE9mZnNldCArICdweCknXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gdGh1bWJuYWlsQ2xpcHM7XG59O1xuXG5jb25zdCBpbml0aWFsaXplVGh1bWJuYWlscyA9IChwbGF5ZXIsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdGh1bWJuYWlsc0NsaXBzID0gcHJlcGFyZVRodW1ibmFpbHNDbGlwcyhwbGF5ZXIuZHVyYXRpb24oKSwgb3B0aW9ucyk7XG4gIGNvbnN0IHRodW1ibmFpbENsaXBzID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHt9LCBkZWZhdWx0cywgdGh1bWJuYWlsc0NsaXBzKTtcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xuICBjb25zdCB0aHVtYm5haWxJbWcgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcyk7XG4gIGNvbnN0IHRpbWVsaW5lVGltZSA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsVGltZSgpO1xuICBjb25zdCB0aHVtYm5haWxBcnJvd0Rvd24gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpO1xuICBsZXQgdGh1bWJuYWlsc0hvbGRlciA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpO1xuXG4gIHRodW1ibmFpbHNIb2xkZXIgPSBUaHVtYm5haWxIZWxwZXJzLm1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bik7XG4gIFRodW1ibmFpbEhlbHBlcnMuaGlkZVBsYXllck9uSG92ZXJUaW1lKHByb2dyZXNzQ29udHJvbCk7XG5cbiAgaWYgKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LnRvTG93ZXJDYXNlKCkuaW5kZXhPZignYW5kcm9pZCcpICE9PSAtMSkge1xuICAgIFRodW1ibmFpbEhlbHBlcnMuc3VwcG9ydEFuZHJvaWRFdmVudHMoKTtcbiAgfVxuXG4gIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwc1snMCddLnN0eWxlKTtcblxuICBUaHVtYm5haWxIZWxwZXJzLmNlbnRlclRodW1ibmFpbE92ZXJDdXJzb3IodGh1bWJuYWlsSW1nKTtcblxuICBUaHVtYm5haWxIZWxwZXJzLmFkZFRodW1ibmFpbFRvUGxheWVyKHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyKTtcblxuICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZU9uSG92ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlT25Ib3Zlck91dChwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xufTtcblxuY29uc3Qgb25QbGF5ZXJSZWFkeSA9IChwbGF5ZXIsIG9wdGlvbnMpID0+IHtcbiAgaWYgKHBsYXllci5kdXJhdGlvbigpKSB7XG4gICAgaW5pdGlhbGl6ZVRodW1ibmFpbHMocGxheWVyLCBvcHRpb25zKTtcbiAgfVxuICBwbGF5ZXIub24oJ2xvYWRlZG1ldGFkYXRhJywgKCgpID0+IHtcbiAgICBpbml0aWFsaXplVGh1bWJuYWlscyhwbGF5ZXIsIG9wdGlvbnMpO1xuICB9KSk7XG59O1xuLyoqXG4gKiBBIHZpZGVvLmpzIHBsdWdpbi5cbiAqXG4gKiBJbiB0aGUgcGx1Z2luIGZ1bmN0aW9uLCB0aGUgdmFsdWUgb2YgYHRoaXNgIGlzIGEgdmlkZW8uanMgYFBsYXllcmBcbiAqIGluc3RhbmNlLiBZb3UgY2Fubm90IHJlbHkgb24gdGhlIHBsYXllciBiZWluZyBpbiBhIFwicmVhZHlcIiBzdGF0ZSBoZXJlLFxuICogZGVwZW5kaW5nIG9uIGhvdyB0aGUgcGx1Z2luIGlzIGludm9rZWQuIFRoaXMgbWF5IG9yIG1heSBub3QgYmUgaW1wb3J0YW50XG4gKiB0byB5b3U7IGlmIG5vdCwgcmVtb3ZlIHRoZSB3YWl0IGZvciBcInJlYWR5XCIhXG4gKlxuICogQGZ1bmN0aW9uIHRodW1ibmFpbHNcbiAqIEBwYXJhbSAgICB7T2JqZWN0fSBbb3B0aW9ucz17fV1cbiAqICAgICAgICAgICBBbiBvYmplY3Qgb2Ygb3B0aW9ucyBsZWZ0IHRvIHRoZSBwbHVnaW4gYXV0aG9yIHRvIGRlZmluZS5cbiAqL1xuY29uc3QgdGh1bWJuYWlscyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgdGhpcy5yZWFkeSgoKSA9PiB7XG4gICAgb25QbGF5ZXJSZWFkeSh0aGlzLCB2aWRlb2pzLm1lcmdlT3B0aW9ucyhkZWZhdWx0cywgb3B0aW9ucykpO1xuICB9KTtcbn07XG5cbi8vIFJlZ2lzdGVyIHRoZSBwbHVnaW4gd2l0aCB2aWRlby5qcy5cbnJlZ2lzdGVyUGx1Z2luKCd0aHVtYm5haWxzJywgdGh1bWJuYWlscyk7XG5cbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxudGh1bWJuYWlscy5WRVJTSU9OID0gJ19fVkVSU0lPTl9fJztcblxuZXhwb3J0IGRlZmF1bHQgdGh1bWJuYWlscztcbiIsImltcG9ydCB7ZG9jdW1lbnQsIHdpbmRvd30gZnJvbSAnZ2xvYmFsJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVGh1bWJuYWlsSGVscGVycyB7XG5cbiAgc3RhdGljIGhpZGVQbGF5ZXJPbkhvdmVyVGltZShwcm9ncmVzc0NvbnRyb2wpIHtcbiAgICBjb25zdCBtb3VzZVRpbWUgPSBwcm9ncmVzc0NvbnRyb2wuZWxfLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Zqcy1tb3VzZS1kaXNwbGF5JylbMF07XG5cbiAgICBtb3VzZVRpbWUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxzKC4uLmFyZ3MpIHtcbiAgICBjb25zdCB0aHVtYm5haWxDbGlwID0gYXJncy5zaGlmdCgpIHx8IHt9O1xuXG4gICAgT2JqZWN0LmtleXMoYXJncykubWFwKChpKSA9PiB7XG4gICAgICBjb25zdCBzaW5nbGVUaHVtYm5haWwgPSBhcmdzW2ldO1xuXG4gICAgICBPYmplY3Qua2V5cyhzaW5nbGVUaHVtYm5haWwpLm1hcCgocHJvcGVydHkpID0+IHtcbiAgICAgICAgaWYgKHNpbmdsZVRodW1ibmFpbC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aHVtYm5haWxDbGlwW3Byb3BlcnR5XSA9IHNpbmdsZVRodW1ibmFpbFtwcm9wZXJ0eV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcbiAgICB9KTtcbiAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDb21wdXRlZFN0eWxlKHRodW1ibmFpbENvbnRlbnQsIHBzZXVkbykge1xuICAgIHJldHVybiAocHJvcCkgPT4ge1xuICAgICAgaWYgKHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pW3Byb3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRodW1ibmFpbENvbnRlbnQuY3VycmVudFN0eWxlW3Byb3BdO1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbENvbnRlbnQsIHdpZHRoKSB7XG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh3aWR0aCk7XG4gICAgfVxuXG4gICAgbGV0IGNsaXAgPSBUaHVtYm5haWxIZWxwZXJzLmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCkoJ2NsaXAnKTtcblxuICAgIGlmIChjbGlwICE9PSAnYXV0bycgJiYgY2xpcCAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICBjbGlwID0gY2xpcC5zcGxpdCgvKD86XFwofFxcKSkvKVsxXS5zcGxpdCgvKD86LHwgKS8pO1xuICAgICAgaWYgKGNsaXAubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHJldHVybiAocGFyc2VGbG9hdChjbGlwWzFdKSAtIHBhcnNlRmxvYXQoY2xpcFszXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRTY3JvbGxPZmZzZXQoKSB7XG4gICAgaWYgKHdpbmRvdy5wYWdlWE9mZnNldCkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgeDogd2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiB3aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsTGVmdCxcbiAgICAgIHk6IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHN1cHBvcnRBbmRyb2lkRXZlbnRzKHBsYXllcikge1xuICAgIC8vIEFuZHJvaWQgZG9lc24ndCBzdXBwb3J0IDphY3RpdmUgYW5kIDpob3ZlciBvbiBub24tYW5jaG9yIGFuZCBub24tYnV0dG9uIGVsZW1lbnRzXG4gICAgLy8gc28sIHdlIG5lZWQgdG8gZmFrZSB0aGUgOmFjdGl2ZSBzZWxlY3RvciBmb3IgdGh1bWJuYWlscyB0byBzaG93IHVwLlxuICAgIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcblxuICAgIGNvbnN0IGFkZEZha2VBY3RpdmUgPSAoKSA9PiB7XG4gICAgICBwcm9ncmVzc0NvbnRyb2wuYWRkQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbW92ZUZha2VBY3RpdmUgPSAoKSA9PiB7XG4gICAgICBwcm9ncmVzc0NvbnRyb2wucmVtb3ZlQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hzdGFydCcsIGFkZEZha2VBY3RpdmUpO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hlbmQnLCByZW1vdmVGYWtlQWN0aXZlKTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpIHtcbiAgICBjb25zdCB3cmFwID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB3cmFwLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWhvbGRlcic7XG4gICAgcmV0dXJuIHdyYXA7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKSB7XG4gICAgY29uc3QgdGh1bWJuYWlsSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG5cbiAgICB0aHVtYm5haWxJbWcuc3JjID0gdGh1bWJuYWlsQ2xpcHNbJzAnXS5zcmM7XG4gICAgdGh1bWJuYWlsSW1nLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWltZyc7XG4gICAgcmV0dXJuIHRodW1ibmFpbEltZztcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxUaW1lKCkge1xuICAgIGNvbnN0IHRpbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRpbWUuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtdGltZSc7XG4gICAgdGltZS5pZCA9ICd2anMtdGltZSc7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duKCkge1xuICAgIGNvbnN0IGFycm93ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBhcnJvdy5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1hcnJvdyc7XG4gICAgYXJyb3cuaWQgPSAndmpzLWFycm93JztcbiAgICByZXR1cm4gYXJyb3c7XG4gIH1cblxuICBzdGF0aWMgbWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKSB7XG5cbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEltZyk7XG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aW1lbGluZVRpbWUpO1xuICAgIHRodW1ibmFpbHNIb2xkZXIuYXBwZW5kQ2hpbGQodGh1bWJuYWlsQXJyb3dEb3duKTtcbiAgICByZXR1cm4gdGh1bWJuYWlsc0hvbGRlcjtcbiAgfVxuXG4gIHN0YXRpYyBjZW50ZXJUaHVtYm5haWxPdmVyQ3Vyc29yKHRodW1ibmFpbEltZykge1xuICAgIC8vIGNlbnRlciB0aGUgdGh1bWJuYWlsIG92ZXIgdGhlIGN1cnNvciBpZiBhbiBvZmZzZXQgd2Fzbid0IHByb3ZpZGVkXG4gICAgaWYgKCF0aHVtYm5haWxJbWcuc3R5bGUubGVmdCAmJiAhdGh1bWJuYWlsSW1nLnN0eWxlLnJpZ2h0KSB7XG4gICAgICB0aHVtYm5haWxJbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IHsgd2lkdGg6IC0odGh1bWJuYWlsSW1nLm5hdHVyYWxXaWR0aCAvIDIpIH07XG5cbiAgICAgICAgdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgPSBgJHt0aHVtYm5haWxXaWR0aH1weGA7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRWaWRlb0R1cmF0aW9uKHBsYXllcikge1xuICAgIGxldCBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xuXG4gICAgcGxheWVyLm9uKCdkdXJhdGlvbmNoYW5nZScsICgpID0+IHtcbiAgICAgIGR1cmF0aW9uID0gcGxheWVyLmR1cmF0aW9uKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgc3RhdGljIGFkZFRodW1ibmFpbFRvUGxheWVyKHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlcikge1xuICAgIHByb2dyZXNzQ29udHJvbC5lbCgpLmFwcGVuZENoaWxkKHRodW1ibmFpbHNIb2xkZXIpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRNb3VzZUxlZnRPZmZzZXQocGFnZU1vdXNlUG9zaXRpb25YLCBwcm9ncmVzc0NvbnRyb2wsIHBhZ2VYT2Zmc2V0LCBldmVudCkge1xuICAgIC8vIGZpbmQgdGhlIHBhZ2Ugb2Zmc2V0IG9mIHRoZSBtb3VzZVxuICAgIGxldCBsZWZ0T2Zmc2V0ID0gcGFnZU1vdXNlUG9zaXRpb25YIHx8IChldmVudC5jbGllbnRYICtcbiAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc2Nyb2xsTGVmdCArIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KTtcblxuICAgIC8vIHN1YnRyYWN0IHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgcG9zaXRpb25lZCBvZmZzZXQgcGFyZW50XG4gICAgbGVmdE9mZnNldCAtPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cbiAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBwYWdlWE9mZnNldDtcbiAgICByZXR1cm4gbGVmdE9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNb3VzZVZpZGVvVGltZShtb3VzZUxlZnRPZmZzZXQsIHByb2dyZXNzQ29udHJvbCwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobW91c2VMZWZ0T2Zmc2V0IC0gcHJvZ3Jlc3NDb250cm9sLmVsKCkub2Zmc2V0TGVmdCkgL1xuICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wud2lkdGgoKSAqIGR1cmF0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxUaW1lKHRpbWVsaW5lVGltZSwgcHJvZ3Jlc3NDb250cm9sKSB7XG4gICAgdGltZWxpbmVUaW1lLmlubmVySFRNTCA9IChwcm9ncmVzc0NvbnRyb2wuc2Vla0Jhci5tb3VzZVRpbWVEaXNwbGF5LmVsXy5pbm5lclRleHQpO1xuICB9XG5cbiAgc3RhdGljIGdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCkge1xuICAgIGxldCBwYWdlTW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVg7XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VNb3VzZU9mZnNldFg7XG4gIH1cblxuICBzdGF0aWMga2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KSB7XG5cbiAgICBjb25zdCB3aWR0aCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbEltZywgYWN0aXZlVGh1bWJuYWlsLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwc1swXS53aWR0aCk7XG5cbiAgICBjb25zdCBoYWxmV2lkdGggPSB3aWR0aCAvIDI7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgdGh1bWJuYWlsIGRvZXNuJ3QgZmFsbCBvZmYgdGhlIHJpZ2h0IHNpZGUgb2ZcbiAgICAvLyB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbGF5ZXJcbiAgICBpZiAoKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgPiBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcbiAgICAgIG1vdXNlTGVmdE9mZnNldCAtPSAobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSAtIHByb2dyZXNCYXJSaWdodE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKG1vdXNlTGVmdE9mZnNldCA8IGhhbGZXaWR0aCkge1xuICAgICAgbW91c2VMZWZ0T2Zmc2V0ID0gaGFsZldpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gbW91c2VMZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBjb25zdCBsZWZ0VmFsdWUgPSB7IG1vdXNlTGVmdE9mZnNldCB9O1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFZhbHVlLm1vdXNlTGVmdE9mZnNldH1weGA7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLCBtb3VzZVRpbWUpIHtcbiAgICBsZXQgYWN0aXZlQ2xpcCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGNsaXBOdW1iZXIgaW4gdGh1bWJuYWlsQ2xpcHMpIHtcbiAgICAgIGlmIChtb3VzZVRpbWUgPiBjbGlwTnVtYmVyKSB7XG4gICAgICAgIGFjdGl2ZUNsaXAgPSBNYXRoLm1heChhY3RpdmVDbGlwLCBjbGlwTnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXBzW2FjdGl2ZUNsaXBdO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3JjICYmIHRodW1ibmFpbEltZy5zcmMgIT09IGFjdGl2ZVRodW1ibmFpbC5zcmMpIHtcbiAgICAgIHRodW1ibmFpbEltZy5zcmMgPSBhY3RpdmVUaHVtYm5haWwuc3JjO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTdHlsZShhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3R5bGUgJiYgdGh1bWJuYWlsSW1nLnN0eWxlICE9PSBhY3RpdmVUaHVtYm5haWwuc3R5bGUpIHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsIGFjdGl2ZVRodW1ibmFpbC5zdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nKSB7XG4gICAgY29uc3QgcGFnZVhPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmdldFNjcm9sbE9mZnNldCgpLng7XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJQb3NpdGlvbiA9IHByb2dyZXNzQ29udHJvbC5lbCgpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJSaWdodE9mZnNldCA9IChwcm9ncmVzc0JhclBvc2l0aW9uLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyUG9zaXRpb24ucmlnaHQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVhPZmZzZXQ7XG5cbiAgICBjb25zdCBwYWdlTW91c2VQb3NpdGlvblggPSBUaHVtYm5haWxIZWxwZXJzLmdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCk7XG5cbiAgICBsZXQgbW91c2VMZWZ0T2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5maW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQpO1xuXG4gICAgY29uc3QgbW91c2VUaW1lID0gVGh1bWJuYWlsSGVscGVycy5wYXJzZURpc3BsYXlUaW1lKHRpbWVsaW5lVGltZS5pbm5lclRleHQpO1xuXG4gICAgY29uc3QgYWN0aXZlVGh1bWJuYWlsID0gVGh1bWJuYWlsSGVscGVycy5nZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VUaW1lKTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZyk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcblxuICAgIG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMua2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYm5haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyUmlnaHRPZmZzZXQpO1xuXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUobW91c2VMZWZ0T2Zmc2V0LCB0aHVtYm5haWxzSG9sZGVyKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpIHtcblxuICAgIC8vIHVwZGF0ZSB0aGUgdGh1bWJuYWlsIHdoaWxlIGhvdmVyaW5nXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNobW92ZScsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcikge1xuICAgIHRodW1ibmFpbHNIb2xkZXIuc3R5bGUubGVmdCA9ICctMTAwMHB4JztcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlciwgcGxheWVyKSB7XG5cbiAgICAvLyBtb3ZlIHRoZSBwbGFjZWhvbGRlciBvdXQgb2YgdGhlIHdheSB3aGVuIG5vdCBob3ZlcmluZ1xuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2VvdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICAgIHBsYXllci5vbigndXNlcmluYWN0aXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEaXNwbGF5VGltZSh0aW1lKSB7XG4gICAgY29uc3QgcGFydHMgPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgbGV0IHNlY29uZHMgPSAwO1xuICAgIGxldCBmYWN0b3IgPSAxO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0cy5wb3AoKTtcblxuICAgICAgc2Vjb25kcyArPSBwYXJ0ICogZmFjdG9yO1xuICAgICAgZmFjdG9yICo9IDYwO1xuICAgIH1cbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxufVxuIl19
