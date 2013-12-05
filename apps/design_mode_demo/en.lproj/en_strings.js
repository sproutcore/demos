// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo*/

// American English
SC.stringsFor('en', {
  "_DemoTitle": "Responsive Design Demo (Coming in 1.11.0)",
  "_DemoDescription": "In this demo we use SproutCore's design mode support to easily alter the \"design\" of our app to fit various screen sizes. The design of a UI can vary wildly from a large to a small screen, but with design modes we use very little code to adjust the position, layout, visibility and other properties of our views without creating multiple applications.<br><br>SproutCore supports three design modes by default: 's' - small, 'm' - medium and 'l' - large. To use the modes, simply configure your views as normal and then provide overrides for special cases via <code>modeAdjust</code>. For example, if you wanted to hide a view when in the small mode you could add:<br><br><code>&nbsp;&nbsp;//...<br>&nbsp;&nbsp;modeAdjust: { s: { isVisible: false } }, // Hide the view in 's' or 'small' mode.<br>&nbsp;&nbsp;//...</code><br><br>To adjust the height for medium mode, you could add:<br><br><code>&nbsp;&nbsp;//...<br>&nbsp;&nbsp;layout: { height: 24 },<br>&nbsp;&nbsp;modeAdjust: { m: { layout: { height: 30 } }, // Adjust the height in 'm' or 'medium' mode.<br>&nbsp;&nbsp;//...</code><br><br>You can even specify orientation specific overrides as well:<br><br><code>&nbsp;&nbsp;//...<br>&nbsp;&nbsp;rowHeight: 30,<br>&nbsp;&nbsp;modeAdjust: {<br>&nbsp;&nbsp;&nbsp;&nbsp;m: { rowHeight: 54 }, // Overrides for medium mode regardless of orientation.<br>&nbsp;&nbsp;&nbsp;&nbsp;m_p: { layout: { top: 20 } }, // Overrides for medium - portrait mode.<br>&nbsp;&nbsp;&nbsp;&nbsp;m_l: { layout: { top: 50 } } // Overrides for medium - landscape mode.<br>&nbsp;&nbsp;},<br>&nbsp;&nbsp;//...</code><br><br>When the display size changes, SproutCore will automatically adjust all your views according to the overrides as efficiently as possible.",
  "_DisplaySize": "Display size",
  "_Landscape": "Landscape",
  "_LargeFrameTitle": "Large",
  "_MediumFrameTitle": "Medium",
  "_Menu": "Menu",
  "_Orientation": "Orientation",
  "_Portrait": "Portrait",
  "_SmallFrameTitle": "Small",
  "_TinyShapes": "TinyShapes",
  "_XLargeFrameTitle": "X-Large"
});
