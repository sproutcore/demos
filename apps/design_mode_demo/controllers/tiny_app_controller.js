// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2012 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals DesignModeDemo*/


DesignModeDemo.tinyAppController = SC.Object.create(SC.SelectionSupport, {

  selectedShape: 'circle',

  selection: null,

  shapes: [{
    blackIcon: 'black-circle-icon',
    icon: 'circle-icon',
    value: 'circle',
    width: 25
  },{
    blackIcon: 'black-square-icon',
    icon: 'square-icon',
    value: 'square',
    width: 25
  },{
    blackIcon: 'black-triangle-icon',
    icon: 'triangle-icon',
    value: 'triangle',
    width: 25
  },{
    blackIcon: 'black-diamond-icon',
    icon: 'diamond-icon',
    value: 'diamond',
    width: 25
  }],

  /** Transform the selection change over to the selected value. */
  selectionDidChange: function () {
    var selection = this.get('selection');

    if (selection) {
      selection = selection.get('firstObject');

      if (selection.value !== this.get('selectedShape')) {
        this.set('selectedShape', selection.value);
      }
    }
  }.observes('selection'),

  /** Transform the selected value change over to the selection. */
  selectedShapeDidChange: function () {
    var selection = this.get('selection');

    if (selection) {
      selection = selection.get('firstObject');

      if (selection.value !== this.get('selectedShape')) {
        this.selectObject(this.get('shapes').findProperty('value', this.get('selectedShape')));
      }
    }
  }.observes('selectedShape'),

  showMenu: function(sender) {
    DesignModeDemo.mainPage.get('menuPicker').popup(sender);
  }

});
