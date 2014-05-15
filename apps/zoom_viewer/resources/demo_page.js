// ==========================================================================
// Project:   ZoomViewer
// Copyright: @2014 iParadigms, LLC
// License:   Licensed under MIT license
// ==========================================================================
/*global ZoomViewer */


// The demo content.
ZoomViewer.demoPage = SC.Page.create({

  demoContent: SC.View.design({
    childViews: ['scrollView', 'footerView'],

    scrollView: SC.ScrollView.design({
      layout: { top: 0, bottom: 70 },

      canScale: YES,
      scaleBinding: SC.Binding.oneWay('ZoomViewer.zoomController.scale'),

      horizontalAlignBinding: SC.Binding.oneWay('ZoomViewer.zoomController.horizontalAlign'),

      maximumScale: 10,


      contentView: SC.ListView.design({
        layout: { width: 640 },

        exampleView: SC.View.extend(SC.ContentDisplay, {
          contentDisplayProperties: ['imagePath'],

          render: function(context) {
            var imagePath = this.getPath('content.imagePath') || SC.BLANK_IMAGE_URL;
            context.begin('img')
              .setAttr('width', 640)
              .setAttr('height', 480)
              .setAttr('src', imagePath)
            .end();
          },

          update: function($context) {
            var imagePath = this.getPath('content.imagePath') || SC.BLANK_IMAGE_URL;
            $context.find('img').attr('src', imagePath);
          }

        }),

        rowHeight: 480,

        content: [
          SC.Object.create({ imagePath: sc_static('images/yosemite01.jpg') }),
          SC.Object.create({ imagePath: sc_static('images/yosemite02.jpg') }),
          SC.Object.create({ imagePath: sc_static('images/yosemite03.jpg') }),
          SC.Object.create({ imagePath: sc_static('images/yosemite04.jpg') })
        ]
      })
    }),

    footerView: SC.View.design({
      layout: { bottom: 0, height: 70 },

      childViews: ['alignmentLabelView', 'alignmentRadioView', 'scaleLabelView', 'scaleSliderView'],

      alignmentLabelView: SC.LabelView.design({
        layout: { left: 50, top: 10, width: 250, height: 20 },
        value: 'Horizontal Alignment'
      }),

      alignmentRadioView: SC.RadioView.design({
        layout: { left: 50, top: 35, width: 250, height: 20 },
        items: [
          {
            title: "Left",
            value: SC.ALIGN_LEFT,
            enabled: YES
          },
          {
            title: "Center",
            value: SC.ALIGN_CENTER,
            enabled: YES
          },
          {
            title: "Right",
            value: SC.ALIGN_RIGHT,
            enabled: YES
          }
        ],

        valueBinding: 'ZoomViewer.zoomController.horizontalAlign',

        itemTitleKey: 'title',
        itemValueKey: 'value',
        itemIsEnabledKey: 'enabled',
        isEnabled: YES,
        layoutDirection: SC.LAYOUT_HORIZONTAL
      }),

      scaleLabelView: SC.LabelView.design({
        layout: { right: 50, top: 10, width: 300, height: 20 },
        value: 'Scale factor'
      }),

      scaleSliderView: SC.SliderView.design({
        layout: { right: 50, top: 35, width: 300, height: 20 },
        maximum: 5,
        minimum: 0.5,
        step: 0.01,

        toolTip: 'Change the scale',
        valueBinding: 'ZoomViewer.zoomController.scale'
      })

    })
  })
});
