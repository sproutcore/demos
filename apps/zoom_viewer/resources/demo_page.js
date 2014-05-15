// ==========================================================================
// Project:   ZoomViewer
// Copyright: @2014 iParadigms, LLC
// License:   Licensed under MIT license
// ==========================================================================
/*global ZoomViewer */


// The demo content.
ZoomViewer.demoPage = SC.Page.create({

  demoContent: SC.View.design({

    childViews: ['toolbar', 'imageList', 'selectedImage'],

    // Our controls.
    toolbar: SC.View.design({
      classNames: ['header'],
      childViews: ['scaleWrapper'],
      layout: { height: 70, borderBottom: 1 },

      scaleWrapper: SC.View.extend({
        childViews: ['scaleLabelView', 'scaleSliderView'],
        layout: { width: 0.25, minWidth: 200, maxWidth: 300 },

        scaleLabelView: SC.LabelView.design({
          classNames: ['header-label'],
          layout: { left: 20, top: 15, right: 20, height: 20 },
          localize: true,
          value: '_ScaleLabel'
        }),

        scaleSliderView: SC.SliderView.design({
          layout: { left: 20, top: 35, right: 20, height: 20 },
          maximum: 3,
          minimum: 0.2,
          step: 0.05,

          toolTip: 'Change the scale',
          valueBinding: 'ZoomViewer.zoomController.scale'
        })
      })


    }),

    // Our list of images.
    imageList: SC.ScrollView.design({
      layout: { top: 70, width: 0.25, minWidth: 200, maxWidth: 300 },

      // We use the overlay scrollers for this list.
      verticalOverlay: true,
      verticalScrollerView: SC.OverlayScrollerView,

      contentView: SC.ListView.design({

        classNames: ['thumb-list'],
        // We bind the content of this list to the content of the images controller.
        // Note that we use a `oneWay` binding because the list only needs to read
        // the images, but doesn't need to set them. Using `oneWay` improves the
        // performance slightly.
        contentBinding: SC.Binding.oneWay('ZoomViewer.imagesController.arrangedObjects'),

        selectionBinding: 'ZoomViewer.imagesController.selection',

        // This is the example
        exampleView: ZoomViewer.ThumbItemView,

        rowSize: function () {
          return Math.round(this.get('frame').width * 0.75);
        }.property('frame').cacheable()

      }),

      /**
        This is a bit of an unattractive way to keep the selectedImage snugly
        to the right of this list even when the limits are reached.
      */
      _frameDidChange: function () {
        var frame = this.get('frame'),
          selectedImage = this.getPath('parentView.selectedImage');

        // Once we hit 300px wide, we stop stretching. Adjust the selectedImage
        // to match.
        if (frame.width === 300) {
          selectedImage.adjust('left', 300);
        } else if (frame.width === 200) {
          selectedImage.adjust('left', 200);
        } else {
          // Set the selectedImage left back to flexible, but only if not already so.
          if (selectedImage.get('layout').left !== 0.25) {
            selectedImage.adjust('left', 0.25);
          }
        }
      }.observes('frame')

    }),

    // Our selected image.
    selectedImage: SC.ScrollView.design({

      canScale: true,
      classNames: ['detail-view'],

      scaleBinding: SC.Binding.oneWay('ZoomViewer.zoomController.scale'),

      // We keep the content aligned in the middle for nice zooming.
      verticalAlign: SC.ALIGN_MIDDLE,
      horizontalAlign: SC.ALIGN_CENTER,

      layout: { top: 70, left: 0.25 },

      maximumScale: 10,

      // We use the overlay scrollers for this view.
      verticalOverlay: true,
      verticalScrollerView: SC.OverlayScrollerView,
      horizontalOverlay: true,
      horizontalScrollerView: SC.OverlayScrollerView,

      contentView: SC.ImageView.design({
        contentBinding: SC.Binding.oneWay('ZoomViewer.imageController.content'),
        contentValueKey: 'imagePath',
        layout: { height: 1600, width: 2560 }
      })
    })
  })
});
