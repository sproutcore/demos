// ==========================================================================
// Project:   DataDrag - demoPage
// Copyright: @2013 My Company, Inc.
// ==========================================================================
/*globals DataDrag */

/*
  This page's demoContent view handles page-wide drop events to light up valid drop
  targets for a particular drag. For examples of things you can do with dropped data,
  see each drop target's `processDrop` method below.
*/
DataDrag.demoPage = SC.Page.design({

  demoContent: SC.View.extend({

    // ---------------------------
    // Event handlers
    //

    // On enter, we check the event's data types and highlight the appropriate drop target.
    dataDragEntered: function(evt) {
      var types = evt ? evt.dataTransfer.types : [],
          targets = [this.textTargetView, this.imageTargetView, this.fileTargetView, this.anyTargetView],
          i, target, len = targets.length;
      
      for (i = 0; i < len; i++) {
        target = targets[i];
        if (target.matchingContentType(evt)) target.set('matchingDragIsOverPage', YES);
        target.set('text', null);
      }
      this.imageTargetView.set('imageUrl', null); // Special treatment for the image drop target.
    },

    // At the page level, we don't need to handle dataDragHovered, because we don't want to change
    // the event's dropEffect unless it's over a drop target.

    // On exit, reset the drop targets.
    dataDragExited: function(evt) {
      var targets = [this.textTargetView, this.imageTargetView, this.fileTargetView, this.anyTargetView],
          i, target, len = targets.length;
      for (i = 0; i < len; i++) {
        target = targets[i];
        target.set('matchingDragIsOverPage', NO);
      }
    },

    // We don't handle dataDragDropped at the page level. (See DataDrag.DropTargetView for more.)

    // ---------------------------
    // Child views
    //

    childViews: ['labelView', 'textTargetView', 'imageTargetView', 'fileTargetView', 'anyTargetView'],

    labelView: SC.LabelView.extend({
      layout: { height: 36, width: 300, centerX: 0, centerY: 0 },
      classNames: ['drag-drop-instructions'],
      value: '_Instructions',
      localize: YES,
      escapeHTML: NO
    }),

    textTargetView: DataDrag.DropTargetView.extend({
      layout: { top: 15, left: 15, width: 0.45, height: 0.4 },
      title: '_TextTargetLabel',
      contentTypes: ['text/plain'],
      // Show the dropped text.
      processDrop: function(evt) {
        // Get the dropped data in plain-text format.
        var text = evt.dataTransfer.getData('text/plain');
        // HTML-escape it.
        text = $('<div></div>').text(text).html();
        // Get it into the results text.
        text = '_TextDropReceived {text}'.loc(text);
        // Set it.
        this.set('text', text);
      }
    }),

    imageTargetView: DataDrag.DropTargetView.extend({
      layout: { top: 15, right: 15, width: 0.45, height: 0.4 },
      title: '_ImageTargetLabel',
      contentTypes: ['image/gif', 'image/jpeg', 'image/tiff', 'image/png', 'image/bmp'],
      processDrop: function(evt) {
        this.set('imageUrl', evt.dataTransfer.getData('text/uri-list'));
      },
      imageUrl: null,
      displayProperties: ['imageUrl'],
      render: function(context) {
        context.begin()
          .addClass(['sc-view', 'drop-target-image'])
          .addClass(this.getPath('theme.classNames'))
          .setStyle('background-image', "url('%@')".fmt(this.get('imageUrl') || ''))
          .end();
        sc_super();
      },
      update: function($context) {
        $context.find('.drop-target-image').css('background-image', "url('%@')".fmt(this.get('imageUrl') || ''));
        sc_super();
      }
    }),

    fileTargetView: DataDrag.DropTargetView.extend({
      layout: { left: 15, bottom: 15, width: 0.45, height: 0.4 },
      title: '_FileTargetLabel',
      contentTypes: ['Files'],
      // Display the names of each dropped file.
      processDrop: function(evt) {
        // Get the names and types of each file.
        var text = '',
            files = evt.dataTransfer.files || [],
            i, file, len = files.length;
        for (i = 0; i < len; i++) {
          file = files[i];
          text += '%@ (%@)<br/>'.fmt(file.name, file.type);
        }
        text = '_FileDropReceived {text}'.loc(text);
        this.set('text', text);
      }
    }),

    anyTargetView: DataDrag.DropTargetView.extend({
      layout: { right: 15, bottom: 15, width: 0.45, height: 0.4 },
      title: '_AnyTargetLabel',
      contentTypes: null
    })
  })

});
