// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

BigData.GroupItemView = SC.View.extend({

  content: null,

  displayProperties: ['content'],

  render: function (context, firstTime) {
    var content = this.get('content'),
      title;

    if (content) {
      title = content.get('title');
    } else {
      title = "_Loading".loc();
    }

    if (firstTime) {
      context.push('<label>' + title + '</label>');
    } else {
      context.$().find('label').html(title);
    }
  }

});
