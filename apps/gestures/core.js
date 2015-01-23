// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Gestures = SC.Application.create(
  /** @scope Gestures.prototype */ {

  NAMESPACE: 'Gestures',
  VERSION: '0.1.0',

  // Levels last 21 seconds.
  GAME_LENGTH: 21 * 1000,

  // A custom in transition plugin. Scales, twists and fades in the view.
  TWIST_DROP: {

    /* @private */
    layoutProperties: ['opacity', 'rotateZ', 'scale'],

    setup: function (view) {
      view.adjust({
        opacity: 0,
        rotateZ: 25,
        scale: 6
      });
    },

    /** @private */
    run: function (view, options) {
      view.animate({
        opacity: 1,
        rotateZ: 0,
        scale: 1
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.4,
        timing: options.timing || 'ease'
      }, function (data) {
        if (!data.isCancelled) {
          this.didTransitionOut();
        }
      });
    }

  },

  // A custom out transition plugin. Shrinks and fades.
  FADE_SHRINK: {
    /* @private */
    layoutProperties: ['opacity', 'scale'],

    /** @private */
    run: function (view, options) {
      view.animate({
        opacity: 0,
        scale: 0.2
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.8,
        timing: options.timing || 'ease'
      }, function (data) {
        if (!data.isCancelled) {
          view.adjust({
            opacity: 1,
            scale: 1
          });

          this.didTransitionOut();
        }
      });
    }
  },

  // A custom out transition plugin. Fades while moving the view up.
  FADE_RISE: {

    /* @private */
    layoutProperties: ['opacity', 'top'],

    /** @private */
    run: function (view, options) {
      var layout = view.get('layout'),
          startTop = layout.top,
          startLeft = layout.left;

      view.animate({
        opacity: 0,
        top: options.finalTop,
        left: options.finalLeft
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.4,
        timing: options.timing || 'ease'
      }, function (data) {
        if (!data.isCancelled) {
          view.adjust({
            opacity: 1,
            top: startTop,
            left: startLeft
          });

          this.didTransitionOut();
        }
      });
    }
  },

  // A custom out transition plugin. Fades while moving the view up.
  FADE_RISE_X: {

    /* @private */
    layoutProperties: ['opacity', 'top'],

    /** @private */
    run: function (view, options) {
      var top = view.get('layout').top,
          newTop = top - 100;

      view.animate({
        opacity: 0,
        top: newTop
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.4,
        timing: options.timing || 'ease'
      }, function (data) {
        if (!data.isCancelled) {
          view.adjust({
            opacity: 1,
            top: top
          });

          this.didTransitionOut();
        }
      });
    }
  }

});
