// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals ColorDemo*/


ColorDemo.mainViewController = SC.ObjectController.create({

  content: SC.Color.from('steelblue').set('a', 0.5),

  brighterColor: function() {
    var color = this.get('content');

    return color.mult(1.25);
  }.property('cssText').cacheable(),

  brighterCssText: function() {
    var brighterColor = this.get('brighterColor');

    return brighterColor.get('cssText');
  }.property('brighterColor').cacheable(),

  darkerColor: function() {
    var color = this.get('content');

    return color.mult(0.75);
  }.property('cssText').cacheable(),

  darkerCssText: function() {
    var darkerColor = this.get('darkerColor');

    return darkerColor.get('cssText');
  }.property('darkerColor').cacheable()

});
