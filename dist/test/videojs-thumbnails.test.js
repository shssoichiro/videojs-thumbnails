(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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

var global = require(1);
var QUnit = _interopDefault((typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null));
var sinon = _interopDefault((typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null));
var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));

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

var Player = videojs.getComponent('Player');

QUnit.module('sanity tests');

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof sinon === 'undefined' ? 'undefined' : _typeof(sinon), 'object', 'sinon exists');
  assert.strictEqual(typeof videojs === 'undefined' ? 'undefined' : _typeof(videojs), 'function', 'videojs exists');
  assert.strictEqual(typeof thumbnails === 'undefined' ? 'undefined' : _typeof(thumbnails), 'function', 'plugin is a function');
});

QUnit.module('videojs-thumbnails', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!

    this.prepareTresholds = {
      width: 100,
      spriteUrl: 'http://placehold.it/350x150',
      stepTime: 2
    };

    this.clock = sinon.useFakeTimers();

    this.fixture = global.document.getElementById('qunit-fixture');
    this.video = global.document.createElement('video');
    this.fixture.appendChild(this.video);
    this.player = videojs(this.video);
  },
  afterEach: function afterEach() {
    this.player.dispose();
    this.clock.restore();
  }
});

QUnit.test('registers itself with video.js', function (assert) {

  assert.expect(8);

  assert.strictEqual(_typeof(Player.prototype.thumbnails), 'function', 'videojs-thumbnails plugin was registered');

  this.player.thumbnails(this.prepareTresholds);
  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);
  this.player.trigger('loadedmetadata');

  assert.equal(1, this.player.contentEl().getElementsByClassName('vjs-thumbnail-holder').length, 'The plugin adds a wrapper div with class vjs-thumbnail-holder to the player');

  assert.equal(1, this.player.contentEl().getElementsByClassName('vjs-thumbnail-img').length, 'The plugin adds thumbnail image  with class vjs-thumbnail-img to the player');

  assert.equal(1, this.player.contentEl().getElementsByClassName('vjs-thumbnail-time').length, 'The plugin adds tile div with class vjs-thumbnail-time to the player');

  assert.equal(1, this.player.contentEl().getElementsByClassName('vjs-thumbnail-arrow').length, 'The plugin adds thumbnail arrow down elwment');

  this.image = this.player.contentEl().getElementsByClassName('vjs-thumbnail-img')[0];

  assert.equal('http://placehold.it/350x150', this.image.src, 'The plugin adds thumbnail image with correct src url');

  assert.equal('rect(0px, 100px, 100px, 0px)', this.image.style.clip, 'The plugin adds thumbnail image with necessary styles');

  assert.equal('-50px', this.image.style.left, 'The plugin adds thumbnail image with correct left positioning');
});

