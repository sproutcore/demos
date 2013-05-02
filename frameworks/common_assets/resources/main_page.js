// ==========================================================================
// Project:   CommonAssets
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global CommonAssets */


// This page describes the main user interface for your application.
CommonAssets.mainPage = SC.Page.create({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.extend({

    childViews: ['bodyView', 'headingView', 'descView'],

    headingView: SC.View.extend({
      childViews: ['titleView', 'viewSourceButton', 'toggleDescButton'],
      layout: { borderBottom: 1, height: 40, zIndex: 3 },
      layerId: 'demo-heading',

      titleView: SC.LabelView.extend({
        classNames: ['demo-title'],
        layout: { left: 8, right: 200, height: 24, centerY: 0 },
        localize: true,
        value: '_DemoTitle'
      }),

      viewSourceButton: SC.ButtonView.extend({
        action: 'viewSource',
        classNames: ['right-icon'],
        controlSize: SC.HUGE_CONTROL_SIZE,
        icon: 'view-source-icon',
        layout: { right: 8, height: 30, centerY: 0, width: 125 },
        localize: true,
        target: CommonAssets,
        sourceURLBinding: SC.Binding.oneWay('CommonAssets.sourceURL'),
        title: '_ViewSourceButton'
      }),

      toggleDescButton: SC.ButtonView.extend({
        buttonBehavior: SC.TOGGLE_BEHAVIOR,
        controlSize: SC.HUGE_CONTROL_SIZE,
        layout: { right: 142, height: 30, centerY: 0, width: 135 },
        localize: true,
        titleBinding: SC.Binding.oneWay('CommonAssets.descriptionIsVisible')
          .transform(function (descriptionIsVisible) {
            if (descriptionIsVisible) {
              return '_HideDescButton';
            } else {
              return '_ShowDescButton';
            }
          }),
        valueBinding: 'CommonAssets.descriptionIsVisible'
      })
    }),

    descView: SC.View.extend({
      childViews: ['textView'],
      layout: { borderBottom: 1, top: 40, height: 200, zIndex: 2 },
      layerId: 'demo-desc',
      isVisible: false,
      isVisibleBinding: SC.Binding.oneWay('CommonAssets.descriptionIsVisible'),
      wantsAcceleratedLayer: true,

      transitionShow: SC.View.SLIDE,
      transitionShowOptions: { direction: 'down' },
      transitionHide: SC.View.SLIDE,
      transitionHideOptions: { direction: 'up' },

      willShowInDocument: function () {
        var label = this.$('.label')[0];

        // Adjust ourself to fit the label + its known padding of 36px.
        this.adjust('height', label.scrollHeight + 36);
      },

      textView: SC.LabelView.extend({
        classNames: ['demo-desc'],
        escapeHTML: false,
        localize: true,
        useStaticLayout: true,
        value: '_DemoDescription'
      })
    }),

    bodyView: SC.ContainerView.extend({
      layout: { top: 40 },
      layerId: 'demo-body',
      nowShowingBinding: SC.Binding.oneWay('CommonAssets.demoContent')
    })

  })

});
