// ==========================================================================
// Project:   DesignModeDemo - mainPage
// Copyright: @2012 My Company, Inc.
// ==========================================================================
/*globals DesignModeDemo */

// This page describes the main user interface for your application.
DesignModeDemo.demoPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.View.design({
    childViews: ['titleCV', 'descCV', 'frameChooserCV', 'frameBodyCV'],

    layout: { minWidth: 320 },

    // The simulated size chooser button.
    frameChooserCV: SC.SegmentedView.design({
      controlSize: SC.LARGE_CONTROL_SIZE,
      // designAdjustments: {
      //   small: { centerY: 100 },
      //   medium: { centerY: 100 },
      //   large: { centerY: 100 },
      //   xlarge: { centerY: 100 }
      // },
      layout: { bottom: 50, centerX: 0, height: 30, width: 400, zIndex: 2 },
      localize: true,
      items: [{
        title: '_SmallFrameTitle',
        value: 'small'
      },{
        title: '_MediumFrameTitle',
        value: 'medium'
      },{
        title: '_LargeFrameTitle',
        value: 'large'
      },{
        title: '_XLargeFrameTitle',
        value: 'xlarge'
      }],
      itemTitleKey: 'title',
      itemValueKey: 'value',
      valueBinding: SC.Binding.from('DesignModeDemo.mainViewController.selectedMode')
    }),

    // The simulated device (~1/3 a real device size).
    // NOTE: This is not part of the "real" code, it's just for simulating a device border.
    // You can ignore this portion and focus on frameCV below.
    frameBodyCV: SC.View.design({
      childViews: ['frameCV'],
      classNames: ['frame-body'],
      designAdjustments: {
        small: { height: Math.round(568/3) + 60, width: Math.round(320/3) + 20 }, // 320 x 568
        medium: { height: Math.round(768/3) + 60, width: Math.round(576/3) + 30 }, // 576 x 768
        large: { height: Math.round(768/3) + 60, width: Math.round(1024/3) + 60 }, // 1024 x 768
        xlarge: { height: Math.round(900/3) + 30, width: Math.round(1440/3) + 30 } // 1440 x 900
      },
      layout: { border: 1, centerX: 0, centerY: 0, height: 1, width: 1 },

      // We override the automatically set design mode when the selected mode changes.
      selectedModeBinding: SC.Binding.from('DesignModeDemo.mainViewController.selectedMode'),
      selectedModeObserver: function () {
        if (this.get('selectedMode') !== this.get('designMode')) {
          this.updateDesignMode(this.get('designMode'), this.get('selectedMode'));
        }
      }.observes('selectedMode'),

      // The simulated device display (~1/3 a real device display size).
      // NOTE: This is where our app, Tiny Shapes, begins.
      frameCV: SC.View.design({
        childViews: ['navbarCV', 'toolbarCV', 'sourceListCV', 'contentCV'],
        classNames: ['frame'],

        // The adjusted layouts for each range.
        designAdjustments: {
          small: { height: Math.round(568/3), width: Math.round(320/3) },
          medium: { height: Math.round(768/3), width: Math.round(576/3) },
          large: { height: Math.round(768/3), width: Math.round(1024/3) },
          xlarge: { height: Math.round(900/3), width: Math.round(1440/3) }
        },

        // The default layout.
        layout: { border: 1, centerX: 0, centerY: 0, height: 1, width: 1 },

        navbarCV: SC.View.design({
          childViews: ['titleCV', 'toolbarButtonCV'],
          classNames: ['navbar'],
          designAdjustments: {
            small: { height: 18 },
            medium: { height: 18 },
            large: { height: 22 },
            xlarge: { height: 22 }
          },
          layout: { height: 1, zIndex: 2 },

          titleCV: SC.LabelView.design({
            classNames: ['title'],
            layout: { centerY: 0, height: 18 },
            localize: true,
            value: '_TinyShapes'
          }),

          /** This view is only used in 'medium' */
          toolbarButtonCV: SC.ButtonView.design({
            action: 'showMenu',
            classNames: ['toolbar-button'],
            isVisible: function() {
              return this.get('designMode') === 'medium';
            }.property('designMode').cacheable(),
            layout: { border: 1, centerY: 0, height: 13, left: 5, width: 40 },
            localize: true,
            target: DesignModeDemo.tinyAppController,
            title: "_Menu"
          })
        }),

        /** This view is only used in 'small' */
        toolbarCV: SC.SegmentedView.design({
          classNames: ['toolbar'],
          designAdjustments: {
            small: { height: 24 },
            large: { top: 22, width: 80 }
          },

          isVisible: function() {
            return this.get('designMode') === 'small';
          }.property('designMode').cacheable(),

          items: DesignModeDemo.tinyAppController.get('shapes'),
          itemIconKey: 'icon',
          itemValueKey: 'value',
          itemWidthKey: 'width',
          layout: { bottom: 0, zIndex: 1 },
          shouldHandleOverflow: false,
          valueBinding: SC.Binding.from('DesignModeDemo.tinyAppController.selectedShape')
        }),

        /** This view is only used in 'large' & 'xlarge' */
        sourceListCV: SC.ListView.design({
          content: DesignModeDemo.tinyAppController.get('shapes'),
          designAdjustments: {
            small: { width: 1 },
            medium: { width: 1 },
            large: { width: 80 },
            xlarge: { width: 100 }
          },
          exampleView: SC.ListItemView.extend({
            contentIconKey: 'blackIcon',
            contentValueKey: 'value',
            hasContentIcon: YES
          }),

          isVisible: function () {
            return this.get('designMode') === 'large' || this.get('designMode') === 'xlarge';
          }.property('designMode').cacheable(),

          layout: { top: 21, width: 1 },

          // Ex. different row heights for different design modes.
          rowHeight: function () {
            return this.get('designMode') === 'large' ? 24 : 36;
          }.property('designMode').cacheable(),

          selectionBinding: SC.Binding.from('DesignModeDemo.tinyAppController.selection')
        }),

        contentCV: SC.ContainerView.design({
          classNames: ['content'],
          designAdjustments: {
            small: { bottom: 20, top: 17 },
            medium: { top: 15 },
            large: { top: 21, left: 80 },
            xlarge: { top: 21, left: 100 }
          },
          nowShowingBinding: SC.Binding.oneWay('DesignModeDemo.tinyAppController.selectedShape')
        })
      })
    })

  }),

  /**
    These are the content views.
  */
  circle: SC.ImageView.design({
    classNames: ['shape-image'],
    layout: { left: 10, right: 10, top: 10, bottom: 10 },
    scale: SC.BEST_FIT_DOWN_ONLY,
    value: sc_static('circle.png')
  }),

  square: SC.ImageView.design({
    classNames: ['shape-image'],
    layout: { left: 10, right: 10, top: 10, bottom: 10 },
    scale: SC.BEST_FIT_DOWN_ONLY,
    value: sc_static('square.png')
  }),

  triangle: SC.ImageView.design({
    classNames: ['shape-image'],
    layout: { left: 10, right: 10, top: 10, bottom: 10 },
    scale: SC.BEST_FIT_DOWN_ONLY,
    value: sc_static('triangle.png')
  }),

  diamond: SC.ImageView.design({
    classNames: ['shape-image'],
    layout: { left: 10, right: 10, top: 10, bottom: 10 },
    scale: SC.BEST_FIT_DOWN_ONLY,
    value: sc_static('diamond.png')
  }),

  /**
    This is the 'medium' size menu.
  */
  menuPicker: SC.MenuPane.design({
    classNames: ['picker'],
    layout: { width: 46, height: 220 },

    items: DesignModeDemo.tinyAppController.get('shapes'),
    itemIconKey: 'blackIcon',
    itemValueKey: 'value',

    selectedItemChanged: function() {
      DesignModeDemo.tinyAppController.set('selectedShape', this.get('selectedItem').value);
    }.observes('selectedItem')
  })

});
