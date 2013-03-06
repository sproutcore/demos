// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

BigData.GroupItemView = SC.View.extend({

  content: null,

  displayProperties: ['content'],

  /** Create the layer. */
  render: function (context) {
    var content = this.get('content');

    context.push('<label>' + this._titleForContent(content) + '</label>');
  },

  /** Update the layer. */
  update: function (jqElement) {
    var content = this.get('content');

    jqElement.find('label').html(this._titleForContent(content));
  },

  /** @private Return the appropriate title. */
  _titleForContent: function (content) {
    if (content) {
      return content.get('title');
    } else {
      return "_Loading".loc();
    }
  }

});
