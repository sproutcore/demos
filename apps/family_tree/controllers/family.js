// ==========================================================================
// FamilyTree.familyController
// ==========================================================================

sc_require('core');

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the family tree information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
FamilyTree.familyController = SC.ObjectController.create( 
  /* @scope */{

  // PUBLIC PROPERTIES

  /**
    Don't allow typical array actions on the content of this controller since
    our model setup doesn't let us do that either.  We have to add and remove
    campaign elements in particular ways.
  */
  isEditable: NO,
  
  contentBinding: 'FamilyTree.familiesController.selection',
  contentBindingDefault: SC.Binding.oneWay().single(),

  // PUBLIC METHODS
  /**
    Add a new male to the family.
  */
  addMale: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(FamilyTree.Human, YES);
  },

  addFemale: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(FamilyTree.Human, NO);
  },
  
  addPet: function() {
    var c = this.get('content') || null;
    if(c) c.addMember(FamilyTree.Pet, YES);
  }

});
