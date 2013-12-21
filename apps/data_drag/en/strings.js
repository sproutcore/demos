// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================

// American English
SC.stringsFor('en', {
  "_DemoTitle": "Dragging Data (Coming in 1.11)",
  "_DemoDescription": "In this demo, we look at handling browser drag events – the kind triggered when you drag text, or imgaes, or a file over the application. SproutCore makes handling these events as easy as handling regular mouse events.<br><br>When the user drags something over your application, <code>SC.RootResponder</code> dispatches dataDrag events including <code>dataDragEntered</code>, <code>dataDragHovered</code>, <code>dataDragExited</code>, and <code>dataDragDropped</code>. (If you prefer to handle some events at the statechart level, RootResponder dispatches related events to the default responder as well; see the data-drag event documentation on SC.View for more.)<br><br>These events are called with the browser event, so you can test for data types in <code>evt.dataTransfer.types</code>, and allow dropping by calling <code>evt.preventDefault()</code> setting <code>evt.dataTransfer.dropEffect</code> to 'copy', for example.",
  //"_DemoDescription": "In this demo, we look at a feature of SproutCore's SC.View class that makes it extremely simple to layout complex pages in very little time.  Using SC.View's automatic child view layout plugin support, we can have the child views arranged automatically and updated dynamically as the child views change size, visibility or are added and removed.<br><br>In the demo, we arrange our wrapper view's child views in a vertical stack simply by setting the <code>childViewLayout</code> property to <code>SC.View.VERTICAL_STACK</code>. After that, the child views are arranged in a vertical stack for us, which updates automatically as the child views are resized and rearranged.<br><br>Key SproutCore technologies used in this demo: <code>SC.View</code>, <code>SC.Drag</code>, <code>SC.View.VERTICAL_STACK</code>, <code>SC.View.SLIDE.</code><br><br><strong>Additional features:</strong> <em style=\"font-style: italic;\">We use SproutCore's drag and drop support to allow re-ordering and we make the child view repositioning smooth by using the new <code>transitionAdjust</code> property of SC.View, which is similar to the new <code>transitionIn</code>, <code>transitionOut</code>, <code>transitionShow</code> and <code>transitionHide</code> properties.</em>",
  "_Instructions": "Drag text, files, <a href='" + sc_static('images:fjola.jpg') +"' target='_blank'>images</a>, et cetera over this demo and drop onto a matching target.",
  "_TextTargetLabel": "Drop text here.",
  "_ImageTargetLabel": "Drop images here.<br>(Image files are treated as files, not images.)",
  "_FileTargetLabel": "Drop files here.",
  "_AnyTargetLabel": "Drop anything here.",
  "_SuccessfulDrop": "Drop received!",
  "_TextDropReceived {text}": "Text dropped:<br/>%@1",
  "_FileDropReceived {text}": "Files dropped:<br/>%@1"
});
