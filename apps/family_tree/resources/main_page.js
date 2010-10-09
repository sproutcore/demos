// ==========================================================================
// Project:   FamilyTree - mainPage
// Copyright: ©2009 My Company, Inc.
// ==========================================================================
/*globals FamilyTree */
sc_require('core');
sc_require('views/family_item');
sc_require('views/add_button');
sc_require('views/list_button');

// This page describes the main user interface for your application.  
FamilyTree.mainPage = SC.Page.design({
  
  invalidBrowserPane: SC.Pane.design({
    childViews: 'title main'.w(),
    
    title: SC.View.design({
      layout: {left: 0, top: 0, right: 0, height: 56},
      classNames: ['header'],
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('logo')
                      .text('family tree')
                  .end();
        context = context.begin('div')
                    .addClass('blurb')
                      .text('a scui linkit example')
                  .end();
        context = context.begin('div')
                   .addClass('leaves')
                  .end();
      }
    }),
    
    main: SC.View.design({
      layout: {left: 0, top: 56, right: 0, bottom: 0},
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('apology')
                      .text('Sorry, Linkit is designed for desktop application for now and we are working on adding mobile support...')
                  .end();
      }
    })
  }),

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'title master footer canvas palette'.w(),
    
    title: SC.View.design({
      layout: {left: 0, top: 0, right: 0, height: 56},
      classNames: ['header'],
      render: function(context, firstTime){
        context = context.begin('div')
                    .addClass('logo')
                      .text('family tree')
                  .end();
        context = context.begin('div')
                    .addClass('blurb')
                      .text('a scui linkit example')
                  .end();
        context = context.begin('div')
                   .addClass('leaves')
                  .end();
      }
    }),
    
    master: SC.ListView.design({
      classNames: ['master-list'],
      layout: { left: 0, top: 56, width: 259, bottom: 36 },
      rowHeight: 43,
      rowSpacing: 2,
      exampleView: FamilyTree.FamilyItemView,
      selectionBinding: 'FamilyTree.familiesController.selection',
      contentBinding: 'FamilyTree.familiesController',
      contentValueKey: 'name',
      actOnSelect: YES,
      target: FamilyTree.familiesController,
      action: 'changedFamily'
    }),
    
    footer: SC.View.design({
      classNames: ['footer'],
      layout: {left: 0, bottom: 0, width: 259, height: 35},
      childViews: 'addFamilyButton removeFamilyButton'.w(),
      
      addFamilyButton: FamilyTree.ListButtonView.design({
        layout: {centerX: -14, centerY: 0, height: 24, width: 27 },
        classNames: ['add'],
        target: FamilyTree.familiesController,
        action: 'addFamily'
      }),
      
      removeFamilyButton: FamilyTree.ListButtonView.design({
        layout: {centerX: 13, centerY: 0, height: 24, width: 27 },
        classNames: ['remove'],
        target: FamilyTree.familiesController,
        action: 'removeFamily'
      })
    }),
    
    canvas: LinkIt.CanvasView.design({
      layout: { left: 259, right: 0, top: 56, bottom: 0 },
      classNames: ['family-canvas'],
      contentBinding: SC.Binding.from('FamilyTree.membersController').oneWay(),
      selectionBinding: 'FamilyTree.membersController.selection',
      nodeViewDelegate: FamilyTree.familyController,
      exampleView: FamilyTree.NodeView,
      delegate: FamilyTree.familyController
    }),    
    
    palette: SC.View.design({
      layout: {right: 0, top: 62, height: 222, width: 77 },
      childViews: 'addDecorator addMale addFemale addPet'.w(),
      
      addDecorator: SC.View.design({
        layout: { left: 0, right: 0, top: 0, height: 23 },
        classNames: ['add-decorator']
      }),
      
      addMale: FamilyTree.AddButtonView.design({
        layout: { left: 0, right: 0, top: 23, height: 65 },
        classNames: ['add-male'],
        title: "Male",
        target: FamilyTree.familyController,
        action: 'addMale'
      }),
            
      addFemale: FamilyTree.AddButtonView.design({
        layout: { left: 0, right: 0, top: 88, height: 66 },
        classNames: ['add-female'],
        title: "Female",
        target: FamilyTree.familyController,
        action: 'addFemale'
      }),
      
      addPet: FamilyTree.AddButtonView.design({
        layout: { left: 0, right: 0, top: 154, height: 68 },
        classNames: ['add-pet'],
        title: "Pet",
        target: FamilyTree.familyController,
        action: 'addPet'
      })
    })
  })

});
