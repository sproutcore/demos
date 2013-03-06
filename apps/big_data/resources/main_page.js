// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */


// This page describes the main user interface for your application.
BigData.mainPage = SC.Page.create({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.extend({

    childViews: ['titleCV', 'descCV', 'listBoxCV'],

    titleCV: SC.LabelView.extend({
      classNames: ['demo-title'],
      layout: { centerX: 0, height: 30, width: 400, top: 15 },
      localize: true,
      value: '_DemoTitle'
    }),

    descCV: SC.LabelView.extend({
      classNames: ['demo-desc'],
      escapeHTML: false,
      layout: { centerX: 0, height: 120, width: 400, top: 45 },
      localize: true,
      value: '_DemoDescription'
    }),

    listBoxCV: SC.View.extend({
      childViews: ['listCV', 'busyCV', 'activeQueryButton'],
      classNames: ['list-box'],
      layout: { border: 1, centerX: 0, bottom: 150, top: 250, width: 320 },

      listCV: SC.ScrollView.extend({
        layout: { borderBottom: 1, bottom: 50 },

        contentView: SC.ListView.extend({
          contentBinding: SC.Binding.oneWay('BigData.peopleController.arrangedObjects'),
          exampleView: BigData.PersonItemView,
          layerId: 'list-cv',
          groupExampleView: BigData.GroupItemView,
          selectionBinding: 'BigData.peopleController.selection'
        })
      }),

      busyCV: SC.ImageView.extend({
        isVisibleBinding: SC.Binding.oneWay('BigData.peopleController.status')
          .transform(function (status) {
            return status & SC.Record.BUSY;
          }),
        layout: { bottom: 20, right: 10, width: 16, height: 11 },
        useCanvas: false,
        value: sc_static('ajax-loader.gif')
      }),

      activeQueryButton: SC.SegmentedView.extend({
        controlSize: SC.LARGE_CONTROL_SIZE,
        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemWidthKey: 'width',
        items: [
          { title: "_Flat", value: 'flatArrayQuery', width: 80 },
          { title: "_Grouped", value: 'groupedArrayQuery', width: 80 },
          { title: "_Windowed", value: 'windowedArrayQuery', width: 80 }
        ],
        layout: { bottom: 10, centerX: 0, height: 30, width: 280 },
        localize: true,
        valueBinding: 'BigData.peopleController.activeQuery'
      })

    })

  })

});
