// ==========================================================================
// Project:   Gestures
// Copyright: @2015 7x7 Software, Inc.
// ==========================================================================
/*globals Gestures */


// This page houses the main pane for the lobby.
/**
  You will find that the layout of this page seems tedious. We use a lot of auto-measuring and
  auto-layout code to position everything, but the page's content is static. A common pattern of
  thought when you begin this kind of work is why not just use an HTML template for this static
  content?

  Well, it is our opinion that HTML + CSS templates are as much work or more to code than the
  equivalent version in SproutCore. So while the SproutCore approach takes effort to get used to
  it does provide two worthwhile benefits. One, as SproutCore evolves the automatic layout and
  measurement code will continue to improve, thus hopefully making SproutCore view layout quicker
  and easier than hand-coding HTML & CSS and two, the SproutCore view approach makes it possible to
  use the SproutCore view designer tool, which will make it an order of magnitude easier to layout
  all content in SproutCore.
*/
Gestures.lobbyPage = SC.Page.design({

  // A main pane fills the entire screen. Only one may be used at a time.
  mainPane: SC.MainPane.design({

    childViews: ['scrollView', 'developerNotesSection'],

    transitionIn: SC.View.FADE_IN,

    scrollView: SC.ScrollView.design({

      contentView: SC.View.design({

        childViews: ['titleSection', 'howToPlaySection', 'gesturesContainer', 'playButton'],

        // Layout the views in a stack from top-to-bottom.
        childViewLayout: SC.View.VERTICAL_STACK,
        childViewLayoutOptions: { paddingBefore: 50, paddingAfter: 70 },

        // The title & subtext.
        titleSection: SC.LabelView.design(SC.AutoResize, {

          // SC.AutoResize
          autoResizePadding:  { height: 15, width: 0 },
          shouldResizeHeight: true,
          shouldResizeWidth: false,

          classNames: ['title-section'],

          // Allow HTML tags in the value (only because this text isn't user defined!).
          escapeHTML: false,

          layout: { left: 30, right: 30, height: 0 },

          value: "<h1>Welcome to the Gestures demo game for SproutCore.</h1><p>A simple game showcasing SproutCore’s built-in support of touch and multi-touch gestures.</p>"
        }),

        // How to play.
        howToPlaySection: SC.LabelView.design(SC.AutoResize, {

          // SC.AutoResize
          autoResizePadding:  { height: 0, width: 0 },
          shouldResizeHeight: true,
          shouldResizeWidth: false,

          classNames: ['how-to-play-section'],

          // Allow HTML tags in the value (only because this text isn't user defined!).
          escapeHTML: false,

          layout: { left: 30, right: 30, height: 0 },

          value: "<h2>How to Play</h2><p>Using a touch device, match gestures as fast as possible to score points. The quicker you can perform the gesture, the more points you can earn. Play through three levels of increasing difficulty to see how many points you can score before the time runs out.</p><h3>The Gestures</h3>"
        }),

        // Samples of the gestures.
        gesturesContainer: SC.View.design({

          childViewLayout: SC.View.VERTICAL_STACK,

          childViews: ['tapBox', 'pinchBox', 'swipeBox'],

          layout: { centerX: 0, width: Gestures.ICON_SIZE, height: 0 },

          modeAdjust: {
            s: { layout: { width: Gestures.ICON_SIZE } },
            m: { layout: { height: 237 } }
          },

          updateDesignMode: function (lastDesignMode, designMode) {
            sc_super();

            if (designMode === 's_p' || designMode === 's_l') {
              this.set('childViewLayout', SC.View.VERTICAL_STACK);
            } else {
              this.set('childViewLayout', SC.View.HORIZONTAL_STACK);
            }
          },

          tapBox: SC.View.design({
            childViews: ['gesture', 'label'],
            childViewLayout: SC.View.VERTICAL_STACK,
            SC_LOG_DESIGN_MODE: true,

            layout: { width: Gestures.ICON_SIZE, height: 0 },

            modeAdjust: {
              s: { layout: { centerX: 0 } },
              m: { layout: { top: null } }
            },

            gesture: SC.ImageView.design({
              layout: { width: Gestures.ICON_SIZE, height: Gestures.ICON_SIZE },
              value: 'tap-1'
            }),

            label: SC.LabelView.extend(SC.AutoResize, {

              // SC.AutoResize
              autoResizePadding: { height: 0, width: 0 },
              shouldResizeHeight: true,
              shouldResizeWidth: false,

              classNames: ['gesture-label'],

              escapeHTML: false,

              layout: { height: 0 },

              value: "<em>Tap</em><br>Tap the screen, not too slow!"
            })
          }),

          pinchBox: SC.View.design({
            childViews: ['gesture', 'label'],
            childViewLayout: SC.View.VERTICAL_STACK,
            SC_LOG_DESIGN_MODE: true,

            layout: { width: Gestures.ICON_SIZE, height: 0 },
            modeAdjust: {
              s: { layout: { centerX: 0 } },
              m: { layout: { top: null } }
              // m: { layout: { centerX: null, top: null } }
            },

            gesture: SC.ImageView.design({
              layout: { width: Gestures.ICON_SIZE, height: Gestures.ICON_SIZE },
              value: 'pinch-in-2'
            }),

            label: SC.LabelView.extend(SC.AutoResize, {

              // SC.AutoResize
              autoResizePadding: { height: 0, width: 0 },
              shouldResizeHeight: true,
              shouldResizeWidth: false,

              classNames: ['gesture-label'],

              escapeHTML: false,

              layout: { height: 0 },

              value: "<em>Pinch</em><br>In or out, watch carefully!"
            })
          }),

          swipeBox: SC.View.design({
            childViews: ['gesture', 'label'],
            childViewLayout: SC.View.VERTICAL_STACK,

            layout: { width: Gestures.ICON_SIZE, height: 0 },
            modeAdjust: {
              s: { layout: { centerX: 0 } },
              m: { layout: { top: null } }
              // m: { layout: { centerX: null, top: null } }
            },

            gesture: SC.ImageView.design({
              layout: { width: Gestures.ICON_SIZE, height: Gestures.ICON_SIZE },
              value: 'swipe-SWIPE_RIGHT-1'
            }),

            label: SC.LabelView.extend(SC.AutoResize, {

              // SC.AutoResize
              autoResizePadding: { height: 0, width: 0 },
              shouldResizeHeight: true,
              shouldResizeWidth: false,

              classNames: ['gesture-label'],

              escapeHTML: false,

              layout: { height: 0 },

              value: "<em>Swipe</em><br>The direction is important!"
            })
          })
        }),

        // The play button.
        playButton: SC.ButtonView.design({
          action: 'start',
          classNames: ['big-green-button'],
          layout: { width: 215, height: 60, centerX: 0 },
          marginBefore: 70,
          target: Gestures.gameController,
          title: "Play",

          // Don't include this view in automatic stacking.
          // useAbsoluteLayout: true
        })

      })

    }),

    // Notes for developers.
    developerNotesSection: SC.View.design({

      childViews: ['developerNotes', 'drawerStateImage', 'drawerToggleZone'],

      closedHeight: 52, // Pre-computed height to just show the title.

      developerNotesFrameBinding: SC.Binding.oneWay('.developerNotes.frame'),

      isExpanded: false,
      isExpandedBinding: SC.Binding.oneWay('Gestures.lobbyPageController.isDeveloperAreaExpanded'),

      // Use a CSS id.
      layerId: 'developer-notes-section',

      layout: { bottom: 0, borderTop: 1, height: 100 },

      // The height of the container only matches its content.
      openHeight: function () {
        var ret;

        // Measure the height of the developer notes text as it would appear on the screen.
        var developerNotesFrame = this.get('developerNotesFrame');
        ret = developerNotesFrame ? developerNotesFrame.height : 300;

        return ret;
      }.property('developerNotesFrame').cacheable(),

      tagName: 'section',

      didAppendToDocument: function () {
        // Animate closed once.
        this.adjust('height', this.get('openHeight'));

        this.invokeLater(this.isExpandedDidChange, 1000);
      },

      isExpandedDidChange: function () {
        var isExpanded = this.get('isExpanded'),
            closedHeight = this.get('closedHeight'),
            openHeight = this.get('openHeight');

        // Went from closed to...
        if (isExpanded) {
          this.animate('height', openHeight, { duration: 0.3 });

        // Went from open to...
        } else {
          this.animate('height', closedHeight, { duration: 0.2 });
        }
      }.observes('isExpanded'),

      drawerToggleZone: SC.ButtonView.extend({
        buttonBehavior: SC.TOGGLE_BEHAVIOR,
        layout: { left: 0, height: 45, right: 0 },
        localize: true,
        valueBinding: SC.Binding.from('Gestures.lobbyPageController.isDeveloperAreaExpanded'), // Two-way!
      }),

      drawerStateImage: SC.ImageView.design({
        // action: 'doExpand',
        // classNames: [],
        // Set the CSS id.
        layerId: 'drawer-state-image',

        isExpanded: false,
        isExpandedBinding: SC.Binding.from('Gestures.lobbyPageController.isDeveloperAreaExpanded'), // Two-way!

        layout: { top: 13, height: 23.5, right: 12, width: 35 },

        value: function () {
          return this.get('isExpanded') ? 'open' : 'closed';
        }.property('isExpanded').cacheable(),

        // didAppendToDocument: function () {
        //   // Position ourself directly to the left of the Developer Notes title.
        //   var developerNotesLayer = this.getPath('parentView.developerNotes.layer'),
        //       developerNotesTitle = developerNotesLayer.firstChild;

        //   // debugger;
        //   SC.prepareStringMeasurement(developerNotesLayer);
        //   var size = SC.measureString(developerNotesTitle);

        //   this.adjust('right', size.width + 5);
        // }

      }),

      developerNotes: SC.LabelView.extend(SC.AutoResize, {
        classNames: ['developer-notes'],

        autoResizePadding:  { height: 15, width: 0 },

        shouldResizeHeight: true,
        shouldResizeWidth: false,

        // Allow HTML tags in the value (only because this text isn't user defined!).
        escapeHTML: false,
        layout: { left: 30, right: 30 },
        value: "<h2>For Developers</h2><p>This demo isn’t just meant to be a game (it’s only so-so fun—), but it is meant to teach us a little about supporting touch gestures and some of the basics of SproutCore apps.</p><p>First, about gestures. SproutCore provides a mixin, <code>SC.Gesturable</code>, that you may add to any of your views in order to quickly support touch gestures. As you may have experienced, gesture code can be very difficult to implement, in particular when there are many touches starting and stopping at different times within a touch session and you don’t want to miss the real gesture nor trigger on a false positive. To save you the trouble of having to deal with the mechanics of touch code, we’ve struggled through the scenarios in order to implement as simple a framework as we could within SproutCore itself, which allows you to focus on better tasks like improving the look and feel of your apps.</p><p>To create a custom gesture, you subclass <code>SC.Gesture</code>, which provides the framework for making gestures intelligent in the face of many different touch scenarios that may be encountered and in spite of the possibility of there being more than one gesture recognizer in use by the view. Normally though you will only need to use one of the three gestures already included in SproutCore: <code>SC.TapGesture</code>, <code>SC.SwipeGesture</code> and <code>SC.PinchGesture</code>. In fact, what you will see in this demo is the use of these three built-in gestures.</p><p>Second, as a SproutCore app, Gestures, has a few nifty aspects that you may want to look at for ideas, such as the use of <code>SC.AudioView</code> to play music (and some tips on designing audio around Mobile Safari constraints) and others. To view the source of this demo (and others), visit here: <a href=\"https://github.com/sproutcore/demos/tree/master/apps\">https://github.com/sproutcore/demos/tree/master/apps</a>.</p>"
      })


    })



  })

});
