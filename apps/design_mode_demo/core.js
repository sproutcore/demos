// ==========================================================================
// Project:   ColorDemo
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo */


/** @namespace

  @extends SC.Object
*/
DesignModeDemo = SC.Application.create(
  /** @scope DesignModeDemo.prototype */ {

  NAMESPACE: 'DesignModeDemo',

  VERSION: '0.1.0',

  // This application will adjust for four different design modes at the specified thresholds.
  designModes: {
    'small': 400,
    'medium': 768,
    'large': 1024,
    'xlarge': Infinity
  }

});
