// ==========================================================================
// Project:   LivelyView
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*global LivelyView */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
LivelyView = SC.Application.create(
  /** @scope LivelyView.prototype */ {

  NAMESPACE: 'LivelyView',
  VERSION: '0.1.0',

  showTransition: SC.View.FADE,

  showTransitionOptions: function () {
    return { direction: this.get('showTransitionDirection') };
  }.property('showTransitionDirection').cacheable(),

  showTransitionDirection: 'right',

  showTransitionHasDirection: function () {
    var showTransition = this.get('showTransition');

    switch (showTransition) {
    case SC.View.FADE:
    case SC.View.SCALE:
    case LivelyView.POP:
      return false;
    default:
      return true;
    }
  }.property('showTransition').cacheable(),

  hideTransition: SC.View.FADE,

  hideTransitionOptions: function () {
    return { direction: this.get('hideTransitionDirection') };
  }.property('hideTransitionDirection').cacheable(),

  hideTransitionDirection: 'left',

  hideTransitionHasDirection: function () {
    var hideTransition = this.get('hideTransition');

    switch (hideTransition) {
    case SC.View.FADE:
    case SC.View.SCALE:
    case LivelyView.POP:
      return false;
    default:
      return true;
    }
  }.property('hideTransition').cacheable(),

  viewsAreVisible: true,
  viewsAreFullyShown: false,

  runHideShow: function () {
    // Hide the views.
    this.set('viewsAreVisible', false);
    this.set('viewsAreFullyShown', false);
  }

});


SC.mixin(LivelyView,
  /** @scope LivelyView */ {

  POP: {
    /** @private */
    setupIn: function (view, options) {
      // Cache the original scale on the view, so that we can reset properly.
      view._prePopInScale = view.get('layout').scale;

      view.adjust({ scale: 0 });
    },

    /** @private */
    runIn: function (view, options) {
      var bigScale,
        callback,
        duration,
        frames,
        poppiness = options.poppiness || 0.2,
        scale,
        transition = this;

      scale = view._prePopInScale || 1;
      bigScale = scale * (poppiness + 1);

      duration = options.duration || 0.25;

      frames = [
        { value: { scale: bigScale }, duration: duration * 0.6, timing: 'ease-out' },
        { value: { scale: scale }, duration: duration * 0.4, timing: 'ease-in-out' }
      ];

      callback = function () {
        view.didTransitionIn(transition, options);
      };

      // Animate through the frames.
      view._animateFrames(frames, callback, options.delay || 0);
    },

    /** @private */
    cancelIn: function (view, options) {
      view.cancelAnimation();
      this.teardown(view, options);
    },

    /** @private */
    teardownIn: function (view, options) {
      // Reset the scale to its original value (may be undefined).
      view.adjust({ scale: view._prePopInScale || null });

      // Clean up.
      delete view._prePopInScale;
    },

    /** @private */
    setupOut: function (view, options) {
      // Cache the original scale on the view, so that we can reset properly.
      view._prePopOutScale = view.get('layout').scale;
    },

    /** @private */
    runOut: function (view, options) {
      var bigScale,
        callback,
        duration,
        frames,
        poppiness = options.poppiness || 0.15,
        scale,
        transition = this;

      scale = view.get('layout').scale || 1;
      bigScale = scale * (poppiness + 1);

      duration = options.duration || 0.2;

      frames = [
        { value: { scale: bigScale }, duration: duration * 0.4, timing: 'ease-out' },
        { value: { scale: 0 }, duration: duration * 0.6, timing: 'ease-in-out' }
      ];

      callback = function () {
        view.didTransitionOut(transition, options);
      };

      // Animate through the frames.
      view._animateFrames(frames, callback, options.delay || 0);
    },

    /** @private */
    cancelOut: function (view, options) {
      view.cancelAnimation();
      this.teardown(view, options);
    },

    /** @private */
    teardownOut: function (view, options) {
      // Reset the scale to its original value (may be undefined).
      view.adjust({ scale: view._prePopOutScale || null });

      // Clean up.
      delete view._prePopOutScale;
    }
  }

});
