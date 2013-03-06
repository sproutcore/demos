// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

BigData.PersonItemView = SC.View.extend({

  content: null,

  displayProperties: ['content', 'isSelected'],

  render: function (context, firstTime) {
    var content = this.get('content'),
      fullName = "",
      isSelected = this.get('isSelected');

    context.setClass('sel', isSelected);

    if (content) {
      fullName = content.get('givenName') + ' <strong>' + content.get('familyName') + '</strong>';
    } else {
      fullName = "_Loading".loc();
    }

    if (firstTime) {
      // In this case it's easiest just to push the whole content at once.
      context.push('<label>' + fullName + '</label>');
    } else {
      // Replace the inner content only.
      context.$().find('label').html(fullName);
    }
  }

});
