// ==========================================================================
// Project:   Pickers
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals Pickers */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
Pickers = SC.Application.create(
  /** @scope Pickers.prototype */ {

  NAMESPACE: 'Pickers',
  VERSION: '0.1.0',

  preferType: SC.PICKER_POINTER,

  preferMatrix: function () {
    var preferMatrixPos = this.get('preferMatrixPos'),
      ret;

    switch (preferMatrixPos) {
    case 'top':
      ret = [2, 3, 0, 1, 2];
      break;
    case 'bottom':
      ret = [3, 2, 0, 1, 3];
      break;
    case 'right':
      ret = [0, 1, 2, 3, 0];
      break;
    case 'left':
      ret = [1, 0, 2, 3, 1];
      break;
    }

    return ret;
  }.property('preferMatrixPos').cacheable(),

  preferMatrixPos: 'bottom',

  topPreferMatrix: 'top',

  bottomPreferMatrix: 'bottom',

  rightPreferMatrix: 'right',

  leftPreferMatrix: 'left',

  // init: function () {
  //   sc_super();

  //   this.preferMatrix = this.bottomPreferMatrix;
  // },

  showPicker: function (sender) {
    switch (this.get('preferType')) {
    case SC.PICKER_POINTER:
      this.mainPage.get('pickerPointerPane').popup(sender);
      break;
    }
  }
});
