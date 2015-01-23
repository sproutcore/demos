// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */


// This page houses the main pane for the game.
Gestures.gamePage = SC.Page.design({

  // A main pane fills the entire screen. Only one may be used at a time.
  mainPane: SC.MainPane.design({
    // The child views of the pane. Note that the gesture targets are last (i.e. rendered on top of the drop zone).
    childViews: ['currentGestureImage', 'lastPointsLabel', 'totalScoreLabel', 'gestureTarget', 'timerBar', 'pauseToggle'],

    // This is the custom current gesture view. It manages two custom images that it cycles between the
    // incoming gesture (transitions in) and the just matched gesture (transitions out).
    currentGestureImage: SC.View.design({

      // The current image.
      _g_currentImage: null,

      // The last image.
      _g_lastImage: null,

      // Whether the game is running or not.
      isRunning: false,
      isRunningBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),

      // Give our view a custom CSS id, #current-gesture, for styling.
      layerId: 'current-gesture',

      // The layout for the view centers it in the pane.
      layout: { centerX: 0, centerY: -25, width: Gestures.ICON_SIZE, height: Gestures.ICON_SIZE },

      // We need a means of knowing when a match is made. We could bind to expectedGesture, but it's
      // possible for the current gesture to be equal to the last gesture and so the observer won't
      // actually fire. `matchCount` changes every time a match is made though, so we can use it.
      matchCount: 0,
      matchCountBinding: SC.Binding.oneWay('Gestures.gameController.matchCount'),

      //
      // - Child Views -----------------------------------------------------------------
      // ... these aren't appended by default as they normally would be by being named in childViews array

      // Contains the gesture icons, either current or last.
      // Created here because they are managed manually below (not typical!).
      imageA: Gestures.SpriteView.create(),

      imageB: Gestures.SpriteView.create(),

      //
      // - Methods --------------------------------------------------------------------
      //

      /** @private */
      init: function () {
        sc_super();

        // Queue up the image cycling.
        this._g_lastImage = this.imageA;
      },

      /** @private Observe isRunning and start the view cycling if it goes true. */
      isRunningDidChange: function () {
        var isRunning = this.get('isRunning');

        if (!isRunning) {
          // Remove all remaining children.
          if (this.imageA.get('isAttached')) {
            this.removeChild(this.imageA);
          }
          if (this.imageB.get('isAttached')) {
            this.removeChild(this.imageB);
          }

          // Reset the cycle.
          this._g_lastImage = this.imageA;
          this._g_currentImage = null;

          // Stop observing matchCount.
          this.removeObserver('matchCount', this, this.matchCountDidChange);

        // Start the gesture cycling.
        } else {
          // Begin observing matchCount and trigger once to begin cycling.
          this.addObserver('matchCount', this, this.matchCountDidChange);
          this.matchCountDidChange();
        }
      }.observes('isRunning'),

      /** @private Each time a match is made, swap the gesture shown. */
      matchCountDidChange: function () {
        var expectedGesture = Gestures.gameController.get('expectedGesture'),
            currentImage,
            lastImage;

        lastImage = this._g_lastImage; // imageA, imageB, imageA, ...
        currentImage = this._g_currentImage; // null, imageA, imageB, imageA, ...

        // If there is a current image. Move it out.
        if (currentImage) {
          // Remove the view. This will run transitionOut.
          this.removeChild(currentImage);

          // Take the current image and make it last image.
          this._g_lastImage = currentImage;

        // There is no current image, queue up imageB for the next tick.
        } else {
          this._g_lastImage = this.imageB;
        }

        // Configure and append the view. This will run transitionIn.
        lastImage.set('value', expectedGesture);
        this.appendChild(lastImage);

        // Take the last image and make it the current image.
        this._g_currentImage = lastImage;
      }

    }),

    // Shows the most recently earned points. Uses a transitionHide plug-in to fade out while moving towards
    // the total earned points label.
    lastPointsLabel: SC.LabelView.design({

      // Give our view a custom class name for styling.
      classNames: ['points-label'],

      // Start off invisible.
      isVisible: false,

      // Place the last points below the total score.
      layout: { left: 0, top: 0, height: 100, width: 300 },

      // We need a means of knowing when points are earned. We could observe displayLastPoints, but it's
      // possible for the current earned points to be equal to the last earned points and so the
      // observer wouldn't actually need to fire every time. `matchCount` changes every time a match
      // is made though, so we can use it.
      matchCount: 0,
      matchCountBinding: SC.Binding.oneWay('Gestures.gameController.matchCount'),

      transitionHide: Gestures.FADE_RISE,
      transitionHideOptions: { duration: 2, finalTop: 5, finalLeft: 0 },

      // Bind to the last display points of the game controller.
      valueBinding: SC.Binding.oneWay('Gestures.gameController.displayLastPoints'),

      // Because our layout is fixed (left, top, width & height), we can use CSS translate to move
      // the view which can be GPU accelerated by many browsers. Request it.
      wantsAccelerateLayer: true,

      // Tricky! We want this view to use CSS translate (i.e. GPU acceleratable) positioning, which
      // requires that the layout be based on left & top. But we also want it to be centered, so
      // each time that the parent view resizes, we adjust the left & top to keep this view
      // centered.
      parentViewDidResize: function () {
        var parentFrame = this.getPath('parentView.frame'),
            finalLeft = parentFrame.width - 415;

        // Adjust the finalLeft value according to what it would be as a right value.
        this.transitionHideOptions.finalLeft = finalLeft;

        // Center the view.
        this.adjust({
          left: (parentFrame.width - 400) / 2,
          top: (parentFrame.height - 100) / 2
        });
      },

      // Each time the matchCount changes, appear and then immediately disappear (triggers transitionHide).
      matchCountDidChange: function () {
        var value = this.get('value');

        if (value) {
          this.set('isVisible', true);

          // Give the browser a chance to update this view before hiding it again.
          this.invokeNext(function () {
            this.set('isVisible', false);
          });

          // Clear out last points each time it is used. This ensures that when the value is the same
          // (100pts to 100pts), it still triggers a change.
          // Gestures.gameController.set('lastPoints', null);
        }
      }.observes('matchCount')

    }),

    // The total score.
    totalScoreLabel: SC.LabelView.design({

      // Give our view a custom class name for styling.
      classNames: ['score-label'],

      // Place the score in the top-right.
      layout: { right: 15, top: 5, height: 100, width: 400 },

      // Bind the value of the label to the current score.
      valueBinding: SC.Binding.oneWay('Gestures.gameController.displayScore')

    }),

    // This is the key view of the demo and the user of SC.Gesturable.
    gestureTarget: SC.View.design(SC.Gesturable, {

      layerId: 'gesture-target',

      // The view will support the three basic SproutCore built-in gestures: Pinches, Swipes & Taps.
      gestures: [SC.PinchGesture, SC.SwipeGesture.extend({ angles: [] }), SC.TapGesture],

      // Toggle our display via a class, 'is-paused', on isPaused changes.
      isPaused: false,
      isPausedBinding: SC.Binding.from('Gestures.gameController.isPaused'),
      classNameBindings: ['isPaused'],

      // Whether the game is running or not.
      isRunning: false,
      isRunningBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),

      // We need to know what gesture we should accept in order to set the constraints of our gestures.
      expectedGesture: null,
      expectedGestureBinding: SC.Binding.oneWay('Gestures.gameController.expectedGesture'),

      /** SC.Gesture Events **/

      // Handle the tap action (once per touch session).
      tap: function (numberOfTouches) {
        // console.warn("Tapped! With numberOfTouches: " + numberOfTouches);
        if (this.get('isRunning') && !this.get('isPaused')) {
          var expectedGesture = this.get('expectedGesture');

          // Check if the gesture matches this type of tap. Ex. 'tap-1', 'tap-2', ...
          var thisGesture = 'tap-' + numberOfTouches;
          if (expectedGesture === thisGesture) {
            Gestures.gameController.matched();
          }

        // Start the game.
        } else {
          Gestures.gameController.start();
        }
      },

      // Handle the pinch event (may occur multiple times per touch session).
      pinch: function (scale, numberOfTouches) {
        if (this.get('isRunning') && !this.get('isPaused')) {
          // Pinches trigger as fast as possible, but we only accept it as a match when it meets a certain scale.
          var direction = scale < 0.6 ? 'in' : (scale > 1.6 ? 'out' : null);

          if (direction !== null) {
            // console.warn("Pinched! With scale: " + scale + ", numberOfTouches: " + numberOfTouches);
            var expectedGesture = this.get('expectedGesture');

            // Check if the gesture matches this type of pinch. Ex. 'pinch-in-2', 'pinch-out-2', ...
            var thisGesture = 'pinch-' + direction + '-' + numberOfTouches;
            if (expectedGesture === thisGesture) {
              Gestures.gameController.matched();
            }
          }
        }
      },

      // Handle the pinch event (may occur multiple times per touch session).
      pinchEnd: function () {
        // Reset the scale of the gesture each time.
        this.gestures[0].scale = 1;
      },

      // Handle the swipe action (once per touch session).
      swipe: function (direction, numberOfTouches) {
        // console.warn("Swiped! In direction: %@, number: %@".fmt(direction, numberOfTouches));
        if (this.get('isRunning') && !this.get('isPaused')) {
          Gestures.gameController.matched();
        }
      },

      /** SC.ResponderProtocol **/

      // For users that don't have a touch device, we allow them to use a mouse to make matches.
      mouseDown: function () {
        return true;
      },

      mouseUp: function () {
        if (this.get('isRunning') && !this.get('isPaused')) {
          Gestures.gameController.matched();
        }

        return true;
      },

      /** @private Observe isRunning and start the swipe direction constraint cycling if it goes true. */
      isRunningDidChange: function () {
        var isRunning = this.get('isRunning');

        // Start the gesture cycling.
        if (isRunning) {
          // Begin observing expectedGesture and trigger once to begin cycling.
          this.addObserver('expectedGesture', this, this.expectedGestureDidChange);
          this.expectedGestureDidChange();

        } else {
          // Stop observing expectedGesture.
          this.removeObserver('expectedGesture', this, this.expectedGestureDidChange);
        }
      }.observes('isRunning'),

      /** @private Each time the gesture changes, update the constraints of our swipe gesture. */
      expectedGestureDidChange: function () {
        var expectedGesture = this.get('expectedGesture'),
            swipeGesture = this.gestures[1];

        if (expectedGesture.indexOf('swipe') === 0) {
          // We use a special gesture naming syntax to match to the type of swipe.
          var anglesName = expectedGesture.split('-')[1]; // ex. 'swipe-SWIPE_LEFT-1' == [180], 'swipe-SWIPE_RIGHT-1' == [0]

          swipeGesture.direction = SC[anglesName];
        } else {
          // Disable swipes by not accepting any angles.
          swipeGesture.direction = [];
        }
      }

    }),

    // The timer bar.
    timerBar: SC.View.design({

      displayLevel: function () {
        var level = this.get('level');

        return level ? "Level " + level : "";
      }.property('level').cacheable(),

      displayProperties: ['timeRemaining', 'level'],

      layerId: 'timer-bar',

      layout: { bottom: 0, height: 75 },

      levelBinding: SC.Binding.oneWay('Gestures.gameController.level'),

      timeRemainingBinding: SC.Binding.oneWay('Gestures.gameController.timeRemaining'),

      render: function (context) {
        context.begin().addClass('level-label').addClass('level-label-behind').end();
        context.begin().setAttr('id', 'timer-bar-inner').setStyle('width', '100%').end();
        context.begin().addClass('level-label').end();
      },

      update: function (jqObject) {
        var timeRemaining = this.get('timeRemaining');
        var timerBar = jqObject.find('#timer-bar-inner');
        timerBar.css('width', ((timeRemaining / Gestures.GAME_LENGTH) * 100) + '%');

        var level = this.get('level');
        timerBar.toggleClass('level-1', level === 1);
        timerBar.toggleClass('level-2', level === 2);
        timerBar.toggleClass('level-3', level === 3 && timeRemaining >= 10000);
        timerBar.toggleClass('level-3-urgent', level === 3 && timeRemaining < 10000);

        var displayLevel = this.get('displayLevel');
        jqObject.find('.level-label').html(displayLevel);
      }
    }),

    // Toggles the isPaused value on each click.
    pauseToggle: SC.ButtonView.design({

      action: 'togglePause',

      classNameBindings: ['isPaused'],

      displayProperties: ['isPaused'],

      layerId: 'pause-toggle',

      isPausedBinding: SC.Binding.from('Gestures.gameController.isPaused'),

      // Only display when the game is running.
      isVisibleBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),

      layout: { bottom: 13, left: 12, height: 48, width: 48 },

      target: Gestures.gameController

    })

  })

});
