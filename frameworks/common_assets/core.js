// ==========================================================================
// CommonAssets Framework
// ==========================================================================

CommonAssets = SC.Object.create({

  // When you are in development mode, this array will be populated with
  // any fixtures you create for testing and loaded automatically in your
  // main method.  When in production, this will be an empty array.
  //
  // You will use this most often when running unit tests in dev mode.
  //
  FIXTURES: [],

  // Add any global constants or other properties used by the entire
  // framework:
  // CONSTANT_NAME:  'some-value'

  /**
    Set this to the path of your demo content view.
    */
  demoContent: null,

  /** @private */
  descriptionIsVisible: false,

  /**
    Set this to the url of your demo content source.
    */
  sourceURL: null,

  /** @private */
  viewSource: function (sender) {
    window.open(sender.get('sourceURL'), '_blank');
  }

});
