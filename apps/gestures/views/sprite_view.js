// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */
Gestures.ICON_SIZE = 200;

/** @class */
Gestures.SpriteView = SC.View.extend({
  // SC_LOG_VIEW_STATE: true,

  // When value changes, the view will re-render.
  displayProperties: ['value'],

  // The basic layout for the view makes it a square off screen. The parent will adjust and
  // animate it properly.
  layout: {
    left: 0, top: 0, // Fixed position.
    width: Gestures.ICON_SIZE, height: Gestures.ICON_SIZE // Fixed size.
  },

  // Each time this view is appended, it will twist, fade and scale in.
  transitionIn: Gestures.TWIST_DROP,

  // Each time this view is removed, it will fade out and shrink.
  transitionOut: Gestures.FADE_SHRINK,

  // The value of the view.
  value: null,

  // By setting wantsAcceleratedLayer to true and maintaining a fixed size (width & height)
  // and a fixed position (top & left), this view will be positioned using GPU accelerate-able
  // translations.
  wantsAcceleratedLayer: true,

  /** @see SC.View#render */
  render: function (context) {
    var value = this.get('value');

    if (value) {
      context.addClass(value);
    }

    // Cache the last value for update clean up.
    this._lastClass = value;
  },

  /** @see SC.View#update */
  update: function (jqElement) {
    if (this._lastClass) {
      jqElement.removeClass(this._lastClass);
    }

    var value = this.get('value');
    if (value) {
      jqElement.addClass(value);
    }

    // Cache the last value for update clean up.
    this._lastClass = value;
  }

});
