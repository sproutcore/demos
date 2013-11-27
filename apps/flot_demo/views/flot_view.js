// ==========================================================================
// Project:   FlotDemo
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals FlotDemo, jQuery */


/** @class
  A simple Flot integration view.

  This makes it easier to work with Flot graphs in SproutCore. While you could
  manage Flot independent from SproutCore, if you want to bind your data and
  controls to the graph you need to add a thin wrapper to the standard Flot
  API.

  For example, Flot needs a target element in the DOM to work, so we use
  SC.View's didAppendToDocument callback to set up Flot and the
  willRemoveFromDocument callback to tear it down again. This ensures that
  our view can be appended and removed like any other SproutCore view.

  Note:

  This could be greatly optimized to only observe the parts of the data that
  change. In fact, it's probably best to only observe the data array object
  alone and simply replace it wholly each time that the data changes. This
  depends on how you plan to manipulate the data bound to the view.

  As it stands, this demo version observes the data array object, the members
  of the data array object (i.e. series) and the individual series data members.

  This means you can update the graph by setting the data array object, adding
  or removing a series from the data array or adding or removing a point from
  each series' data arrays. It does *not* observe changes to each series data
  array objects (i.e. you can't replace a series data object, you can only
  change the members in it).
*/
FlotDemo.FlotView = SC.View.extend({


  /**
    Data to pass to Flot.

    @type Array
    @default []
   */
  data: null,

  /**
    Options to pass to Flot.

    @type Object
    @default {}
   */
  options: null,

  /** @private */
  _plot: null,

  /**
    SC.View callback. Used to create the Flot plot.
  */
  // After the layer (i.e. element) is appended, create the plot instance.
  // If you attempt to call plot earlier, it tries to walk the DOM to find
  // some color information and will hang because the layer isn't in the DOM
  // before this point.
  didAppendToDocument: function () {
    var layer = this.get('layer'),
      data = this.get('data'),
      options = this.get('options'),
      plot;

    // Lazily instantiate the data if it was not set.
    if (!data) { data = []; }

    // Lazily instantiate the options if they were not set.
    if (!options) { options = {}; }

    // Create the Flot plot.
    plot = jQuery.plot(layer, data, options);

    // Cache the plot object.
    this._plot = plot;
  },

  /**
    SC.View callback. Used to shutdown and remove the Flot plot.
  */
  willRemoveFromDocument: function () {
    var plot = this._plot;

    plot.shutdown();

    this._plot = null;
  },

  /** @private */
  dataDidChange: function () {
    var data = this.get('data'),
      oldData = this._oldData,
      plot = this._plot;

    // Clean up use of the old data array.
    if (oldData) {
      oldData.removeObserver('[]', this, this.dataMembersDidChange);

      if (this.isSeries(oldData)) {
        for (var i = 0, len = oldData.get('length'); i < len; i++) {
          var oldSeries = oldData.objectAt(i);

          oldSeries.data.removeObserver('[]', this, this.dataMembersDidChange);
        }
      }
    }

    if (data) {
      // Observe the membership of the data array for changes.
      data.addObserver('[]', this, this.dataMembersDidChange);

      // Apply the current data to the plot.
      this.dataMembersDidChange();
    }

    // Cache the data for later cleanup.
    this._oldData = data;
  }.observes('data'),

  /** @private */
  dataMembersDidChange: function () {
    var data = this.get('data'),
      plot = this._plot;

    // TODO: Clean up removed members.
    if (this.isSeries(data)) {
      for (var i = 0, len = data.get('length'); i < len; i++) {
        var series = data.objectAt(i);

        // Observe each individual new series for changes.
        if (!series.data.hasObserverFor('[]')) {
          series.data.addObserver('[]', this, this.dataMembersDidChange);
        }
      }
    }

    // Update the plot if it exists.
    if (plot) {
      plot.setData(data);

      // We need to set up the grid each time the data changes although we
      // may be able to remove this step depending on how the data is
      // manipulated.
      plot.setupGrid();

      plot.draw();
    }
  },

  /** @private Determine if the data is a series or not. Series require deeper observing. */
  isSeries: function (data) {
    return data && data[0] && data[0].data;
  }

});
