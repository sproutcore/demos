// ==========================================================================
// Project:   FlotDemo - demoPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals FlotDemo */
sc_require('views/flot_view');


// This page describes the main user interface for your application.
FlotDemo.demoPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.MainPane.design({
    classNames: ['demo-content'],
    childViews: ['flotView'],
    layout: { border: 1, centerX: 0, centerY: 0, width: 640, height: 440, zIndex: 1 },

    flotView: FlotDemo.FlotView.extend({

      // Flot requires a fixed width and height.
      layout: { centerX: 0, centerY: 0, width: 600, height: 400 },

      // Flot sample data.
      dataBinding: SC.Binding.oneWay('FlotDemo.currentData'),

      // Flot options.
      options: {

        grid: {
          backgroundColor: {
            colors: ['#fff', '#eee']
          }
        },

        legend: {
          show: false
        },

        series: {
          shadowSize: 0 // Drawing is faster without shadows
        },

        xaxis: {
          tickFormatter: function () {
            return '';
          }
        },

        yaxis: {
          min: 0,
          max: 10.5
        }
      }

    })
  })

});
