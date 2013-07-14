// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================


// American English
SC.stringsFor('en', {
  "_DemoTitle": "Automatic Child View Layout",
  "_DemoDescription": "In this demo we look at a feature of SproutCore's SC.View class that makes it extremely simple to layout complex pages in very little time.  Using SC.View's automatic child view layout plugin support, we can have the child views arranged automatically and updated dynamically as the child views change size, visibility or are added and removed.<br><br>In the demo, we arrange our wrapper view's child views in a vertical stack simply by setting the <code>childLayoutPlugin</code> property to <code>SC.View.VERTICAL_STACK</code>. After that, the child views are arranged in a vertical stack for us, which updates automatically as the child views are resized and rearranged.<br><br>Key SproutCore technologies used in this demo: <code>SC.View</code>, <code>SC.Drag</code>, <code>SC.View.VERTICAL_STACK</code>, <code>SC.View.SLIDE.</code><br><br><strong>Additional features:</strong> <em style=\"font-style: italic;\">We use SproutCore's drag and drop support to allow re-ordering and we make the child view repositioning smooth by using the new <code>transitionAdjust</code> property of SC.View, which is similar to the new <code>transitionIn</code>, <code>transitionOut</code>, <code>transitionShow</code> and <code>transitionHide</code> properties.</em>",
  "_DragLabel": "Drag to resize and rearrange the views."
});
