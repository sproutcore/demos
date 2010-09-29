// ==========================================================================
// FamilyTree.ListButtonView
// ==========================================================================

sc_require('core');

/** @class
  
  @extends SC.View
  @author Evin Grano
  @version ALPHA
  @since ALPHA

*/
FamilyTree.ListButtonView = SC.View.extend( SCUI.SimpleButton,
/** @scope SC.DockButtonView.prototype */ {
  title: "",
  icon: null,
  hasState: NO,
  hasHover: YES,
  isSelected: NO,
  
  render: function(context, firstTime){
    context.begin('img').attr('src', sc_static('blank.gif')).end();
    sc_super();
  }
});
