(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.videojsThumbnails = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));
var global = require(1);

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
        if (global.window.getComputedStyle) {
          return global.window.getComputedStyle(thumbnailContent, pseudo)[prop];
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
      if (global.window.pageXOffset) {
        return {
          x: global.window.pageXOffset,
          y: global.window.pageYOffset
        };
      }
      return {
        x: global.document.documentElement.scrollLeft,
        y: global.document.documentElement.scrollTop
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
      var wrap = global.document.createElement('div');

      wrap.className = 'vjs-thumbnail-holder';
      return wrap;
    }
  }, {
    key: 'createThumbnailImg',
    value: function createThumbnailImg(thumbnailClips) {
      var thumbnailImg = global.document.createElement('img');

      thumbnailImg.src = thumbnailClips['0'].src;
      thumbnailImg.className = 'vjs-thumbnail-img';
      return thumbnailImg;
    }
  }, {
    key: 'createThumbnailTime',
    value: function createThumbnailTime() {
      var time = global.document.createElement('div');

      time.className = 'vjs-thumbnail-time';
      time.id = 'vjs-time';
      return time;
    }
  }, {
    key: 'createThumbnailArrowDown',
    value: function createThumbnailArrowDown() {
      var arrow = global.document.createElement('div');

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
      var leftOffset = pageMousePositionX || event.clientX + global.document.body.scrollLeft + global.document.documentElement.scrollLeft;

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

// Default options for the plugin.


var defaults = {};

// Cross-compatibility for Video.js 5 and 6.
var registerPlugin = videojs.registerPlugin || videojs.plugin;
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
  var thumbnailClips = ThumbnailHelpers.createThumbnails({}, defaults, thumbnailsClips);
  var progressControl = player.controlBar.progressControl;
  var thumbnailImg = ThumbnailHelpers.createThumbnailImg(thumbnailClips);
  var timelineTime = ThumbnailHelpers.createThumbnailTime();
  var thumbnailArrowDown = ThumbnailHelpers.createThumbnailArrowDown();
  var thumbnailsHolder = ThumbnailHelpers.createThumbnaislHolder();

  thumbnailsHolder = ThumbnailHelpers.mergeThumbnailElements(thumbnailsHolder, thumbnailImg, timelineTime, thumbnailArrowDown);
  ThumbnailHelpers.hidePlayerOnHoverTime(progressControl);

  if (global.window.navigator.userAgent.toLowerCase().indexOf('android') !== -1) {
    ThumbnailHelpers.supportAndroidEvents();
  }

  ThumbnailHelpers.createThumbnails(thumbnailImg.style, thumbnailClips['0'].style);

  ThumbnailHelpers.centerThumbnailOverCursor(thumbnailImg);

  ThumbnailHelpers.addThumbnailToPlayer(progressControl, thumbnailsHolder);

  ThumbnailHelpers.updateOnHover(progressControl, thumbnailsHolder, thumbnailClips, timelineTime, thumbnailImg, player);

  ThumbnailHelpers.updateOnHoverOut(progressControl, thumbnailsHolder, player);
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
    onPlayerReady(_this, videojs.mergeOptions(defaults, options));
  });
};

// Register the plugin with video.js.
registerPlugin('thumbnails', thumbnails);

// Include the version number.
thumbnails.VERSION = '1.0.2';

