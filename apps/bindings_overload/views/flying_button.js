// ==========================================================================
// Project:   BindingsOverload.FlyingButtonView
// Copyright: ©2009 Apple, Inc.
// ==========================================================================
/*globals BindingsOverload */

/** @class

  FlyingButtonView subclasses SC.ButtonView and adds some code to reposition
  itself after being appended to the DOM, fading out after a period of time,
  and adding itself back to the button pool.

  It relies on WebKit transitions to perform the actual animation.

  @extends SC.View
*/
BindingsOverload.FlyingButtonView = SC.ButtonView.extend(SC.Animatable, 
/** @scope BindingsOverload.FlyingButtonView.prototype */ {

  transitions: {
    opacity: {
      duration: 1,
      timing: 'linear',
      action: '_opacityDoneAnimating'
    },
    left: {
      duration: 1,
      timing: 'ease-in-out'
    },
    top: {
      duration: 1,
      timing: 'ease-in-out',
      action: '_topDoneAnimating'
    }
  },

  wantsAcceleratedLayer: YES,

  /**
    Choose a random position in the viewport and move the view there.

    didAppendToDocument is automatically called on SC.Views when they are
    rendered and placed in the DOM.
  */
  didAppendToDocument: function() {
    // Perform the repositioning in 100ms.
    // This is necessary due to an apparent optimization in WebKit that will
    // just move the element to the new location instead of triggering an
    // optimization.

    // invokeLater is similar to setTimeout, but is more performant and
    // reliable. It is available on any instance of SC.Object.
    this.invokeLater(function() {
      var frame = this.getPath('pane.frame'), width, height;
      width = Math.floor(Math.random()*(frame.width-100));
      height = Math.floor(Math.random()*(frame.height-24));
      this.adjust({ left: width, top: height });
    }, 100);

    // Once we've been on screen for 3 seconds, begin to dim the control.
    this.invokeLater(this.dimControl, 6000);
  },

  /**
    Called after the button has been on screen for 3 seconds.

    This method directly manipulates the DOM element that represents this
    view. In browsers that support WebKit transitions, this should be a smooth
    fade out.
  */
  dimControl: function() {
    this._opacityEndCallback = this.removeButton;
    this.adjust('opacity', 0);
  },

  /**
    Removes this view from its parent view (in this case, the main pane)
    and returns the button to the button pool.
  */
  removeButton: function() {
    this.adjust('opacity', 1);
    this.removeFromParent();
    
    BindingsOverload.appController.returnToPool(this);
  },

  /**
    Just for fun, make the button run away when you try to mouse over it.
  */
  mouseEntered: function() {
    var rand = Math.floor(Math.random()*400+100), x, y,
        frame = this.get('frame');

    // Hack since the transitions hash is shared
    if (!this._hasClonedTransitions){
      this.transitions.top = SC.clone(this.transitions.top);
      this.transitions.left = SC.clone(this.transitions.left);
      this._hasClonedTransitions = YES;
    }

    if (!this._originalTopDuration) this._originalTopDuration = this.transitions.top.duration;
    if (!this._originalLeftDuration) this._originalLeftDuration = this.transitions.left.duration;
    this.transitions.top.duration = 0.2;
    this.transitions.left.duration = 0.2;
    
    x = (Math.random() > 0.5) ? rand : rand * -1;
    y = (Math.random() > 0.5) ? rand : rand * -1;
    this.adjust({ top: y, left: x });
  },

  _topDoneAnimating: function(){
    if (this._originalTopDuration) {
      this.transitions.top.duration = this._originalTopDuration;
    }
    if (this._originalLeftDuration) {
      this.transitions.left.duration = this._originalLeftDuration;
    }
  },

  _opacityDoneAnimating: function(){
    if (this._opacityEndCallback) {
      this._opacityEndCallback.call(this);
      this._opacityEndCallback = null;
    }
  }

});
