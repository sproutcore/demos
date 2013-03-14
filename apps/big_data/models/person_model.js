// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */

/** @class

  @extends SC.Record
  @version 0.1
*/
BigData.Person = SC.Record.extend(
/** @scope BigData.Person.prototype */ {

  givenName: SC.Record.attr(String),

  familyName: SC.Record.attr(String)

});


// These are our different people queries.
// Because there are too many records to load and order all within the client,
// we use remote queries.  This means that the server maintains the record order
// and we don't have to load them all in order to search or sort them.
BigData.Person.flatArrayQuery = SC.Query.remote(BigData.Person, { targetDataSource: 'flatDataSource' });
BigData.Person.groupedArrayQuery = SC.Query.remote(BigData.Person, { targetDataSource: 'groupedDataSource' });
BigData.Person.windowedArrayQuery = SC.Query.remote(BigData.Person, { targetDataSource: 'windowedDataSource' });
