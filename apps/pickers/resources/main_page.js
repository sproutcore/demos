// ==========================================================================
// Project:   Pickers - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals Pickers */

// This page describes the main user interface for your application.
Pickers.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.View.extend({
    childViews: [
      'paddingView',
      'dragView'
      // 'tlPicker', 'tPicker', 'trPicker',
      // 'mlPicker', 'mPicker', 'mrPicker',
      // 'blPicker', 'bPicker', 'brPicker',
      // 'topButton', 'leftButton', 'rightButton', 'bottomButton'
    ],

    paddingView: SC.View.extend({
      classNames: ['padding-view'],
      layout: { top: -20, border: 20 }
    }),

    dragView: SC.View.extend({
      classNames: ['demo-content'],
      layout: { centerX: 0, centerY: 0, height: 100, width: 100 },
      childViews: ['handle', 'button'],
      wantsAcceleratedLayer: true,

      handle: SC.ImageView.extend({
        classNames: ['drag-handle'],
        layout: { right: 0, height: 30, width: 30 },
        useCanvas: false,
        value: 'drag-handle'
      }),

      button: SC.ButtonView.extend({
        action: 'showPicker',
        controlSize: SC.JUMBO_CONTROL_SIZE,
        layout: { centerX: 0, centerY: 0, height: 44, width: 55 },
        localize: true,
        target: Pickers,
        title: "_PopUp"
      }),

      mouseDown: function (evt) {
        var frame = this.get('frame');

        // Convert the parent view to a fixed layout for dragging.
        this.adjust({ centerX: null, centerY: null, left: frame.x, top: frame.y });

        // Track the offset to the top/left corner from the evt point.
        this._adjustments = { x: evt.clientX - frame.x, y: evt.clientY - frame.y };

        return true;
      },

      mouseDragged: function (evt) {
        var adjustments = this._adjustments;

        this.adjust({
          left: evt.clientX - adjustments.x,
          top: evt.clientY - adjustments.y
        });
      },

      mouseUp: function (evt) {
        var parentView = this.get('parentView'),
          frame = this.get('frame'),
          parentFrame = parentView.get('frame'),
          offsetX, offsetY;

        // Convert the parent view to a flexible layout again.
        offsetX = (parentFrame.width / 2) - (frame.width / 2);
        offsetX = frame.x - offsetX;

        offsetY = (parentFrame.height / 2) - (frame.height / 2);
        offsetY = frame.y - offsetY;

        this.adjust({ centerX: offsetX, centerY: offsetY, left: null, top: null });

        this._offsets = null;

        return true;
      }

    })

    // tlPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, left: 20, top: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // tPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, centerX: 0, top: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // trPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, right: 20, top: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // mlPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, left: 20, centerY: 0, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // mPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, centerX: 0, centerY: 0, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // mrPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, right: 20, centerY: 0, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // blPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, left: 20, bottom: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // bPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, centerX: 0, bottom: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // brPicker: SC.ButtonView.extend({
    //   action: 'showPicker',
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   layout: { height: 44, right: 20, bottom: 20, width: 60 },
    //   localize: true,
    //   target: Pickers,
    //   title: "_PopUp"
    // }),

    // topButton: SC.ButtonView.extend({
    //   layout: { centerX: 0, centerY: -100, height: 44, width: 49 },
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   localize: true,
    //   title: "_Top",
    //   buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
    //   toggleOnValue: Pickers.topPreferMatrix,
    //   valueBinding: 'Pickers.preferMatrixPos'
    // }),

    // leftButton: SC.ButtonView.extend({
    //   layout: { centerX: -100, centerY: 0, height: 44, width: 49 },
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   localize: true,
    //   title: "_Left",
    //   buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
    //   toggleOnValue: Pickers.leftPreferMatrix,
    //   valueBinding: 'Pickers.preferMatrixPos'
    // }),

    // rightButton: SC.ButtonView.extend({
    //   layout: { centerX: 100, centerY: 0, height: 44, width: 49 },
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   localize: true,
    //   title: "_Right",
    //   buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
    //   toggleOnValue: Pickers.rightPreferMatrix,
    //   valueBinding: 'Pickers.preferMatrixPos'
    // }),

    // bottomButton: SC.ButtonView.extend({
    //   layout: { centerX: 0, centerY: 100, height: 44, width: 49 },
    //   controlSize: SC.JUMBO_CONTROL_SIZE,
    //   localize: true,
    //   title: "_Bottom",
    //   buttonBehavior: SC.TOGGLE_ON_BEHAVIOR,
    //   toggleOnValue: Pickers.bottomPreferMatrix,
    //   valueBinding: 'Pickers.preferMatrixPos'
    // })
  }),

  pickerPointerPane: SC.PickerPane.extend({
    // classNames: ['custom-picker'],
    layout: { width: 200, height: 200, border: 1 },
    preferType: SC.PICKER_POINTER,
    preferMatrix: [1, 0, 2, 3, 1], // left
    preferMatrixBinding: SC.Binding.oneWay('Pickers.preferMatrix'),

    contentView: SC.ImageView.extend({
      scale: SC.BEST_FIT_DOWN_ONLY,
      value: sc_static('sproutcore-128.png')
    })
  })

});
