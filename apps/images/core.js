// ==========================================================================
// Project:   Images
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*global Images */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Images = SC.Application.create(
  /** @scope Images.prototype */ {

  NAMESPACE: 'Images',
  VERSION: '0.1.0',

  alignValue: null,
  scaleValue: SC.FILL,

  scaleObserver: function () {
    var scaleValue = this.get('scaleValue');

    switch (scaleValue) {
    case SC.FILL:
      this.set('alignValue', null);
      break;
    case SC.BEST_FILL:
    case SC.BEST_FIT:
    case SC.SCALE_NONE:
      this.set('alignValue', SC.ALIGN_CENTER);
      break;
    }
  }.observes('scaleValue')

});
