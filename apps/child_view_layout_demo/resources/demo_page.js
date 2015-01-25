// ==========================================================================
// Project:   ChildViewLayoutDemo - mainPage
// Copyright: @2013 7x7 Software, Inc.
// ==========================================================================
/*globals ChildViewLayoutDemo */

sc_require('views/form_view');


// This page describes the main user interface for your application.
ChildViewLayoutDemo.demoPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  demoContent: SC.TabView.extend({

    layout: { border: 20 },

    itemTitleKey: 'title',
    itemValueKey: 'value',

    items: [
      { title: 'Vertical', value: 'verticalFormView' },
      { title: 'Horizontal', value: 'horizontalFormView' }
    ],

    nowShowing: 'verticalFormView',
    
    childViews: ['verticalFormView'],

    verticalFormView: ChildViewLayoutDemo.FormView.extend({
      layout: { border: 2, centerX: 0, centerY: 0, width: 300 }, // No height required.
      childViewLayout: SC.View.VERTICAL_STACK,

      v1: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view1'],
        layout: { border: 2, left: 5, right: 5, height: 100 }, // No top required.
        value: 'A'
      }),

      v2: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view2'],
        layout: { border: 2, left: 5, right: 5, height: 150 }, // No top required.
        value: 'B'
      }),

      v3: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view3'],
        layout: { border: 2, left: 5, right: 5, height: 75 }, // No top required.
        value: 'C'
      }),

      v4: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view4'],
        layout: { border: 2, left: 5, right: 5, height: 125 }, // No top required.
        value: 'D'
      }),

      label: SC.LabelView.extend({
        classNames: ['form-label'],
        layout: { height: 30, left: 10, right: 10, bottom: 0 },
        localize: true,
        useAbsoluteLayout: true,
        value: "_DragLabel"
      })
    }),

    horizontalFormView: ChildViewLayoutDemo.FormView.extend({
      layout: { border: 2, centerX: 0, centerY: 0, height: 300 }, // No width required.
      childViewLayout: SC.View.HORIZONTAL_STACK,

      v1: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view1'],
        layout: { border: 2, top: 5, bottom: 30, width: 100 }, // No left required.
        value: 'A'
      }),

      v2: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view2'],
        layout: { border: 2, top: 5, bottom: 30, width: 150 }, // No left required.
        value: 'B'
      }),

      v3: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view3'],
        layout: { border: 2, top: 5, bottom: 30, width: 75 }, // No left required.
        value: 'C'
      }),

      v4: ChildViewLayoutDemo.SampleView.design({
        classNames: ['view4'],
        layout: { border: 2, top: 5, bottom: 30, width: 125 }, // No left required.
        value: 'D'
      }),

      label: SC.View.extend({
        layout: { width: 0 },
        useAbsoluteLayout: true
      })

    })

    // UNUSED.
    // itemsView: SC.View.extend({
    //   childViews: ['v1', 'v2', 'v3', 'v4'],
    //   childViewLayout: SC.View.VERTICAL_STACK,
    //   childViewLayoutOptions: {
    //     paddingBefore: 10,
    //     paddingAfter: 10,
    //     spacing: 10
    //   },
    //   classNames: ['demo-content'],
    //   layout: { centerY: 0, width: 60 },

    //   v1: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view1'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'A'
    //   }),

    //   v2: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view2'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'B'
    //   }),

    //   v3: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view3'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'C'
    //   }),

    //   v4: ChildViewLayoutDemo.SampleTemplateView.design({
    //     classNames: ['view4'],
    //     layout: { border: 2, left: 5, right: 5, height: 50 }, // No top required.
    //     value: 'D'
    //   })
    // }),

    // UNUSED.
    // formControl: SC.View.extend({
    //   childViews: ['paddingBeforeLabel', 'paddingBefore', 'spacingLabel', 'spacing', 'paddingAfterLabel', 'paddingAfter'],
    //   childViewLayout: SC.View.VERTICAL_STACK,

    //   paddingBeforeLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_PaddingBefore"
    //   }),

    //   paddingBefore: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.paddingBefore'
    //   }),

    //   spacingLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_Spacing"
    //   }),

    //   spacing: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.spacing'
    //   }),

    //   paddingAfterLabel: SC.LabelView.extend({
    //     layout: { left: 20, height: 24 },
    //     localize: true,
    //     value: "_PaddingAfter"
    //   }),

    //   paddingAfter: SC.SliderView.extend({
    //     layout: { left: 20, right: 20, height: 24 },
    //     maximum: 50,
    //     step: 1,
    //     valueBinding: 'ChildViewLayoutDemo.paddingAfter'
    //   })
    // })
  })
});
