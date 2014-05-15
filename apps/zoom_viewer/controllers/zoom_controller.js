// -----------------------------------------------------------------------------
// Page/View Controllers
//

/**
 This singleton object is used to control our interface. We can simply bind
 to the properties on the controller throughout our UI in order to have all
 changes propagate throughout the application.
*/
ZoomViewer.zoomController = SC.Object.create({

  scale: 0.5,

  horizontalAlign: SC.ALIGN_CENTER

});


// -----------------------------------------------------------------------------
// Model Controllers
//

/**
  This singleton array controller contains our images. These are used in the
  thumbnail list.
*/
ZoomViewer.imagesController = SC.ArrayController.create({

  allowsEmptySelection: false,
  allowsMultipleSelection: false,

  content: [
    SC.Object.create({ title: "image01.jpg", imagePath: sc_static('images/image01.jpg'), thumbnailPath: sc_static('images/thumb01.jpg') }),
    SC.Object.create({ title: "image02.jpg", imagePath: sc_static('images/image02.jpg'), thumbnailPath: sc_static('images/thumb02.jpg') }),
    SC.Object.create({ title: "image03.jpg", imagePath: sc_static('images/image04.jpg'), thumbnailPath: sc_static('images/thumb04.jpg') }),
    SC.Object.create({ title: "image04.jpg", imagePath: sc_static('images/image06.jpg'), thumbnailPath: sc_static('images/thumb06.jpg') }),
    SC.Object.create({ title: "image05.jpg", imagePath: sc_static('images/image05.jpg'), thumbnailPath: sc_static('images/thumb05.jpg') })
  ]

});

/**
  This singleton object controller contains the currently selected image(s).

  By changing the selection on ZoomViewer.imagesController, we alter the content
  of this controller automatically.
*/
ZoomViewer.imageController = SC.ObjectController.create({

  contentBinding: SC.Binding.oneWay('ZoomViewer.imagesController.selection').single()

})
