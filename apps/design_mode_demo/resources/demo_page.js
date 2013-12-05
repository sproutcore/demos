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
    childViews: ['sizeLabel', 'orientationLabel', 'sizeChooser', 'orientationToggle', 'frameBodyCV'],

    layout: { minWidth: 320 },

    sizeLabel: SC.LabelView.extend({
      classNames: ['chooser-label'],
      layout: { bottom: 80, centerX: -135, height: 20, width: 100, zIndex: 2 },
      localize: true,
      value: "_DisplaySize"
    }),

    // The simulated size chooser button.
    sizeChooser: SC.SegmentedView.design({
      controlSize: SC.LARGE_CONTROL_SIZE,
      layout: { bottom: 50, centerX: -40, height: 30, width: 400, zIndex: 2 },
      localize: true,
      items: [{
        icon: 'phone',
        title: '_SmallFrameTitle',
        value: 's',
        width: 100
      }, {
        icon: 'tablet',
        title: '_MediumFrameTitle',
        value: 'm',
        width: 100
      }, {
        icon: 'desktop',
        title: '_LargeFrameTitle',
        value: 'l',
        width: 100
      }],
      // , {
      //   title: '_XLargeFrameTitle',
      //   value: 'xl'
      // }],
      itemIconKey: 'icon',
      itemTitleKey: 'title',
      itemValueKey: 'value',
      itemWidthKey: 'width',
      valueBinding: SC.Binding.from('DesignModeDemo.mainViewController.selectedSize')
    }),

    orientationLabel: SC.LabelView.extend({
      classNames: ['chooser-label'],
      layout: { bottom: 80, centerX: 190, width: 100, height: 20, zIndex: 2 },
      localize: true,
      value: "_Orientation"
    }),

    orientationToggle: SC.ButtonView.extend({
      action: 'toggleOrientation',
      layout: { bottom: 50, centerX: 195, width: 120, height: 30, zIndex: 2 },
      localize: true,
      icon: function () {
        return this.get('value') === 'l' ? 'picture' : 'picture-portrait';
      }.property('value').cacheable(),

      title: function () {
        return this.get('value') === 'l' ? '_Landscape' : '_Portrait';
      }.property('value').cacheable(),

      controlSize: SC.HUGE_CONTROL_SIZE,
      target: DesignModeDemo.mainViewController,
      valueBinding: SC.Binding.from('DesignModeDemo.mainViewController.selectedOrientation')
    }),

    // The simulated device (~1/3 a real device size).
    // NOTE: This is not part of the "real" code, it's just for simulating a device.
    // You can ignore this portion and focus on `frameCV` below.
    frameBodyCV: SC.View.design({
      childViews: ['frameCV'],
      classNames: ['frame-body'],
      modeAdjust: {
        s_p: { layout: { height: Math.round(568 / 3) + 60, width: Math.round(320 / 3) + 10 } }, // 320 x 568
        s_l: { layout: { height: Math.round(320 / 3) + 10, width: Math.round(568 / 3) + 60 } }, // 568 x 320
        m_l: { layout: { height: Math.round(768 / 3) + 30, width: Math.round(1024 / 3) + 60 } }, // 1024 x 768
        m_p: { layout: { height: Math.round(1024 / 3) + 60, width: Math.round(768 / 3) + 30 } }, // 768 x 1024
        l_l: { layout: { height: Math.round(1080 / 3) + 30, width: Math.round(1920 / 3) + 30 } }, // 1920 x 1080
        l_p: { layout: { height: Math.round(1920 / 3) + 30, width: Math.round(1080 / 3) + 30 } } // 1080 x 1920
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
        modeAdjust: {
          s_p: { layout: { height: Math.round(568 / 3), width: Math.round(320 / 3) } },
          s_l: { layout: { height: Math.round(320 / 3), width: Math.round(568 / 3) } },
          m_l: { layout: { height: Math.round(768 / 3), width: Math.round(1024 / 3) } },
          m_p: { layout: { height: Math.round(1024 / 3), width: Math.round(768 / 3) } },
          l_l: { layout: { height: Math.round(1080 / 3), width: Math.round(1920 / 3) } },
          l_p: { layout: { height: Math.round(1920 / 3), width: Math.round(1080 / 3) } }
        },

        // The default layout.
        layout: { border: 1, centerX: 0, centerY: 0, height: 1, width: 1 },

        navbarCV: SC.View.design({
          childViews: ['titleCV', 'toolbarButtonCV'],
          classNames: ['navbar'],
          modeAdjust: {
            l: { layout: { height: 32 } }
          },
          layout: { height: 18, zIndex: 2 },

          titleCV: SC.LabelView.design({
            classNames: ['title'],
            layout: { centerY: 0, height: 18 },
            localize: true,
            value: '_TinyShapes'
          }),

          /** This view is only used in 'm' */
          toolbarButtonCV: SC.ButtonView.design({
            action: 'showMenu',
            classNames: ['toolbar-button'],

            modeAdjust: {
              s_l: { isVisible: true },
              m_p: { isVisible: true }
            },

            isVisible: false,
            layout: { border: 1, centerY: 0, height: 13, left: 5, width: 40 },
            localize: true,
            target: DesignModeDemo.tinyAppController,
            title: "_Menu"
          })
        }),

        /** This view is only used in 'small portrait' */
        toolbarCV: SC.SegmentedView.design({
          classNames: ['toolbar'],

          modeAdjust: {
            s_p: { isVisible: true }
          },

          isVisible: false,
          items: DesignModeDemo.tinyAppController.get('shapes'),
          itemIconKey: 'icon',
          itemValueKey: 'value',
          itemWidthKey: 'width',
          layout: { bottom: 0, height: 24, zIndex: 1 },
          shouldHandleOverflow: false,
          valueBinding: SC.Binding.from('DesignModeDemo.tinyAppController.selectedShape')
        }),

        /** This view is only used in 'medium landscape' & 'large' */
        sourceListCV: SC.ListView.design({
          content: DesignModeDemo.tinyAppController.get('shapes'),

          modeAdjust: {
            m_l: { isVisible: true, rowHeight: 24, layout: { top: 17 } },
            l: { isVisible: true, rowHeight: 32, layout: { width: 100 } }
          },

          exampleView: SC.ListItemView.extend({
            contentIconKey: 'blackIcon',
            contentValueKey: 'value',
            hasContentIcon: YES
          }),

          // Set the default isVisible to false so it's easy to override when needed.
          isVisible: false,

          layout: { top: 31, width: 80 },

          selectionBinding: SC.Binding.from('DesignModeDemo.tinyAppController.selection')
        }),

        contentCV: SC.ContainerView.design({
          classNames: ['content'],

          modeAdjust: {
            s_l: { layout: { top: 17 } }, // left: 0, right: 0 bottom: 0
            s_p: { layout: { bottom: 20, top: 17 } }, // left: 0, right: 0
            m_l: { layout: { top: 15, left: 80 } }, // right: 0, bottom: 0
            m_p: { layout: { top: 15 } }, // left: 0, right: 0, bottom: 0
            l: { layout: { top: 31, left: 100 } } // right: 0, bottom: 0
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

    selectedItemChanged: function () {
      DesignModeDemo.tinyAppController.set('selectedShape', this.get('selectedItem').value);
    }.observes('selectedItem')
  })

});
