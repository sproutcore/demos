// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */
sc_require('data_sources/flat_data_source');
sc_require('data_sources/grouped_data_source');


/** @singleton
  The main data source for the project is a cascade data source.  This allows
  each actual data source a chance to handle the request from the store.

  In this way, we can split our data source handling code into files specific
  to each remote resource.

  If a data source includes support for the request it will return true and
  no further data sources will be consulted, if it returns false the request
  will cascade to the nex data source in the order that they are defined.

  Note: we create this as a singleton, which is more efficient than a class
  because there will only ever be one instance.

  @extends SC.CascadeDataSource
*/
BigData.dataSource = SC.CascadeDataSource.create(
/** @scope BigData.CascadeDataSource.prototype */ {

  dataSources: ['flatDataSource', 'groupedDataSource'],

  flatDataSource: BigData.flatDataSource,

  groupedDataSource: BigData.groupedDataSource

});
