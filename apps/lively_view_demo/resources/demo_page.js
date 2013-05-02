// ==========================================================================
// Project:   LivelyView - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*global LivelyView */

// This page describes the main user interface for your application.
LivelyView.demoPage = SC.Page.create({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.View.extend({
    childViews: ['bodyView', 'headerView'],
    classNames: ['demo-content'],
    layout: { border: 1, centerX: 0, centerY: 0, width: 420, height: 520, zIndex: 1 },

    // Automatic transitions.
    transitionIn: LivelyView.POP,

    headerView: SC.View.extend({
      classNames: ['header-view'],
      childViews: ['inTitle', 'outTitle', 'inSelect', 'outSelect', 'inDirectionSelect', 'outDirectionSelect', 'runButton'],
      layout: { borderBottom: 1, height: 150, zIndex: 2 },

      outTitle: SC.LabelView.extend({
        classNames: ['title'],
        layout: { top: 15, left: 20, height: 25, width: 170, zIndex: 1 },
        localize: true,
        value: "_Out"
      }),

      outSelect: SC.SelectView.extend({
        // Disable the button while the transitions are occurring.
        isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
        layout: { width: 170, height: 24, left: 20, top: 45 },
        localize: true,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        items: [
          { title: "_Fade", value: SC.View.FADE },
          { title: "_Move", value: SC.View.SLIDE },
          { title: "_Bounce", value: SC.View.BOUNCE },
          { title: "_Spring", value: SC.View.SPRING },
          { title: "_Scale", value: SC.View.SCALE },
          { title: "_Pop", value: LivelyView.POP }
        ],
        valueBinding: 'LivelyView.hideTransition',

        // Resize ourself when the transition has direction.
        hideTransitionHasDirectionBinding: SC.Binding.oneWay('LivelyView.hideTransitionHasDirection'),
        hideTransitionHasDirectionDC: function () {
          var hideTransitionHasDirection = this.get('hideTransitionHasDirection');

          if (hideTransitionHasDirection) {
            this.animate('width', 100, { duration: 0.4 });
          } else {
            this.animate('width', 170, { duration: 0.4 });
          }
        }.observes('hideTransitionHasDirection')
      }),

      outDirectionSelect: SC.SelectView.extend({
        // Disable the button while the transitions are occurring.
        isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
        isVisible: false,
        isVisibleBinding: SC.Binding.oneWay('LivelyView.hideTransitionHasDirection'),
        layout: { width: 65, height: 24, left: 125, top: 45, zIndex: 2 },
        localize: true,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        items: [
          { title: "_Left", value: 'left' },
          { title: "_Right", value: 'right' },
          { title: "_Up", value: 'up' },
          { title: "_Down", value: 'down' }
        ],
        valueBinding: 'LivelyView.hideTransitionDirection',

        // Automatic transitions.
        transitionShow: SC.View.FADE,
        transitionShowOptions: { delay: 0.2 },
        transitionHide: SC.View.FADE,
        transitionHideOptions: { duration: 0.2 }
      }),

      inTitle: SC.LabelView.extend({
        classNames: ['title'],
        layout: { top: 15, right: 20, height: 25, width: 170, zIndex: 1 },
        localize: true,
        value: "_In"
      }),

      inSelect: SC.SelectView.extend({
        // Disable the button while the transitions are occurring.
        isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
        layout: { width: 170, height: 24, left: 230, top: 45 },
        localize: true,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        items: [
          { title: "_Fade", value: SC.View.FADE },
          { title: "_Move", value: SC.View.SLIDE },
          { title: "_Bounce", value: SC.View.BOUNCE },
          { title: "_Spring", value: SC.View.SPRING },
          { title: "_Scale", value: SC.View.SCALE },
          { title: "_Pop", value: LivelyView.POP }
        ],
        valueBinding: 'LivelyView.showTransition',

        // Resize ourself when the transition has direction.
        showTransitionHasDirectionBinding: SC.Binding.oneWay('LivelyView.showTransitionHasDirection'),
        showTransitionHasDirectionDC: function () {
          var showTransitionHasDirection = this.get('showTransitionHasDirection');

          if (showTransitionHasDirection) {
            this.animate('width', 100, { duration: 0.4 });
          } else {
            this.animate('width', 170, { duration: 0.4 });
          }
        }.observes('showTransitionHasDirection')
      }),

      inDirectionSelect: SC.SelectView.extend({
        // Disable the button while the transitions are occurring.
        isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
        isVisible: false,
        isVisibleBinding: SC.Binding.oneWay('LivelyView.showTransitionHasDirection'),
        layout: { width: 65, height: 24, right: 20, top: 45, zIndex: 2 },
        localize: true,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        items: [
          { title: "_Left", value: 'left' },
          { title: "_Right", value: 'right' },
          { title: "_Up", value: 'up' },
          { title: "_Down", value: 'down' }
        ],
        valueBinding: 'LivelyView.showTransitionDirection',

        // Automatic transitions.
        transitionShow: SC.View.FADE,
        transitionShowOptions: { delay: 0.2 },
        transitionHide: SC.View.FADE,
        transitionHideOptions: { duration: 0.2 }
      }),

      runButton: SC.ButtonView.extend({
        action: 'runHideShow',
        classNames: ['run-button'],
        // Disable the button while the transitions are occurring.
        isEnabledBinding: SC.Binding.oneWay('LivelyView.viewsAreFullyShown'),
        layout: { bottom: 15, centerX: 0, width: 130, height: 44 },
        controlSize: SC.JUMBO_CONTROL_SIZE,
        localize: true,
        target: LivelyView,
        title: "_Go"
      })

    }),

    bodyView: SC.View.extend({
      childViews: ['view1', 'view2', 'view3'],
      layout: { top: 150, zIndex: 1 },

      view1: SC.LabelView.extend({
        classNames: ['sample-view', 'view1'],
        layout: { border: 2, centerX: 0, top: 25, width: 350, height: 100 },
        isVisibleBinding: SC.Binding.oneWay('LivelyView.viewsAreVisible'),
        wantsAcceleratedLayer: true,
        value: "1",

        // Automatic transitions.
        transitionIn: SC.View.SLIDE,
        transitionInOptions: { delay: 0.35 },

        transitionShowBinding: SC.Binding.oneWay('LivelyView.showTransition'),
        transitionShowOptionsBinding: SC.Binding.oneWay('LivelyView.showTransitionOptions'),

        transitionHideBinding: SC.Binding.oneWay('LivelyView.hideTransition'),
        transitionHideOptionsBinding: SC.Binding.oneWay('LivelyView.hideTransitionOptions')
      }),

      view2: SC.LabelView.extend({
        classNames: ['sample-view', 'view2'],
        layout: { border: 2, centerX: 0, top: 135, width: 350, height: 100 },
        isVisibleBinding: SC.Binding.oneWay('LivelyView.viewsAreVisible'),
        wantsAcceleratedLayer: true,
        value: "2",

        // Automatic transitions.
        transitionIn: SC.View.SLIDE,
        transitionInOptions: { delay: 0.6, direction: 'left' },

        transitionShowBinding: SC.Binding.oneWay('LivelyView.showTransition'),
        transitionShowOptionsBinding: SC.Binding.oneWay('LivelyView.showTransitionOptions')
          .transform(
            function (options) {
              // Add a slight delay for interest sake.  Don't mutate the object, it's shared.
              return { direction: options.direction, delay: 0.2 };
            }),

        transitionHideBinding: SC.Binding.oneWay('LivelyView.hideTransition'),
        transitionHideOptionsBinding: SC.Binding.oneWay('LivelyView.hideTransitionOptions')
          .transform(
            function (options) {
              // Add a slight delay for interest sake.  Don't mutate the object, it's shared.
              return { direction: options.direction, delay: 0.2 };
            })
      }),

      view3: SC.LabelView.extend({
        classNames: ['sample-view', 'view3'],
        layout: { border: 2, centerX: 0, top: 245, width: 350, height: 100 },
        isVisibleBinding: SC.Binding.oneWay('LivelyView.viewsAreVisible'),
        wantsAcceleratedLayer: true,
        value: "3",

        didHideInDocument: function () {
            // Show the views again now that the last view is hidden.
          LivelyView.set('viewsAreVisible', true);
        },

        didShowInDocument: function () {
          // Indicate that the views are all fully shown.
          LivelyView.set('viewsAreFullyShown', true);
        },

        // Automatic transitions.
        transitionIn: SC.View.SLIDE,
        transitionInOptions: { delay: 0.85 },

        transitionShowBinding: SC.Binding.oneWay('LivelyView.showTransition'),
        transitionShowOptionsBinding: SC.Binding.oneWay('LivelyView.showTransitionOptions')
          .transform(
            function (options) {
              // Add a slight delay for interest sake.  Don't mutate the object, it's shared.
              return { direction: options.direction, delay: 0.4 };
            }),

        transitionHideBinding: SC.Binding.oneWay('LivelyView.hideTransition'),
        transitionHideOptionsBinding: SC.Binding.oneWay('LivelyView.hideTransitionOptions')
          .transform(
            function (options) {
              // Add a slight delay for interest sake.  Don't mutate the object, it's shared.
              return { direction: options.direction, delay: 0.4 };
            })
      })

    })

  })

});
