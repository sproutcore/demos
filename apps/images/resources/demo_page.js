// ==========================================================================
// Project:   Images - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*global Images */

// This page describes the main user interface for your application.
Images.demoPage = SC.Page.create({

  demoContent: SC.View.extend({
    childViews: ['scaleShadowImage', 'normalImage', 'sourceTitle', 'destTitle', 'arrowView', 'scaleImage', 'controlView', 'scaleButton', 'topLeftButton', 'topButton', 'topRightButton', 'leftButton', 'centerButton', 'rightButton', 'bottomLeftButton', 'bottomButton', 'bottomRightButton'],

    sourceTitle: SC.LabelView.extend({
      classNames: ['title'],
      escapeHTML: false,
      layout: { left: 0, centerY: 235, height: 30, width: 310 },
      localize: true,
      value: "_OriginalTitle"
    }),

    normalImage: SC.ImageView.extend({
      classNames: ['unscaled-image'],
      layout: { border: 1, left: -350, centerY: 0, width: 650, height: 432 },
      placeholder: 'loading',
      value: sc_static('fjola.jpg')
    }),

    arrowView: SC.ImageView.extend({
      layout: { left: 150, width: 320, height: 180, centerY: 0 },
      value: 'arrow'
    }),

    controlView: SC.View.extend({
      classNames: ['demo-content'],
      layout: { border: 1, left: 215, centerY: 0, width: 170, height: 290 },
      childViews: ['scaleTitle', 'alignTitle'],

      scaleTitle: SC.LabelView.extend({
        classNames: ['control-title'],
        layout: { left: 10, top: 0, height: 25 },
        localize: true,
        value: "_ScaleTitle"
      }),

      alignTitle: SC.LabelView.extend({
        classNames: ['control-title'],
        layout: { left: 10, top: 155, height: 25 },
        localize: true,
        value: "_AlignTitle"
      })
    }),

    scaleButton: SC.SegmentedView.extend({
      controlSize: SC.LARGE_CONTROL_SIZE,
      layout: { left: 225, centerY: -60, height: 120, width: 150 },
      layoutDirection: SC.LAYOUT_VERTICAL,
      itemTitleKey: 'title',
      itemValueKey: 'value',
      items: [
        { title: "_Fill", value: SC.FILL },
        { title: "_BestFill", value: SC.BEST_FILL },
        { title: "_BestFit", value: SC.BEST_FIT },
        { title: "_NoScaling", value: SC.SCALE_NONE }
      ],
      valueBinding: 'Images.scaleValue'
    }),

    topLeftButton: SC.ButtonView.extend({
      layout: { left: 225, centerY: 50, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_TopLeft",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP_LEFT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue === SC.SCALE_NONE;
        })
    }),

    topButton: SC.ButtonView.extend({
      layout: { left: 276, centerY: 50, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_Top",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue !== SC.FILL && scaleValue !== SC.BEST_FILL;
        })
    }),

    topRightButton: SC.ButtonView.extend({
      layout: { left: 327, centerY: 50, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_TopRight",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP_RIGHT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue === SC.SCALE_NONE;
        })
    }),

    leftButton: SC.ButtonView.extend({
      layout: { left: 225, centerY: 80, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_Left",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_LEFT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue !== SC.FILL && scaleValue !== SC.BEST_FIT;
        })
    }),

    centerButton: SC.ButtonView.extend({
      layout: { left: 276, centerY: 80, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_Center",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_CENTER,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue !== SC.FILL;
        })
    }),

    rightButton: SC.ButtonView.extend({
      layout: { left: 327, centerY: 80, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_Right",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_RIGHT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue !== SC.FILL && scaleValue !== SC.BEST_FIT;
        })
    }),

    bottomLeftButton: SC.ButtonView.extend({
      layout: { left: 225, centerY: 110, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_BottomLeft",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM_LEFT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue === SC.SCALE_NONE;
        })
    }),

    bottomButton: SC.ButtonView.extend({
      layout: { left: 276, centerY: 110, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_Bottom",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue !== SC.FILL && scaleValue !== SC.BEST_FILL;
        })
    }),

    bottomRightButton: SC.ButtonView.extend({
      layout: { left: 327, centerY: 110, height: 30, width: 49 },
      controlSize: SC.HUGE_CONTROL_SIZE,
      localize: true,
      title: "_BottomRight",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM_RIGHT,
      valueBinding: 'Images.alignValue',
      isEnabledBinding: SC.Binding.oneWay('Images.scaleValue')
        .transform(function (scaleValue) {
          return scaleValue === SC.SCALE_NONE;
        })
    }),

    destTitle: SC.LabelView.extend({
      classNames: ['title', 'dest'],
      escapeHTML: false,
      layout: { centerX: 200, centerY: 145, height: 30, width: 270 },
      localize: true,
      value: "_DestinationTitle"
    }),

    scaleShadowImage: SC.ImageView.extend({
      classNames: ['shadow-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      scaleBinding: SC.Binding.oneWay('Images.scaleValue'),
      layout: { border: 1, centerX: 200, centerY: 0, width: 250, height: 250 },
      value: sc_static('fjola.jpg'),

      alignScaleObserver: function () {
        var align = this.get('align'),
          scale = this.get('scale');

        switch (scale) {
        case SC.BEST_FILL:
          this.adjust({ height: 250, width: 376, centerY: 0 });

          switch (align) {
          case SC.ALIGN_TOP_LEFT:
          case SC.ALIGN_LEFT:
          case SC.ALIGN_BOTTOM_LEFT:
            this.adjust('centerX', 200 + 63);
            break;
          case SC.ALIGN_TOP_RIGHT:
          case SC.ALIGN_RIGHT:
          case SC.ALIGN_BOTTOM_RIGHT:
            this.adjust('centerX', 200 - 63);
            break;
          default:
            this.adjust('centerX', 200);
          }
          break;
        case SC.SCALE_NONE:
          this.adjust({ height: 432, width: 650 });

          switch (align) {
          case SC.ALIGN_TOP_LEFT:
            this.adjust('centerX', 200 + 200);
            this.adjust('centerY', 91);
            break;
          case SC.ALIGN_LEFT:
            this.adjust('centerX', 200 + 200);
            this.adjust('centerY', 0);
            break;
          case SC.ALIGN_BOTTOM_LEFT:
            this.adjust('centerX', 200 + 200);
            this.adjust('centerY', -91);
            break;
          case SC.ALIGN_TOP_RIGHT:
            this.adjust('centerX', 200 - 200);
            this.adjust('centerY', 91);
            break;
          case SC.ALIGN_RIGHT:
            this.adjust('centerX', 200 - 200);
            this.adjust('centerY', 0);
            break;
          case SC.ALIGN_BOTTOM_RIGHT:
            this.adjust('centerX', 200 - 200);
            this.adjust('centerY', -91);
            break;
          case SC.ALIGN_TOP:
            this.adjust('centerX', 200);
            this.adjust('centerY', 91);
            break;
          case SC.ALIGN_BOTTOM:
            this.adjust('centerX', 200);
            this.adjust('centerY', -91);
            break;
          default:
            this.adjust('centerX', 200);
            this.adjust('centerY', 0);
          }
          break;
        default:
          this.adjust({ height: 250, width: 250, centerX: 200, centerY: 0 });
        }
      }.observes('align', 'scale')
    }),

    scaleImage: SC.ImageView.extend({
      classNames: ['scaled-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: 200, centerY: 0, width: 250, height: 250 },
      scaleBinding: SC.Binding.oneWay('Images.scaleValue'),
      value: sc_static('fjola.jpg')
    })

  }),

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent2: SC.View.extend({
    childViews: ['noScaleShadow', 'noScaleImage', 'noScaleTitle', 'bestFillShadow', 'bestFillImage', 'bestFillTitle', 'bestFitImage', 'bestFitTitle', 'fillImage', 'fillTitle', 'topLeftButton', 'topButton', 'topRightButton', 'leftButton', 'centerButton', 'rightButton', 'bottomLeftButton', 'bottomButton', 'bottomRightButton'],

    // 'normalImage', 'normalImageOverlay',
    // normalImageOverlay: SC.View.extend({
    //   classNames: ['normal-image-overlay'],
    //   layout: { centerX: 0, centerY: 0, width: 650, height: 432 }
    // }),

    // normalImage: SC.ImageView.extend({
    //   classNames: ['normal-image'],
    //   layout: { centerX: 0, centerY: 0, width: 650, height: 432 },
    //   value: sc_static('fjola.jpg')
    // }),

    bestFillTitle: SC.LabelView.extend({
      classNames: ['title'],
      layout: { centerX: -250, centerY: -310, height: 40, width: 250 },
      localize: true,
      value: "_BestFill"
    }),

    bestFillShadow: SC.ImageView.extend({
      classNames: ['shadow-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: -250, centerY: -200, width: 376, height: 250 },
      value: sc_static('fjola.jpg'),

      alignObserver: function () {
        var align = this.get('align');

        switch (align) {
        case SC.ALIGN_TOP_LEFT:
        case SC.ALIGN_LEFT:
        case SC.ALIGN_BOTTOM_LEFT:
          this.adjust('centerX', -250 + 63);
          break;
        case SC.ALIGN_TOP_RIGHT:
        case SC.ALIGN_RIGHT:
        case SC.ALIGN_BOTTOM_RIGHT:
          this.adjust('centerX', -250 - 63);
          break;
        default:
          this.adjust('centerX', -250);
        }
      }.observes('align')
    }),

    bestFillImage: SC.ImageView.extend({
      classNames: ['scaled-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: -250, centerY: -200, width: 250, height: 250 },
      scale: SC.BEST_FILL,
      value: sc_static('fjola.jpg')
    }),

    bestFitImage: SC.ImageView.extend({
      classNames: ['scaled-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: -250, centerY: 200, width: 250, height: 250 },
      scale: SC.BEST_FIT,
      value: sc_static('fjola.jpg')
    }),

    fillImage: SC.ImageView.extend({
      classNames: ['scaled-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: 250, centerY: -200, width: 250, height: 250 },
      value: sc_static('fjola.jpg')
    }),

    noScaleShadow: SC.ImageView.extend({
      classNames: ['shadow-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: 250, centerY: 200, width: 650, height: 432 },
      value: sc_static('fjola.jpg'),

      alignObserver: function () {
        var align = this.get('align');

        switch (align) {
        case SC.ALIGN_TOP_LEFT:
          this.adjust('centerX', 250 + 200);
          this.adjust('centerY', 200 + 91);
          break;
        case SC.ALIGN_LEFT:
          this.adjust('centerX', 250 + 200);
          this.adjust('centerY', 200);
          break;
        case SC.ALIGN_BOTTOM_LEFT:
          this.adjust('centerX', 250 + 200);
          this.adjust('centerY', 200 - 91);
          break;
        case SC.ALIGN_TOP_RIGHT:
          this.adjust('centerX', 250 - 200);
          this.adjust('centerY', 200 + 91);
          break;
        case SC.ALIGN_RIGHT:
          this.adjust('centerX', 250 - 200);
          this.adjust('centerY', 200);
          break;
        case SC.ALIGN_BOTTOM_RIGHT:
          this.adjust('centerX', 250 - 200);
          this.adjust('centerY', 200 - 91);
          break;
        case SC.ALIGN_TOP:
          this.adjust('centerX', 250);
          this.adjust('centerY', 200 + 91);
          break;
        case SC.ALIGN_BOTTOM:
          this.adjust('centerX', 250);
          this.adjust('centerY', 200 - 91);
          break;
        default:
          this.adjust('centerX', 250);
          this.adjust('centerY', 200);
        }
      }.observes('align')
    }),

    noScaleImage: SC.ImageView.extend({
      classNames: ['scaled-image'],
      alignBinding: SC.Binding.oneWay('Images.alignValue'),
      layout: { border: 1, centerX: 250, centerY: 200, width: 250, height: 250 },
      scale: SC.SCALE_NONE,
      value: sc_static('fjola.jpg')
    }),

    topLeftButton: SC.ButtonView.extend({
      layout: { centerX: -24, centerY: -24, height: 30, width: 50 },
      localize: true,
      title: "_TopLeft",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP_LEFT,
      valueBinding: 'Images.alignValue'
    }),

    topButton: SC.ButtonView.extend({
      layout: { centerX: 0, centerY: -24, height: 30, width: 50 },
      localize: true,
      title: "_Top",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP,
      valueBinding: 'Images.alignValue'
    }),

    topRightButton: SC.ButtonView.extend({
      layout: { centerX: 24, centerY: -24, height: 30, width: 50 },
      localize: true,
      title: "_TopRight",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_TOP_RIGHT,
      valueBinding: 'Images.alignValue'
    }),

    leftButton: SC.ButtonView.extend({
      layout: { centerX: -24, centerY: 0, height: 30, width: 50 },
      localize: true,
      title: "_Left",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_LEFT,
      valueBinding: 'Images.alignValue'
    }),

    centerButton: SC.ButtonView.extend({
      layout: { centerX: 0, centerY: 0, height: 30, width: 50 },
      localize: true,
      title: "_Center",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_CENTER,
      valueBinding: 'Images.alignValue'
    }),

    rightButton: SC.ButtonView.extend({
      layout: { centerX: 24, centerY: 0, height: 30, width: 50 },
      localize: true,
      title: "_Right",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_RIGHT,
      valueBinding: 'Images.alignValue'
    }),

    bottomLeftButton: SC.ButtonView.extend({
      layout: { centerX: -24, centerY: 24, height: 30, width: 50 },
      localize: true,
      title: "_BottomLeft",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM_LEFT,
      valueBinding: 'Images.alignValue'
    }),

    bottomButton: SC.ButtonView.extend({
      layout: { centerX: 0, centerY: 24, height: 30, width: 50 },
      localize: true,
      title: "_Bottom",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM,
      valueBinding: 'Images.alignValue'
    }),

    bottomRightButton: SC.ButtonView.extend({
      layout: { centerX: 24, centerY: 24, height: 30, width: 50 },
      localize: true,
      title: "_BottomRight",
      buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
      toggleOnValue: SC.ALIGN_BOTTOM_RIGHT,
      valueBinding: 'Images.alignValue'
    })

    // topAlignButton: SC.SegmentedView.extend({
    //   controlSize: SC.LARGE_CONTROL_SIZE,
    //   layout: { bottom: 70, centerX: 0, height: 30, width: 300 },
    //   itemTitleKey: 'title',
    //   itemValueKey: 'value',
    //   items: [
    //     { title: "_TopLeft", value: SC.ALIGN_TOP_LEFT },
    //     { title: "_Top", value: SC.ALIGN_TOP },
    //     { title: "_TopRight", value: SC.ALIGN_TOP_RIGHT }
    //   ],
    //   value: SC.ALIGN_CENTER
    // }),

    // middleAlignButton: SC.SegmentedView.extend({
    //   controlSize: SC.LARGE_CONTROL_SIZE,
    //   layout: { bottom: 40, centerX: 0, height: 30, width: 300 },
    //   itemTitleKey: 'title',
    //   itemValueKey: 'value',
    //   items: [
    //     { title: "_Left", value: SC.ALIGN_LEFT },
    //     { title: "_Center", value: SC.ALIGN_CENTER },
    //     { title: "_Right", value: SC.ALIGN_RIGHT }
    //   ],
    //   value: SC.ALIGN_CENTER
    // }),

    // bottomAlignButton: SC.SegmentedView.extend({
    //   controlSize: SC.LARGE_CONTROL_SIZE,
    //   layout: { bottom: 10, centerX: 0, height: 30, width: 300 },
    //   itemTitleKey: 'title',
    //   itemValueKey: 'value',
    //   items: [
    //     { title: "_BottomLeft", value: SC.ALIGN_BOTTOM_LEFT },
    //     { title: "_Bottom", value: SC.ALIGN_BOTTOM },
    //     { title: "_BottomRight", value: SC.ALIGN_BOTTOM_RIGHT }
    //   ],
    //   value: SC.ALIGN_CENTER
    // })

  })

});
