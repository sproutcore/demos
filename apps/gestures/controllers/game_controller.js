// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */

/** @singleton
  This singleton object is used to maintain the state and control the gestures game.

  */
Gestures.gameController = SC.Object.create({

  // The last points in display format.
  displayLastPoints: function () {
    var lastPoints = this.get('lastPoints');

    if (lastPoints) {
      return '+' + this._g_numberToFormatted(lastPoints);
    } else {
      return '';
    }
  }.property('lastPoints').cacheable(),

  // The current score in display format.
  displayScore: function () {
    var score = this.get('score');

    return this._g_numberToFormatted(score);
  }.property('score').cacheable(),

  // The current gesture from the pool (random).
  expectedGesture: null,

  // The pool of gestures to choose from for the current level.
  gesturePool: function () {
    var level = this.get('level'),
      ret = ['tap-1', 'swipe-SWIPE_LEFT-1', 'swipe-SWIPE_RIGHT-1', 'swipe-SWIPE_UP-1', 'swipe-SWIPE_DOWN-1'];

    // Increase the difficulty by adding more gestures to the pool.
    if (level > 1) {
      ret = ret.concat(['tap-2', 'pinch-in-2', 'pinch-out-2']);
    }

    // Increase the difficulty by adding even more gestures to the pool.
    if (level > 2) {
      ret = ret.concat(['tap-3', 'pinch-in-3', 'pinch-out-3']);
    }

    return ret;
  }.property('level').cacheable(),

  // Whether the music should play or not.
  isMuted: false,

  // Whether the game is paused or not while running.
  isPaused: false,

  // Whether the game is running or not.
  isRunning: false,

  // The last earned points.
  lastPoints: null,

  // The current level.
  level: 0,

  // Increments each time a match is made.
  matchCount: 0,

  // The current score.
  score: 0,

  /** @private Formats a number to a string with ','s. */
  _g_numberToFormatted: function (number) {
    var ret = '' + number;

    if (ret.length > 9) {
      ret = ret.slice(0, -9) + ',' + ret.slice(-9);
    }

    if (ret.length > 6) {
      ret = ret.slice(0, -6) + ',' + ret.slice(-6);
    }

    if (ret.length > 3) {
      ret = ret.slice(0, -3) + ',' + ret.slice(-3);
    }

    return ret;
  },

  /** @private Returns a random gesture from the pool. */
  _g_randomGesture: function () {
    var gesturePool = this.get('gesturePool'),
      index;

    // Get a random index into the gesture pool
    index = Math.round(Math.random() * 10) % gesturePool.get('length');

    return gesturePool.objectAt(index);
  },

  /** @private Update the time remaining. */
  _g_tick: function () {
    var timeRemaining = Gestures.GAME_LENGTH - (Date.now() - this._g_startedAt);

    if (!this.get('isPaused')) {
      if (timeRemaining > 0) {
        this.set('timeRemaining', timeRemaining);
        this.invokeLater('_g_tick', 100);
      } else {
        this.set('timeRemaining', 0);

        if (this.get('level') < 3) {
          this.incrementProperty('level');
          this.invokeLater('_g_tick', 100);
          this._g_startedAt = Date.now();
        } else {
          this.stop();
        }
      }
    }
  },

  /**
    Enter the game lobby.
  */
  enterGame: function () {
    // Remove the splash pane.
    var splashMainPane = Gestures.splashPage.get('mainPane');
    splashMainPane.remove();

    // Append the lobby pane.
    var lobbyMainPane = Gestures.lobbyPage.get('mainPane');
    lobbyMainPane.append();

    // Start the lobby music.
    var audioPane = Gestures.accessoriesPage.get('audioPane'),
        musicToggle = audioPane.get('musicToggle'),
        lobbyAudio = audioPane.get('lobbyAudio');

    // Mobile Safari will not allow autoplay. All calls to play must be done through direct user
    // interaction.
    lobbyAudio.play();
    musicToggle.set('isVisible', true);
  },

  /**
    Start the game via a mouse-click.
  */
  enterGameWithMouse: function (sender) {
    var mouseMessagePane = Gestures.accessoriesPage.get('mouseMessagePane');

    mouseMessagePane.remove();
    this.enterGame();
  },

  exitGame: function () {
    // Append the lobby pane.
    var lobbyMainPane = Gestures.lobbyPage.get('mainPane');
    lobbyMainPane.append();

    // Remove the game pane.
    var gameMainPane = Gestures.gamePage.get('mainPane');
    gameMainPane.remove();

    // Remove the thanks pane.
    var gameEndPane = Gestures.accessoriesPage.get('gameEndPane');
    gameEndPane.remove();

    this.set('score', 0);
  },

  /**
    Start the game. Sets isRunning to true and sets expectedGesture to a random gesture.
  */
  start: function () {
    // Remove the lobby pane.
    var lobbyMainPane = Gestures.lobbyPage.get('mainPane');
    lobbyMainPane.remove();

    // Append the game pane.
    var gameMainPane = Gestures.gamePage.get('mainPane');
    gameMainPane.append();

    // Toggle the playing song, but only if not muted.
    if (!this.get('isMuted')) {
      var audioPane = Gestures.accessoriesPage.get('audioPane'),
          lobbyAudio,
          gameAudio;

      // Mobile Safari will not allow autoplay. All calls to play must be done through direct user
      // interaction.
      lobbyAudio = audioPane.get('lobbyAudio');
      gameAudio = audioPane.get('gameAudio');
      lobbyAudio.stop();
      gameAudio.play();
    }

    this._g_lastMatchedAt = Date.now();

    var nextGesture = this._g_randomGesture();
    this.set('expectedGesture', nextGesture);

    // Start the clock.
    this.invokeLater('_g_tick', 100);
    this._g_startedAt = Date.now();

    // Set the level and running flag.
    this.set('score', 0);
    this.set('level', 1);
    this.set('isRunning', true);
  },

  /**
    Stop the game.
  */
  stop: function () {
    // Toggle the playing song, but only if not already muted.
    if (!this.get('isMuted')) {
      var audioPane = Gestures.accessoriesPage.get('audioPane'),
          lobbyAudio,
          gameAudio;

      // Mobile Safari will not allow autoplay. All calls to play must be done through direct user
      // interaction.
      lobbyAudio = audioPane.get('lobbyAudio');
      gameAudio = audioPane.get('gameAudio');
      gameAudio.stop();
      lobbyAudio.play();
    }

    // Append the thanks pane.
    var gameEndPane = Gestures.accessoriesPage.get('gameEndPane');
    gameEndPane.append();

    // Clean up.
    this.set('level', 0);
    this.set('isRunning', false);
    this.set('expectedGesture', null);
    this._g_lastMatchedAt = null;
    this.set('matchCount', 0);
  },

  /**
    Toggle music playback.

    Note: In an earlier version of this demo, this acted as a mute and the music kept playing.
    However, mobile Safari doesn't allow you to adjust the volume of <audio> elements, so we have
    to just stop the music.
  */
  toggleMusic: function () {
    var audioPane = Gestures.accessoriesPage.get('audioPane'),
        lobbyAudio,
        gameAudio;

    this.toggleProperty('isMuted');

    // Mobile Safari will not allow autoplay. All calls to play must be done through direct user
    // interaction.
    lobbyAudio = audioPane.get('lobbyAudio');
    gameAudio = audioPane.get('gameAudio');

    if (this.get('isMuted')) {
      if (this.get('isRunning')) {
        gameAudio.stop();
      } else {
        lobbyAudio.stop();
      }
    } else {
      if (this.get('isRunning') && !this.get('isPaused')) {
        gameAudio.play();
      } else {
        lobbyAudio.play();
      }
    }
  },

  /**
    Pause/unpause the game.

  */
  togglePause: function () {
    if (this.get('isRunning')) {
      this.toggleProperty('isPaused');

      var isPaused = this.get('isPaused');

      // Toggle the playing song, but only if not already muted.
      if (!this.get('isMuted')) {
        var audioPane = Gestures.accessoriesPage.get('audioPane'),
            lobbyAudio,
            gameAudio;

        // Mobile Safari will not allow autoplay. All calls to play must be done through direct user
        // interaction.
        lobbyAudio = audioPane.get('lobbyAudio');
        gameAudio = audioPane.get('gameAudio');

        if (this.get('isPaused')) {
          gameAudio.stop();
          lobbyAudio.play();
        } else {
          gameAudio.play();
          lobbyAudio.stop();
        }
      }

      if (isPaused) {
        this._g_pausedAt = Date.now();
      } else {
        // Start running again. Adjust the start time accordingly.
        this._g_startedAt = this._g_startedAt + (Date.now() - this._g_pausedAt);
        this.invokeLater('_g_tick', 100);
        this._g_pausedAt = null;
      }
    }
  },

  /**
    The gesture target calls this each time a match is made. Does nothing if isRunning is false.
  */
  matched: function () {
    if (this.get('isRunning')) {
      // Increment the number of points.
      var now = Date.now(),
          pointsEarned;

      // The points earned drop as time passes with a maximum of 1,200 points to start down to a minimum of 100 points.
      pointsEarned = Math.round(Math.max(100, 1500 - (now - this._g_lastMatchedAt)) / 50) * 50;
      this.incrementProperty('score', pointsEarned);
      this.set('lastPoints', pointsEarned);

      // Reset the time start.
      this._g_lastMatchedAt = now;

      // Update the current gesture (this may result in no change).
      var nextGesture = this._g_randomGesture();
      this.set('expectedGesture', nextGesture);

      // Increment the match count.
      this.incrementProperty('matchCount');
    }
  }

});
