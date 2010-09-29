/**
 * The family list item view.
 * @class FamilyTree.FamilyItemView
 * @extends SC.View
 * @author Evin Grano
 *
 * @version 0.1
 * @since 0.1
 */
sc_require('core');

FamilyTree.FamilyItemView = SC.View.extend( SC.ContentDisplay, {
  
  classNames: ['family'],
  displayProperties: ['content', 'isSelected'],
  
  content: null,
  
  render: function(context, firstTime){
    sc_super();
    if (this.get("isSelected")) context.addClass("selected");
  },
  
  createChildViews: function(){
    var childViews = [];
    var content = this.get('content');
    if(SC.none(content)) return;
    
    // This is the content of the view
    var contentView = this.createChildView(
      SC.LabelView.extend({
        layout: { centerY: 0, left: 10, right: 48, height: 24},
        classNames: ['name'],
        content: content,
        isEditable: YES,
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding: SC.binding('.name', content)
      })
    );
    childViews.push(contentView);
    
    var badge = this.createChildView(
      SC.LabelView.extend({
        classNames: ['badge'],
        content: content,
        layout: { centerY: 0, right: 10, width: 28, height: 18},
        textAlign: SC.ALIGN_CENTER,
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding: SC.binding('*members.length', content)
      })
    );
    childViews.push(badge);
    
    this.set('childViews', childViews);
  }
});
