// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

BigData.PersonItemView = SC.View.extend({

  content: null,

  displayProperties: ['content', 'isSelected'],

  /** Create the layer. */
  render: function (context) {
    var content = this.get('content'),
      isSelected = this.get('isSelected');

    context.setClass('sel', isSelected);
    context.push('<label>' + this._fullNameForContent(content) + '</label>');
  },

  /** Update the layer. */
  update: function (jqElement) {
    var content = this.get('content'),
      isSelected = this.get('isSelected');

    jqElement.setClass('sel', isSelected);
    jqElement.find('label').html(this._fullNameForContent(content));
  },

  /** @private Return the appropriate title. */
  _fullNameForContent: function (content) {
    if (content) {
      return content.get('givenName') + ' <strong>' + content.get('familyName') + '</strong>';
    } else {
      return "_Loading".loc();
    }
  }

});
