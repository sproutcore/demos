// ==========================================================================
// FamilyTree.familyController
// ==========================================================================
/*globals FamilyTree */

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the family tree information. It transforms the objects array into a list of nodes
  that LinkIt can use.
*/
FamilyTree.familyController = SC.ObjectController.create( SC.CollectionViewDelegate,
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
  
  // LinkIt Canvas is a Collection Views so to correct the deletion you have to include this
  /**
    Delegate for SC.CollectionView's deletion.  We implement this here
    because we have to handle deletion very carefully, but we still want to be able to
    trigger it by pressing the delete key on the canvas.
  */
  collectionViewDeleteContent: function(view, content, indexes) {
    FamilyTree.deleteSelectedMembers();
    return YES;
  },

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
