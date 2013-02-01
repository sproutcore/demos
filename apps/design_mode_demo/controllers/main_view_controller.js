// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo*/


DesignModeDemo.mainViewController = SC.Object.create({

  designMode: 'small',
  designModeBinding: SC.Binding.oneWay('DesignModeDemo.designMode'),

  // We watch changes to the design mode here and update our chooser value to match.
  // This allows a person to resize the window and see the value applied.
  designModeObserver: function () {
    this.set('selectedMode', this.get('designMode'));
  }.observes('designMode'),

  selectedMode: 'small',
  selectedModeBinding: SC.Binding.from('DesignModeDemo.designMode')

});
