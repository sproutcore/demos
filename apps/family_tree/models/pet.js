/**
 * The base human model.
 *
 * @extends FamilyTree.Human
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

FamilyTree.Pet = SC.Record.extend(LinkIt.Node, { 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Name' }),
  kindOfPet: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Dog' }),
  isMale: SC.Record.attr(Boolean, { isRequired: YES, defaultValue: YES }),
  belongsTo: SC.Record.attr('FamilyTree.Human'),
  family: SC.Record.attr('FamilyTree.Family'),
  isPet: YES,
  
  
  // ..........................................................
  // LINKIT SPECIFIC INFORMTION
  // 
  terminals: ['myOwner'],
  position: SC.Record.attr(Object),
  
  links: function(){   
    var links = []; 
    // get master
    var bt = this.get('belongsTo');
    var btLink;
    if (bt){
      btLink = SC.Object.create( LinkIt.Link, {
        startNode: bt,
        startTerminal: 'animals',
        endNode: this,
        endTerminal: 'myOwner'
      });
      links.push(btLink);
    }
  
    return links;
  }.property('belongsTo').cacheable(),
  
  didCreateLink: function(link) {
    var l = link[0]; // The link is comprised of an ARRAY of links with the Bi-directional links...often you only need the first object to complete the link
    var sn = l.get('startNode'), st = l.get('startTerminal');
    var en = l.get('endNode'), et = l.get('endTerminal');
    //console.log('Pet...didCreateLink: start:%@ end:%@'.fmt(st, et));
    if(en === this && et === 'myOwner'){
      this.set('belongsTo', sn);
    }
  },
  
  willDeleteLink: function(link) {
    var sn = link.get('startNode'), st = link.get('startTerminal');
    var en = link.get('endNode'), et = link.get('endTerminal');
    if(en === this && et === 'myOwner'){
      this.set('belongsTo', null);
    }
  }
});
