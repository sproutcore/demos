// ==========================================================================
// Project:   Gestures - mainPage
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */


// This page describes the main user interface for your application.
Gestures.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({
    // The child views of the pane. Note that the gesture targets are last (i.e. rendered on top of the drop zone).
    childViews: ['currentGesture', 'lastPointsLabel', 'totalScoreLabel', 'startLabel', 'gestureTarget', 'timerBar', 'musicToggle', 'pauseToggle'],

    levelLabel: SC.LabelView.design({
      layerId: 'level-label',

      layout: { bottom: 0, height: 75 },

      valueBinding: SC.Binding.oneWay('Gestures.gameController.level')
        .transform(function (level) {
          return level ? "Level " + level : "";
        })
    }),

    lastPointsLabel: SC.LabelView.design({

      // Give our view a custom class name for styling.
      classNames: ['points-label'],

      // Bind to the last display points of the game controller.
      displayLastPointsBinding: SC.Binding.oneWay('Gestures.gameController.displayLastPoints'),

      // Start off invisible.
      isVisible: false,

      // Place the last points below the total score.
      layout: { left: 0, top: 0, height: 100, width: 300 },

      transitionHide: Gestures.FADE_RISE,
      transitionHideOptions: { duration: 2, finalTop: 5, finalLeft: 0 },

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

      wantsAccelerateLayer: true,

      // Each time the last points change, set the label, appear and then dissappear (fades).
      valueDidChange: function () {
        var displayLastPoints = this.get('displayLastPoints');

        if (displayLastPoints) {
          this.set('value', displayLastPoints);

          this.set('isVisible', true);
          this.invokeNext(function () {
            this.set('isVisible', false);
          });

          // Clear out last points each time.
          Gestures.gameController.set('lastPoints', null);
        }
      }.observes('displayLastPoints')

    }),

    totalScoreLabel: SC.LabelView.design({

      // Give our view a custom class name for styling.
      classNames: ['score-label'],

      // Place the score in the top-right.
      layout: { right: 15, top: 5, height: 100, width: 400 },

      // Bind the value of the label to the current score.
      valueBinding: SC.Binding.oneWay('Gestures.gameController.displayScore')

    }),

    currentGesture: SC.View.design({

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
        console.log('matchCountDidChange()');
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

    startLabel: SC.LabelView.design({
      classNames: ['start-label'],

      // Insert the value as is, because it's not user defined.
      escapeHTML: false,

      layout: { centerX: 0, centerY: -25, height: 100, width: 150 },

      transitionHide: SC.View.FADE_OUT,

      valueBinding: SC.Binding.oneWay('Gestures.gameController.score')
          .transform(function (score) {
            if (score === 0) {
              return "<span class=\"start-label-to\">Tap to</span><br>Start";
            } else {
              return "Game Over";
            }
          }),

      // When isRunning property of gameController goes false, fades out.
      isVisibleBinding: SC.Binding.oneWay('Gestures.gameController.isRunning').not()
      // isVisibleBinding: SC.Binding.mix('Gestures.gameController.isRunning', 'Gestures.gameController.score',
      //     function (isRunning, score) {
      //       return !isRunning && score === 0;
      //     })
    }),

    // This view is the target of our gestures (Regular Mode).
    gestureTarget: SC.View.design(SC.Gesturable, {

      layerId: 'gesture-target',

      // The view will support the three basic SproutCore built-in gestures: Pinches, Swipes & Taps.
      gestures: [SC.PinchGesture, SC.SwipeGesture.extend({ direction: [] }), SC.TapGesture], // [0, 180, 90, -90]

      isPausedBinding: SC.Binding.from('Gestures.gameController.isPaused'),
      classNameBindings: ['isPaused'],

      // Whether the game is running or not.
      isRunning: false,
      isRunningBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),

      // We need to know what gesture we should accept in order to set the constraints of our gestures.
      expectedGesture: null,
      expectedGestureBinding: SC.Binding.oneWay('Gestures.gameController.expectedGesture'),

      // Handle the tap action.
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

      // handle the pinch action
      pinch: function (scale, numberOfTouches) {
        if (this.get('isRunning') && !this.get('isPaused')) {
          // Pinches trigger as fast as possible, but we only accept it as a match when it meets a certain scale.
          var direction = scale < 0.6 ? 'in' : (scale > 1.6 ? 'out' : null);

          if (direction !== null) {
            // console.warn("Pinched! With scale: " + scale);
            var expectedGesture = this.get('expectedGesture');

            // Check if the gesture matches this type of pinch. Ex. 'pinch-in-2', 'pinch-out-2', ...
            var thisGesture = 'pinch-' + direction + '-' + numberOfTouches;
            if (expectedGesture === thisGesture) {
              Gestures.gameController.matched();
            }
          }
        }
      },

      pinchEnd: function () {
        // Reset the scale of the gesture each time.
        this.gestures[0].scale = 1;
      },

      // handle the swipe action
      swipe: function (direction, numberOfTouches) {
        // console.warn("Swiped! In direction: %@, number: %@".fmt(direction, numberOfTouches));
        if (this.get('isRunning') && !this.get('isPaused')) {
          Gestures.gameController.matched();
        }
      },

      mouseDown: function () {
        return true;
      },

      mouseUp: function () {
        if (!this.get('isPaused')) {
          if (this.get('isRunning')) {
            Gestures.gameController.matched();
          } else {
            // Show the message that this only works with touch events.
            var mouseMessagePane = Gestures.mainPage.get('mouseMessagePane');

            mouseMessagePane.append();
          }
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

    // This is the sound control toggle, which includes the music player within it.
    musicToggle: SC.View.design({

      childViews: ['audioView'],

      // Two-way binding.
      isMuted: false,
      isMutedBinding: SC.Binding.from('Gestures.gameController.isMuted'),

      layerId: 'music-button',

      layout: { top: 34, left: 12, width: 48, height: 48 },

      // Create a poor-man's button. This implementation lacks a lot of nuance that a real button
      // should support, such as touch down in the button, drag out and then lift (which shouldn't
      // fire the action).
      _g_action: function () {
        this.toggleProperty('isMuted');
      },

      isMutedDidChange: function () {
        if (this.get('isMuted')) {
          this.adjust('opacity', 0.3);
        } else {
          this.adjust('opacity', 1);
        }
      }.observes('isMuted'),

      mouseDown: function () {
        return true;
      },

      mouseUp: function () {
        this._g_action();

        return true;
      },

      touchStart: function () {
        return true;
      },

      touchEnd: function () {
        this._g_action();
      },

      audioView: SC.AudioView.design({

        // Whether the game is running or not.
        isRunning: false,
        isRunningBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),

        isPaused: false,
        isPausedBinding: SC.Binding.oneWay('Gestures.gameController.isPaused'),

        isMuted: false,
        isMutedBinding: SC.Binding.from('Gestures.gameController.isMuted'),

        _g_tracks: [
          sc_static('audio/Life-of-Riley.mp3'), // Waiting room
          sc_static('audio/Electrodoodle.mp3')  // Playing
        ],

        // Position the actual audio tag out-of-sight.
        layout: { width: 1, height: 1, left: -1, top: -1 },

        volume: 0.3,

        init: function () {
          this.isRunningDidChange();

          sc_super();
        },

        canPlayDidChange: function () {
          var canPlay = this.get('canPlay');

          if (canPlay) {
            this.play();
          }
        }.observes('canPlay'),

        // When the game pauses, duck the audio level down (if sound is on).
        isPausedDidChange: function () {
          var isRunning = this.get('isRunning'),
              isMuted = this.get('isMuted');

          if (isRunning && !isMuted) {
            if (this.get('isPaused')) {
              // this.stop();
              // this.set('value', this._g_tracks[0]);
              this.set('volume', 0.05);
            } else {
              // this.play();
              // this.set('value', this._g_tracks[1]);
              this.set('volume', 0.3);
            }
          }
        }.observes('isPaused'),

        // When the game starts, switch to our game play music; else switch to the lobby music.
        isRunningDidChange: function () {
          var isRunning = this.get('isRunning');

          if (isRunning) {
            this.set('value', this._g_tracks[1]);
          } else {
            this.set('value', this._g_tracks[0]);
          }

          // Update the volume appropriately.
          this.isMutedDidChange();
        }.observes('isRunning'),

        // Whenever muted, set the volume to 0; when unmuted, set the volume according to isPaused.
        isMutedDidChange: function () {
          if (this.get('isMuted')) {
            // this.stop();
            this.set('volume', 0);
          } else {
            if (this.get('isPaused')) {
              this.set('volume', 0.05);
            } else {
              this.set('volume', 0.3);
            }
          }
        }.observes('isMuted')


      })

    }),

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

    pauseToggle: SC.ButtonView.design({

      displayProperties: ['isPaused'],

      layerId: 'pause-toggle',

      action: 'togglePause',

      // Whether the game is running or not.
      isVisibleBinding: SC.Binding.oneWay('Gestures.gameController.isRunning'),
      isPausedBinding: SC.Binding.from('Gestures.gameController.isPaused'),
      classNameBindings: ['isPaused'],

      layout: { bottom: 13, left: 12, height: 48, width: 48 },

      target: Gestures.gameController

    })

  }),

  mouseMessagePane: SC.PanelPane.design({

    layout: { centerX: 0, centerY: 0, width: 210, height: 205 },

    contentView: SC.View.design({
      childViews: ['message', 'okButton'],

      // The message.
      message: SC.LabelView.extend({
        classNames: ['pane-message'],
        layout: { height: 140, left: 10, right: 10, top: 10 },
        localize: true,
        escapeHTML: false,
        value: "<span class=\"pane-message-title\">Sorry!</span><br>This game is meant for touch input.<br><br>For the demo, your mouse clicks will trigger the proper gestures, but to try it for real, you will need a touch device."
      }),

      okButton: SC.ButtonView.design({

        action: 'startWithMouse',

        classNames: ['pane-button'],

        layout: { bottom: 5, height: 40, left: 10, right: 10 },

        title: "OK",

        target: Gestures.gameController

      })

    })

  })

});
