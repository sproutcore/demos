// ==========================================================================
// Project:   ChildViewLayoutDemo
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals ChildViewLayoutDemo */

/** @namespace

  My cool new app.  Describe your application.

  @extends SC.Object
*/
ChildViewLayoutDemo = SC.Application.create(
  /** @scope ChildViewLayoutDemo.prototype */ {

  NAMESPACE: 'ChildViewLayoutDemo',
  VERSION: '0.1.0',

  paddingAfter: 40,
  paddingBefore: 10,
  spacing: 10,

  childViewLayoutOptions: function () {
    var paddingBefore = this.get('paddingBefore'),
      paddingAfter = this.get('paddingAfter'),
      spacing = this.get('spacing'),
      ret;

    ret = {
      paddingBefore: paddingBefore,
      paddingAfter: paddingAfter,
      spacing: spacing
    };

    return ret;
  }.property('paddingBefore', 'paddingAfter', 'spacing'),

});
