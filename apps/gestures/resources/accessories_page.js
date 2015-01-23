// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */


// This page houses the audio pane and any other non-main panes we may need.
Gestures.accessoriesPage = SC.Page.design({

  // An offscreen pane with audio tags.
  audioPane: SC.Pane.design({

    childViews: ['musicToggle', 'lobbyAudio', 'gameAudio'],

    // Position the actual audio tag out-of-sight.
    layout: { top: 6, left: 4, width: 40, height: 40 }, // , left: -1, top: -1 },

    // This is the sound control toggle. To stop/start music.
    musicToggle: SC.ButtonView.design({

      action: 'toggleMusic',

      classNameBindings: ['isMuted'],

      isMuted: false,
      isMutedBinding: SC.Binding.oneWay('Gestures.gameController.isMuted'),

      isVisible: false,

      layerId: 'music-button',

      // layout: { top: 34, left: 12, width: 48, height: 48 },
      layout: { zIndex: 1 }, // Keep this pane on top.

      target: Gestures.gameController

    }),

    // The lobby music.
    // Note, an earlier version of this demo had one audio tag which had its value updated
    // dynamically. Mobile Safari won't allow you to automatically play audio though, so we need
    // two pre-rendered elements prerendered for when the user interacts with the game.
    lobbyAudio: SC.AudioView.design({

      value: sc_static('audio/Life-of-Riley.mp3')

    }),

    // The game music.
    gameAudio: SC.AudioView.design({

      value: sc_static('audio/Electrodoodle.mp3')

    })
  }),

  gameEndPane: SC.PanelPane.design({

    layout: { centerX: 0, centerY: 0, width: 290, height: 280 },

    contentView: SC.View.design({
      childViews: ['message', 'finalScore', 'closeButton'],

      // The message.
      message: SC.LabelView.extend({
        classNames: ['pane-message'],
        layout: { height: 80, left: 10, right: 10, top: 15 },
        localize: true,
        escapeHTML: false,
        value: "<span class=\"pane-message-title\">Thanks for Playing!</span>"
      }),

      finalScore: SC.LabelView.extend({
         // Give our view a custom class name for styling.
        classNames: ['score-label', 'pane-score'],

        // Place the score in the top-right.
        layout: { top: 90, height: 100 },

        // Bind the value of the label to the current score.
        valueBinding: SC.Binding.oneWay('Gestures.gameController.displayScore')
      }),

      closeButton: SC.ButtonView.design({

        action: 'exitGame',

        classNames: ['pane-button'],

        layout: { bottom: 10, height: 40, left: 10, right: 10 },

        title: "Close",

        target: Gestures.gameController

      })
    })
  }),

  mouseMessagePane: SC.PanelPane.design({

    layout: { centerX: 0, centerY: 0, width: 210, height: 220 },

    contentView: SC.View.design({
      childViews: ['message', 'okButton'],

      // The message.
      message: SC.LabelView.extend({
        classNames: ['pane-message'],
        layout: { height: 140, left: 10, right: 10, top: 15 },
        localize: true,
        escapeHTML: false,
        value: "<span class=\"pane-message-title\">Sorry!</span><br>This game is meant for touch input.<br><br>For the demo, your mouse clicks will trigger the proper gestures, but to try it for real, you will need a touch device."
      }),

      okButton: SC.ButtonView.design({

        action: 'enterGameWithMouse',

        classNames: ['pane-button'],

        layout: { bottom: 10, height: 40, left: 10, right: 10 },

        title: "OK",

        target: Gestures.gameController

      })

    })

  })

});
