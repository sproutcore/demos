// ==========================================================================
// Project:   ChildViewLayoutDemo - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals ChildViewLayoutDemo */

// UNUSED.
// ChildViewLayoutDemo.SampleTemplateView = SC.View.extend({

//   classNames: ['sample-template-view'],
//   childViews: ['label'],

//   // We use the isDragging property to make this view appear as the drop area.
//   classNameBindings: ['isDragging'],
//   isDragging: false,

//   // The value of the label.
//   value: '',

//   // Use H/W accelerated positioning while dragging.
//   wantsAcceleratedLayer: true,

//   transitionShow: SC.View.SCALE_IN,
//   transitionHide: SC.View.SCALE_OUT,

//   label: SC.LabelView.extend({
//     layout: { height: 100, centerY: 0 },
//     valueBinding: SC.Binding.oneWay('.parentView.value')
//   }),

//   mouseDown: function (evt) {
//     // Capture mouseDown events.
//     return true;
//   },

//   mouseDragged: function (evt) {
//     var template = this.get('template'),
//       dragView;

//     dragView = this.createChildView(ChildViewLayoutDemo.SampleView.extend({
//       classNames: this.get('classNames'),
//       value: this.get('value')
//     }));

//     this.appendChild(dragView);

//     // Initiate the drag
//     SC.Drag.start({
//       event: evt,
//       source: dragView,
//       dragView: dragView, // We want the ghost based on our template.
//       ghost: true, // Keeps the `dragView` visible when dragging (we use it as the drop area).
//       ghostActsLikeCursor: false,
//       slideBack: true
//     });
//   },

//   /** @private SC.DragSource protocol. */
//   dragSourceOperationMaskFor: function (drag, dropTarget) {
//     // Allow the view to be dragged to a new position.
//     return SC.DRAG_COPY;
//   },

//   /** @private SC.DragSource protocol. */
//   // dragDidBegin: function () {
//   //   // Indicate that we are dragging.
//   //   this.set('isDragging', true);
//   // },

//   /** @private SC.DragSource protocol. */
//   // dragDidEnd: function () {
//   //   // Indicate that we are not dragging.
//   //   this.set('isDragging', false);
//   // }
// });
