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
    case SC.View.POP:
    case LivelyView.TWIST:
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
    case SC.View.POP:
    case LivelyView.TWIST:
      return false;
    default:
      return true;
    }
  }.property('hideTransition').cacheable(),

  viewsAreVisible: true,
  viewsAreFullyShown: false,
  isAttached: false,

  // appendOrRemovePane: function (sender) {
  //   var pane = LivelyView.demoPage.get('panelPane');
  //   // if (pane.get('isAttached')) {
  //   if (this.get('isAttached')) {
  //     pane.remove();

  //     sender.adjust('centerY', 0);
  //     sender.set('title', "_Append");
  //   } else {
  //     pane.append();

  //     sender.adjust('centerY', 275);
  //     sender.set('title', "_RemovePane");
  //   }

  //   this.toggleProperty('isAttached');
  // },

  runHideShow: function () {
    // Hide the views.
    this.set('viewsAreVisible', false);
    this.set('viewsAreFullyShown', false);
  }

});


LivelyView.mixin({
  TWIST: {
    /** @private */
    setupIn: function (view, options, inPlace) {
      view.adjust({
        scale: inPlace ? view.get('layout').scale || 0 : 0,
        rotateX: inPlace ? view.get('layout').rotateX || 90 : 90,
        // rotateY: inPlace ? view.get('layout').rotateY || -90 : -90,
        rotateZ: inPlace ? view.get('layout').rotateZ || -180 : -180
      });
    },

    /** @private */
    runIn: function (view, options, finalLayout, finalFrame) {
      view.animate({
        'scale': finalLayout.scale || 1,
        'rotateX': finalLayout.rotateX || 0,
        // 'rotateY': finalLayout.rotateY || 0,
        'rotateZ': finalLayout.rotateZ || 0
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.4,
        timing: options.timing || 'ease'
      }, function (data) {
        this.didTransitionIn();
      });
    },

    /** @private */
    runOut: function (view, options, finalLayout) {
      view.animate({
        'scale': 0,
        'rotateX': 90,
        // 'rotateY': -90,
        'rotateZ': -180
      }, {
        delay: options.delay || 0,
        duration: options.duration || 0.4,
        timing: options.timing || 'ease'
      }, function (data) {
        this.didTransitionOut();
      });
    }
  }
});
