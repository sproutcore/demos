/**
 * The base human family model.
 *
 * @extends FamilyTree.Male
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
/*globals FamilyTree */

FamilyTree.Family = SC.Record.extend({ 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Family Name' }),
  people: SC.Record.toMany('FamilyTree.Human', {
    inverse: 'family',
    isMaster: YES
  }),
  pets: SC.Record.toMany('FamilyTree.Pet', {
    inverse: 'family',
    isMaster: YES
  }),
  
  members: function(){
    var people = this.get('people');
    var pets = this.get('pets');
    
    var i, len, members = [];
    len = people.get('length');
    for(i = 0; i < len; i++ ){
      members.push(people.objectAt(i));
    }
    len = pets.get('length');
    for(i = 0; i < len; i++ ){
      members.push(pets.objectAt(i));
    }
    return members;
  }.property('people', 'pets').cacheable(),
  
  // ..........................................................
  // Methods
  // 
  
  /**
    Add a new member to the family.
  */
  addMember: function(memberModel, isMale) {
    var store = FamilyTree.get('store');
    if (store && memberModel) {
      var member = FamilyTree.createRecord(memberModel, {
        isMale: isMale,
        name: 'Name here...',
        kindOfPet: 'Dog'
      });
      if (member.instanceOf(FamilyTree.Human)){
        var ppl = this.get('people');
        ppl.pushObject(member);
      }
      else if (member.instanceOf(FamilyTree.Pet)){
        var pets = this.get('pets');
        pets.pushObject(member);
      }
      else {
        console.error('Bad member type');
      }
    }
  },
  
  removeMember: function(member){
    var ppl, pets, store = FamilyTree.get('store');
    if (member.instanceOf(FamilyTree.Human)){
      ppl = this.get('people');
      ppl.removeObject(member);
    }
    else if (member.instanceOf(FamilyTree.Pet)){
      pets = this.get('pets');
      pets.removeObject(member);
    }
    else {
      console.error('Bad member type');
    }
  }
});
