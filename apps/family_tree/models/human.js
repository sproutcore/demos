/*globals  FamilyTree*/
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

FamilyTree.Human = SC.Record.extend(LinkIt.Node, { 
  primaryKey: 'id',
  name: SC.Record.attr(String, { isRequired: YES, defaultValue: 'Enter Name' }),
  isMale: SC.Record.attr(Boolean, { isRequired: YES, defaultValue: YES }),
  family: SC.Record.toOne('FamilyTree.Family'),
  mother: SC.Record.toOne('FamilyTree.Human'),
  father: SC.Record.toOne('FamilyTree.Human'),
  spouse: SC.Record.toOne('FamilyTree.Human'),
  pets: SC.Record.toMany('FamilyTree.Pet', {
    inverse: 'belongsTo',
    isMaster: YES
  }),
    
  // ..........................................................
  // LINKIT SPECIFIC INFORMTION
  // 
  terminals: ['mom', 'dad', 'sig', 'kids', 'animals'],
  position: SC.Record.attr(Object),
  
  links: function(){
    var links = [];
    
    // get mother
    var mom = this.get('mother');
    if (mom){
      var momLink = SC.Object.create( LinkIt.Link, {
        startNode: mom,
        startTerminal: 'kids',
        endNode: this,
        endTerminal: 'mom'
      });
      links.push(momLink);
    }

    // get father
    var dad = this.get('father');
    if (dad){
      var dadLink = SC.Object.create( LinkIt.Link, {
        startNode: dad,
        startTerminal: 'kids',
        endNode: this,
        endTerminal: 'dad'
      });
      links.push(dadLink);
    }
    
    // spouse if you are the male
    var spouse = this.get('spouse');
    var isMale = this.get('isMale');
    if (isMale && spouse){
      var spouseLink = SC.Object.create( LinkIt.Link, {
        startNode: this,
        startTerminal: 'sig',
        endNode: spouse,
        endTerminal: 'sig'
      });
      links.push(spouseLink);
    }
    
    return links;
  }.property('mother', 'father', 'spouse', 'isMale').cacheable(),
  
  canLink: function(link) {
    if (!link) return NO;
    
    var sn = link.get('startNode'), st = link.get('startTerminal');
    var en = link.get('endNode'), et = link.get('endTerminal');
    
    // Make sure we don't connect to ourselves.
    if (sn === en) return NO;
    //console.log('\nCan Link: (%@).%@ => (%@).%@'.fmt(SC.guidFor(sn), st, SC.guidFor(en), et));

    // Make sure we don't already have this link.
    if (this._hasLink(link)) return NO;
    
    var sGender = sn.get('isMale') ? 'boy' : 'girl';
    var eGender = en.get('isMale') ? 'boy' : 'girl';
    var terms = '%@:%@ %@:%@'.fmt(sGender, st, eGender, et);
    if(sGender !== eGender && st === 'sig' && et === 'sig') { 
      //console.log('(%@,%@) Man married to woman: %@'.fmt(SC.guidFor(sn), SC.guidFor(en), terms ));
      return YES; 
    }

    // Data Points
    var dadHasKids = (terms.indexOf('boy:kids') > -1);
    var hasDad = (terms.indexOf('dad') > -1);
    var momHasKids = (terms.indexOf('girl:kids') > -1);
    var hasMom = (terms.indexOf('mom') > -1);
    var hasPets = (terms.indexOf('animals') > -1);
    var hasOwner = (terms.indexOf('myOwner') > -1);
    
    //console.log('dadKidsIdx: %@, hasDadIdx: %@, momKidsIdx: %@, hasMomIdx: %@'.fmt(dadHasKids, hasDad, momHasKids, hasMom));
    
    if(dadHasKids && hasDad) { 
      //console.log('(%@,%@) Dad link to Kids: %@'.fmt(SC.guidFor(sn), SC.guidFor(en), terms )); 
      return YES; 
    }
    
    if(momHasKids && hasMom) { 
      //console.log('(%@,%@) Mom link to Kids: %@'.fmt(SC.guidFor(sn), SC.guidFor(en), terms ));
      return YES; 
    }
    
    if(hasPets && hasOwner){
      //console.log('(%@,%@) Owner link to pet: %@'.fmt(SC.guidFor(sn), SC.guidFor(en), terms ));
      return YES;
    }
 
    // TODO: [EG] add the check to make sure there is no incest

    return NO;
  },
    
  _hasLink: function(link) {
    var links = this.get('links') || [];
    var len = links.get('length'), n;
    var linkID = LinkIt.genLinkID(link);
    for (var i = 0; i < len; i++) {
      n = links.objectAt(i);
      if (LinkIt.genLinkID(n) === linkID) {
        return YES;
      }
    }
  },
  
  didCreateLink: function(link) {
    var l = link[0]; // The link is comprised of an ARRAY of links with the Bi-directional links...often you only need the first object to complete the link
    var sn = l.get('startNode'), st = l.get('startTerminal');
    var en = l.get('endNode'), et = l.get('endTerminal');
    if(et === 'sig'){
      this.set('spouse', en);
    }
    else if (et === 'mom' && sn !== this){
      this.set('mother', sn);
    }
    else if (et === 'dad' && sn !== this){
      this.set('father', sn);
    }
  },
  
  willDeleteLink: function(link) {
    var sn = link.get('startNode'), st = link.get('startTerminal');
    var en = link.get('endNode'), et = link.get('endTerminal');
    if(et === 'sig'){
      this.set('spouse', null);
    }
    else if (et === 'mom'){
      this.set('mother', null);
    }
    else if (et === 'dad'){
      this.set('father', null);
    }
  }
});
