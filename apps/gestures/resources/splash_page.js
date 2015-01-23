// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */


// This page houses the main pane for the splash screen.
// Note, the reason we need an additional splash screen is so that we can have user interaction
// (dismiss the splash screen), which allows us to start playing the lobby music in Mobile Safari.
// Mobile Safari will not autoplay media.
Gestures.splashPage = SC.Page.design({

  // A main pane fills the entire screen. Only one may be used at a time.
  mainPane: SC.MainPane.design({

    childViews: ['splashLogo', 'startButton'],

    transitionOut: SC.View.FADE_OUT,
    // transitionOutOptions: { duration: 6 },
    // SC_LOG_VIEW_STATE: true,

    splashLogo: SC.View.extend({
      layerId: 'splash-logo',
      layout: { centerX: 0, centerY: -25, width: 523, height: 103 }
    }),

    startButton: SC.ButtonView.extend({
      action: 'enterGame',
      classNames: ['touch-to-play-button'],
      layout: { centerX: 0, centerY: 150, height: 500, width: 500 },
      localize: true,
      target: Gestures.gameController,
      transitionIn: SC.View.FADE_IN,
      title: "Touch to Begin",

      // Override SC.ButtonView.prototype.mouseUp
      mouseUp: function () {
        // If a mouse was used, set a flag to show appropriate warnings about touch requirement.
        Gestures.gameController.set('usedMouse', true);
        // Gestures.gameController.enterGameWithMouse();

        var mouseMessagePane = Gestures.accessoriesPage.get('mouseMessagePane');

        mouseMessagePane.append();

        return true;
      }
    })
  })

});
