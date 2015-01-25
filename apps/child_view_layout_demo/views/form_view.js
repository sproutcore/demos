sc_require('views/sample_view');

ChildViewLayoutDemo.FormView = SC.View.extend({

  // -----------------------------------------------------------------------
  // Properties
  //

  childViews: ['v1', 'v2', 'v3', 'v4', 'label'],
  classNames: ['wrapper-view'],

  // Layout the child views vertically by default
  childViewLayout: SC.View.VERTICAL_STACK,
  childViewLayoutOptionsBinding: SC.Binding.oneWay('ChildViewLayoutDemo.childViewLayoutOptions'),

  // Smoothly resize.
  transitionAdjust: SC.View.SMOOTH_ADJUST,
  transitionAdjustOptions: { duration: 0.2 },

  /** @private SC.View. Don't transition when doing live resize. */
  beginLiveResize: function () {
    sc_super();

    this.set('transitionAdjust', null);
  },

  /** @private SC.View. Allowing transitioning again. */
  endLiveResize:  function () {
    sc_super();

    this.set('transitionAdjust', SC.View.SMOOTH_ADJUST);
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
    // var dragView = drag.dragView;
  },

  /** @private SC.DropTarget protocol. */
  dragExited: function (drag, evt) {
    var dragView = drag.dragView;

    if (this.get('childViews').indexOf(dragView) >= 0) {
      this.removeChild(dragView);
    }
  },

  /** @private SC.DropTarget protocol. */
  dragEnded: function (drag, evt) {
    var dragView = drag.dragView;

    dragView.set('transitionAdjust', SC.View.SMOOTH_ADJUST);
  },

  /** @private SC.DropTarget protocol. */
  acceptDragOperation: function (drag, op) {
    return YES;
  },

  /** @private SC.DropTarget protocol. */
  performDragOperation: function (drag, op) {
    return SC.DRAG_NONE;
  }

});
