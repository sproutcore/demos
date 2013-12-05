// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo*/


DesignModeDemo.mainViewController = SC.Object.create({

  designMode: 's_p',
  designModeBinding: SC.Binding.oneWay('DesignModeDemo.designMode'),

  // We watch changes to the design mode here and update our chooser value to match.
  // This allows a person to resize the window and see the value applied.
  designModeObserver: function () {
    this.set('selectedSize', this.get('designMode').split('_')[0]);
    this.set('selectedOrientation', this.get('designMode').split('_')[1]);
  }.observes('designMode'),

  selectedSize: 's',
  selectedSizeBinding: SC.Binding.from('DesignModeDemo.designSize'),

  selectedOrientation: 'p',
  selectedOrientationBinding: SC.Binding.from('DesignModeDemo.designOrientation'),

  selectedMode: function () {
    return this.get('selectedSize') + '_' + this.get('selectedOrientation');
  }.property('selectedSize', 'selectedOrientation'),

  toggleOrientation: function () {
    var selectedOrientation = this.get('selectedOrientation');

    if (selectedOrientation === 'p') {
      this.set('selectedOrientation', 'l');
    } else {
      this.set('selectedOrientation', 'p');
    }
  }

});
