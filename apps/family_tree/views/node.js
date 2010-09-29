/**
 * The base human view.
 * @class FamilyTree.HumanView
 * @extends SC.View
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
 /*globals LinkIt FamilyTree*/
sc_require('core');
sc_require('mixins/gender');

FamilyTree.NodeView = SC.View.extend(LinkIt.NodeView, FamilyTree.Gender, {
  layout: { top: 0, left: 0, width: 150, height: 45 },
  displayProperties: ['content', 'isSelected'],
  
  content: null,
  
  render: function(context){
    var c = this.get('content');
    if(c && c.get('isPet')) context.addClass('pet');
    else context.addClass('human');
    sc_super();
    if (this.get("isSelected")) context.addClass("selected");
  },
  
  createChildViews: function(){
    var childViews = [], contentView;
    var content = this.get('content');
    if(SC.none(content)) return;
    // ..........................................................
    // pet
    // 
    if(content.get('isPet')){
      // This is the content of the view
      contentView = this.createChildView(
        SC.View.design({
          content: content,
          layout: { left: 0, top: 0, right: 0, bottom: 0},
          childViews: 'name petType'.w(),

          name: SC.LabelView.extend({
            classNames: ['name'],
            layout: { left: 43, centerY: 0, width: 87,  height: 25},
            isEditable: YES,
            textAlign: SC.ALIGN_CENTER,
            valueBinding: SC.binding('.name', content)
          }),

          petType: SC.LabelView.extend({
            classNames: ['pet-type'],
            layout: { left: 3, centerY: 0, width: 40, height: 25},
            isEditable: YES,
            valueBinding: SC.binding('.kindOfPet', content)
          })
        })
      );
      childViews.push(contentView);

      // Owner Terminal
      this._term_myOwner = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['master-terminal'],
          layout: { centerX: 0, top: -5, width: 10, height: 10 },
          linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#4EE76B', cap: LinkIt.ROUND},
          node: content,
          terminal: 'myOwner'
        })
      );
      childViews.push(this._term_myOwner);
      
    }
    // ..........................................................
    // human
    // 
    else{
      var isMale = content.get('isMale');

      var iconView = this.createChildView(
        SC.View.extend({
          classNames: ['icon'],
          content: content,
          layout: { centerY: 0, left: 5, width: 25, height: 25},
          render: function(context, firstTime){
            context = isMale ? context.addClass('male') : context.addClass('female') ;
            sc_super();
          }
        })
      );
      childViews.push(iconView);

      // This is the content of the view
      contentView = this.createChildView(
        SC.LabelView.extend({
          classNames: ['name'],
          content: content,
          isEditable: YES,
          layout: { centerY: 0, centerX: 0, width: 125, height: 25},
          textAlign: SC.ALIGN_CENTER,
          valueBinding: SC.binding('.name', content)
        })
      );
      childViews.push(contentView);

      // Father Terminal
      this._term_dad = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['father-terminal'],
          layout: { left: 40, top: -5, width: 10, height: 10 },
          linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#A5C0DC', cap: LinkIt.ROUND},
          node: content,
          terminal: 'dad',
          direction: LinkIt.INPUT_TERMINAL
        })
      );
      childViews.push(this._term_dad);

      // Mother Terminal
      this._term_mom = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['mother-terminal'],
          layout: { right: 40, top: -5, width: 10, height: 10 },
          linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#E08CDF', cap: LinkIt.ROUND},
          node: content,
          terminal: 'mom',
          direction: LinkIt.INPUT_TERMINAL
        })
      );
      childViews.push(this._term_mom);

      var spouseLayout = isMale ? { right: -5, centerY: 0, width: 10, height: 10 } : { left: -5, centerY: 0, width: 10, height: 10 } ;
      this._term_sig = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['spouse-terminal'],
          layout: spouseLayout,
          linkStyle: { lineStyle: LinkIt.HORIZONTAL_CURVED, width: 3, color: 'red', cap: LinkIt.ROUND},      
          node: content,
          terminal: 'sig'
        })
      );
      childViews.push(this._term_sig);

      // pets
      var petsLayout = isMale ? { left: -5, centerY: 0, width: 10, height: 10 } :{ right: -5, centerY: 0, width: 10, height: 10 };
      this._term_animals = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['pets-terminal'],
          layout: petsLayout,
          linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: '#4EE76B', cap: LinkIt.ROUND},
          node: content,
          terminal: 'animals',
          direction: LinkIt.OUTPUT_TERMINAL
        })
      );
      childViews.push(this._term_animals);

      // children
      var kidsColor = isMale ? '#A5C0DC' : '#E08CDF' ;
      this._term_kids = this.createChildView(
        SC.View.extend(LinkIt.Terminal, {
          classNames: ['children-terminal'],
          layout: { bottom: -5, centerX: 0, width: 10, height: 10 },
          linkStyle: { lineStyle: LinkIt.STRAIGHT, width: 3, color: kidsColor, cap: LinkIt.ROUND},
          node: content,
          terminal: 'kids',
          direction: LinkIt.OUTPUT_TERMINAL
        })
      );
      childViews.push(this._term_kids);
    }
    
    


    this.set('childViews', childViews);
  },
  
  // ..........................................................
  // LINKIT Specific for the view
  // 
  /**
    Implements LinkIt.NodeView.terminalViewFor()
  */
  terminalViewFor: function(terminalKey) {
    return this['_term_' + terminalKey];
  }
});
