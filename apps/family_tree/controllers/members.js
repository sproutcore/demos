// ==========================================================================
// FamilyTree.membersController
// ==========================================================================
/*globals FamilyTree */

/**
  @extends SC.ArrayController
  @author Evin Grano
  
  
  This controller holds all the members of a family that LinkIt can use
*/
FamilyTree.membersController = SC.ArrayController.create( 
  /* @scope FamilyTree.membersController */{
    contentBinding: 'FamilyTree.familyController.members',
    contentBindingDefault: SC.Binding.multiple().oneWay(),
    selection: null
});