module.exports = thumbnails;

},{"1":1}]},{},[2])(2)
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInNyYy9qcy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7Ozs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQTBCLEVBQTFCLEVBQThCO0FBQUUsU0FBUSxNQUFPLFFBQU8sRUFBUCx5Q0FBTyxFQUFQLE9BQWMsUUFBckIsSUFBa0MsYUFBYSxFQUFoRCxHQUFzRCxHQUFHLFNBQUgsQ0FBdEQsR0FBc0UsRUFBN0U7QUFBa0Y7O0FBRWxILElBQUksVUFBVSxnQkFBZ0IsUUFBUSxVQUFSLENBQWhCLENBQWQ7QUFDQSxJQUFJLFNBQVMsUUFBUSxRQUFSLENBQWI7O0lBRU0sZ0I7Ozs7Ozs7MENBRXlCLGUsRUFBaUI7QUFDNUMsVUFBTSxZQUFZLGdCQUFnQixHQUFoQixDQUFvQixzQkFBcEIsQ0FBMkMsbUJBQTNDLEVBQWdFLENBQWhFLENBQWxCOztBQUVBLGdCQUFVLEtBQVYsQ0FBZ0IsT0FBaEIsR0FBMEIsTUFBMUI7QUFDRDs7O3VDQUVnQztBQUFBLHdDQUFOLElBQU07QUFBTixZQUFNO0FBQUE7O0FBQy9CLFVBQU0sZ0JBQWdCLEtBQUssS0FBTCxNQUFnQixFQUF0Qzs7QUFFQSxhQUFPLElBQVAsQ0FBWSxJQUFaLEVBQWtCLEdBQWxCLENBQXNCLFVBQUMsQ0FBRCxFQUFPO0FBQzNCLFlBQU0sa0JBQWtCLEtBQUssQ0FBTCxDQUF4Qjs7QUFFQSxlQUFPLElBQVAsQ0FBWSxlQUFaLEVBQTZCLEdBQTdCLENBQWlDLFVBQUMsUUFBRCxFQUFjO0FBQzdDLGNBQUksZ0JBQWdCLGNBQWhCLENBQStCLFFBQS9CLENBQUosRUFBOEM7QUFDNUMsZ0JBQUksUUFBTyxnQkFBZ0IsUUFBaEIsQ0FBUCxNQUFxQyxRQUF6QyxFQUFtRDtBQUNqRCw0QkFBYyxRQUFkLElBQTBCLGlCQUFpQixnQkFBakIsQ0FBa0MsY0FBYyxRQUFkLENBQWxDLEVBQ1UsZ0JBQWdCLFFBQWhCLENBRFYsQ0FBMUI7QUFFRCxhQUhELE1BR087QUFDTCw0QkFBYyxRQUFkLElBQTBCLGdCQUFnQixRQUFoQixDQUExQjtBQUNEO0FBQ0Y7QUFDRCxpQkFBTyxhQUFQO0FBQ0QsU0FWRDtBQVdBLGVBQU8sYUFBUDtBQUNELE9BZkQ7QUFnQkEsYUFBTyxhQUFQO0FBQ0Q7OztxQ0FFdUIsZ0IsRUFBa0IsTSxFQUFRO0FBQ2hELGFBQU8sVUFBQyxJQUFELEVBQVU7QUFDZixZQUFJLE9BQU8sTUFBUCxDQUFjLGdCQUFsQixFQUFvQztBQUNsQyxpQkFBTyxPQUFPLE1BQVAsQ0FBYyxnQkFBZCxDQUErQixnQkFBL0IsRUFBaUQsTUFBakQsRUFBeUQsSUFBekQsQ0FBUDtBQUNEO0FBQ0QsZUFBTyxpQkFBaUIsWUFBakIsQ0FBOEIsSUFBOUIsQ0FBUDtBQUNELE9BTEQ7QUFNRDs7O29DQUVzQixnQixFQUFrQixLLEVBQU87QUFDOUMsVUFBSSxLQUFKLEVBQVc7QUFDVCxlQUFPLFdBQVcsS0FBWCxDQUFQO0FBQ0Q7O0FBRUQsVUFBSSxPQUFPLGlCQUFpQixnQkFBakIsQ0FBa0MsZ0JBQWxDLEVBQW9ELE1BQXBELENBQVg7O0FBRUEsVUFBSSxTQUFTLE1BQVQsSUFBbUIsU0FBUyxTQUFoQyxFQUEyQztBQUN6QyxlQUFPLEtBQUssS0FBTCxDQUFXLFdBQVgsRUFBd0IsQ0FBeEIsRUFBMkIsS0FBM0IsQ0FBaUMsU0FBakMsQ0FBUDtBQUNBLFlBQUksS0FBSyxNQUFMLEtBQWdCLENBQXBCLEVBQXVCO0FBQ3JCLGlCQUFRLFdBQVcsS0FBSyxDQUFMLENBQVgsSUFBc0IsV0FBVyxLQUFLLENBQUwsQ0FBWCxDQUE5QjtBQUNEO0FBQ0Y7QUFDRCxhQUFPLENBQVA7QUFDRDs7O3NDQUV3QjtBQUN2QixVQUFJLE9BQU8sTUFBUCxDQUFjLFdBQWxCLEVBQStCO0FBQzdCLGVBQU87QUFDTCxhQUFHLE9BQU8sTUFBUCxDQUFjLFdBRFo7QUFFTCxhQUFHLE9BQU8sTUFBUCxDQUFjO0FBRlosU0FBUDtBQUlEO0FBQ0QsYUFBTztBQUNMLFdBQUcsT0FBTyxRQUFQLENBQWdCLGVBQWhCLENBQWdDLFVBRDlCO0FBRUwsV0FBRyxPQUFPLFFBQVAsQ0FBZ0IsZUFBaEIsQ0FBZ0M7QUFGOUIsT0FBUDtBQUlEOzs7eUNBRTJCLE0sRUFBUTtBQUNsQztBQUNBO0FBQ0EsVUFBTSxrQkFBa0IsT0FBTyxVQUFQLENBQWtCLGVBQTFDOztBQUVBLFVBQU0sZ0JBQWdCLFNBQWhCLGFBQWdCLEdBQU07QUFDMUIsd0JBQWdCLFFBQWhCLENBQXlCLGFBQXpCO0FBQ0QsT0FGRDs7QUFJQSxVQUFNLG1CQUFtQixTQUFuQixnQkFBbUIsR0FBTTtBQUM3Qix3QkFBZ0IsV0FBaEIsQ0FBNEIsYUFBNUI7QUFDRCxPQUZEOztBQUlBLHNCQUFnQixFQUFoQixDQUFtQixZQUFuQixFQUFpQyxhQUFqQztBQUNBLHNCQUFnQixFQUFoQixDQUFtQixVQUFuQixFQUErQixnQkFBL0I7QUFDQSxzQkFBZ0IsRUFBaEIsQ0FBbUIsYUFBbkIsRUFBa0MsZ0JBQWxDO0FBQ0Q7Ozs2Q0FFK0I7QUFDOUIsVUFBTSxPQUFPLE9BQU8sUUFBUCxDQUFnQixhQUFoQixDQUE4QixLQUE5QixDQUFiOztBQUVBLFdBQUssU0FBTCxHQUFpQixzQkFBakI7QUFDQSxhQUFPLElBQVA7QUFDRDs7O3VDQUV5QixjLEVBQWdCO0FBQ3hDLFVBQU0sZUFBZSxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBckI7O0FBRUEsbUJBQWEsR0FBYixHQUFtQixlQUFlLEdBQWYsRUFBb0IsR0FBdkM7QUFDQSxtQkFBYSxTQUFiLEdBQXlCLG1CQUF6QjtBQUNBLGFBQU8sWUFBUDtBQUNEOzs7MENBRTRCO0FBQzNCLFVBQU0sT0FBTyxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBYjs7QUFFQSxXQUFLLFNBQUwsR0FBaUIsb0JBQWpCO0FBQ0EsV0FBSyxFQUFMLEdBQVUsVUFBVjtBQUNBLGFBQU8sSUFBUDtBQUNEOzs7K0NBRWlDO0FBQ2hDLFVBQU0sUUFBUSxPQUFPLFFBQVAsQ0FBZ0IsYUFBaEIsQ0FBOEIsS0FBOUIsQ0FBZDs7QUFFQSxZQUFNLFNBQU4sR0FBa0IscUJBQWxCO0FBQ0EsWUFBTSxFQUFOLEdBQVcsV0FBWDtBQUNBLGFBQU8sS0FBUDtBQUNEOzs7MkNBRTZCLGdCLEVBQ0EsWSxFQUNBLFksRUFDQSxrQixFQUFvQjs7QUFFaEQsdUJBQWlCLFdBQWpCLENBQTZCLFlBQTdCO0FBQ0EsdUJBQWlCLFdBQWpCLENBQTZCLFlBQTdCO0FBQ0EsdUJBQWlCLFdBQWpCLENBQTZCLGtCQUE3QjtBQUNBLGFBQU8sZ0JBQVA7QUFDRDs7OzhDQUVnQyxZLEVBQWM7QUFDN0M7QUFDQSxVQUFJLENBQUMsYUFBYSxLQUFiLENBQW1CLElBQXBCLElBQTRCLENBQUMsYUFBYSxLQUFiLENBQW1CLEtBQXBELEVBQTJEO0FBQ3pELHFCQUFhLE1BQWIsR0FBc0IsWUFBTTtBQUMxQixjQUFNLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxhQUFhLFlBQWIsR0FBNEIsQ0FBOUIsQ0FBVCxFQUF2Qjs7QUFFQSx1QkFBYSxLQUFiLENBQW1CLElBQW5CLEdBQTZCLGNBQTdCO0FBQ0QsU0FKRDtBQUtEO0FBQ0Y7OztxQ0FFdUIsTSxFQUFRO0FBQzlCLFVBQUksV0FBVyxPQUFPLFFBQVAsRUFBZjs7QUFFQSxhQUFPLEVBQVAsQ0FBVSxnQkFBVixFQUE0QixZQUFNO0FBQ2hDLG1CQUFXLE9BQU8sUUFBUCxFQUFYO0FBQ0QsT0FGRDtBQUdBLGFBQU8sUUFBUDtBQUNEOzs7eUNBRTJCLGUsRUFBaUIsZ0IsRUFBa0I7QUFDN0Qsc0JBQWdCLEVBQWhCLEdBQXFCLFdBQXJCLENBQWlDLGdCQUFqQztBQUNEOzs7d0NBRTBCLGtCLEVBQW9CLGUsRUFBaUIsVyxFQUFhLEssRUFBTztBQUNsRjtBQUNBLFVBQUksYUFBYSxzQkFBdUIsTUFBTSxPQUFOLEdBQ3ZCLE9BQU8sUUFBUCxDQUFnQixJQUFoQixDQUFxQixVQURFLEdBQ1csT0FBTyxRQUFQLENBQWdCLGVBQWhCLENBQWdDLFVBRG5GOztBQUdBO0FBQ0Esb0JBQWMsZ0JBQWdCLEVBQWhCLEdBQ0EscUJBREEsR0FDd0IsSUFEeEIsR0FDK0IsV0FEN0M7QUFFQSxhQUFPLFVBQVA7QUFDRDs7O3NDQUV3QixlLEVBQWlCLGUsRUFBaUIsUSxFQUFVO0FBQ25FLGFBQU8sS0FBSyxLQUFMLENBQVcsQ0FBQyxrQkFBa0IsZ0JBQWdCLEVBQWhCLEdBQXFCLFVBQXhDLElBQ1gsZ0JBQWdCLEtBQWhCLEVBRFcsR0FDZSxRQUQxQixDQUFQO0FBRUQ7Ozt3Q0FFMEIsWSxFQUFjLGUsRUFBaUI7QUFDeEQsbUJBQWEsU0FBYixHQUEwQixnQkFBZ0IsT0FBaEIsQ0FBd0IsZ0JBQXhCLENBQXlDLEdBQXpDLENBQTZDLFNBQXZFO0FBQ0Q7OzswQ0FFNEIsSyxFQUFPO0FBQ2xDLFVBQUksbUJBQW1CLE1BQU0sS0FBN0I7O0FBRUEsVUFBSSxNQUFNLGNBQVYsRUFBMEI7QUFDeEIsMkJBQW1CLE1BQU0sY0FBTixDQUFxQixDQUFyQixFQUF3QixLQUEzQztBQUNEO0FBQ0QsYUFBTyxnQkFBUDtBQUNEOzs7OENBRWdDLFksRUFDQSxlLEVBQ0EsYyxFQUNBLGUsRUFDQSxxQixFQUF1Qjs7QUFFdEQsVUFBTSxRQUFRLGlCQUFpQixlQUFqQixDQUFpQyxZQUFqQyxFQUErQyxnQkFBZ0IsS0FBaEIsSUFDL0MsZUFBZSxDQUFmLEVBQWtCLEtBRGxCLENBQWQ7O0FBR0EsVUFBTSxZQUFZLFFBQVEsQ0FBMUI7O0FBRUE7QUFDQTtBQUNBLFVBQUssa0JBQWtCLFNBQW5CLEdBQWdDLHFCQUFwQyxFQUEyRDtBQUN6RCwyQkFBb0Isa0JBQWtCLFNBQW5CLEdBQWdDLHFCQUFuRDtBQUNELE9BRkQsTUFFTyxJQUFJLGtCQUFrQixTQUF0QixFQUFpQztBQUN0QywwQkFBa0IsU0FBbEI7QUFDRDtBQUNELGFBQU8sZUFBUDtBQUNEOzs7NkNBRStCLGUsRUFBaUIsZ0IsRUFBa0I7QUFDakUsVUFBTSxZQUFZLEVBQUUsZ0NBQUYsRUFBbEI7O0FBRUEsdUJBQWlCLEtBQWpCLENBQXVCLElBQXZCLEdBQWlDLFVBQVUsZUFBM0M7QUFDRDs7O3VDQUV5QixjLEVBQWdCLFMsRUFBVztBQUNuRCxVQUFJLGFBQWEsQ0FBakI7O0FBRUEsV0FBSyxJQUFNLFVBQVgsSUFBeUIsY0FBekIsRUFBeUM7QUFDdkMsWUFBSSxZQUFZLFVBQWhCLEVBQTRCO0FBQzFCLHVCQUFhLEtBQUssR0FBTCxDQUFTLFVBQVQsRUFBcUIsVUFBckIsQ0FBYjtBQUNEO0FBQ0Y7QUFDRCxhQUFPLGVBQWUsVUFBZixDQUFQO0FBQ0Q7Ozt1Q0FFeUIsZSxFQUFpQixZLEVBQWM7QUFDdkQsVUFBSSxnQkFBZ0IsR0FBaEIsSUFBdUIsYUFBYSxHQUFiLEtBQXFCLGdCQUFnQixHQUFoRSxFQUFxRTtBQUNuRSxxQkFBYSxHQUFiLEdBQW1CLGdCQUFnQixHQUFuQztBQUNEO0FBQ0Y7Ozt5Q0FFMkIsZSxFQUFpQixZLEVBQWM7QUFDekQsVUFBSSxnQkFBZ0IsS0FBaEIsSUFBeUIsYUFBYSxLQUFiLEtBQXVCLGdCQUFnQixLQUFwRSxFQUEyRTtBQUN6RSx5QkFBaUIsZ0JBQWpCLENBQWtDLGFBQWEsS0FBL0MsRUFBc0QsZ0JBQWdCLEtBQXRFO0FBQ0Q7QUFDRjs7O2lDQUVtQixLLEVBQ0EsZSxFQUNBLGdCLEVBQ0EsYyxFQUNBLFksRUFDQSxZLEVBQWM7QUFDaEMsVUFBTSxjQUFjLGlCQUFpQixlQUFqQixHQUFtQyxDQUF2RDtBQUNBLFVBQU0sc0JBQXNCLGdCQUFnQixFQUFoQixHQUNELHFCQURDLEVBQTVCOztBQUdBLFVBQU0seUJBQXlCLENBQUMsb0JBQW9CLEtBQXBCLElBQ0Qsb0JBQW9CLEtBRHBCLElBRUEsV0FGL0I7O0FBSUEsVUFBTSxxQkFBcUIsaUJBQWlCLHFCQUFqQixDQUF1QyxLQUF2QyxDQUEzQjs7QUFFQSxVQUFJLGtCQUFrQixpQkFBaUIsbUJBQWpCLENBQXFDLGtCQUFyQyxFQUNxQyxlQURyQyxFQUVxQyxXQUZyQyxFQUdxQyxLQUhyQyxDQUF0Qjs7QUFLQSxVQUFNLFlBQVksaUJBQWlCLGdCQUFqQixDQUFrQyxhQUFhLFNBQS9DLENBQWxCOztBQUVBLFVBQU0sa0JBQWtCLGlCQUFpQixrQkFBakIsQ0FBb0MsY0FBcEMsRUFDb0MsU0FEcEMsQ0FBeEI7O0FBR0EsdUJBQWlCLG1CQUFqQixDQUFxQyxZQUFyQyxFQUFtRCxlQUFuRDs7QUFFQSx1QkFBaUIsa0JBQWpCLENBQW9DLGVBQXBDLEVBQXFELFlBQXJEOztBQUVBLHVCQUFpQixvQkFBakIsQ0FBc0MsZUFBdEMsRUFBdUQsWUFBdkQ7O0FBRUEsd0JBQWtCLGlCQUFpQix5QkFBakIsQ0FBMkMsWUFBM0MsRUFDMEIsZUFEMUIsRUFFMEIsY0FGMUIsRUFHMEIsZUFIMUIsRUFJMEIsc0JBSjFCLENBQWxCOztBQU1BLHVCQUFpQix3QkFBakIsQ0FBMEMsZUFBMUMsRUFBMkQsZ0JBQTNEO0FBQ0Q7OztrQ0FFb0IsZSxFQUNBLGdCLEVBQ0EsYyxFQUNBLFksRUFDQSxZLEVBQ0EsTSxFQUFROztBQUUzQjtBQUNBLHNCQUFnQixFQUFoQixDQUFtQixXQUFuQixFQUFnQyxVQUFDLEtBQUQsRUFBVztBQUN6Qyx5QkFBaUIsWUFBakIsQ0FBOEIsS0FBOUIsRUFDOEIsZUFEOUIsRUFFOEIsZ0JBRjlCLEVBRzhCLGNBSDlCLEVBSThCLFlBSjlCLEVBSzhCLFlBTDlCLEVBTThCLE1BTjlCO0FBT0QsT0FSRDtBQVNBLHNCQUFnQixFQUFoQixDQUFtQixXQUFuQixFQUFnQyxVQUFDLEtBQUQsRUFBVztBQUN6Qyx5QkFBaUIsWUFBakIsQ0FBOEIsS0FBOUIsRUFDOEIsZUFEOUIsRUFFOEIsZ0JBRjlCLEVBRzhCLGNBSDlCLEVBSThCLFlBSjlCLEVBSzhCLFlBTDlCO0FBTUQsT0FQRDtBQVFEOzs7a0NBRW9CLGdCLEVBQWtCO0FBQ3JDLHVCQUFpQixLQUFqQixDQUF1QixJQUF2QixHQUE4QixTQUE5QjtBQUNEOzs7cUNBRXVCLGUsRUFBaUIsZ0IsRUFBa0IsTSxFQUFROztBQUVqRTtBQUNBLHNCQUFnQixFQUFoQixDQUFtQixVQUFuQixFQUErQixVQUFDLEtBQUQsRUFBVztBQUN4Qyx5QkFBaUIsYUFBakIsQ0FBK0IsZ0JBQS9CO0FBQ0QsT0FGRDtBQUdBLHNCQUFnQixFQUFoQixDQUFtQixhQUFuQixFQUFrQyxVQUFDLEtBQUQsRUFBVztBQUMzQyx5QkFBaUIsYUFBakIsQ0FBK0IsZ0JBQS9CO0FBQ0QsT0FGRDtBQUdBLHNCQUFnQixFQUFoQixDQUFtQixVQUFuQixFQUErQixVQUFDLEtBQUQsRUFBVztBQUN4Qyx5QkFBaUIsYUFBakIsQ0FBK0IsZ0JBQS9CO0FBQ0QsT0FGRDtBQUdBLGFBQU8sRUFBUCxDQUFVLGNBQVYsRUFBMEIsVUFBQyxLQUFELEVBQVc7QUFDbkMseUJBQWlCLGFBQWpCLENBQStCLGdCQUEvQjtBQUNELE9BRkQ7QUFHRDs7O3FDQUV1QixJLEVBQU07QUFDNUIsVUFBTSxRQUFRLEtBQUssS0FBTCxDQUFXLEdBQVgsQ0FBZDtBQUNBLFVBQUksVUFBVSxDQUFkO0FBQ0EsVUFBSSxTQUFTLENBQWI7O0FBRUEsYUFBTyxJQUFQLEVBQWE7QUFDWCxZQUFJLE1BQU0sTUFBTixLQUFpQixDQUFyQixFQUF3QjtBQUN0QjtBQUNEOztBQUVELFlBQU0sT0FBTyxNQUFNLEdBQU4sRUFBYjs7QUFFQSxtQkFBVyxPQUFPLE1BQWxCO0FBQ0Esa0JBQVUsRUFBVjtBQUNEO0FBQ0QsYUFBTyxPQUFQO0FBQ0Q7Ozs7OztBQUdIOzs7QUFDQSxJQUFNLFdBQVcsRUFBakI7O0FBRUE7QUFDQSxJQUFNLGlCQUFpQixRQUFRLGNBQVIsSUFBMEIsUUFBUSxNQUF6RDtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7OztBQWNBLElBQU0seUJBQXlCLFNBQXpCLHNCQUF5QixDQUFDLFNBQUQsRUFBWSxPQUFaLEVBQXdCOztBQUVyRCxNQUFJLGNBQWMsQ0FBbEI7QUFDQSxNQUFJLG1CQUFtQixDQUF2QjtBQUNBLE1BQUksa0JBQWtCLENBQXRCO0FBQ0EsTUFBTSxXQUFXLFFBQVEsUUFBekI7QUFDQSxNQUFNLGlCQUFpQixRQUFRLEtBQS9CO0FBQ0EsTUFBTSxpQkFBaUIsUUFBUSxRQUEvQjtBQUNBLE1BQU0sbUJBQW1CLFFBQVEsU0FBUixDQUFrQixPQUFsQixDQUEwQixJQUExQixFQUFnQyxDQUFoQyxDQUF6QjtBQUNBLE1BQU0saUJBQWlCO0FBQ3JCLE9BQUc7QUFDRCxXQUFLLGdCQURKO0FBRUQsYUFBTztBQUNMLGNBQU8saUJBQWlCLENBQWpCLEdBQXFCLENBQUMsQ0FBdkIsR0FBNEIsSUFEN0I7QUFFTCxlQUFRLGlCQUFpQixjQUFsQixHQUFvQyxJQUZ0QztBQUdMLGNBQU0sWUFBWSxRQUFRLEtBQXBCLEdBQTRCLEtBQTVCLEdBQW9DLFFBQVEsS0FBNUMsR0FBb0Q7QUFIckQ7QUFGTjtBQURrQixHQUF2Qjs7QUFXQSxTQUFPLGVBQWUsU0FBdEIsRUFBaUM7QUFDL0IsbUJBQWUsUUFBZjtBQUNBLHNCQUFtQixFQUFFLGdCQUFGLEdBQXFCLGNBQXRCLEdBQXdDLGNBQTFEO0FBQ0EsUUFBTSxZQUFZLEtBQUssS0FBTCxDQUFXLGVBQWUsV0FBVyxjQUExQixDQUFYLElBQXdELENBQTFFO0FBQ0EsUUFBTSxZQUFZLFFBQVEsU0FBUixDQUFrQixPQUFsQixDQUEwQixJQUExQixFQUFnQyxTQUFoQyxDQUFsQjs7QUFFQSxtQkFBZSxXQUFmLElBQThCO0FBQzVCLFdBQUssU0FEdUI7QUFFNUIsYUFBTztBQUNMLGNBQU8sQ0FBQyxpQkFBaUIsQ0FBakIsR0FBcUIsZUFBdEIsSUFBeUMsQ0FBQyxDQUEzQyxHQUFnRCxJQURqRDtBQUVMLGNBQU0sY0FBYyxpQkFBaUIsZUFBL0IsSUFBa0QsS0FBbEQsR0FDQSxRQUFRLEtBRFIsR0FDZ0IsTUFEaEIsR0FDeUIsZUFEekIsR0FDMkM7QUFINUM7QUFGcUIsS0FBOUI7QUFRRDtBQUNELFNBQU8sY0FBUDtBQUNELENBcENEOztBQXNDQSxJQUFNLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFxQjtBQUNoRCxNQUFNLGtCQUFrQix1QkFBdUIsT0FBTyxRQUFQLEVBQXZCLEVBQTBDLE9BQTFDLENBQXhCO0FBQ0EsTUFBTSxpQkFBaUIsaUJBQWlCLGdCQUFqQixDQUFrQyxFQUFsQyxFQUFzQyxRQUF0QyxFQUFnRCxlQUFoRCxDQUF2QjtBQUNBLE1BQU0sa0JBQWtCLE9BQU8sVUFBUCxDQUFrQixlQUExQztBQUNBLE1BQU0sZUFBZSxpQkFBaUIsa0JBQWpCLENBQW9DLGNBQXBDLENBQXJCO0FBQ0EsTUFBTSxlQUFlLGlCQUFpQixtQkFBakIsRUFBckI7QUFDQSxNQUFNLHFCQUFxQixpQkFBaUIsd0JBQWpCLEVBQTNCO0FBQ0EsTUFBSSxtQkFBbUIsaUJBQWlCLHNCQUFqQixFQUF2Qjs7QUFFQSxxQkFBbUIsaUJBQWlCLHNCQUFqQixDQUF3QyxnQkFBeEMsRUFDd0MsWUFEeEMsRUFFd0MsWUFGeEMsRUFHd0Msa0JBSHhDLENBQW5CO0FBSUEsbUJBQWlCLHFCQUFqQixDQUF1QyxlQUF2Qzs7QUFFQSxNQUFJLE9BQU8sTUFBUCxDQUFjLFNBQWQsQ0FBd0IsU0FBeEIsQ0FBa0MsV0FBbEMsR0FBZ0QsT0FBaEQsQ0FBd0QsU0FBeEQsTUFBdUUsQ0FBQyxDQUE1RSxFQUErRTtBQUM3RSxxQkFBaUIsb0JBQWpCO0FBQ0Q7O0FBRUQsbUJBQWlCLGdCQUFqQixDQUFrQyxhQUFhLEtBQS9DLEVBQ2tDLGVBQWUsR0FBZixFQUFvQixLQUR0RDs7QUFHQSxtQkFBaUIseUJBQWpCLENBQTJDLFlBQTNDOztBQUVBLG1CQUFpQixvQkFBakIsQ0FBc0MsZUFBdEMsRUFDc0MsZ0JBRHRDOztBQUdBLG1CQUFpQixhQUFqQixDQUErQixlQUEvQixFQUNnQyxnQkFEaEMsRUFFZ0MsY0FGaEMsRUFHZ0MsWUFIaEMsRUFJZ0MsWUFKaEMsRUFLZ0MsTUFMaEM7O0FBT0EsbUJBQWlCLGdCQUFqQixDQUFrQyxlQUFsQyxFQUNtQyxnQkFEbkMsRUFFbUMsTUFGbkM7QUFHRCxDQXJDRDs7QUF1Q0EsSUFBTSxnQkFBZ0IsU0FBaEIsYUFBZ0IsQ0FBQyxNQUFELEVBQVMsT0FBVCxFQUFxQjtBQUN6QyxNQUFJLE9BQU8sUUFBUCxFQUFKLEVBQXVCO0FBQ3JCLHlCQUFxQixNQUFyQixFQUE2QixPQUE3QjtBQUNEO0FBQ0QsU0FBTyxFQUFQLENBQVUsZ0JBQVYsRUFBNkIsWUFBTTtBQUNqQyx5QkFBcUIsTUFBckIsRUFBNkIsT0FBN0I7QUFDRCxHQUZEO0FBR0QsQ0FQRDtBQVFBOzs7Ozs7Ozs7Ozs7QUFZQSxJQUFNLGFBQWEsU0FBYixVQUFhLENBQVMsT0FBVCxFQUFrQjtBQUFBOztBQUNuQyxPQUFLLEtBQUwsQ0FBVyxZQUFNO0FBQ2Ysa0JBQWMsS0FBZCxFQUFvQixRQUFRLFlBQVIsQ0FBcUIsUUFBckIsRUFBK0IsT0FBL0IsQ0FBcEI7QUFDRCxHQUZEO0FBR0QsQ0FKRDs7QUFNQTtBQUNBLGVBQWUsWUFBZixFQUE2QixVQUE3Qjs7QUFFQTtBQUNBLFdBQVcsT0FBWCxHQUFxQixhQUFyQjs7QUFFQSxPQUFPLE9BQVAsR0FBaUIsVUFBakIiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciB2aWRlb2pzID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3ZpZGVvLmpzJykpO1xudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xuXG5jbGFzcyBUaHVtYm5haWxIZWxwZXJzIHtcblxuICBzdGF0aWMgaGlkZVBsYXllck9uSG92ZXJUaW1lKHByb2dyZXNzQ29udHJvbCkge1xuICAgIGNvbnN0IG1vdXNlVGltZSA9IHByb2dyZXNzQ29udHJvbC5lbF8uZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLW1vdXNlLWRpc3BsYXknKVswXTtcblxuICAgIG1vdXNlVGltZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbHMoLi4uYXJncykge1xuICAgIGNvbnN0IHRodW1ibmFpbENsaXAgPSBhcmdzLnNoaWZ0KCkgfHwge307XG5cbiAgICBPYmplY3Qua2V5cyhhcmdzKS5tYXAoKGkpID0+IHtcbiAgICAgIGNvbnN0IHNpbmdsZVRodW1ibmFpbCA9IGFyZ3NbaV07XG5cbiAgICAgIE9iamVjdC5rZXlzKHNpbmdsZVRodW1ibmFpbCkubWFwKChwcm9wZXJ0eSkgPT4ge1xuICAgICAgICBpZiAoc2luZ2xlVGh1bWJuYWlsLmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICAgIGlmICh0eXBlb2Ygc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XSA9PT0gJ29iamVjdCcpIHtcbiAgICAgICAgICAgIHRodW1ibmFpbENsaXBbcHJvcGVydHldID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbENsaXBbcHJvcGVydHldLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRodW1ibmFpbENsaXBbcHJvcGVydHldID0gc2luZ2xlVGh1bWJuYWlsW3Byb3BlcnR5XTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gICAgICB9KTtcbiAgICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xuICAgIH0pO1xuICAgIHJldHVybiB0aHVtYm5haWxDbGlwO1xuICB9XG5cbiAgc3RhdGljIGdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKSB7XG4gICAgcmV0dXJuIChwcm9wKSA9PiB7XG4gICAgICBpZiAoZ2xvYmFsLndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKSB7XG4gICAgICAgIHJldHVybiBnbG9iYWwud2luZG93LmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCwgcHNldWRvKVtwcm9wXTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aHVtYm5haWxDb250ZW50LmN1cnJlbnRTdHlsZVtwcm9wXTtcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldFZpc2libGVXaWR0aCh0aHVtYm5haWxDb250ZW50LCB3aWR0aCkge1xuICAgIGlmICh3aWR0aCkge1xuICAgICAgcmV0dXJuIHBhcnNlRmxvYXQod2lkdGgpO1xuICAgIH1cblxuICAgIGxldCBjbGlwID0gVGh1bWJuYWlsSGVscGVycy5nZXRDb21wdXRlZFN0eWxlKHRodW1ibmFpbENvbnRlbnQpKCdjbGlwJyk7XG5cbiAgICBpZiAoY2xpcCAhPT0gJ2F1dG8nICYmIGNsaXAgIT09ICdpbmhlcml0Jykge1xuICAgICAgY2xpcCA9IGNsaXAuc3BsaXQoLyg/OlxcKHxcXCkpLylbMV0uc3BsaXQoLyg/Oix8ICkvKTtcbiAgICAgIGlmIChjbGlwLmxlbmd0aCA9PT0gNCkge1xuICAgICAgICByZXR1cm4gKHBhcnNlRmxvYXQoY2xpcFsxXSkgLSBwYXJzZUZsb2F0KGNsaXBbM10pKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBzdGF0aWMgZ2V0U2Nyb2xsT2Zmc2V0KCkge1xuICAgIGlmIChnbG9iYWwud2luZG93LnBhZ2VYT2Zmc2V0KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB4OiBnbG9iYWwud2luZG93LnBhZ2VYT2Zmc2V0LFxuICAgICAgICB5OiBnbG9iYWwud2luZG93LnBhZ2VZT2Zmc2V0XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgeDogZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0LFxuICAgICAgeTogZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3BcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIHN1cHBvcnRBbmRyb2lkRXZlbnRzKHBsYXllcikge1xuICAgIC8vIEFuZHJvaWQgZG9lc24ndCBzdXBwb3J0IDphY3RpdmUgYW5kIDpob3ZlciBvbiBub24tYW5jaG9yIGFuZCBub24tYnV0dG9uIGVsZW1lbnRzXG4gICAgLy8gc28sIHdlIG5lZWQgdG8gZmFrZSB0aGUgOmFjdGl2ZSBzZWxlY3RvciBmb3IgdGh1bWJuYWlscyB0byBzaG93IHVwLlxuICAgIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcblxuICAgIGNvbnN0IGFkZEZha2VBY3RpdmUgPSAoKSA9PiB7XG4gICAgICBwcm9ncmVzc0NvbnRyb2wuYWRkQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIGNvbnN0IHJlbW92ZUZha2VBY3RpdmUgPSAoKSA9PiB7XG4gICAgICBwcm9ncmVzc0NvbnRyb2wucmVtb3ZlQ2xhc3MoJ2Zha2UtYWN0aXZlJyk7XG4gICAgfTtcblxuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hzdGFydCcsIGFkZEZha2VBY3RpdmUpO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hlbmQnLCByZW1vdmVGYWtlQWN0aXZlKTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgcmVtb3ZlRmFrZUFjdGl2ZSk7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpIHtcbiAgICBjb25zdCB3cmFwID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgd3JhcC5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1ob2xkZXInO1xuICAgIHJldHVybiB3cmFwO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcykge1xuICAgIGNvbnN0IHRodW1ibmFpbEltZyA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIHRodW1ibmFpbEltZy5zcmMgPSB0aHVtYm5haWxDbGlwc1snMCddLnNyYztcbiAgICB0aHVtYm5haWxJbWcuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtaW1nJztcbiAgICByZXR1cm4gdGh1bWJuYWlsSW1nO1xuICB9XG5cbiAgc3RhdGljIGNyZWF0ZVRodW1ibmFpbFRpbWUoKSB7XG4gICAgY29uc3QgdGltZSA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIHRpbWUuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtdGltZSc7XG4gICAgdGltZS5pZCA9ICd2anMtdGltZSc7XG4gICAgcmV0dXJuIHRpbWU7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsQXJyb3dEb3duKCkge1xuICAgIGNvbnN0IGFycm93ID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgYXJyb3cuY2xhc3NOYW1lID0gJ3Zqcy10aHVtYm5haWwtYXJyb3cnO1xuICAgIGFycm93LmlkID0gJ3Zqcy1hcnJvdyc7XG4gICAgcmV0dXJuIGFycm93O1xuICB9XG5cbiAgc3RhdGljIG1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bikge1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aHVtYm5haWxJbWcpO1xuICAgIHRodW1ibmFpbHNIb2xkZXIuYXBwZW5kQ2hpbGQodGltZWxpbmVUaW1lKTtcbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEFycm93RG93bik7XG4gICAgcmV0dXJuIHRodW1ibmFpbHNIb2xkZXI7XG4gIH1cblxuICBzdGF0aWMgY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpIHtcbiAgICAvLyBjZW50ZXIgdGhlIHRodW1ibmFpbCBvdmVyIHRoZSBjdXJzb3IgaWYgYW4gb2Zmc2V0IHdhc24ndCBwcm92aWRlZFxuICAgIGlmICghdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgJiYgIXRodW1ibmFpbEltZy5zdHlsZS5yaWdodCkge1xuICAgICAgdGh1bWJuYWlsSW1nLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgdGh1bWJuYWlsV2lkdGggPSB7IHdpZHRoOiAtKHRodW1ibmFpbEltZy5uYXR1cmFsV2lkdGggLyAyKSB9O1xuXG4gICAgICAgIHRodW1ibmFpbEltZy5zdHlsZS5sZWZ0ID0gYCR7dGh1bWJuYWlsV2lkdGh9cHhgO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgZ2V0VmlkZW9EdXJhdGlvbihwbGF5ZXIpIHtcbiAgICBsZXQgZHVyYXRpb24gPSBwbGF5ZXIuZHVyYXRpb24oKTtcblxuICAgIHBsYXllci5vbignZHVyYXRpb25jaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xuICAgIH0pO1xuICAgIHJldHVybiBkdXJhdGlvbjtcbiAgfVxuXG4gIHN0YXRpYyBhZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBwcm9ncmVzc0NvbnRyb2wuZWwoKS5hcHBlbmRDaGlsZCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgfVxuXG4gIHN0YXRpYyBmaW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCwgcHJvZ3Jlc3NDb250cm9sLCBwYWdlWE9mZnNldCwgZXZlbnQpIHtcbiAgICAvLyBmaW5kIHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgbW91c2VcbiAgICBsZXQgbGVmdE9mZnNldCA9IHBhZ2VNb3VzZVBvc2l0aW9uWCB8fCAoZXZlbnQuY2xpZW50WCArXG4gICAgICAgICAgICAgICAgICAgICBnbG9iYWwuZG9jdW1lbnQuYm9keS5zY3JvbGxMZWZ0ICsgZ2xvYmFsLmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxMZWZ0KTtcblxuICAgIC8vIHN1YnRyYWN0IHRoZSBwYWdlIG9mZnNldCBvZiB0aGUgcG9zaXRpb25lZCBvZmZzZXQgcGFyZW50XG4gICAgbGVmdE9mZnNldCAtPSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5cbiAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgKyBwYWdlWE9mZnNldDtcbiAgICByZXR1cm4gbGVmdE9mZnNldDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRNb3VzZVZpZGVvVGltZShtb3VzZUxlZnRPZmZzZXQsIHByb2dyZXNzQ29udHJvbCwgZHVyYXRpb24pIHtcbiAgICByZXR1cm4gTWF0aC5mbG9vcigobW91c2VMZWZ0T2Zmc2V0IC0gcHJvZ3Jlc3NDb250cm9sLmVsKCkub2Zmc2V0TGVmdCkgL1xuICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wud2lkdGgoKSAqIGR1cmF0aW9uKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxUaW1lKHRpbWVsaW5lVGltZSwgcHJvZ3Jlc3NDb250cm9sKSB7XG4gICAgdGltZWxpbmVUaW1lLmlubmVySFRNTCA9IChwcm9ncmVzc0NvbnRyb2wuc2Vla0Jhci5tb3VzZVRpbWVEaXNwbGF5LmVsXy5pbm5lclRleHQpO1xuICB9XG5cbiAgc3RhdGljIGdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCkge1xuICAgIGxldCBwYWdlTW91c2VPZmZzZXRYID0gZXZlbnQucGFnZVg7XG5cbiAgICBpZiAoZXZlbnQuY2hhbmdlZFRvdWNoZXMpIHtcbiAgICAgIHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWDtcbiAgICB9XG4gICAgcmV0dXJuIHBhZ2VNb3VzZU9mZnNldFg7XG4gIH1cblxuICBzdGF0aWMga2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0KSB7XG5cbiAgICBjb25zdCB3aWR0aCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbEltZywgYWN0aXZlVGh1bWJuYWlsLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwc1swXS53aWR0aCk7XG5cbiAgICBjb25zdCBoYWxmV2lkdGggPSB3aWR0aCAvIDI7XG5cbiAgICAvLyBtYWtlIHN1cmUgdGhhdCB0aGUgdGh1bWJuYWlsIGRvZXNuJ3QgZmFsbCBvZmYgdGhlIHJpZ2h0IHNpZGUgb2ZcbiAgICAvLyB0aGUgbGVmdCBzaWRlIG9mIHRoZSBwbGF5ZXJcbiAgICBpZiAoKG1vdXNlTGVmdE9mZnNldCArIGhhbGZXaWR0aCkgPiBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcbiAgICAgIG1vdXNlTGVmdE9mZnNldCAtPSAobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSAtIHByb2dyZXNCYXJSaWdodE9mZnNldDtcbiAgICB9IGVsc2UgaWYgKG1vdXNlTGVmdE9mZnNldCA8IGhhbGZXaWR0aCkge1xuICAgICAgbW91c2VMZWZ0T2Zmc2V0ID0gaGFsZldpZHRoO1xuICAgIH1cbiAgICByZXR1cm4gbW91c2VMZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpIHtcbiAgICBjb25zdCBsZWZ0VmFsdWUgPSB7IG1vdXNlTGVmdE9mZnNldCB9O1xuXG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gYCR7bGVmdFZhbHVlLm1vdXNlTGVmdE9mZnNldH1weGA7XG4gIH1cblxuICBzdGF0aWMgZ2V0QWN0aXZlVGh1bWJuYWlsKHRodW1ibmFpbENsaXBzLCBtb3VzZVRpbWUpIHtcbiAgICBsZXQgYWN0aXZlQ2xpcCA9IDA7XG5cbiAgICBmb3IgKGNvbnN0IGNsaXBOdW1iZXIgaW4gdGh1bWJuYWlsQ2xpcHMpIHtcbiAgICAgIGlmIChtb3VzZVRpbWUgPiBjbGlwTnVtYmVyKSB7XG4gICAgICAgIGFjdGl2ZUNsaXAgPSBNYXRoLm1heChhY3RpdmVDbGlwLCBjbGlwTnVtYmVyKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXBzW2FjdGl2ZUNsaXBdO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3JjICYmIHRodW1ibmFpbEltZy5zcmMgIT09IGFjdGl2ZVRodW1ibmFpbC5zcmMpIHtcbiAgICAgIHRodW1ibmFpbEltZy5zcmMgPSBhY3RpdmVUaHVtYm5haWwuc3JjO1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVUaHVtYm5haWxTdHlsZShhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZykge1xuICAgIGlmIChhY3RpdmVUaHVtYm5haWwuc3R5bGUgJiYgdGh1bWJuYWlsSW1nLnN0eWxlICE9PSBhY3RpdmVUaHVtYm5haWwuc3R5bGUpIHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh0aHVtYm5haWxJbWcuc3R5bGUsIGFjdGl2ZVRodW1ibmFpbC5zdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIG1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nKSB7XG4gICAgY29uc3QgcGFnZVhPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmdldFNjcm9sbE9mZnNldCgpLng7XG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJQb3NpdGlvbiA9IHByb2dyZXNzQ29udHJvbC5lbCgpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgY29uc3QgcHJvZ3Jlc3NCYXJSaWdodE9mZnNldCA9IChwcm9ncmVzc0JhclBvc2l0aW9uLndpZHRoIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyUG9zaXRpb24ucmlnaHQpICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVhPZmZzZXQ7XG5cbiAgICBjb25zdCBwYWdlTW91c2VQb3NpdGlvblggPSBUaHVtYm5haWxIZWxwZXJzLmdldFBhZ2VNb3VzZVBvc2l0aW9uWChldmVudCk7XG5cbiAgICBsZXQgbW91c2VMZWZ0T2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5maW5kTW91c2VMZWZ0T2Zmc2V0KHBhZ2VNb3VzZVBvc2l0aW9uWCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBhZ2VYT2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQpO1xuXG4gICAgY29uc3QgbW91c2VUaW1lID0gVGh1bWJuYWlsSGVscGVycy5wYXJzZURpc3BsYXlUaW1lKHRpbWVsaW5lVGltZS5pbm5lclRleHQpO1xuXG4gICAgY29uc3QgYWN0aXZlVGh1bWJuYWlsID0gVGh1bWJuYWlsSGVscGVycy5nZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VUaW1lKTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsVGltZSh0aW1lbGluZVRpbWUsIHByb2dyZXNzQ29udHJvbCk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFNyYyhhY3RpdmVUaHVtYm5haWwsIHRodW1ibmFpbEltZyk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcblxuICAgIG1vdXNlTGVmdE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMua2VlcFRodW1ibmFpbEluc2lkZVBsYXllcih0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVUaHVtYm5haWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1vdXNlTGVmdE9mZnNldCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQmFyUmlnaHRPZmZzZXQpO1xuXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxMZWZ0U3R5bGUobW91c2VMZWZ0T2Zmc2V0LCB0aHVtYm5haWxzSG9sZGVyKTtcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpIHtcblxuICAgIC8vIHVwZGF0ZSB0aGUgdGh1bWJuYWlsIHdoaWxlIGhvdmVyaW5nXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCdtb3VzZW1vdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMubW92ZUxpc3RlbmVyKGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNobW92ZScsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcikge1xuICAgIHRodW1ibmFpbHNIb2xkZXIuc3R5bGUubGVmdCA9ICctMTAwMHB4JztcbiAgfVxuXG4gIHN0YXRpYyB1cGRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlciwgcGxheWVyKSB7XG5cbiAgICAvLyBtb3ZlIHRoZSBwbGFjZWhvbGRlciBvdXQgb2YgdGhlIHdheSB3aGVuIG5vdCBob3ZlcmluZ1xuICAgIHByb2dyZXNzQ29udHJvbC5vbignbW91c2VvdXQnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoY2FuY2VsJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGVuZCcsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICAgIHBsYXllci5vbigndXNlcmluYWN0aXZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgcGFyc2VEaXNwbGF5VGltZSh0aW1lKSB7XG4gICAgY29uc3QgcGFydHMgPSB0aW1lLnNwbGl0KCc6Jyk7XG4gICAgbGV0IHNlY29uZHMgPSAwO1xuICAgIGxldCBmYWN0b3IgPSAxO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGlmIChwYXJ0cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhcnQgPSBwYXJ0cy5wb3AoKTtcblxuICAgICAgc2Vjb25kcyArPSBwYXJ0ICogZmFjdG9yO1xuICAgICAgZmFjdG9yICo9IDYwO1xuICAgIH1cbiAgICByZXR1cm4gc2Vjb25kcztcbiAgfVxufVxuXG4vLyBEZWZhdWx0IG9wdGlvbnMgZm9yIHRoZSBwbHVnaW4uXG5jb25zdCBkZWZhdWx0cyA9IHt9O1xuXG4vLyBDcm9zcy1jb21wYXRpYmlsaXR5IGZvciBWaWRlby5qcyA1IGFuZCA2LlxuY29uc3QgcmVnaXN0ZXJQbHVnaW4gPSB2aWRlb2pzLnJlZ2lzdGVyUGx1Z2luIHx8IHZpZGVvanMucGx1Z2luO1xuLy8gY29uc3QgZG9tID0gdmlkZW9qcy5kb20gfHwgdmlkZW9qcztcblxuLyoqXG4gKiBGdW5jdGlvbiB0byBpbnZva2Ugd2hlbiB0aGUgcGxheWVyIGlzIHJlYWR5LlxuICpcbiAqIFRoaXMgaXMgYSBncmVhdCBwbGFjZSBmb3IgeW91ciBwbHVnaW4gdG8gaW5pdGlhbGl6ZSBpdHNlbGYuIFdoZW4gdGhpc1xuICogZnVuY3Rpb24gaXMgY2FsbGVkLCB0aGUgcGxheWVyIHdpbGwgaGF2ZSBpdHMgRE9NIGFuZCBjaGlsZCBjb21wb25lbnRzXG4gKiBpbiBwbGFjZS5cbiAqXG4gKiBAZnVuY3Rpb24gb25QbGF5ZXJSZWFkeVxuICogQHBhcmFtICAgIHtQbGF5ZXJ9IHBsYXllclxuICogICAgICAgICAgIEEgVmlkZW8uanMgcGxheWVyLlxuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxuICovXG5cbmNvbnN0IHByZXBhcmVUaHVtYm5haWxzQ2xpcHMgPSAodmlkZW9UaW1lLCBvcHRpb25zKSA9PiB7XG5cbiAgbGV0IGN1cnJlbnRUaW1lID0gMDtcbiAgbGV0IGN1cnJlbnRJdGVyYXRpb24gPSAwO1xuICBsZXQgdGh1bWJuYWlsT2Zmc2V0ID0gMDtcbiAgY29uc3Qgc3RlcFRpbWUgPSBvcHRpb25zLnN0ZXBUaW1lO1xuICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IG9wdGlvbnMud2lkdGg7XG4gIGNvbnN0IHRodW1ic1BlckltYWdlID0gb3B0aW9ucy5wZXJJbWFnZTtcbiAgY29uc3QgaW5pdGlhbFNwcml0ZVVybCA9IG9wdGlvbnMuc3ByaXRlVXJsLnJlcGxhY2UoJyVkJywgMSk7XG4gIGNvbnN0IHRodW1ibmFpbENsaXBzID0ge1xuICAgIDA6IHtcbiAgICAgIHNyYzogaW5pdGlhbFNwcml0ZVVybCxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIGxlZnQ6ICh0aHVtYm5haWxXaWR0aCAvIDIgKiAtMSkgKyAncHgnLFxuICAgICAgICB3aWR0aDogKHRodW1ic1BlckltYWdlICogdGh1bWJuYWlsV2lkdGgpICsgJ3B4JyxcbiAgICAgICAgY2xpcDogJ3JlY3QoMCwnICsgb3B0aW9ucy53aWR0aCArICdweCwnICsgb3B0aW9ucy53aWR0aCArICdweCwgMCknXG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIHdoaWxlIChjdXJyZW50VGltZSA8PSB2aWRlb1RpbWUpIHtcbiAgICBjdXJyZW50VGltZSArPSBzdGVwVGltZTtcbiAgICB0aHVtYm5haWxPZmZzZXQgPSAoKytjdXJyZW50SXRlcmF0aW9uICUgdGh1bWJzUGVySW1hZ2UpICogdGh1bWJuYWlsV2lkdGg7XG4gICAgY29uc3Qgc3ByaXRlTnVtID0gTWF0aC5mbG9vcihjdXJyZW50VGltZSAvIChzdGVwVGltZSAqIHRodW1ic1BlckltYWdlKSkgKyAxO1xuICAgIGNvbnN0IHNwcml0ZVVSTCA9IG9wdGlvbnMuc3ByaXRlVXJsLnJlcGxhY2UoJyVkJywgc3ByaXRlTnVtKTtcblxuICAgIHRodW1ibmFpbENsaXBzW2N1cnJlbnRUaW1lXSA9IHtcbiAgICAgIHNyYzogc3ByaXRlVVJMLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgbGVmdDogKCh0aHVtYm5haWxXaWR0aCAvIDIgKyB0aHVtYm5haWxPZmZzZXQpICogLTEpICsgJ3B4JyxcbiAgICAgICAgY2xpcDogJ3JlY3QoMCwgJyArICh0aHVtYm5haWxXaWR0aCArIHRodW1ibmFpbE9mZnNldCkgKyAncHgsJyArXG4gICAgICAgICAgICAgIG9wdGlvbnMud2lkdGggKyAncHgsICcgKyB0aHVtYm5haWxPZmZzZXQgKyAncHgpJ1xuICAgICAgfVxuICAgIH07XG4gIH1cbiAgcmV0dXJuIHRodW1ibmFpbENsaXBzO1xufTtcblxuY29uc3QgaW5pdGlhbGl6ZVRodW1ibmFpbHMgPSAocGxheWVyLCBvcHRpb25zKSA9PiB7XG4gIGNvbnN0IHRodW1ibmFpbHNDbGlwcyA9IHByZXBhcmVUaHVtYm5haWxzQ2xpcHMocGxheWVyLmR1cmF0aW9uKCksIG9wdGlvbnMpO1xuICBjb25zdCB0aHVtYm5haWxDbGlwcyA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlscyh7fSwgZGVmYXVsdHMsIHRodW1ibmFpbHNDbGlwcyk7XG4gIGNvbnN0IHByb2dyZXNzQ29udHJvbCA9IHBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbDtcbiAgY29uc3QgdGh1bWJuYWlsSW1nID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxJbWcodGh1bWJuYWlsQ2xpcHMpO1xuICBjb25zdCB0aW1lbGluZVRpbWUgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbFRpbWUoKTtcbiAgY29uc3QgdGh1bWJuYWlsQXJyb3dEb3duID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxBcnJvd0Rvd24oKTtcbiAgbGV0IHRodW1ibmFpbHNIb2xkZXIgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpc2xIb2xkZXIoKTtcblxuICB0aHVtYm5haWxzSG9sZGVyID0gVGh1bWJuYWlsSGVscGVycy5tZXJnZVRodW1ibmFpbEVsZW1lbnRzKHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxBcnJvd0Rvd24pO1xuICBUaHVtYm5haWxIZWxwZXJzLmhpZGVQbGF5ZXJPbkhvdmVyVGltZShwcm9ncmVzc0NvbnRyb2wpO1xuXG4gIGlmIChnbG9iYWwud2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQudG9Mb3dlckNhc2UoKS5pbmRleE9mKCdhbmRyb2lkJykgIT09IC0xKSB7XG4gICAgVGh1bWJuYWlsSGVscGVycy5zdXBwb3J0QW5kcm9pZEV2ZW50cygpO1xuICB9XG5cbiAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWycwJ10uc3R5bGUpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuY2VudGVyVGh1bWJuYWlsT3ZlckN1cnNvcih0aHVtYm5haWxJbWcpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMuYWRkVGh1bWJuYWlsVG9QbGF5ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIpO1xuXG4gIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlT25Ib3Zlcihwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsSW1nLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG5cbiAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVPbkhvdmVyT3V0KHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBsYXllcik7XG59O1xuXG5jb25zdCBvblBsYXllclJlYWR5ID0gKHBsYXllciwgb3B0aW9ucykgPT4ge1xuICBpZiAocGxheWVyLmR1cmF0aW9uKCkpIHtcbiAgICBpbml0aWFsaXplVGh1bWJuYWlscyhwbGF5ZXIsIG9wdGlvbnMpO1xuICB9XG4gIHBsYXllci5vbignbG9hZGVkbWV0YWRhdGEnLCAoKCkgPT4ge1xuICAgIGluaXRpYWxpemVUaHVtYm5haWxzKHBsYXllciwgb3B0aW9ucyk7XG4gIH0pKTtcbn07XG4vKipcbiAqIEEgdmlkZW8uanMgcGx1Z2luLlxuICpcbiAqIEluIHRoZSBwbHVnaW4gZnVuY3Rpb24sIHRoZSB2YWx1ZSBvZiBgdGhpc2AgaXMgYSB2aWRlby5qcyBgUGxheWVyYFxuICogaW5zdGFuY2UuIFlvdSBjYW5ub3QgcmVseSBvbiB0aGUgcGxheWVyIGJlaW5nIGluIGEgXCJyZWFkeVwiIHN0YXRlIGhlcmUsXG4gKiBkZXBlbmRpbmcgb24gaG93IHRoZSBwbHVnaW4gaXMgaW52b2tlZC4gVGhpcyBtYXkgb3IgbWF5IG5vdCBiZSBpbXBvcnRhbnRcbiAqIHRvIHlvdTsgaWYgbm90LCByZW1vdmUgdGhlIHdhaXQgZm9yIFwicmVhZHlcIiFcbiAqXG4gKiBAZnVuY3Rpb24gdGh1bWJuYWlsc1xuICogQHBhcmFtICAgIHtPYmplY3R9IFtvcHRpb25zPXt9XVxuICogICAgICAgICAgIEFuIG9iamVjdCBvZiBvcHRpb25zIGxlZnQgdG8gdGhlIHBsdWdpbiBhdXRob3IgdG8gZGVmaW5lLlxuICovXG5jb25zdCB0aHVtYm5haWxzID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICB0aGlzLnJlYWR5KCgpID0+IHtcbiAgICBvblBsYXllclJlYWR5KHRoaXMsIHZpZGVvanMubWVyZ2VPcHRpb25zKGRlZmF1bHRzLCBvcHRpb25zKSk7XG4gIH0pO1xufTtcblxuLy8gUmVnaXN0ZXIgdGhlIHBsdWdpbiB3aXRoIHZpZGVvLmpzLlxucmVnaXN0ZXJQbHVnaW4oJ3RodW1ibmFpbHMnLCB0aHVtYm5haWxzKTtcblxuLy8gSW5jbHVkZSB0aGUgdmVyc2lvbiBudW1iZXIuXG50aHVtYm5haWxzLlZFUlNJT04gPSAnX19WRVJTSU9OX18nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRodW1ibmFpbHM7XG4iXX0=
