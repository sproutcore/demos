// ==========================================================================
// FamilyTree.familiesController
// ==========================================================================

sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the family tree information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
FamilyTree.familiesController = SC.ArrayController.create( 
  /* @scope FamilyTree.familiesController */{
    content: null,
    selection: null,
    
    changedFamily: function(){
      FamilyTree.getPath('mainPage.mainPane.canvas').displayDidChange();
    },
    
    addFamily: function(){
      var store = FamilyTree.get('store');
      if (store) {
        var family = FamilyTree.createRecord(FamilyTree.Family, {
          name: 'New Family',
          people: [],
          pets: []
        });
      }
    },
    
    removeFamily: function(){
      var sel = this.getPath('selection.firstObject');
      FamilyTree.destroyRecord(sel);
    }
});