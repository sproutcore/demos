// ==========================================================================
// Project:   ZoomViewer
// Copyright: @2014 iParadigms, LLC
// License:   Licensed under MIT license
// ==========================================================================
/*globals ZoomViewer, CommonAssets */


ZoomViewer.main = function main() {

  // Configure the shared demo page.
  CommonAssets.set('sourceURL', 'https://github.com/sproutcore/demos/tree/master/apps/zoom_viewer');
  CommonAssets.set('demoContent', 'ZoomViewer.demoPage.demoContent');

  // Append the main demo pane.
  CommonAssets.mainPage.get('mainPane').append();

};

function main() { ZoomViewer.main(); }
