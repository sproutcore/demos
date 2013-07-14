// ==========================================================================
// Project:   ChildViewLayoutDemo - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals ChildViewLayoutDemo */


// This page describes the main user interface for your application.
ChildViewLayoutDemo.demoPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.View.design({
    childViews: ['formView'],

    formView: SC.View.extend({

      // -----------------------------------------------------------------------
      // Properties
      //

      childViews: ['v1', 'v2', 'v3', 'v4', 'label'],
      classNames: ['wrapper-view'],
      layout: { border: 2, centerX: 0, centerY: 0, width: 300 }, // No height required.

      // Layout the child views vertically.
      childViewLayout: SC.View.VERTICAL_STACK,
      childViewLayoutOptionsBinding: SC.Binding.oneWay('ChildViewLayoutDemo.childViewLayoutOptions'),

      // Smoothly resize.
      transitionAdjust: SC.View.SLIDE,
      transitionAdjustOptions: { duration: 0.2 },

      /** @private SC.View. Don't transition when doing live resize. */
      beginLiveResize: function () {
        sc_super();

        this.set('transitionAdjust', null);
      },

      /** @private SC.View. Allowing transitioning again. */
      endLiveResize:  function () {
        sc_super();

        this.set('transitionAdjust', SC.View.SLIDE);
      },

      // -----------------------------------------------------------------------
      // SC.DropTarget Support
      //

      /** @private SC.DropTarget protocol. */
      isDropTarget: true,

      /** @private SC.DropTarget protocol. */
      computeDragOperations: function (drag, evt, op) {
        return SC.DRAG_MOVE;
      },

      /** @private SC.DropTarget protocol. */
      dragUpdated: function (drag, evt) {
        // console.log('%@ - dragUpdated(%@, evt):  dragView: %@'.fmt(this, drag, drag.dragView));
        var point = { x: evt.clientX, y: evt.clientY },
          childViews = this.get('childViews'),
          dragView = drag.dragView,
          options = this.get('childViewLayoutOptions');

        // Cycle through the child views and find whichever one it is over and insert a drop placeholder child at that point.
        for (var i = 0, len = childViews.get('length'); i < len; i++) {
          var childView = childViews.objectAt(i),
            frame = SC.clone(childView.get('frame')),
            layout = childView.get('layout'),
            borderingChildView, pageFrame;

          // Adjust the frame all the way to the left & right.
          frame.x -= layout.left;
          frame.width += layout.left + layout.right;

          // If followed by the drop zone, cut our frame to the top two thirds.
          borderingChildView = childViews.objectAt(i + 1);
          if (borderingChildView && borderingChildView === dragView) {
            frame.height = frame.height / 1.5;
          }

          // If preceded by the drop zone, cut our frame to the bottom two thirds.
          borderingChildView = childViews.objectAt(i - 1);
          if (borderingChildView && borderingChildView === dragView) {
            frame.y += frame.height / 3;
            frame.height = frame.height / 1.5;
          }

          // Stretch the first frame up and the last frame down, which allows you
          // to drag in from the top or bottom edge and get the top or bottom
          // drop zone.
          if (i === 0) {
            frame.y -= options.paddingBefore;
            frame.height += options.paddingBefore;
          }
          if (i === len - 1) {
            frame.height += options.paddingAfter;
          }

          // Convert the frame into window coordinates and check the point.
          pageFrame = this.convertFrameToView(frame, null);
          if (SC.pointInRect(point, pageFrame)) {
            break;
          }
        }

        if (i < len) {
          // Move the drag view to the target child view index.
          var curDropViewIdx = childViews.indexOf(dragView);
          if (curDropViewIdx !== i) {
            // Remove the view from the old spot.
            if (curDropViewIdx >= 0) {
              this.removeChild(dragView);
            }

            // Insert the view in the new spot.
            this.insertBefore(dragView, childViews.objectAt(i));
          }
        }
      },

      /** @private SC.DropTarget protocol. */
      dragStarted: function (drag, evt) {
        var dragView = drag.dragView;

        dragView.set('transitionAdjust', null);
      },

      /** @private SC.DropTarget protocol. */
      dragEntered: function (drag, evt) {
        var dragView = drag.dragView;

        // dragView.set('isVisible', true);
      },

      /** @private SC.DropTarget protocol. */
      dragExited: function (drag, evt) {
        var dragView = drag.dragView;

        if (this.get('childViews').indexOf(dragView) >= 0) {
          this.removeChild(dragView);
        }
        // dragView.set('isVisible', false);
      },

      /** @private SC.DropTarget protocol. */
      dragEnded: function (drag, evt) {
        var dragView = drag.dragView;

        // dragView.set('isVisible', true);
        dragView.set('transitionAdjust', SC.View.SLIDE);
      },

      /** @private SC.DropTarget protocol. */
      acceptDragOperation: function (drag, op) {
        return YES;
      },

      /** @private SC.DropTarget protocol. */
      performDragOperation: function (drag, op) {
        return SC.DRAG_NONE;
      },

      // -----------------------------------------------------------------------
      // Child Views
      //

      v1: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view1'],
        layout: { border: 2, left: 5, right: 5, height: 100 }, // No top required.
        value: 'A'
      }),

      v2: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view2'],
        layout: { border: 2, left: 5, right: 5, height: 150 }, // No top required.
        value: 'B'
      }),

      v3: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view3'],
        layout: { border: 2, left: 5, right: 5, height: 75 }, // No top required.
        value: 'C'
      }),

      v4: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view4'],
        layout: { border: 2, left: 5, right: 5, height: 125 }, // No top required.
        value: 'D'
      }),

      label: SC.LabelView.extend({
        classNames: ['form-label'],
        layout: { height: 30, left: 10, right: 10, bottom: 0  },
        localize: true,
        useAbsoluteLayout: true,
        value: "_DragLabel"
      }),
    })

    // UNUSED.
    // itemsView: SC.View.extend({
    //   childViews: ['v1', 'v2', 'v3', 'v4'],
    //   childViewLayout: SC.View.VERTICAL_STACK,
    //   childViewLayoutOptions: {
    //     paddingBefore: 10,
    //     paddingAfter: 10,
    //     spacing: 10
    //   },
    //   classNames: ['demo-content'],
    //   layout: { centerY: 0, width: 60 },

    //   v1: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view1'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'A'
    //   }),

    //   v2: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view2'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'B'
    //   }),

    //   v3: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view3'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'C'
    //   }),

    //   v4: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view4'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'D'
    //   })
    // }),

    // UNUSED.
    // formControl: SC.View.extend({
    //   childViews: ['paddingBeforeLabel', 'paddingBefore', 'spacingLabel', 'spacing', 'paddingAfterLabel', 'paddingAfter'],
    //   childViewLayout: SC.View.VERTICAL_STACK,

    //   paddingBeforeLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_PaddingBefore"
    //   }),

    //   paddingBefore: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.paddingBefore'
    //   }),

    //   spacingLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_Spacing"
    //   }),

    //   spacing: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.spacing'
    //   }),

    //   paddingAfterLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_PaddingAfter"
    //   }),

    //   paddingAfter: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.paddingAfter'
    //   })
    // })
  })
});
