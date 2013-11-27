// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global FlotDemo*/

// American English
SC.stringsFor('en', {
  "_DemoTitle": "Flot (or other) Integration",
  "_DemoDescription": "SproutCore aims to be a full-stack web application runtime environment with everything you need to develop native-style web applications, but of course there are many niche areas that SproutCore doesn't attempt to provide an answer. This demo looks at how you would bring in a 3rd party framework to provide a specific feature outside of the SproutCore feature set.<br><br>In the demo, we create a simple SproutCore view in order to add graph plotting via <a href=\"http://www.flotcharts.org\">Flot</a>. Integrating Flot is probably one of the more challenging external frameworks to integrate due to the many ways that its data can be represented and manipulated, but in the end it turns out to be not too much of a challenge.<br><br>The key points to remember when doing any integration are that SproutCore's bindings and observers require the run loop to run, so you should use SproutCore run loop aware objects for things like timers (<code>SC.Timer</code>) or event handling (<code>SC.Event</code>); that when working with the DOM you should pay attention to the proper <code>SC.View</code> callbacks when you need to either ensure that the layer exists (i.e. <code>didCreateLayer</code>) or the layer is in the DOM (i.e. <code>didAppendToDocument</code>) and that you should always think about the teardown process of the integration (ex. removing observers that were added on setup), because SproutCore apps are long lived and dynamic."
});
