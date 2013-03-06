// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

/** @namespace

  @extends SC.Object
*/
BigData = SC.Application.create(
  /** @scope BigData.prototype */ {

  NAMESPACE: 'BigData',

  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from('BigData.dataSource')

});
