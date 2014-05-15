// ==========================================================================
// Project:   ZoomViewer
// Copyright: @2014 iParadigms, LLC
// License:   Licensed under MIT license
// ==========================================================================
/*global ZoomViewer */


// The demo content.
ZoomViewer.ThumbItemView = SC.View.extend({
  childViews: ['image'],
  classNames: ['thumb-item-view'],
  content: null,
  displayProperties: ['content', 'isSelected'],
  isSelected: false,

  image: SC.ImageView.extend({
    contentBinding: SC.Binding.oneWay('.parentView.content'),
    contentValueKey: 'thumbnailPath',
    layout: { top: 15, left: 20, right: 20, bottom: 40 },
    scale: SC.BEST_FILL
  }),

  render: function (context) {
    var content = this.get('content'),
      title = '';

    if (content) {
      title = content.get('title');
    }

    context.setClass({
      sel: this.get('isSelected')
    });

    // Add the title of the image.
    context
      .begin()
      .addClass('thumb-item-title')
      .push(title)
      .end();

    // Add a box behind the image for when the image is selected.
    context
      .begin()
      .addClass('thumb-item-backing')
      .end();
  },

  update: function (jqObject) {
    var content = this.get('content'),
      title = '';

    if (content) {
      title = content.get('title');
    }

    jqObject.toggleClass('sel', this.get('isSelected'));

    jqObject.find('.thumb-item-title').html(title);
  }
});
