// ==========================================================================
// Project:   FamilyTree
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals FamilyTree */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
FamilyTree = SC.Application.create(
  /** @scope FamilyTree.prototype */ {

  NAMESPACE: 'FamilyTree',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  _currentRecordID: 0,
  
  // ..........................................................
  // Helper Functions
  // 
  
  /**
   * Retrieves a single record from the store.
   *
   * @param {SC.Record} recordType The type of the record to retrieve.
   * @param {String|Number} id The ID of the record to retrieve.
   *
   * @returns {CoreOrion.Record} The instantiated record.
   */
  findRecord: function(recordType, id) {
    return this.get('store').find(recordType, id);
  },

  /**
   * Retrieves all records from the store matching the given query.
   *
   * @param {SC.Query} q The query to apply.
   *
   * @returns {SC.RecordArray} A SC.RecordArray of matching records.
   */
  findRecords: function(q) {
    return this.get('store').find(q);
  },
  
  /**
   * Creates a new record in the store.
   *
   * @param {CoreOrion.Record} recordType The type of the record.
   * @param {Hash} dataHash The data hash used to seed the new record (optional).
   *
   * @returns {CoreOrion.Record} A new record instance.
   */
  createRecord: function(recordType, dataHash) {
    if (!dataHash) dataHash = {};

    // Assign the new record a negative integer ID 
    if (dataHash.id === undefined) {
      dataHash.id = this._currentRecordID + '';
      this._currentRecordID--;
    }
    
    return this.get('store').createRecord(recordType, dataHash);
  },
  
  destroyRecord: function(rec){
    if (SC.none(rec) || !SC.kindOf(rec, SC.Record)) return NO;
    var sk = rec.get('storeKey');
    this.get('store').destroyRecord(null, null, sk);
    return YES;
  }
  
}) ;
