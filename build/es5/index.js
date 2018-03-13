'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _video = require('video.js');

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createNewRanges = function createNewRanges(timeRanges, playbackRate) {
  var newRanges = [];

  for (var i = 0; i < timeRanges.length; i++) {
    newRanges.push([timeRanges.start(i) / playbackRate, timeRanges.end(i) / playbackRate]);
  }

  return _video2.default.createTimeRange(newRanges);
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
_video2.default.use('*', playbackrateAdjuster);

// Include the version number.
playbackrateAdjuster.VERSION = '__VERSION__';

exports.default = playbackrateAdjuster;