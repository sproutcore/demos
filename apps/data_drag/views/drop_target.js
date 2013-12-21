// ==========================================================================
// Project:   DataDrag - DropTarget
// Copyright: @2013 My Company, Inc.
// ==========================================================================
/*globals DataDrag */


/*
  This view handles drag and drop events to let the user know whether a particular drag
  is valid for this target, and to show the results of a successful drop. See the Events
  section, especially `dataDragHovered` for how to inform the browser of your intent.
*/
DataDrag.DropTargetView = SC.View.extend({

  // ------------------------------------
  // Public properties and methods
  //

  // The title to display when no data has been dropped.
  title: null,

  // The text to display after data has been dropped. (Set in processDrop below. Treated as trusted; be sure to html-escape before setting.)
  text: null,

  // Default (null) accepts all content types.
  contentTypes: null,

  // Reports whether the event's content types match this drop target's types.
  matchingContentType: function(evt) {
    var myTypes = this.get('contentTypes');
    if (!myTypes) return YES;
    var evtTypes = (evt && evt.dataTransfer && evt.dataTransfer.types) ? evt.dataTransfer.types : [];
    for (var i = 0; i < myTypes.length; i++) {
      if (evtTypes.contains(myTypes[i])) return myTypes[i];
    }
    return null;
  },

  // Override this method for custom drop handling!
  processDrop: function(evt) {
    this.set('text', '_SuccessfulDrop');
  },

  // ------------------------------------
  // Internal flags
  //

  // Set to YES by the parent view when a drag matches this target's type.
  matchingDragIsOverPage: NO,
  // Set to YES by this view when a matching drag is over the target.
  matchingDragIsOverTarget: NO,
  // Set to YES by this view when a non-matching drag is over the target.
  nonmatchingDragIsOverTarget: NO,

  // ------------------------------------
  // Events
  //

  // On enter, set internal flags. (Note that this event will also go through dataDragHovered, so we
  // can worry about dropEffect there.)
  dataDragEntered: function(evt) {
    if (this.matchingContentType(evt)) {
      this.set('matchingDragIsOverTarget', YES);
    } else {
      this.set('nonmatchingDragIsOverTarget', YES);
    }
  },
  // On hover, we have to tell the event we mean business.
  dataDragHovered: function(evt) {
    if (this.matchingContentType(evt)) {
      // In most cases, you will want to prevent the default behavior - e.g. trying to add dragged
      // text to a nonexistent text field.
      evt.preventDefault();
      // We set dataTransfer.dropEffect to copy to signal that we want to accept a drop.
      evt.dataTransfer.dropEffect = 'copy';
    } else {
      evt.dataTransfer.dropEffect = 'none';
    }
  },
  // On exit, reset all drag-over flags.
  dataDragExited: function(evt) {
    this.set('matchingDragIsOverTarget', NO);
    this.set('nonmatchingDragIsOverTarget', NO);
  },
  // Process matching drops.
  dataDragDropped: function(evt) {
    if (this.matchingContentType(evt)) {
      this.processDrop(evt);
    }
    evt.preventDefault();
  },
  // Reset the text on click.
  click: function() {
    this.set('text', null);
  },

  // ------------------------------------
  // Rendering
  //

  classNames: ['drop-target'],
  classNameBindings: ['matchingDragIsOverPage:can-drop', 'matchingDragIsOverTarget:has-matching-hover', 'nonmatchingDragIsOverTarget:has-nonmatching-hover'],

  displayText: function() {
    var ret = this.get('text') || this.get('title');
    if (ret) ret = ret.loc();
    return ret;
  }.property('title', 'text').cacheable(),

  displayProperties: ['displayText'],
  render: function(context) {
    context = context.begin()
      .addClass(this.getPath('theme.classNames'))
      .addClass('drop-target-label-wrapper');
    context.begin()
      .addClass(this.getPath('theme.classNames'))
      .addClass('drop-target-label')
      .push(this.get('displayText'))
      .end();
    context = context.end();
  },
  update: function($context) {
    $context.find('.drop-target-label').html(this.get('displayText'));
  }

});
