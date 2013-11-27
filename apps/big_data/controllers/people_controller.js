// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData*/
sc_require('models/person_model');


/**
  This controller manages the our remote records data.
  */
BigData.peopleController = SC.ArrayController.create(SC.CollectionContent, SC.CollectionRowDelegate, {

  /**
    For the purposes of the demo we show off three different data source
    approaches for the same data:

    1. flatArrayQuery - page in the data and leave it as is
    2. groupedArrayQuery - page in the data and insert groups on the fly
    3. windowedArrayQuery - page in the data and page it out again to conserve memory
  */
  activeQuery: null,

  /** SC.CollectionRowDelegate - Each group item will have a custom height. */
  customRowHeightIndexes: function () {
    return this.getPath('content.groupIndexes');
  }.property('status', 'content').cacheable(),

  /** We want 22px high group rows, which is 20px plus 2 x 1px of rowPadding (used for borders). */
  groupItemHeight: 20,

  /** @private Includes the rowPadding when determining the final value. */
  groupRowHeight: function(key, value) {
    var rowPadding = this.get('rowPadding'),
      groupItemHeight = this.get('groupItemHeight');

    if (value !== undefined) {
      this.set('groupItemHeight', value - rowPadding * 2);
      return value;
    }

    return groupItemHeight + rowPadding * 2;
  }.property('groupItemHeight', 'rowPadding'),

  /** SC.CollectionRowDelegate - We want 44px high rows, which is 42px plus 2 x 1px of rowPadding (used for borders). */
  itemHeight: 42,

  /** SC.CollectionRowDelegate - Add 2 x 1px of padding for a border. */
  rowPadding: 1,

  /** @private */
  _activeQueryDidChange: function () {
    var activeQuery = this.get('activeQuery'),
      content;

    // Retrieve the matching query, fetch it and set the results as the content of the controller.
    activeQuery = BigData.Person[activeQuery];
    content = BigData.store.find(activeQuery);
    this.set('content', content);
  }.observes('activeQuery'),

  /** SC.CollectionContent - This set is inserted into the content object by the data source. */
  contentGroupIndexes: function(view, content) {
    return this.getPath('content.groupIndexes');
  },

  /** SC.CollectionContent
    Since our group indexes should always be correct and since the collection
    view should only double check indexes defined inside of our group indexes,
    simply return true.
  */
  contentIndexIsGroup: function(view, content, idx) {
    var customRowHeightIndexes = this.get('customRowHeightIndexes');
    return customRowHeightIndexes ? customRowHeightIndexes.contains(idx) : false;
  },

  /** SC.CollectionContent
    This is only called for custom row height indexes, which we've indicated
    are only our group rows.
  */
  contentIndexRowHeight: function(view, content, contentIndex) {
    return this.get('groupRowHeight');
  }

});
