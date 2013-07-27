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
    layout: { bottom: 0, height: 11 },

    render: function (context) {
      context.begin().addClass('handle-image').end();
    },

    mouseDown: function (evt) {
      // Cache the initial vertical offset and parent height.
      var parentView = this.get('parentView'),
        wrapperView = parentView.get('parentView'),
        frame = parentView.get('borderFrame');

      // Indicate that we are resizing.
      wrapperView.beginLiveResize();

      this._initialY = evt.clientY;
      this._initialHeight = frame.height;

      return true;
    },

    mouseDragged: function (evt) {
      var parentView = this.get('parentView'),
        height,
        offset;

      offset = evt.clientY - this._initialY;
      height = Math.max(75, this._initialHeight + offset);
      parentView.adjust('height', height);
    },

    mouseUp: function (evt) {
      var parentView = this.get('parentView'),
        wrapperView = parentView.get('parentView');

      // Indicate that we are resizing.
      wrapperView.endLiveResize();

      // Clean up.
      delete this._initialPoint;
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
