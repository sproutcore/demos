// ==========================================================================
// FamilyTree.AddButtonView
// ==========================================================================

sc_require('core');

/** @class
  
  @extends SC.View
  @author Evin Grano
  @version ALPHA
  @since ALPHA

*/
FamilyTree.AddButtonView = SC.View.extend( SCUI.SimpleButton,
/** @scope SC.DockButtonView.prototype */ {
  classNames: ['addbutton-view'],
  title: "",
  icon: null,
  hasState: NO,
  hasHover: YES,
  isSelected: NO,

  /**
    If YES, adds two divs for custom decoration styling when 'isSelected' is true.  See render().
  */
  hasSelectionDecoration: YES,
  
  buttonSize: { width: 77 },
  
  displayProperties: ['isSelected'],
  
  init: function(){
    sc_super();
    
    var layout = this.get('layout');
    var bSize = this.get('buttonSize');
    layout = SC.merge(layout, bSize);
    this.set('layout', layout);
  },
  
  render: function(context, firstTime){
    var isSel = this.get('isSelected');
    if (isSel && this.get('hasSelectionDecoration')) {
      context = context.begin('div').addClass('addbutton-inner');
      context = this._addIconLabel(context);
      context = context.end();
      context = context.begin('div').addClass('addbutton-end').end();
    }
    else {
      context = this._addIconLabel(context);
    }
    
    context = context.setClass('sel', isSel);
    sc_super();
  },
  
  _addIconLabel: function(context){
    var icon = this.get('icon');
    var title = this.get('title');
    
    if (icon) context = context.begin('div').addClass('icon %@'.fmt(icon)).end();
    context = context.begin('div').addClass('label').text(title).end();
    return context;
  }
  
});
