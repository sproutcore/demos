// ==========================================================================
// Project:   FlotDemo
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals FlotDemo, jQuery */


/** @class
  A simple Flot integration view.
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
    SC.View callback
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

  /** @private */
  dataDidChange: function () {
    var data = this.get('data'),
      oldData = this._oldData;

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

        if (!series.data.hasObserverFor('[]')) {
          // Observe each individual new series for changes.
          series.data.addObserver('[]', this, this.dataMembersDidChange);
        }
      }
    }

    // Update the plot if it exists.
    if (plot) {
      plot.setData(data);
      plot.setupGrid();
      plot.draw();
    }
  },

  /** @private Determine if the data is a series or not. Series require deeper observing. */
  isSeries: function (data) {
    return data && data[0] && data[0].data;
  }

});
