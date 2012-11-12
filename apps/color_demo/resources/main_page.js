// ==========================================================================
// Project:   ColorDemo
// Copyright: ©2012 7x7 Software, Inc.
// License:   Licensed under MIT license
// ==========================================================================
/*globals ColorDemo */


// This page describes the main user interface for your application.
ColorDemo.mainPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page
  // load.
  mainPane: SC.MainPane.design({

    childViews: ['titleCV', 'descCV', 'boxCV'],

    titleCV: SC.LabelView.design({
      classNames: ['demo-title'],
      layout: { centerX: 0, height: 30, width: 400, top: 15 },
      localize: true,
      value: '_DemoTitle'
    }),

    descCV: SC.LabelView.design({
      classNames: ['demo-desc'],
      escapeHTML: false,
      layout: { centerX: 0, height: 80, width: 400, top: 45 },
      localize: true,
      value: '_DemoDescription'
    }),

    boxCV: SC.View.design({

      childViews: ['logoCV', 'colorPreviewCV', 'colorPreview1CV', 'colorPreview2CV', 'hslSlidersCV', 'cssTextCV'],
      classNames: ['color-preview-box'],

      layout: { border: 1, centerX: 0, centerY: 0, width: 250, height: 400 },

      logoCV: SC.ImageView.design({
        layout: { centerX: 0, top: 25, width: 150, height: 150 },
        value: sc_static('sproutcore-logo.png')
      }),

      colorPreviewCV: SC.View.design({
        backgroundColorBinding: SC.Binding.oneWay('ColorDemo.mainViewController.cssText'),
        classNames: ['color-preview'],
        layout: { border: 1, left: 15, top: 15, right: 15, height: 170 }
      }),

      colorPreview1CV: SC.ImageButtonView.design({
        action: function() {
          var brighterColor = ColorDemo.mainViewController.get('brighterColor');

          ColorDemo.mainViewController.set('hue', brighterColor.get('hue'));
          ColorDemo.mainViewController.set('saturation', brighterColor.get('saturation'));
          ColorDemo.mainViewController.set('luminosity', brighterColor.get('luminosity'));
        },
        backgroundColorBinding: SC.Binding.oneWay('ColorDemo.mainViewController.brighterCssText'),
        classNames: ['color-sub-preview'],
        layout: { border: 2, left: 22, top: 22, width: 40, height: 40 }
      }),

      colorPreview2CV: SC.ImageButtonView.design({
        action: function() {
          var darkerColor = ColorDemo.mainViewController.get('darkerColor');

          ColorDemo.mainViewController.set('hue', darkerColor.get('hue'));
          ColorDemo.mainViewController.set('saturation', darkerColor.get('saturation'));
          ColorDemo.mainViewController.set('luminosity', darkerColor.get('luminosity'));
        },
        backgroundColorBinding: SC.Binding.oneWay('ColorDemo.mainViewController.darkerCssText'),
        classNames: ['color-sub-preview'],
        layout: { border: 2, right: 22, top: 138, width: 40, height: 40 }
      }),

      hslSlidersCV: SC.View.design({
        childViews: ['hTitle', 'hCV', 'hValueCV', 'sTitle', 'sCV', 'sValueCV', 'lTitle', 'lCV', 'lValueCV', 'aTitle', 'aCV', 'aValueCV'],
        layout: { top: 200, bottom: 40 },

        hTitle: SC.LabelView.design({
          classNames: ['slider-title'],
          layout: { left: 10, width: 20, height: 24, top: 0 },
          localize: true,
          value: 'H'
        }),
        hCV: SC.SliderView.design({
          layout: { left: 50, right: 50, height: 24, top: 0 },
          minimum: 0,
          maximum: 359,
          step: 1,
          valueBinding: SC.Binding.from('ColorDemo.mainViewController.hue')
        }),
        hValueCV: SC.LabelView.design({
          classNames: ['slider-value'],
          layout: { right: 10, width: 35, height: 24, top: 0 },
          valueBinding: SC.Binding.oneWay('ColorDemo.mainViewController.hue').
            transform(function(hue) {
              return parseInt(hue, 10) + '°';
            })
        }),

        sTitle: SC.LabelView.design({
          classNames: ['slider-title'],
          layout: { left: 10, width: 20, height: 24, top: 35 },
          localize: true,
          value: 'S'
        }),
        sCV: SC.SliderView.design({
          layout: { left: 50, right: 50, height: 24, top: 35 },
          step: 0.01,
          valueBinding: SC.Binding.from('ColorDemo.mainViewController.saturation')
        }),
        sValueCV: SC.LabelView.design({
          classNames: ['slider-value'],
          layout: { right: 10, width: 35, height: 24, top: 35 },
          valueBinding: SC.Binding.oneWay('ColorDemo.mainViewController.saturation').
            transform(function(saturation) {
              return parseInt(saturation * 100, 10) + '%';
            })
        }),

        lTitle: SC.LabelView.design({
          classNames: ['slider-title'],
          layout: { left: 10, width: 20, height: 24, top: 70 },
          localize: true,
          value: 'L'
        }),
        lCV: SC.SliderView.design({
          layout: { left: 50, right: 50, height: 24, top: 70 },
          step: 0.01,
          valueBinding: SC.Binding.from('ColorDemo.mainViewController.luminosity')
        }),
        lValueCV: SC.LabelView.design({
          classNames: ['slider-value'],
          layout: { right: 10, width: 35, height: 24, top: 70 },
          valueBinding: SC.Binding.oneWay('ColorDemo.mainViewController.luminosity').
            transform(function(luminosity) {
              return parseInt(luminosity * 100, 10) + '%';
            })
        }),

        aTitle: SC.LabelView.design({
          classNames: ['slider-title'],
          layout: { left: 10, width: 20, height: 24, top: 105 },
          value: 'α '
        }),
        aCV: SC.SliderView.design({
          layout: { left: 50, right: 50, height: 24, top: 105 },
          step: 0.01,
          valueBinding: SC.Binding.from('ColorDemo.mainViewController.a')
        }),
        aValueCV: SC.LabelView.design({
          classNames: ['slider-value'],
          layout: { right: 10, width: 35, height: 24, top: 105 },
          valueBinding: SC.Binding.oneWay('ColorDemo.mainViewController.a').
            transform(function(luminosity) {
              return parseInt(luminosity * 100, 10) + '%';
            })
        })
      }),

      cssTextCV: SC.TextFieldView.design({
        classNames: ['color-text'],
        controlSize: SC.LARGE_CONTROL_SIZE,
        isEditable: false,
        layout: { left: 20, right: 20, bottom: 15, height: 30 },
        valueBinding: SC.Binding.from('ColorDemo.mainViewController.cssText')
      })
    })
  })

});
