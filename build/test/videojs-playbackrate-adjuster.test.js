(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _interopDefault(ex) {
  return ex && (typeof ex === 'undefined' ? 'undefined' : _typeof(ex)) === 'object' && 'default' in ex ? ex['default'] : ex;
}

var global = require(1);
var QUnit = _interopDefault((typeof window !== "undefined" ? window['QUnit'] : typeof global !== "undefined" ? global['QUnit'] : null));
var sinon = _interopDefault((typeof window !== "undefined" ? window['sinon'] : typeof global !== "undefined" ? global['sinon'] : null));
var videojs = _interopDefault((typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null));

var createNewRanges = function createNewRanges(timeRanges, playbackRate) {
  var newRanges = [];

  for (var i = 0; i < timeRanges.length; i++) {
    newRanges.push([timeRanges.start(i) / playbackRate, timeRanges.end(i) / playbackRate]);
  }

  return videojs.createTimeRange(newRanges);
};

var playbackrateAdjuster = function playbackrateAdjuster(player) {
  var tech = void 0;

  player.on('ratechange', function () {
    tech.trigger('durationchange');
    tech.trigger('timeupdate');
  });

  return {
    setSource: function setSource(srcObj, next) {
      next(null, srcObj);
    },
    setTech: function setTech(newTech) {
      tech = newTech;
    },
    duration: function duration(dur) {
      return dur / player.playbackRate();
    },
    currentTime: function currentTime(ct) {
      return ct / player.playbackRate();
    },
    setCurrentTime: function setCurrentTime(ct) {
      return ct * player.playbackRate();
    },
    buffered: function buffered(bf) {
      return createNewRanges(bf, player.playbackRate());
    },
    seekable: function seekable(_seekable) {
      return createNewRanges(_seekable, player.playbackRate());
    },
    played: function played(_played) {
      return createNewRanges(_played, player.playbackRate());
    }
  };
};

// Register the plugin with video.js.
videojs.use('*', playbackrateAdjuster);

// Include the version number.
playbackrateAdjuster.VERSION = '1.0.0';

var Player = videojs.getComponent('Player');

QUnit.module('sanity tests');

QUnit.test('the environment is sane', function (assert) {
  assert.strictEqual(_typeof(Array.isArray), 'function', 'es5 exists');
  assert.strictEqual(typeof sinon === 'undefined' ? 'undefined' : _typeof(sinon), 'object', 'sinon exists');
  assert.strictEqual(typeof videojs === 'undefined' ? 'undefined' : _typeof(videojs), 'function', 'videojs exists');
  assert.strictEqual(typeof playbackrateAdjuster === 'undefined' ? 'undefined' : _typeof(playbackrateAdjuster), 'function', 'plugin is a function');
});

QUnit.module('videojs-playbackrate-adjuster', {
  beforeEach: function beforeEach() {

    // Mock the environment's timers because certain things - particularly
    // player readiness - are asynchronous in video.js 5. This MUST come
    // before any player is created; otherwise, timers could get created
    // with the actual timer methods!
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
  assert.expect(2);

  assert.strictEqual(_typeof(Player.prototype.playbackrateAdjuster), 'function', 'videojs-playbackrate-adjuster plugin was registered');

  this.player.playbackrateAdjuster();

  // Tick the clock forward enough to trigger the player to be "ready".
  this.clock.tick(1);

  assert.ok(this.player.hasClass('vjs-playbackrate-adjuster'), 'the plugin adds a class to the player');
});

},{"1":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInRlc3RcXGluZGV4LnRlc3QuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7O0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBOzs7O0FBRUEsU0FBUyxlQUFULENBQTBCLEVBQTFCLEVBQThCO0FBQUUsU0FBUSxNQUFPLFFBQU8sRUFBUCx5Q0FBTyxFQUFQLE9BQWMsUUFBckIsSUFBa0MsYUFBYSxFQUFoRCxHQUFzRCxHQUFHLFNBQUgsQ0FBdEQsR0FBc0UsRUFBN0U7QUFBa0Y7O0FBRWxILElBQUksU0FBUyxRQUFRLFFBQVIsQ0FBYjtBQUNBLElBQUksUUFBUSxnQkFBZ0IsUUFBUSxTQUFSLENBQWhCLENBQVo7QUFDQSxJQUFJLFFBQVEsZ0JBQWdCLFFBQVEsT0FBUixDQUFoQixDQUFaO0FBQ0EsSUFBSSxVQUFVLGdCQUFnQixRQUFRLFVBQVIsQ0FBaEIsQ0FBZDs7QUFFQSxJQUFNLGtCQUFrQixTQUFsQixlQUFrQixDQUFDLFVBQUQsRUFBYSxZQUFiLEVBQThCO0FBQ3BELE1BQU0sWUFBWSxFQUFsQjs7QUFFQSxPQUFLLElBQUksSUFBSSxDQUFiLEVBQWdCLElBQUksV0FBVyxNQUEvQixFQUF1QyxHQUF2QyxFQUE0QztBQUMxQyxjQUFVLElBQVYsQ0FBZSxDQUNiLFdBQVcsS0FBWCxDQUFpQixDQUFqQixJQUFzQixZQURULEVBRWIsV0FBVyxHQUFYLENBQWUsQ0FBZixJQUFvQixZQUZQLENBQWY7QUFHRDs7QUFFRCxTQUFPLFFBQVEsZUFBUixDQUF3QixTQUF4QixDQUFQO0FBQ0QsQ0FWRDs7QUFZQSxJQUFNLHVCQUF1QixTQUF2QixvQkFBdUIsQ0FBUyxNQUFULEVBQWlCO0FBQzVDLE1BQUksYUFBSjs7QUFFQSxTQUFPLEVBQVAsQ0FBVSxZQUFWLEVBQXdCLFlBQVc7QUFDakMsU0FBSyxPQUFMLENBQWEsZ0JBQWI7QUFDQSxTQUFLLE9BQUwsQ0FBYSxZQUFiO0FBQ0QsR0FIRDs7QUFLQSxTQUFPO0FBQ0wsYUFESyxxQkFDSyxNQURMLEVBQ2EsSUFEYixFQUNtQjtBQUN0QixXQUFLLElBQUwsRUFBVyxNQUFYO0FBQ0QsS0FISTtBQUtMLFdBTEssbUJBS0csT0FMSCxFQUtZO0FBQ2YsYUFBTyxPQUFQO0FBQ0QsS0FQSTtBQVNMLFlBVEssb0JBU0ksR0FUSixFQVNTO0FBQ1osYUFBTyxNQUFNLE9BQU8sWUFBUCxFQUFiO0FBQ0QsS0FYSTtBQWFMLGVBYkssdUJBYU8sRUFiUCxFQWFXO0FBQ2QsYUFBTyxLQUFLLE9BQU8sWUFBUCxFQUFaO0FBQ0QsS0FmSTtBQWlCTCxrQkFqQkssMEJBaUJVLEVBakJWLEVBaUJjO0FBQ2pCLGFBQU8sS0FBSyxPQUFPLFlBQVAsRUFBWjtBQUNELEtBbkJJO0FBcUJMLFlBckJLLG9CQXFCSSxFQXJCSixFQXFCUTtBQUNYLGFBQU8sZ0JBQWdCLEVBQWhCLEVBQW9CLE9BQU8sWUFBUCxFQUFwQixDQUFQO0FBQ0QsS0F2Qkk7QUF5QkwsWUF6Qkssb0JBeUJJLFNBekJKLEVBeUJjO0FBQ2pCLGFBQU8sZ0JBQWdCLFNBQWhCLEVBQTBCLE9BQU8sWUFBUCxFQUExQixDQUFQO0FBQ0QsS0EzQkk7QUE2QkwsVUE3Qkssa0JBNkJFLE9BN0JGLEVBNkJVO0FBQ2IsYUFBTyxnQkFBZ0IsT0FBaEIsRUFBd0IsT0FBTyxZQUFQLEVBQXhCLENBQVA7QUFDRDtBQS9CSSxHQUFQO0FBa0NELENBMUNEOztBQTRDQTtBQUNBLFFBQVEsR0FBUixDQUFZLEdBQVosRUFBaUIsb0JBQWpCOztBQUVBO0FBQ0EscUJBQXFCLE9BQXJCLEdBQStCLGFBQS9COztBQUVBLElBQU0sU0FBUyxRQUFRLFlBQVIsQ0FBcUIsUUFBckIsQ0FBZjs7QUFFQSxNQUFNLE1BQU4sQ0FBYSxjQUFiOztBQUVBLE1BQU0sSUFBTixDQUFXLHlCQUFYLEVBQXNDLFVBQVMsTUFBVCxFQUFpQjtBQUNyRCxTQUFPLFdBQVAsU0FBMEIsTUFBTSxPQUFoQyxHQUF5QyxVQUF6QyxFQUFxRCxZQUFyRDtBQUNBLFNBQU8sV0FBUCxRQUEwQixLQUExQix5Q0FBMEIsS0FBMUIsR0FBaUMsUUFBakMsRUFBMkMsY0FBM0M7QUFDQSxTQUFPLFdBQVAsUUFBMEIsT0FBMUIseUNBQTBCLE9BQTFCLEdBQW1DLFVBQW5DLEVBQStDLGdCQUEvQztBQUNBLFNBQU8sV0FBUCxRQUEwQixvQkFBMUIseUNBQTBCLG9CQUExQixHQUFnRCxVQUFoRCxFQUE0RCxzQkFBNUQ7QUFDRCxDQUxEOztBQU9BLE1BQU0sTUFBTixDQUFhLCtCQUFiLEVBQThDO0FBRTVDLFlBRjRDLHdCQUUvQjs7QUFFWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQUssS0FBTCxHQUFhLE1BQU0sYUFBTixFQUFiOztBQUVBLFNBQUssT0FBTCxHQUFlLE9BQU8sUUFBUCxDQUFnQixjQUFoQixDQUErQixlQUEvQixDQUFmO0FBQ0EsU0FBSyxLQUFMLEdBQWEsT0FBTyxRQUFQLENBQWdCLGFBQWhCLENBQThCLE9BQTlCLENBQWI7QUFDQSxTQUFLLE9BQUwsQ0FBYSxXQUFiLENBQXlCLEtBQUssS0FBOUI7QUFDQSxTQUFLLE1BQUwsR0FBYyxRQUFRLEtBQUssS0FBYixDQUFkO0FBQ0QsR0FkMkM7QUFnQjVDLFdBaEI0Qyx1QkFnQmhDO0FBQ1YsU0FBSyxNQUFMLENBQVksT0FBWjtBQUNBLFNBQUssS0FBTCxDQUFXLE9BQVg7QUFDRDtBQW5CMkMsQ0FBOUM7O0FBc0JBLE1BQU0sSUFBTixDQUFXLGdDQUFYLEVBQTZDLFVBQVMsTUFBVCxFQUFpQjtBQUM1RCxTQUFPLE1BQVAsQ0FBYyxDQUFkOztBQUVBLFNBQU8sV0FBUCxTQUNTLE9BQU8sU0FBUCxDQUFpQixvQkFEMUIsR0FFRSxVQUZGLEVBR0UscURBSEY7O0FBTUEsT0FBSyxNQUFMLENBQVksb0JBQVo7O0FBRUE7QUFDQSxPQUFLLEtBQUwsQ0FBVyxJQUFYLENBQWdCLENBQWhCOztBQUVBLFNBQU8sRUFBUCxDQUNFLEtBQUssTUFBTCxDQUFZLFFBQVosQ0FBcUIsMkJBQXJCLENBREYsRUFFRSx1Q0FGRjtBQUlELENBbEJEIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciB3aW47XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gd2luZG93O1xufSBlbHNlIGlmICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgd2luID0gZ2xvYmFsO1xufSBlbHNlIGlmICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIil7XG4gICAgd2luID0gc2VsZjtcbn0gZWxzZSB7XG4gICAgd2luID0ge307XG59XG5cbm1vZHVsZS5leHBvcnRzID0gd2luO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5mdW5jdGlvbiBfaW50ZXJvcERlZmF1bHQgKGV4KSB7IHJldHVybiAoZXggJiYgKHR5cGVvZiBleCA9PT0gJ29iamVjdCcpICYmICdkZWZhdWx0JyBpbiBleCkgPyBleFsnZGVmYXVsdCddIDogZXg7IH1cblxudmFyIGdsb2JhbCA9IHJlcXVpcmUoJ2dsb2JhbCcpO1xudmFyIFFVbml0ID0gX2ludGVyb3BEZWZhdWx0KHJlcXVpcmUoJ3F1bml0anMnKSk7XG52YXIgc2lub24gPSBfaW50ZXJvcERlZmF1bHQocmVxdWlyZSgnc2lub24nKSk7XG52YXIgdmlkZW9qcyA9IF9pbnRlcm9wRGVmYXVsdChyZXF1aXJlKCd2aWRlby5qcycpKTtcblxuY29uc3QgY3JlYXRlTmV3UmFuZ2VzID0gKHRpbWVSYW5nZXMsIHBsYXliYWNrUmF0ZSkgPT4ge1xuICBjb25zdCBuZXdSYW5nZXMgPSBbXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRpbWVSYW5nZXMubGVuZ3RoOyBpKyspIHtcbiAgICBuZXdSYW5nZXMucHVzaChbXG4gICAgICB0aW1lUmFuZ2VzLnN0YXJ0KGkpIC8gcGxheWJhY2tSYXRlLFxuICAgICAgdGltZVJhbmdlcy5lbmQoaSkgLyBwbGF5YmFja1JhdGVdKTtcbiAgfVxuXG4gIHJldHVybiB2aWRlb2pzLmNyZWF0ZVRpbWVSYW5nZShuZXdSYW5nZXMpO1xufTtcblxuY29uc3QgcGxheWJhY2tyYXRlQWRqdXN0ZXIgPSBmdW5jdGlvbihwbGF5ZXIpIHtcbiAgbGV0IHRlY2g7XG5cbiAgcGxheWVyLm9uKCdyYXRlY2hhbmdlJywgZnVuY3Rpb24oKSB7XG4gICAgdGVjaC50cmlnZ2VyKCdkdXJhdGlvbmNoYW5nZScpO1xuICAgIHRlY2gudHJpZ2dlcigndGltZXVwZGF0ZScpO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIHNldFNvdXJjZShzcmNPYmosIG5leHQpIHtcbiAgICAgIG5leHQobnVsbCwgc3JjT2JqKTtcbiAgICB9LFxuXG4gICAgc2V0VGVjaChuZXdUZWNoKSB7XG4gICAgICB0ZWNoID0gbmV3VGVjaDtcbiAgICB9LFxuXG4gICAgZHVyYXRpb24oZHVyKSB7XG4gICAgICByZXR1cm4gZHVyIC8gcGxheWVyLnBsYXliYWNrUmF0ZSgpO1xuICAgIH0sXG5cbiAgICBjdXJyZW50VGltZShjdCkge1xuICAgICAgcmV0dXJuIGN0IC8gcGxheWVyLnBsYXliYWNrUmF0ZSgpO1xuICAgIH0sXG5cbiAgICBzZXRDdXJyZW50VGltZShjdCkge1xuICAgICAgcmV0dXJuIGN0ICogcGxheWVyLnBsYXliYWNrUmF0ZSgpO1xuICAgIH0sXG5cbiAgICBidWZmZXJlZChiZikge1xuICAgICAgcmV0dXJuIGNyZWF0ZU5ld1JhbmdlcyhiZiwgcGxheWVyLnBsYXliYWNrUmF0ZSgpKTtcbiAgICB9LFxuXG4gICAgc2Vla2FibGUoc2Vla2FibGUpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOZXdSYW5nZXMoc2Vla2FibGUsIHBsYXllci5wbGF5YmFja1JhdGUoKSk7XG4gICAgfSxcblxuICAgIHBsYXllZChwbGF5ZWQpIHtcbiAgICAgIHJldHVybiBjcmVhdGVOZXdSYW5nZXMocGxheWVkLCBwbGF5ZXIucGxheWJhY2tSYXRlKCkpO1xuICAgIH1cblxuICB9O1xufTtcblxuLy8gUmVnaXN0ZXIgdGhlIHBsdWdpbiB3aXRoIHZpZGVvLmpzLlxudmlkZW9qcy51c2UoJyonLCBwbGF5YmFja3JhdGVBZGp1c3Rlcik7XG5cbi8vIEluY2x1ZGUgdGhlIHZlcnNpb24gbnVtYmVyLlxucGxheWJhY2tyYXRlQWRqdXN0ZXIuVkVSU0lPTiA9ICdfX1ZFUlNJT05fXyc7XG5cbmNvbnN0IFBsYXllciA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcblxuUVVuaXQubW9kdWxlKCdzYW5pdHkgdGVzdHMnKTtcblxuUVVuaXQudGVzdCgndGhlIGVudmlyb25tZW50IGlzIHNhbmUnLCBmdW5jdGlvbihhc3NlcnQpIHtcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKHR5cGVvZiBBcnJheS5pc0FycmF5LCAnZnVuY3Rpb24nLCAnZXM1IGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHNpbm9uLCAnb2JqZWN0JywgJ3Npbm9uIGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHZpZGVvanMsICdmdW5jdGlvbicsICd2aWRlb2pzIGV4aXN0cycpO1xuICBhc3NlcnQuc3RyaWN0RXF1YWwodHlwZW9mIHBsYXliYWNrcmF0ZUFkanVzdGVyLCAnZnVuY3Rpb24nLCAncGx1Z2luIGlzIGEgZnVuY3Rpb24nKTtcbn0pO1xuXG5RVW5pdC5tb2R1bGUoJ3ZpZGVvanMtcGxheWJhY2tyYXRlLWFkanVzdGVyJywge1xuXG4gIGJlZm9yZUVhY2goKSB7XG5cbiAgICAvLyBNb2NrIHRoZSBlbnZpcm9ubWVudCdzIHRpbWVycyBiZWNhdXNlIGNlcnRhaW4gdGhpbmdzIC0gcGFydGljdWxhcmx5XG4gICAgLy8gcGxheWVyIHJlYWRpbmVzcyAtIGFyZSBhc3luY2hyb25vdXMgaW4gdmlkZW8uanMgNS4gVGhpcyBNVVNUIGNvbWVcbiAgICAvLyBiZWZvcmUgYW55IHBsYXllciBpcyBjcmVhdGVkOyBvdGhlcndpc2UsIHRpbWVycyBjb3VsZCBnZXQgY3JlYXRlZFxuICAgIC8vIHdpdGggdGhlIGFjdHVhbCB0aW1lciBtZXRob2RzIVxuICAgIHRoaXMuY2xvY2sgPSBzaW5vbi51c2VGYWtlVGltZXJzKCk7XG5cbiAgICB0aGlzLmZpeHR1cmUgPSBnbG9iYWwuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3F1bml0LWZpeHR1cmUnKTtcbiAgICB0aGlzLnZpZGVvID0gZ2xvYmFsLmRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdGhpcy5maXh0dXJlLmFwcGVuZENoaWxkKHRoaXMudmlkZW8pO1xuICAgIHRoaXMucGxheWVyID0gdmlkZW9qcyh0aGlzLnZpZGVvKTtcbiAgfSxcblxuICBhZnRlckVhY2goKSB7XG4gICAgdGhpcy5wbGF5ZXIuZGlzcG9zZSgpO1xuICAgIHRoaXMuY2xvY2sucmVzdG9yZSgpO1xuICB9XG59KTtcblxuUVVuaXQudGVzdCgncmVnaXN0ZXJzIGl0c2VsZiB3aXRoIHZpZGVvLmpzJywgZnVuY3Rpb24oYXNzZXJ0KSB7XG4gIGFzc2VydC5leHBlY3QoMik7XG5cbiAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgIHR5cGVvZiBQbGF5ZXIucHJvdG90eXBlLnBsYXliYWNrcmF0ZUFkanVzdGVyLFxuICAgICdmdW5jdGlvbicsXG4gICAgJ3ZpZGVvanMtcGxheWJhY2tyYXRlLWFkanVzdGVyIHBsdWdpbiB3YXMgcmVnaXN0ZXJlZCdcbiAgKTtcblxuICB0aGlzLnBsYXllci5wbGF5YmFja3JhdGVBZGp1c3RlcigpO1xuXG4gIC8vIFRpY2sgdGhlIGNsb2NrIGZvcndhcmQgZW5vdWdoIHRvIHRyaWdnZXIgdGhlIHBsYXllciB0byBiZSBcInJlYWR5XCIuXG4gIHRoaXMuY2xvY2sudGljaygxKTtcblxuICBhc3NlcnQub2soXG4gICAgdGhpcy5wbGF5ZXIuaGFzQ2xhc3MoJ3Zqcy1wbGF5YmFja3JhdGUtYWRqdXN0ZXInKSxcbiAgICAndGhlIHBsdWdpbiBhZGRzIGEgY2xhc3MgdG8gdGhlIHBsYXllcidcbiAgKTtcbn0pO1xuIl19
