// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================

// American English
SC.stringsFor('en', {
  "_DemoTitle": "Dragging Data (Coming in 1.11)",
  "_DemoDescription": "In this demo, we look at handling browser drag events – the kind triggered when you drag text, or imgaes, or a file over the application. SproutCore makes handling these events as easy as handling regular mouse events.<br><br>When the user drags something over your application, <code>SC.RootResponder</code> dispatches dataDrag events including <code>dataDragEntered</code>, <code>dataDragHovered</code>, <code>dataDragExited</code>, and <code>dataDragDropped</code>. (See the data-drag event documentation on SC.View for more.)<br><br>These events are called with the browser event, so you can test for data types in <code>evt.dataTransfer.types</code>, or allow dropping by calling <code>evt.preventDefault()</code> and setting <code>evt.dataTransfer.dropEffect</code> to 'copy', for example.",
  "_Instructions": "Drag text, files, <a href='" + sc_static('images:fjola.jpg') +"' target='_blank'>images</a>, et cetera over this demo and drop onto a matching target.",
  "_TextTargetLabel": "Drop text here.",
  "_ImageTargetLabel": "Drop images here.<br>(Image files are treated as files, not images.)",
  "_FileTargetLabel": "Drop files here.",
  "_AnyTargetLabel": "Drop anything here.",
  "_SuccessfulDrop": "Drop received!",
  "_TextDropReceived {text}": "Text dropped:<br/>%@1",
  "_FileDropReceived {text}": "Files dropped:<br/>%@1"
});
