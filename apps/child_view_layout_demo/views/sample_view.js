// ==========================================================================
// Project:   ChildViewLayoutDemo - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals ChildViewLayoutDemo */


ChildViewLayoutDemo.SampleView = SC.View.extend({

  classNames: ['sample-view'],
  childViews: ['label', 'resizeHandle'],

  // We use the isDragging property to make this view appear as the drop area.
  classNameBindings: ['isDragging'],
  isDragging: false,

  layout: { border: 2, left: 5, width: 285, height: 90 }, // No top required.

  // The value of the label.
  value: '',

  // Use H/W accelerated positioning while dragging.
  wantsAcceleratedLayer: true,

  transitionAdjust: SC.View.SMOOTH_ADJUST,
  transitionAdjustOptions: { duration: 0.2 },
  transitionShow: SC.View.SCALE_IN,
  transitionHide: SC.View.SCALE_OUT,

  label: SC.LabelView.extend({
    layout: { height: 100, centerY: 0 },
    valueBinding: SC.Binding.oneWay('.parentView.value')
  }),

  resizeHandle: SC.View.extend({
    classNames: ['resize-handle'],

    parentChildViewLayoutBinding: 'ChildViewLayoutDemo*demoPage.demoContent.containerView.childViews.firstObject.childViewLayout',

    layout: function() {
      var layout = this.get('parentChildViewLayout');

      if (layout == SC.View.HORIZONTAL_STACK) {
        return { right: 0, width: 11 };
      }

      return { bottom: 0, height: 11 };
    }.property('parentChildViewLayout'),

    render: function (context) {
      context.begin().addClass('handle-image').end();
    },

    mouseDown: function (evt) {
      // Cache the initial vertical offset and parent height.
      var parentView = this.get('parentView'),
        wrapperView = parentView.get('parentView'),
        frame = parentView.get('borderFrame'),
        layout = this.get('parentChildViewLayout');

      // Indicate that we are resizing.
      wrapperView.beginLiveResize();

      if (layout == SC.View.HORIZONTAL_STACK) {
        this._initialX = evt.clientX;
        this._initialWidth = frame.width;
      } else {
        this._initialY = evt.clientY;
        this._initialHeight = frame.height;
      }

      return true;
    },

    mouseDragged: function (evt) {
      var parentView = this.get('parentView'),
        layout = this.get('parentChildViewLayout'),
        height,
        width,
        offset;
      
      if (layout == SC.View.HORIZONTAL_STACK) {
        offset = evt.clientX - this._initialX;

        // Parent view is centered, so we double the offset to keep the dragger under the mouse (for aesthetic purposes - the view would
        // continue to get the events even if the mouse is no longer over it, as RootResponder routes subsequent mouse events to the view
        // which handled mouseDown).
        width = Math.max(75, this._initialWidth + (offset * 2));
        parentView.adjust('width', width);
      } else {
        offset = evt.clientY - this._initialY;

        // Parent view is centered, so we double the offset to keep the dragger under the mouse (for aesthetic purposes - the view would
        // continue to get the events even if the mouse is no longer over it, as RootResponder routes subsequent mouse events to the view
        // which handled mouseDown).
        height = Math.max(75, this._initialHeight + (offset * 2));
        parentView.adjust('height', height);
      }
    },

    mouseUp: function (evt) {
      var parentView = this.get('parentView'),
        wrapperView = parentView.get('parentView');

      // Indicate that we are resizing.
      wrapperView.endLiveResize();

      // Clean up.
      delete this._initialX;
      delete this._initialY;
      delete this._initialWidth;
      delete this._initialHeight;

      parentView.set('transitionAdjust', SC.View.SMOOTH_ADJUST);

      return true;
    }
  }),

  /** @private SC.View. Don't transition when doing live resize. */
  beginLiveResize: function () {
    this.set('transitionAdjust', null);
  },

  /** @private SC.View. Allowing transitioning again. */
  endLiveResize:  function () {
    this.set('transitionAdjust', SC.View.SMOOTH_ADJUST);
  },

  mouseDown: function (evt) {
    // Capture mouseDown events.
    return true;
  },

  mouseDragged: function (evt) {
    // Initiate the drag
    SC.Drag.start({
      event: evt,
      source: this,
      dragView: this, // We want the ghost based on ourself.
      ghost: false, // Keeps the `dragView` visible when dragging (we use it as the drop area).
      ghostActsLikeCursor: false,
      slideBack: true
    });
  },

  /** @private SC.DragSource protocol. */
  dragSourceOperationMaskFor: function (drag, dropTarget) {
    // Allow the view to be dragged to a new position.
    return SC.DRAG_MOVE;
  },

  /** @private SC.DragSource protocol. */
  dragDidBegin: function () {
    // Indicate that we are dragging.
    this.set('isDragging', true);
  },

  /** @private SC.DragSource protocol. */
  dragDidEnd: function () {
    // Indicate that we are not dragging.
    this.set('isDragging', false);
  }
});