QUnit.test('Thumbnail behaviour when mouse hover', function (assert) {

  assert.expect(3);

  assert.strictEqual(_typeof(Player.prototype.thumbnails), 'function', 'videojs-thumbnails plugin was registered');

  this.player.thumbnails(this.prepareTresholds);
  this.clock.tick(1);
  this.player.trigger('loadedmetadata');

  var thumbnaislHolder = this.player.contentEl().getElementsByClassName('vjs-thumbnail-holder')[0];

  ThumbnailHelpers.updateThumbnailLeftStyle(200, thumbnaislHolder);

  assert.equal('200px', thumbnaislHolder.style.left, 'The plugin should add styles left to the holder element on hover');

  ThumbnailHelpers.hideThumbnail(thumbnaislHolder);

  assert.equal('-1000px', thumbnaislHolder.style.left, 'The plugin adds left styles to the holder elemend and hide it when mouse out');
});

},{"1":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInRlc3QvaW5kZXgudGVzdC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDYkE7Ozs7Ozs7O0FBRUEsU0FBUyxlQUFULENBQTBCLEVBQTFCLEVBQThCO0FBQUUsU0FBUSxNQUFPLFFBQU8sRUFBUCx5Q0FBTyxFQUFQLE9BQWMsUUFBckIsSUFBa0MsYUFBYSxFQUFoRCxHQUFzRCxHQUFHLFNBQUgsQ0FBdEQsR0FBc0UsRUFBN0U7QUFBa0Y7O0FBRWxILElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQUksUUFBUSxnQkFBZ0IsUUFBUSxTQUFSLENBQWhCLENBQVo7QUFDQSxJQUFJLFFBQVEsZ0JBQWdCLFFBQVEsT0FBUixDQUFoQixDQUFaO0FBQ0EsSUFBSSxVQUFVLGdCQUFnQixRQUFRLFVBQVIsQ0FBaEIsQ0FBZDs7SUFFTSxnQjs7Ozs7OzswQ0FFeUIsZSxFQUFpQjtBQUM1QyxVQUFNLFlBQVksZ0JBQWdCLEdBQWhCLENBQW9CLHNCQUFwQixDQUEyQyxtQkFBM0MsRUFBZ0UsQ0FBaEUsQ0FBbEI7O0FBRUEsZ0JBQVUsS0FBVixDQUFnQixPQUFoQixHQUEwQixNQUExQjtBQUNEOzs7dUNBRWdDO0FBQUEsd0NBQU4sSUFBTTtBQUFOLFlBQU07QUFBQTs7QUFDL0IsVUFBTSxnQkFBZ0IsS0FBSyxLQUFMLE1BQWdCLEVBQXRDOztBQUVBLGFBQU8sSUFBUCxDQUFZLElBQVosRUFBa0IsR0FBbEIsQ0FBc0IsVUFBQyxDQUFELEVBQU87QUFDM0IsWUFBTSxrQkFBa0IsS0FBSyxDQUFMLENBQXhCOztBQUVBLGVBQU8sSUFBUCxDQUFZLGVBQVosRUFBNkIsR0FBN0IsQ0FBaUMsVUFB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LHdCQUFqQixDQUEwQyxHQUExQyxFQUErQyxnQkFBL0M7O0FBRUEsU0FBTyxLQUFQLENBQ0UsT0FERixFQUVFLGlCQUFpQixLQUFqQixDQUF1QixJQUZ6QixFQUdFLGtFQUhGOztBQU1BLG1CQUFpQixhQUFqQixDQUErQixnQkFBL0I7O0FBRUEsU0FBTyxLQUFQLENBQ0UsU0FERixFQUVFLGlCQUFpQixLQUFqQixDQUF1QixJQUZ6QixFQUdFLDhFQUhGO0FBS0QsQ0FoQ0QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsIid1c2Ugc3RyaWN0JztcblxuZnVuY3Rpb24gX2ludGVyb3BEZWZhdWx0IChleCkgeyByZXR1cm4gKGV4ICYmICh0eXBlb2YgZXggPT09ICdvYmplY3QnKSAmJiAnZGVmYXVsdCcgaW4gZXgpID8gZXhbJ2RlZmF1bHQnXSA6IGV4OyB9XG5cbnZhciBnbG9iYWwgPSByZXF1aXJlKCdnbG9iYWwnKTtcbnZhciBRVW5pdCA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCdxdW5pdGpzJykpO1xudmFyIHNpbm9uID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3Npbm9uJykpO1xudmFyIHZpZGVvanMgPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgndmlkZW8uanMnKSk7XG5cbmNsYXNzIFRodW1ibmFpbEhlbHBlcnMge1xuXG4gIHN0YXRpYyBoaWRlUGxheWVyT25Ib3ZlclRpbWUocHJvZ3Jlc3NDb250cm9sKSB7XG4gICAgY29uc3QgbW91c2VUaW1lID0gcHJvZ3Jlc3NDb250cm9sLmVsXy5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtbW91c2UtZGlzcGxheScpWzBdO1xuXG4gICAgbW91c2VUaW1lLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlscyguLi5hcmdzKSB7XG4gICAgY29uc3QgdGh1bWJuYWlsQ2xpcCA9IGFyZ3Muc2hpZnQoKSB8fCB7fTtcblxuICAgIE9iamVjdC5rZXlzKGFyZ3MpLm1hcCgoaSkgPT4ge1xuICAgICAgY29uc3Qgc2luZ2xlVGh1bWJuYWlsID0gYXJnc1tpXTtcblxuICAgICAgT2JqZWN0LmtleXMoc2luZ2xlVGh1bWJuYWlsKS5tYXAoKHByb3BlcnR5KSA9PiB7XG4gICAgICAgIGlmIChzaW5nbGVUaHVtYm5haWwuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHModGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcFtwcm9wZXJ0eV0gPSBzaW5nbGVUaHVtYm5haWxbcHJvcGVydHldO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gICAgfSk7XG4gICAgcmV0dXJuIHRodW1ibmFpbENsaXA7XG4gIH1cblxuICBzdGF0aWMgZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pIHtcbiAgICByZXR1cm4gKHByb3ApID0+IHtcbiAgICAgIGlmIChnbG9iYWwud2luZG93LmdldENvbXB1dGVkU3R5bGUpIHtcbiAgICAgICAgcmV0dXJuIGdsb2JhbC53aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aHVtYm5haWxDb250ZW50LCBwc2V1ZG8pW3Byb3BdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHRodW1ibmFpbENvbnRlbnQuY3VycmVudFN0eWxlW3Byb3BdO1xuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0VmlzaWJsZVdpZHRoKHRodW1ibmFpbENvbnRlbnQsIHdpZHRoKSB7XG4gICAgaWYgKHdpZHRoKSB7XG4gICAgICByZXR1cm4gcGFyc2VGbG9hdCh3aWR0aCk7XG4gICAgfVxuXG4gICAgbGV0IGNsaXAgPSBUaHVtYm5haWxIZWxwZXJzLmdldENvbXB1dGVkU3R5bGUodGh1bWJuYWlsQ29udGVudCkoJ2NsaXAnKTtcblxuICAgIGlmIChjbGlwICE9PSAnYXV0bycgJiYgY2xpcCAhPT0gJ2luaGVyaXQnKSB7XG4gICAgICBjbGlwID0gY2xpcC5zcGxpdCgvKD86XFwofFxcKSkvKVsxXS5zcGxpdCgvKD86LHwgKS8pO1xuICAgICAgaWYgKGNsaXAubGVuZ3RoID09PSA0KSB7XG4gICAgICAgIHJldHVybiAocGFyc2VGbG9hdChjbGlwWzFdKSAtIHBhcnNlRmxvYXQoY2xpcFszXSkpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRTY3JvbGxPZmZzZXQoKSB7XG4gICAgaWYgKGdsb2JhbC53aW5kb3cucGFnZVhPZmZzZXQpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHg6IGdsb2JhbC53aW5kb3cucGFnZVhPZmZzZXQsXG4gICAgICAgIHk6IGdsb2JhbC53aW5kb3cucGFnZVlPZmZzZXRcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICB4OiBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQsXG4gICAgICB5OiBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbFRvcFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgc3VwcG9ydEFuZHJvaWRFdmVudHMocGxheWVyKSB7XG4gICAgLy8gQW5kcm9pZCBkb2Vzbid0IHN1cHBvcnQgOmFjdGl2ZSBhbmQgOmhvdmVyIG9uIG5vbi1hbmNob3IgYW5kIG5vbi1idXR0b24gZWxlbWVudHNcbiAgICAvLyBzbywgd2UgbmVlZCB0byBmYWtlIHRoZSA6YWN0aXZlIHNlbGVjdG9yIGZvciB0aHVtYm5haWxzIHRvIHNob3cgdXAuXG4gICAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xuXG4gICAgY29uc3QgYWRkRmFrZUFjdGl2ZSA9ICgpID0+IHtcbiAgICAgIHByb2dyZXNzQ29udHJvbC5hZGRDbGFzcygnZmFrZS1hY3RpdmUnKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcmVtb3ZlRmFrZUFjdGl2ZSA9ICgpID0+IHtcbiAgICAgIHByb2dyZXNzQ29udHJvbC5yZW1vdmVDbGFzcygnZmFrZS1hY3RpdmUnKTtcbiAgICB9O1xuXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaHN0YXJ0JywgYWRkRmFrZUFjdGl2ZSk7XG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCd0b3VjaGVuZCcsIHJlbW92ZUZha2VBY3RpdmUpO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hjYW5jZWwnLCByZW1vdmVGYWtlQWN0aXZlKTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haXNsSG9sZGVyKCkge1xuICAgIGNvbnN0IHdyYXAgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICB3cmFwLmNsYXNzTmFtZSA9ICd2anMtdGh1bWJuYWlsLWhvbGRlcic7XG4gICAgcmV0dXJuIHdyYXA7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsSW1nKHRodW1ibmFpbENsaXBzKSB7XG4gICAgY29uc3QgdGh1bWJuYWlsSW1nID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgdGh1bWJuYWlsSW1nLnNyYyA9IHRodW1ibmFpbENsaXBzWycwJ10uc3JjO1xuICAgIHRodW1ibmFpbEltZy5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1pbWcnO1xuICAgIHJldHVybiB0aHVtYm5haWxJbWc7XG4gIH1cblxuICBzdGF0aWMgY3JlYXRlVGh1bWJuYWlsVGltZSgpIHtcbiAgICBjb25zdCB0aW1lID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgdGltZS5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC10aW1lJztcbiAgICB0aW1lLmlkID0gJ3Zqcy10aW1lJztcbiAgICByZXR1cm4gdGltZTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVUaHVtYm5haWxBcnJvd0Rvd24oKSB7XG4gICAgY29uc3QgYXJyb3cgPSBnbG9iYWwuZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBhcnJvdy5jbGFzc05hbWUgPSAndmpzLXRodW1ibmFpbC1hcnJvdyc7XG4gICAgYXJyb3cuaWQgPSAndmpzLWFycm93JztcbiAgICByZXR1cm4gYXJyb3c7XG4gIH1cblxuICBzdGF0aWMgbWVyZ2VUaHVtYm5haWxFbGVtZW50cyh0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQXJyb3dEb3duKSB7XG5cbiAgICB0aHVtYm5haWxzSG9sZGVyLmFwcGVuZENoaWxkKHRodW1ibmFpbEltZyk7XG4gICAgdGh1bWJuYWlsc0hvbGRlci5hcHBlbmRDaGlsZCh0aW1lbGluZVRpbWUpO1xuICAgIHRodW1ibmFpbHNIb2xkZXIuYXBwZW5kQ2hpbGQodGh1bWJuYWlsQXJyb3dEb3duKTtcbiAgICByZXR1cm4gdGh1bWJuYWlsc0hvbGRlcjtcbiAgfVxuXG4gIHN0YXRpYyBjZW50ZXJUaHVtYm5haWxPdmVyQ3Vyc29yKHRodW1ibmFpbEltZykge1xuICAgIC8vIGNlbnRlciB0aGUgdGh1bWJuYWlsIG92ZXIgdGhlIGN1cnNvciBpZiBhbiBvZmZzZXQgd2Fzbid0IHByb3ZpZGVkXG4gICAgaWYgKCF0aHVtYm5haWxJbWcuc3R5bGUubGVmdCAmJiAhdGh1bWJuYWlsSW1nLnN0eWxlLnJpZ2h0KSB7XG4gICAgICB0aHVtYm5haWxJbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCB0aHVtYm5haWxXaWR0aCA9IHsgd2lkdGg6IC0odGh1bWJuYWlsSW1nLm5hdHVyYWxXaWR0aCAvIDIpIH07XG5cbiAgICAgICAgdGh1bWJuYWlsSW1nLnN0eWxlLmxlZnQgPSBgJHt0aHVtYm5haWxXaWR0aH1weGA7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIHN0YXRpYyBnZXRWaWRlb0R1cmF0aW9uKHBsYXllcikge1xuICAgIGxldCBkdXJhdGlvbiA9IHBsYXllci5kdXJhdGlvbigpO1xuXG4gICAgcGxheWVyLm9uKCdkdXJhdGlvbmNoYW5nZScsICgpID0+IHtcbiAgICAgIGR1cmF0aW9uID0gcGxheWVyLmR1cmF0aW9uKCk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGR1cmF0aW9uO1xuICB9XG5cbiAgc3RhdGljIGFkZFRodW1ibmFpbFRvUGxheWVyKHByb2dyZXNzQ29udHJvbCwgdGh1bWJuYWlsc0hvbGRlcikge1xuICAgIHByb2dyZXNzQ29udHJvbC5lbCgpLmFwcGVuZENoaWxkKHRodW1ibmFpbHNIb2xkZXIpO1xuICB9XG5cbiAgc3RhdGljIGZpbmRNb3VzZUxlZnRPZmZzZXQocGFnZU1vdXNlUG9zaXRpb25YLCBwcm9ncmVzc0NvbnRyb2wsIHBhZ2VYT2Zmc2V0LCBldmVudCkge1xuICAgIC8vIGZpbmQgdGhlIHBhZ2Ugb2Zmc2V0IG9mIHRoZSBtb3VzZVxuICAgIGxldCBsZWZ0T2Zmc2V0ID0gcGFnZU1vdXNlUG9zaXRpb25YIHx8IChldmVudC5jbGllbnRYICtcbiAgICAgICAgICAgICAgICAgICAgIGdsb2JhbC5kb2N1bWVudC5ib2R5LnNjcm9sbExlZnQgKyBnbG9iYWwuZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNjcm9sbExlZnQpO1xuXG4gICAgLy8gc3VidHJhY3QgdGhlIHBhZ2Ugb2Zmc2V0IG9mIHRoZSBwb3NpdGlvbmVkIG9mZnNldCBwYXJlbnRcbiAgICBsZWZ0T2Zmc2V0IC09IHByb2dyZXNzQ29udHJvbC5lbCgpLlxuICAgICAgICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCArIHBhZ2VYT2Zmc2V0O1xuICAgIHJldHVybiBsZWZ0T2Zmc2V0O1xuICB9XG5cbiAgc3RhdGljIGdldE1vdXNlVmlkZW9UaW1lKG1vdXNlTGVmdE9mZnNldCwgcHJvZ3Jlc3NDb250cm9sLCBkdXJhdGlvbikge1xuICAgIHJldHVybiBNYXRoLmZsb29yKChtb3VzZUxlZnRPZmZzZXQgLSBwcm9ncmVzc0NvbnRyb2wuZWwoKS5vZmZzZXRMZWZ0KSAvXG4gICAgICAgICAgIHByb2dyZXNzQ29udHJvbC53aWR0aCgpICogZHVyYXRpb24pO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFRpbWUodGltZWxpbmVUaW1lLCBwcm9ncmVzc0NvbnRyb2wpIHtcbiAgICB0aW1lbGluZVRpbWUuaW5uZXJIVE1MID0gKHByb2dyZXNzQ29udHJvbC5zZWVrQmFyLm1vdXNlVGltZURpc3BsYXkuZWxfLmlubmVyVGV4dCk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UGFnZU1vdXNlUG9zaXRpb25YKGV2ZW50KSB7XG4gICAgbGV0IHBhZ2VNb3VzZU9mZnNldFggPSBldmVudC5wYWdlWDtcblxuICAgIGlmIChldmVudC5jaGFuZ2VkVG91Y2hlcykge1xuICAgICAgcGFnZU1vdXNlT2Zmc2V0WCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYO1xuICAgIH1cbiAgICByZXR1cm4gcGFnZU1vdXNlT2Zmc2V0WDtcbiAgfVxuXG4gIHN0YXRpYyBrZWVwVGh1bWJuYWlsSW5zaWRlUGxheWVyKHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlVGh1bWJuYWlsLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VMZWZ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzQmFyUmlnaHRPZmZzZXQpIHtcblxuICAgIGNvbnN0IHdpZHRoID0gVGh1bWJuYWlsSGVscGVycy5nZXRWaXNpYmxlV2lkdGgodGh1bWJuYWlsSW1nLCBhY3RpdmVUaHVtYm5haWwud2lkdGggfHxcbiAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzWzBdLndpZHRoKTtcblxuICAgIGNvbnN0IGhhbGZXaWR0aCA9IHdpZHRoIC8gMjtcblxuICAgIC8vIG1ha2Ugc3VyZSB0aGF0IHRoZSB0aHVtYm5haWwgZG9lc24ndCBmYWxsIG9mZiB0aGUgcmlnaHQgc2lkZSBvZlxuICAgIC8vIHRoZSBsZWZ0IHNpZGUgb2YgdGhlIHBsYXllclxuICAgIGlmICgobW91c2VMZWZ0T2Zmc2V0ICsgaGFsZldpZHRoKSA+IHByb2dyZXNCYXJSaWdodE9mZnNldCkge1xuICAgICAgbW91c2VMZWZ0T2Zmc2V0IC09IChtb3VzZUxlZnRPZmZzZXQgKyBoYWxmV2lkdGgpIC0gcHJvZ3Jlc0JhclJpZ2h0T2Zmc2V0O1xuICAgIH0gZWxzZSBpZiAobW91c2VMZWZ0T2Zmc2V0IDwgaGFsZldpZHRoKSB7XG4gICAgICBtb3VzZUxlZnRPZmZzZXQgPSBoYWxmV2lkdGg7XG4gICAgfVxuICAgIHJldHVybiBtb3VzZUxlZnRPZmZzZXQ7XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsTGVmdFN0eWxlKG1vdXNlTGVmdE9mZnNldCwgdGh1bWJuYWlsc0hvbGRlcikge1xuICAgIGNvbnN0IGxlZnRWYWx1ZSA9IHsgbW91c2VMZWZ0T2Zmc2V0IH07XG5cbiAgICB0aHVtYm5haWxzSG9sZGVyLnN0eWxlLmxlZnQgPSBgJHtsZWZ0VmFsdWUubW91c2VMZWZ0T2Zmc2V0fXB4YDtcbiAgfVxuXG4gIHN0YXRpYyBnZXRBY3RpdmVUaHVtYm5haWwodGh1bWJuYWlsQ2xpcHMsIG1vdXNlVGltZSkge1xuICAgIGxldCBhY3RpdmVDbGlwID0gMDtcblxuICAgIGZvciAoY29uc3QgY2xpcE51bWJlciBpbiB0aHVtYm5haWxDbGlwcykge1xuICAgICAgaWYgKG1vdXNlVGltZSA+IGNsaXBOdW1iZXIpIHtcbiAgICAgICAgYWN0aXZlQ2xpcCA9IE1hdGgubWF4KGFjdGl2ZUNsaXAsIGNsaXBOdW1iZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGh1bWJuYWlsQ2xpcHNbYWN0aXZlQ2xpcF07XG4gIH1cblxuICBzdGF0aWMgdXBkYXRlVGh1bWJuYWlsU3JjKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKSB7XG4gICAgaWYgKGFjdGl2ZVRodW1ibmFpbC5zcmMgJiYgdGh1bWJuYWlsSW1nLnNyYyAhPT0gYWN0aXZlVGh1bWJuYWlsLnNyYykge1xuICAgICAgdGh1bWJuYWlsSW1nLnNyYyA9IGFjdGl2ZVRodW1ibmFpbC5zcmM7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIHVwZGF0ZVRodW1ibmFpbFN0eWxlKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKSB7XG4gICAgaWYgKGFjdGl2ZVRodW1ibmFpbC5zdHlsZSAmJiB0aHVtYm5haWxJbWcuc3R5bGUgIT09IGFjdGl2ZVRodW1ibmFpbC5zdHlsZSkge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHRodW1ibmFpbEltZy5zdHlsZSwgYWN0aXZlVGh1bWJuYWlsLnN0eWxlKTtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgbW92ZUxpc3RlbmVyKGV2ZW50LFxuICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcpIHtcbiAgICBjb25zdCBwYWdlWE9mZnNldCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0U2Nyb2xsT2Zmc2V0KCkueDtcbiAgICBjb25zdCBwcm9ncmVzc0JhclBvc2l0aW9uID0gcHJvZ3Jlc3NDb250cm9sLmVsKCkuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG5cbiAgICBjb25zdCBwcm9ncmVzc0JhclJpZ2h0T2Zmc2V0ID0gKHByb2dyZXNzQmFyUG9zaXRpb24ud2lkdGggfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJQb3NpdGlvbi5yaWdodCkgK1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwYWdlWE9mZnNldDtcblxuICAgIGNvbnN0IHBhZ2VNb3VzZVBvc2l0aW9uWCA9IFRodW1ibmFpbEhlbHBlcnMuZ2V0UGFnZU1vdXNlUG9zaXRpb25YKGV2ZW50KTtcblxuICAgIGxldCBtb3VzZUxlZnRPZmZzZXQgPSBUaHVtYm5haWxIZWxwZXJzLmZpbmRNb3VzZUxlZnRPZmZzZXQocGFnZU1vdXNlUG9zaXRpb25YLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFnZVhPZmZzZXQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudCk7XG5cbiAgICBjb25zdCBtb3VzZVRpbWUgPSBUaHVtYm5haWxIZWxwZXJzLnBhcnNlRGlzcGxheVRpbWUodGltZWxpbmVUaW1lLmlubmVyVGV4dCk7XG5cbiAgICBjb25zdCBhY3RpdmVUaHVtYm5haWwgPSBUaHVtYm5haWxIZWxwZXJzLmdldEFjdGl2ZVRodW1ibmFpbCh0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBtb3VzZVRpbWUpO1xuXG4gICAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVUaHVtYm5haWxUaW1lKHRpbWVsaW5lVGltZSwgcHJvZ3Jlc3NDb250cm9sKTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsU3JjKGFjdGl2ZVRodW1ibmFpbCwgdGh1bWJuYWlsSW1nKTtcblxuICAgIFRodW1ibmFpbEhlbHBlcnMudXBkYXRlVGh1bWJuYWlsU3R5bGUoYWN0aXZlVGh1bWJuYWlsLCB0aHVtYm5haWxJbWcpO1xuXG4gICAgbW91c2VMZWZ0T2Zmc2V0ID0gVGh1bWJuYWlsSGVscGVycy5rZWVwVGh1bWJuYWlsSW5zaWRlUGxheWVyKHRodW1ibmFpbEltZyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVRodW1ibmFpbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbW91c2VMZWZ0T2Zmc2V0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJvZ3Jlc3NCYXJSaWdodE9mZnNldCk7XG5cbiAgICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZShtb3VzZUxlZnRPZmZzZXQsIHRodW1ibmFpbHNIb2xkZXIpO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9uSG92ZXIocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgIHBsYXllcikge1xuXG4gICAgLy8gdXBkYXRlIHRoZSB0aHVtYm5haWwgd2hpbGUgaG92ZXJpbmdcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ21vdXNlbW92ZScsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5tb3ZlTGlzdGVuZXIoZXZlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aW1lbGluZVRpbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwbGF5ZXIpO1xuICAgIH0pO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2htb3ZlJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLm1vdmVMaXN0ZW5lcihldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxDbGlwcyxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEltZyk7XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKSB7XG4gICAgdGh1bWJuYWlsc0hvbGRlci5zdHlsZS5sZWZ0ID0gJy0xMDAwcHgnO1xuICB9XG5cbiAgc3RhdGljIHVwZGF0ZU9uSG92ZXJPdXQocHJvZ3Jlc3NDb250cm9sLCB0aHVtYm5haWxzSG9sZGVyLCBwbGF5ZXIpIHtcblxuICAgIC8vIG1vdmUgdGhlIHBsYWNlaG9sZGVyIG91dCBvZiB0aGUgd2F5IHdoZW4gbm90IGhvdmVyaW5nXG4gICAgcHJvZ3Jlc3NDb250cm9sLm9uKCdtb3VzZW91dCcsIChldmVudCkgPT4ge1xuICAgICAgVGh1bWJuYWlsSGVscGVycy5oaWRlVGh1bWJuYWlsKHRodW1ibmFpbHNIb2xkZXIpO1xuICAgIH0pO1xuICAgIHByb2dyZXNzQ29udHJvbC5vbigndG91Y2hjYW5jZWwnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgICBwcm9ncmVzc0NvbnRyb2wub24oJ3RvdWNoZW5kJywgKGV2ZW50KSA9PiB7XG4gICAgICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlsc0hvbGRlcik7XG4gICAgfSk7XG4gICAgcGxheWVyLm9uKCd1c2VyaW5hY3RpdmUnLCAoZXZlbnQpID0+IHtcbiAgICAgIFRodW1ibmFpbEhlbHBlcnMuaGlkZVRodW1ibmFpbCh0aHVtYm5haWxzSG9sZGVyKTtcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBwYXJzZURpc3BsYXlUaW1lKHRpbWUpIHtcbiAgICBjb25zdCBwYXJ0cyA9IHRpbWUuc3BsaXQoJzonKTtcbiAgICBsZXQgc2Vjb25kcyA9IDA7XG4gICAgbGV0IGZhY3RvciA9IDE7XG5cbiAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgaWYgKHBhcnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgY29uc3QgcGFydCA9IHBhcnRzLnBvcCgpO1xuXG4gICAgICBzZWNvbmRzICs9IHBhcnQgKiBmYWN0b3I7XG4gICAgICBmYWN0b3IgKj0gNjA7XG4gICAgfVxuICAgIHJldHVybiBzZWNvbmRzO1xuICB9XG59XG5cbi8vIERlZmF1bHQgb3B0aW9ucyBmb3IgdGhlIHBsdWdpbi5cbmNvbnN0IGRlZmF1bHRzID0ge307XG5cbi8vIENyb3NzLWNvbXBhdGliaWxpdHkgZm9yIFZpZGVvLmpzIDUgYW5kIDYuXG5jb25zdCByZWdpc3RlclBsdWdpbiA9IHZpZGVvanMucmVnaXN0ZXJQbHVnaW4gfHwgdmlkZW9qcy5wbHVnaW47XG4vLyBjb25zdCBkb20gPSB2aWRlb2pzLmRvbSB8fCB2aWRlb2pzO1xuXG4vKipcbiAqIEZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBwbGF5ZXIgaXMgcmVhZHkuXG4gKlxuICogVGhpcyBpcyBhIGdyZWF0IHBsYWNlIGZvciB5b3VyIHBsdWdpbiB0byBpbml0aWFsaXplIGl0c2VsZi4gV2hlbiB0aGlzXG4gKiBmdW5jdGlvbiBpcyBjYWxsZWQsIHRoZSBwbGF5ZXIgd2lsbCBoYXZlIGl0cyBET00gYW5kIGNoaWxkIGNvbXBvbmVudHNcbiAqIGluIHBsYWNlLlxuICpcbiAqIEBmdW5jdGlvbiBvblBsYXllclJlYWR5XG4gKiBAcGFyYW0gICAge1BsYXllcn0gcGxheWVyXG4gKiAgICAgICAgICAgQSBWaWRlby5qcyBwbGF5ZXIuXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXG4gKiAgICAgICAgICAgQW4gb2JqZWN0IG9mIG9wdGlvbnMgbGVmdCB0byB0aGUgcGx1Z2luIGF1dGhvciB0byBkZWZpbmUuXG4gKi9cblxuY29uc3QgcHJlcGFyZVRodW1ibmFpbHNDbGlwcyA9ICh2aWRlb1RpbWUsIG9wdGlvbnMpID0+IHtcblxuICBsZXQgY3VycmVudFRpbWUgPSAwO1xuICBsZXQgY3VycmVudEl0ZXJhdGlvbiA9IDA7XG4gIGxldCB0aHVtYm5haWxPZmZzZXQgPSAwO1xuICBjb25zdCBzdGVwVGltZSA9IG9wdGlvbnMuc3RlcFRpbWU7XG4gIGNvbnN0IHRodW1ibmFpbFdpZHRoID0gb3B0aW9ucy53aWR0aDtcbiAgY29uc3QgdGh1bWJzUGVySW1hZ2UgPSBvcHRpb25zLnBlckltYWdlO1xuICBjb25zdCBpbml0aWFsU3ByaXRlVXJsID0gb3B0aW9ucy5zcHJpdGVVcmwucmVwbGFjZSgnJWQnLCAxKTtcbiAgY29uc3QgdGh1bWJuYWlsQ2xpcHMgPSB7XG4gICAgMDoge1xuICAgICAgc3JjOiBpbml0aWFsU3ByaXRlVXJsLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgbGVmdDogKHRodW1ibmFpbFdpZHRoIC8gMiAqIC0xKSArICdweCcsXG4gICAgICAgIHdpZHRoOiAodGh1bWJzUGVySW1hZ2UgKiB0aHVtYm5haWxXaWR0aCkgKyAncHgnLFxuICAgICAgICBjbGlwOiAncmVjdCgwLCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCcgKyBvcHRpb25zLndpZHRoICsgJ3B4LCAwKSdcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgd2hpbGUgKGN1cnJlbnRUaW1lIDw9IHZpZGVvVGltZSkge1xuICAgIGN1cnJlbnRUaW1lICs9IHN0ZXBUaW1lO1xuICAgIHRodW1ibmFpbE9mZnNldCA9ICgrK2N1cnJlbnRJdGVyYXRpb24gJSB0aHVtYnNQZXJJbWFnZSkgKiB0aHVtYm5haWxXaWR0aDtcbiAgICBjb25zdCBzcHJpdGVOdW0gPSBNYXRoLmZsb29yKGN1cnJlbnRUaW1lIC8gKHN0ZXBUaW1lICogdGh1bWJzUGVySW1hZ2UpKSArIDE7XG4gICAgY29uc3Qgc3ByaXRlVVJMID0gb3B0aW9ucy5zcHJpdGVVcmwucmVwbGFjZSgnJWQnLCBzcHJpdGVOdW0pO1xuXG4gICAgdGh1bWJuYWlsQ2xpcHNbY3VycmVudFRpbWVdID0ge1xuICAgICAgc3JjOiBzcHJpdGVVUkwsXG4gICAgICBzdHlsZToge1xuICAgICAgICBsZWZ0OiAoKHRodW1ibmFpbFdpZHRoIC8gMiArIHRodW1ibmFpbE9mZnNldCkgKiAtMSkgKyAncHgnLFxuICAgICAgICBjbGlwOiAncmVjdCgwLCAnICsgKHRodW1ibmFpbFdpZHRoICsgdGh1bWJuYWlsT2Zmc2V0KSArICdweCwnICtcbiAgICAgICAgICAgICAgb3B0aW9ucy53aWR0aCArICdweCwgJyArIHRodW1ibmFpbE9mZnNldCArICdweCknXG4gICAgICB9XG4gICAgfTtcbiAgfVxuICByZXR1cm4gdGh1bWJuYWlsQ2xpcHM7XG59O1xuXG5jb25zdCBpbml0aWFsaXplVGh1bWJuYWlscyA9IChwbGF5ZXIsIG9wdGlvbnMpID0+IHtcbiAgY29uc3QgdGh1bWJuYWlsc0NsaXBzID0gcHJlcGFyZVRodW1ibmFpbHNDbGlwcyhwbGF5ZXIuZHVyYXRpb24oKSwgb3B0aW9ucyk7XG4gIGNvbnN0IHRodW1ibmFpbENsaXBzID0gVGh1bWJuYWlsSGVscGVycy5jcmVhdGVUaHVtYm5haWxzKHt9LCBkZWZhdWx0cywgdGh1bWJuYWlsc0NsaXBzKTtcbiAgY29uc3QgcHJvZ3Jlc3NDb250cm9sID0gcGxheWVyLmNvbnRyb2xCYXIucHJvZ3Jlc3NDb250cm9sO1xuICBjb25zdCB0aHVtYm5haWxJbWcgPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEltZyh0aHVtYm5haWxDbGlwcyk7XG4gIGNvbnN0IHRpbWVsaW5lVGltZSA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlsVGltZSgpO1xuICBjb25zdCB0aHVtYm5haWxBcnJvd0Rvd24gPSBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbEFycm93RG93bigpO1xuICBsZXQgdGh1bWJuYWlsc0hvbGRlciA9IFRodW1ibmFpbEhlbHBlcnMuY3JlYXRlVGh1bWJuYWlzbEhvbGRlcigpO1xuXG4gIHRodW1ibmFpbHNIb2xkZXIgPSBUaHVtYm5haWxIZWxwZXJzLm1lcmdlVGh1bWJuYWlsRWxlbWVudHModGh1bWJuYWlsc0hvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGltZWxpbmVUaW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbEFycm93RG93bik7XG4gIFRodW1ibmFpbEhlbHBlcnMuaGlkZVBsYXllck9uSG92ZXJUaW1lKHByb2dyZXNzQ29udHJvbCk7XG5cbiAgaWYgKGdsb2JhbC53aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC50b0xvd2VyQ2FzZSgpLmluZGV4T2YoJ2FuZHJvaWQnKSAhPT0gLTEpIHtcbiAgICBUaHVtYm5haWxIZWxwZXJzLnN1cHBvcnRBbmRyb2lkRXZlbnRzKCk7XG4gIH1cblxuICBUaHVtYm5haWxIZWxwZXJzLmNyZWF0ZVRodW1ibmFpbHModGh1bWJuYWlsSW1nLnN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsQ2xpcHNbJzAnXS5zdHlsZSk7XG5cbiAgVGh1bWJuYWlsSGVscGVycy5jZW50ZXJUaHVtYm5haWxPdmVyQ3Vyc29yKHRodW1ibmFpbEltZyk7XG5cbiAgVGh1bWJuYWlsSGVscGVycy5hZGRUaHVtYm5haWxUb1BsYXllcihwcm9ncmVzc0NvbnRyb2wsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGh1bWJuYWlsc0hvbGRlcik7XG5cbiAgVGh1bWJuYWlsSGVscGVycy51cGRhdGVPbkhvdmVyKHByb2dyZXNzQ29udHJvbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxzSG9sZGVyLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbENsaXBzLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRpbWVsaW5lVGltZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHVtYm5haWxJbWcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcblxuICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZU9uSG92ZXJPdXQocHJvZ3Jlc3NDb250cm9sLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRodW1ibmFpbHNIb2xkZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGxheWVyKTtcbn07XG5cbmNvbnN0IG9uUGxheWVyUmVhZHkgPSAocGxheWVyLCBvcHRpb25zKSA9PiB7XG4gIGlmIChwbGF5ZXIuZHVyYXRpb24oKSkge1xuICAgIGluaXRpYWxpemVUaHVtYm5haWxzKHBsYXllciwgb3B0aW9ucyk7XG4gIH1cbiAgcGxheWVyLm9uKCdsb2FkZWRtZXRhZGF0YScsICgoKSA9PiB7XG4gICAgaW5pdGlhbGl6ZVRodW1ibmFpbHMocGxheWVyLCBvcHRpb25zKTtcbiAgfSkpO1xufTtcbi8qKlxuICogQSB2aWRlby5qcyBwbHVnaW4uXG4gKlxuICogSW4gdGhlIHBsdWdpbiBmdW5jdGlvbiwgdGhlIHZhbHVlIG9mIGB0aGlzYCBpcyBhIHZpZGVvLmpzIGBQbGF5ZXJgXG4gKiBpbnN0YW5jZS4gWW91IGNhbm5vdCByZWx5IG9uIHRoZSBwbGF5ZXIgYmVpbmcgaW4gYSBcInJlYWR5XCIgc3RhdGUgaGVyZSxcbiAqIGRlcGVuZGluZyBvbiBob3cgdGhlIHBsdWdpbiBpcyBpbnZva2VkLiBUaGlzIG1heSBvciBtYXkgbm90IGJlIGltcG9ydGFudFxuICogdG8geW91OyBpZiBub3QsIHJlbW92ZSB0aGUgd2FpdCBmb3IgXCJyZWFkeVwiIVxuICpcbiAqIEBmdW5jdGlvbiB0aHVtYm5haWxzXG4gKiBAcGFyYW0gICAge09iamVjdH0gW29wdGlvbnM9e31dXG4gKiAgICAgICAgICAgQW4gb2JqZWN0IG9mIG9wdGlvbnMgbGVmdCB0byB0aGUgcGx1Z2luIGF1dGhvciB0byBkZWZpbmUuXG4gKi9cbmNvbnN0IHRodW1ibmFpbHMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gIHRoaXMucmVhZHkoKCkgPT4ge1xuICAgIG9uUGxheWVyUmVhZHkodGhpcywgdmlkZW9qcy5tZXJnZU9wdGlvbnMoZGVmYXVsdHMsIG9wdGlvbnMpKTtcbiAgfSk7XG59O1xuXG4vLyBSZWdpc3RlciB0aGUgcGx1Z2luIHdpdGggdmlkZW8uanMuXG5yZWdpc3RlclBsdWdpbigndGh1bWJuYWlscycsIHRodW1ibmFpbHMpO1xuXG4vLyBJbmNsdWRlIHRoZSB2ZXJzaW9uIG51bWJlci5cbnRodW1ibmFpbHMuVkVSU0lPTiA9ICdfX1ZFUlNJT05fXyc7XG5cbmNvbnN0IFBsYXllciA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcblxuUVVuaXQubW9kdWxlKCdzYW5pdHkgdGVzdHMnKTtcblxuUVVuaXQudGVzdCgndGhlIGVudmlyb25tZW50IGlzIHNhbmUnLCBmdW5jdGlvbihhc3NlcnQpIHtcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBBcnJheS5pc0FycmF5LCAnZnVuY3Rpb24nLCAnZXM1IGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHNpbm9uLCAnb2JqZWN0JywgJ3Npbm9uIGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHZpZGVvanMsICdmdW5jdGlvbicsICd2aWRlb2pzIGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHRodW1ibmFpbHMsICdmdW5jdGlvbicsICdwbHVnaW4gaXMgYSBmdW5jdGlvbicpO1xufSk7XG5cblFVbml0Lm1vZHVsZSgndmlkZW9qcy10aHVtYm5haWxzJywge1xuXG4gIGJlZm9yZUVhY2goKSB7XG5cbiAgICAvLyBNb2NrIHRoZSBlbnZpcm9ubWVudCdzIHRpbWVycyBiZWNhdXNlIGNlcnRhaW4gdGhpbmdzIC0gcGFydGljdWxhcmx5XG4gICAgLy8gcGxheWVyIHJlYWRpbmVzcyAtIGFyZSBhc3luY2hyb25vdXMgaW4gdmlkZW8uanMgNS4gVGhpcyBNVVNUIGNvbWVcbiAgICAvLyBiZWZvcmUgYW55IHBsYXllciBpcyBjcmVhdGVkOyBvdGhlcndpc2UsIHRpbWVycyBjb3VsZCBnZXQgY3JlYXRlZFxuICAgIC8vIHdpdGggdGhlIGFjdHVhbCB0aW1lciBtZXRob2RzIVxuXG4gICAgdGhpcy5wcmVwYXJlVHJlc2hvbGRzID0ge1xuICAgICAgd2lkdGg6IDEwMCxcbiAgICAgIHNwcml0ZVVybDogJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvMzUweDE1MCcsXG4gICAgICBzdGVwVGltZTogMlxuICAgIH07XG5cbiAgICB0aGlzLmNsb2NrID0gc2lub24udXNlRmFrZVRpbWVycygpO1xuXG4gICAgdGhpcy5maXh0dXJlID0gZ2xvYmFsLmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdxdW5pdC1maXh0dXJlJyk7XG4gICAgdGhpcy52aWRlbyA9IGdsb2JhbC5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHRoaXMuZml4dHVyZS5hcHBlbmRDaGlsZCh0aGlzLnZpZGVvKTtcbiAgICB0aGlzLnBsYXllciA9IHZpZGVvanModGhpcy52aWRlbyk7XG4gIH0sXG5cbiAgYWZ0ZXJFYWNoKCkge1xuICAgIHRoaXMucGxheWVyLmRpc3Bvc2UoKTtcbiAgICB0aGlzLmNsb2NrLnJlc3RvcmUoKTtcbiAgfVxufSk7XG5cblFVbml0LnRlc3QoJ3JlZ2lzdGVycyBpdHNlbGYgd2l0aCB2aWRlby5qcycsIGZ1bmN0aW9uKGFzc2VydCkge1xuXG4gIGFzc2VydC5leHBlY3QoOCk7XG5cbiAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgIHR5cGVvZiBQbGF5ZXIucHJvdG90eXBlLnRodW1ibmFpbHMsXG4gICAgJ2Z1bmN0aW9uJyxcbiAgICAndmlkZW9qcy10aHVtYm5haWxzIHBsdWdpbiB3YXMgcmVnaXN0ZXJlZCdcbiAgKTtcblxuICB0aGlzLnBsYXllci50aHVtYm5haWxzKHRoaXMucHJlcGFyZVRyZXNob2xkcyk7XG4gIC8vIFRpY2sgdGhlIGNsb2NrIGZvcndhcmQgZW5vdWdoIHRvIHRyaWdnZXIgdGhlIHBsYXllciB0byBiZSBcInJlYWR5XCIuXG4gIHRoaXMuY2xvY2sudGljaygxKTtcbiAgdGhpcy5wbGF5ZXIudHJpZ2dlcignbG9hZGVkbWV0YWRhdGEnKTtcblxuICBhc3NlcnQuZXF1YWwoXG4gICAgMSxcbiAgICB0aGlzLnBsYXllci5jb250ZW50RWwoKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtdGh1bWJuYWlsLWhvbGRlcicpLmxlbmd0aCxcbiAgICAnVGhlIHBsdWdpbiBhZGRzIGEgd3JhcHBlciBkaXYgd2l0aCBjbGFzcyB2anMtdGh1bWJuYWlsLWhvbGRlciB0byB0aGUgcGxheWVyJ1xuICApO1xuXG4gIGFzc2VydC5lcXVhbChcbiAgICAxLFxuICAgIHRoaXMucGxheWVyLmNvbnRlbnRFbCgpLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3Zqcy10aHVtYm5haWwtaW1nJykubGVuZ3RoLFxuICAgICdUaGUgcGx1Z2luIGFkZHMgdGh1bWJuYWlsIGltYWdlICB3aXRoIGNsYXNzIHZqcy10aHVtYm5haWwtaW1nIHRvIHRoZSBwbGF5ZXInXG4gICk7XG5cbiAgYXNzZXJ0LmVxdWFsKFxuICAgIDEsXG4gICAgdGhpcy5wbGF5ZXIuY29udGVudEVsKCkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLXRodW1ibmFpbC10aW1lJykubGVuZ3RoLFxuICAgICdUaGUgcGx1Z2luIGFkZHMgdGlsZSBkaXYgd2l0aCBjbGFzcyB2anMtdGh1bWJuYWlsLXRpbWUgdG8gdGhlIHBsYXllcidcbiAgKTtcblxuICBhc3NlcnQuZXF1YWwoXG4gICAgMSxcbiAgICB0aGlzLnBsYXllci5jb250ZW50RWwoKS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd2anMtdGh1bWJuYWlsLWFycm93JykubGVuZ3RoLFxuICAgICdUaGUgcGx1Z2luIGFkZHMgdGh1bWJuYWlsIGFycm93IGRvd24gZWx3bWVudCdcbiAgKTtcblxuICB0aGlzLmltYWdlID0gdGhpcy5wbGF5ZXIuY29udGVudEVsKCkuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLXRodW1ibmFpbC1pbWcnKVswXTtcblxuICBhc3NlcnQuZXF1YWwoXG4gICAgJ2h0dHA6Ly9wbGFjZWhvbGQuaXQvMzUweDE1MCcsXG4gICAgdGhpcy5pbWFnZS5zcmMsXG4gICAgJ1RoZSBwbHVnaW4gYWRkcyB0aHVtYm5haWwgaW1hZ2Ugd2l0aCBjb3JyZWN0IHNyYyB1cmwnXG4gICk7XG5cbiAgYXNzZXJ0LmVxdWFsKFxuICAgICdyZWN0KDBweCwgMTAwcHgsIDEwMHB4LCAwcHgpJyxcbiAgICB0aGlzLmltYWdlLnN0eWxlLmNsaXAsXG4gICAgJ1RoZSBwbHVnaW4gYWRkcyB0aHVtYm5haWwgaW1hZ2Ugd2l0aCBuZWNlc3Nhcnkgc3R5bGVzJ1xuICApO1xuXG4gIGFzc2VydC5lcXVhbChcbiAgICAnLTUwcHgnLFxuICAgIHRoaXMuaW1hZ2Uuc3R5bGUubGVmdCxcbiAgICAnVGhlIHBsdWdpbiBhZGRzIHRodW1ibmFpbCBpbWFnZSB3aXRoIGNvcnJlY3QgbGVmdCBwb3NpdGlvbmluZydcbiAgKTtcbn0pO1xuXG5RVW5pdC50ZXN0KCdUaHVtYm5haWwgYmVoYXZpb3VyIHdoZW4gbW91c2UgaG92ZXInLCBmdW5jdGlvbihhc3NlcnQpIHtcblxuICBhc3NlcnQuZXhwZWN0KDMpO1xuXG4gIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICB0eXBlb2YgUGxheWVyLnByb3RvdHlwZS50aHVtYm5haWxzLFxuICAgICdmdW5jdGlvbicsXG4gICAgJ3ZpZGVvanMtdGh1bWJuYWlscyBwbHVnaW4gd2FzIHJlZ2lzdGVyZWQnXG4gICk7XG5cbiAgdGhpcy5wbGF5ZXIudGh1bWJuYWlscyh0aGlzLnByZXBhcmVUcmVzaG9sZHMpO1xuICB0aGlzLmNsb2NrLnRpY2soMSk7XG4gIHRoaXMucGxheWVyLnRyaWdnZXIoJ2xvYWRlZG1ldGFkYXRhJyk7XG5cbiAgY29uc3QgdGh1bWJuYWlzbEhvbGRlciA9IHRoaXMucGxheWVyLmNvbnRlbnRFbCgpLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgndmpzLXRodW1ibmFpbC1ob2xkZXInKVswXTtcblxuICBUaHVtYm5haWxIZWxwZXJzLnVwZGF0ZVRodW1ibmFpbExlZnRTdHlsZSgyMDAsIHRodW1ibmFpc2xIb2xkZXIpO1xuXG4gIGFzc2VydC5lcXVhbChcbiAgICAnMjAwcHgnLFxuICAgIHRodW1ibmFpc2xIb2xkZXIuc3R5bGUubGVmdCxcbiAgICAnVGhlIHBsdWdpbiBzaG91bGQgYWRkIHN0eWxlcyBsZWZ0IHRvIHRoZSBob2xkZXIgZWxlbWVudCBvbiBob3ZlcidcbiAgKTtcblxuICBUaHVtYm5haWxIZWxwZXJzLmhpZGVUaHVtYm5haWwodGh1bWJuYWlzbEhvbGRlcik7XG5cbiAgYXNzZXJ0LmVxdWFsKFxuICAgICctMTAwMHB4JyxcbiAgICB0aHVtYm5haXNsSG9sZGVyLnN0eWxlLmxlZnQsXG4gICAgJ1RoZSBwbHVnaW4gYWRkcyBsZWZ0IHN0eWxlcyB0byB0aGUgaG9sZGVyIGVsZW1lbmQgYW5kIGhpZGUgaXQgd2hlbiBtb3VzZSBvdXQnXG4gICk7XG59KTtcbiJdfQ==
