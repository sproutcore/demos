// ==========================================================================
// Project:   BigData
// Copyright: ©2013 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*global BigData */


// The demo content.
BigData.demoPage = SC.Page.create({

  demoContent: SC.View.extend({
    childViews: ['listView', 'activeQueryButton'], //'busyView',
    classNames: ['demo-content'],
    layout: { border: 1, centerX: 0, bottom: 30, top: 30, width: 320 },

    listView: SC.ScrollView.extend({
      layout: { borderBottom: 1, bottom: 50 },

      contentView: SC.ListView.extend({
        contentBinding: SC.Binding.oneWay('BigData.peopleController.arrangedObjects'),
        exampleView: BigData.PersonItemView,
        layerId: 'list-cv',
        groupExampleView: BigData.GroupItemView,
        selectionBinding: 'BigData.peopleController.selection'
      })
    }),

    // The data loads too quickly for this to be of any value.  Plus animated GIFs suck on Safari.
    // busyView: SC.ImageView.extend({
    //   isVisibleBinding: SC.Binding.oneWay('BigData.peopleController.status')
    //     .transform(function (status) {
    //       return status & SC.Record.BUSY;
    //     }),
    //   layout: { bottom: 20, right: 10, width: 16, height: 11 },
    //   useCanvas: false,
    //   value: sc_static('ajax-loader.gif')
    // }),

    activeQueryButton: SC.SegmentedView.extend({
      controlSize: SC.LARGE_CONTROL_SIZE,
      itemTitleKey: 'title',
      itemValueKey: 'value',
      itemWidthKey: 'width',
      items: [
        { title: "_Flat", value: 'flatArrayQuery', width: 90 },
        { title: "_Grouped", value: 'groupedArrayQuery', width: 90 }
        // { title: "_Windowed", value: 'windowedArrayQuery', width: 80 }
      ],
      layout: { bottom: 10, centerX: 0, height: 30, width: 280 },
      localize: true,
      valueBinding: 'BigData.peopleController.activeQuery'
    })

  })
});
